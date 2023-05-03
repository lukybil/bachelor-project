use js_sys;
use rand;
use rand::seq::SliceRandom;
use rand::thread_rng;
use wasm_bindgen::prelude::*;
extern crate web_sys;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

enum Direction {
    N,
    E,
    S,
    W,
}

impl TryFrom<u8> for Direction {
    type Error = ();
    fn try_from(orig: u8) -> Result<Self, Self::Error> {
        match orig {
            0 => return Ok(Direction::N),
            1 => return Ok(Direction::E),
            2 => return Ok(Direction::S),
            3 => return Ok(Direction::W),
            _ => return Err(()),
        };
    }
}

fn calc_index(x: u32, y: u32, cols: u32) -> usize {
    return (y * cols + x % cols) as usize;
}

fn carve_path(x: u32, y: u32, grid: &mut Vec<u8>, from_dir: Direction, cols: u32, rows: u32) {
    let mut dir_footprint;
    match from_dir {
        Direction::N => {
            dir_footprint = 4;
        }
        Direction::E => {
            dir_footprint = 8;
        }
        Direction::S => {
            dir_footprint = 1;
        }
        Direction::W => {
            dir_footprint = 2;
        }
    }
    grid[calc_index(x, y, cols)] += dir_footprint;
    let mut directions: [u8; 4] = [0, 1, 2, 3];
    directions.shuffle(&mut thread_rng());
    for dir in directions {
        let mut nx = x;
        let mut ny = y;
        match dir.try_into().unwrap() {
            Direction::N => {
                if ny > 0 {
                    ny -= 1;
                }
                dir_footprint = 1;
            }
            Direction::E => {
                nx += 1;
                dir_footprint = 2;
            }
            Direction::S => {
                ny += 1;
                dir_footprint = 4;
            }
            Direction::W => {
                if nx > 0 {
                    nx -= 1;
                }
                dir_footprint = 8;
            }
        }
        if (nx != 0 || ny != 0) && nx < cols && ny < rows && grid[calc_index(nx, ny, cols)] == 0 {
            grid[calc_index(x, y, cols)] += dir_footprint;
            carve_path(nx, ny, grid, dir.try_into().unwrap(), cols, rows);
        }
    }
}

#[wasm_bindgen]
pub fn create_maze(cols: u32, rows: u32) -> js_sys::Uint8Array {
    let mut grid: Vec<u8> = vec![0; (cols * rows).try_into().unwrap()];
    carve_path(0, 0, &mut grid, Direction::S, cols, rows);
    grid[calc_index(cols - 1, rows - 1, cols)] += 4;
    return js_sys::Uint8Array::from(&grid[..]);
}
