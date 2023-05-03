extern crate wasm_bindgen;
use base64;
use image::imageops::{self, resize};
use std::io::Cursor;
use wasm_bindgen::prelude::*;

enum SupportedFormat {
    Jpeg,
    Png,
}

#[wasm_bindgen]
pub fn resize_image(url: &str, nwidth: u32, nheight: u32) -> String {
    let format = match url {
        x if x.starts_with("data:image/jpeg;base64,") => SupportedFormat::Jpeg,
        x if x.starts_with("data:image/png;base64,") => SupportedFormat::Png,
        _ => panic!("Unsupported format"),
    };
    let b64 = match format {
        SupportedFormat::Jpeg => url.replace("data:image/jpeg;base64,", ""),
        SupportedFormat::Png => url.replace("data:image/png;base64,", ""),
    };
    let buffer = base64::decode(b64).unwrap();
    let mut image = match format {
        SupportedFormat::Jpeg => {
            image::load_from_memory_with_format(&buffer, image::ImageFormat::Jpeg).unwrap()
        }
        SupportedFormat::Png => {
            image::load_from_memory_with_format(&buffer, image::ImageFormat::Png).unwrap()
        }
    };
    let mut out_buffer = vec![];
    let width = image.width();
    let height = image.height();
    let ratio: f64 =
        TryInto::<f64>::try_into(width).unwrap() / TryInto::<f64>::try_into(height).unwrap();
    let nratio: f64 =
        TryInto::<f64>::try_into(nwidth).unwrap() / TryInto::<f64>::try_into(nheight).unwrap();
    if ratio.min(nratio) == nratio {
        let w: f64 = width.try_into().unwrap();
        let nw = w / ratio * nratio;
        image = image.crop(((w - nw) / 2.0) as u32, 0, nw as u32, height);
    } else if ratio.min(nratio) == ratio {
        let h: f64 = height.try_into().unwrap();
        let nh = h * ratio / nratio;
        image = image.crop(0, ((h - nh) / 2.0) as u32, height, nh as u32);
    }
    let resized = resize(&image, nwidth, nheight, imageops::FilterType::Gaussian);
    resized
        .write_to(
            &mut Cursor::new(&mut out_buffer),
            image::ImageOutputFormat::Jpeg(100),
        )
        .unwrap();
    let encoded = base64::encode(out_buffer);
    return encoded;
}
