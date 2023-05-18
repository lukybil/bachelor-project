extern crate wasm_bindgen;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[derive(Serialize, Deserialize)]
pub struct GameRecord {
    completionTime: f64,
    difficulty: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    profileImage: String,
}

#[wasm_bindgen]
pub fn json_to_csv(json: JsValue) -> String {
    let t0 = Utc::now();
    let arr: Vec<GameRecord> = serde_wasm_bindgen::from_value(json)
        .map_err(|err| console_log!("{}", err.to_string()))
        .unwrap();
    let t1 = Utc::now();
    console_log!("parse into vector: {}ms", (t1 - t0).num_milliseconds());
    let mut csv = "".to_string();
    for row in arr {
        let csv_row = format!(
            "{},{},{},{},{},{},{}",
            row.completionTime.to_string(),
            row.difficulty,
            row.username,
            row.firstName,
            row.lastName,
            row.email,
            row.profileImage,
        );
        csv += &csv_row;
    }
    let t2 = Utc::now();
    console_log!(
        "written into csv string: {}ms",
        (t2 - t1).num_milliseconds()
    );
    return csv;
}
