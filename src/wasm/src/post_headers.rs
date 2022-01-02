//wasm-pack build --target web
extern crate base64;

use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use base64::{encode};

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct PostHeaders {
    #[serde(rename = "Sig")]
    sig: String,

    #[serde(rename = "Content-Type")]
    content_type: String
}

#[wasm_bindgen]
impl PostHeaders {
    #[wasm_bindgen(constructor)]
    pub fn new() -> PostHeaders {
        PostHeaders {
             sig: encode(b"You have no life."),
             content_type: String::from("application/json")
        }
    }

    #[wasm_bindgen(getter)]
    pub fn sig(self) -> String {
        self.sig
    }

    #[wasm_bindgen(getter, js_name = "contentType")]
    pub fn content_type(self) -> String {
        self.content_type
    }

    #[wasm_bindgen]
    pub fn objectify(&self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }
}