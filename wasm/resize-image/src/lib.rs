extern crate wasm_bindgen;
use base64;
use chrono::Utc;
use image::imageops::{self, resize};
use std::io::Cursor;
use wasm_bindgen::prelude::*;

enum SupportedFormat {
    Jpeg,
    Png,
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub fn resize_image(url: &str, nwidth: u32, nheight: u32) -> String {
    let t0 = Utc::now();
    let format = match url {
        x if x.starts_with("data:image/jpeg;base64,") => SupportedFormat::Jpeg,
        x if x.starts_with("data:image/png;base64,") => SupportedFormat::Png,
        _ => panic!("Unsupported format"),
    };
    let b64 = match format {
        SupportedFormat::Jpeg => url.replace("data:image/jpeg;base64,", ""),
        SupportedFormat::Png => url.replace("data:image/png;base64,", ""),
    };
    let t1 = Utc::now();
    console_log!(
        "string matching & replace: {}ms",
        (t1 - t0).num_milliseconds()
    );
    let buffer = base64::decode(b64).unwrap();
    let t2 = Utc::now();
    console_log!("decode base64: {}ms", (t2 - t1).num_milliseconds());
    let mut image = match format {
        SupportedFormat::Jpeg => {
            image::load_from_memory_with_format(&buffer, image::ImageFormat::Jpeg).unwrap()
        }
        SupportedFormat::Png => {
            image::load_from_memory_with_format(&buffer, image::ImageFormat::Png).unwrap()
        }
    };
    let t3 = Utc::now();
    console_log!("load image: {}ms", (t3 - t2).num_milliseconds());
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
    let t4 = Utc::now();
    console_log!("crop image: {}ms", (t4 - t3).num_milliseconds());
    let resized = resize(&image, nwidth, nheight, imageops::FilterType::Gaussian);
    let t5 = Utc::now();
    console_log!("resize image: {}ms", (t5 - t4).num_milliseconds());
    resized
        .write_to(
            &mut Cursor::new(&mut out_buffer),
            image::ImageOutputFormat::Jpeg(100),
        )
        .unwrap();
    let t6 = Utc::now();
    console_log!("write to buffer: {}ms", (t6 - t5).num_milliseconds());
    let encoded = base64::encode(out_buffer);
    let t7 = Utc::now();
    console_log!("encode base64 image: {}ms", (t7 - t6).num_milliseconds());
    return encoded;
}
