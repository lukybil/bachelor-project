extern crate wasm_bindgen;
use serde::{Deserialize, Serialize};
use serde_json;
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
pub fn json_to_csv(json: &str) -> String {
    log("started alg");
    let arr: Vec<GameRecord> = serde_json::from_str(json)
        .map_err(|err| console_log!("{}", err.to_string()))
        .unwrap();
    log("parsed to array");
    let mut csv_writer = csv::Writer::from_writer(vec![]);
    log("init writer");
    csv_writer
        .write_record(&[
            "completionTime",
            "difficulty",
            "username",
            "firstName",
            "lastName",
            "email",
            "profileImage",
        ])
        .unwrap();
    log("written headers");
    for row in arr {
        csv_writer
            .write_record(&[
                row.completionTime.to_string(),
                row.difficulty,
                row.username,
                row.firstName,
                row.lastName,
                row.email,
                row.profileImage,
            ])
            .unwrap();
    }
    log("written data");
    let csv: String = String::from_utf8(csv_writer.into_inner().unwrap()).unwrap();
    log("converted to csv");
    return csv;
}
