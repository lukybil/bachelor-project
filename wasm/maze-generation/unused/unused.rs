use js_sys;
use rand;
use rand::seq::SliceRandom;
use rand::thread_rng;
use wasm_bindgen::prelude::*;
extern crate web_sys;
use std::fmt;

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

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[derive(Copy, Clone)]
struct Coordinate {
    x: u32,
    y: u32,
}

#[derive(Copy, Clone)]
struct Step {
    from: Coordinate,
    to: Coordinate,
}

struct MazeGenerator {
    stack: Vec<Step>,
    cols: u32,
    rows: u32,
    grid: Vec<u8>,
}

impl fmt::Display for Step {
    fn fmt(&self, fmt: &mut fmt::Formatter) -> fmt::Result {
        fmt.write_str("from: { x: ")?;
        fmt.write_str(&self.from.x.to_string())?;
        fmt.write_str(", y: ")?;
        fmt.write_str(&self.from.y.to_string())?;
        fmt.write_str(" }, to: { x: ")?;
        fmt.write_str(&self.to.x.to_string())?;
        fmt.write_str(", y: ")?;
        fmt.write_str(&self.to.y.to_string())?;
        fmt.write_str(" }")?;
        Ok(())
    }
}

impl MazeGenerator {
    pub fn new(cols: u32, rows: u32) -> MazeGenerator {
        MazeGenerator {
            stack: vec![],
            cols: cols,
            rows: rows,
            grid: vec![0; (cols * rows).try_into().unwrap()],
        }
    }
    fn calc_index(&self, x: u32, y: u32) -> usize {
        return (y * self.cols + x % self.cols) as usize;
    }
    pub fn carve_path(&mut self) -> &Vec<u8> {
        self.stack.push(Step {
            from: Coordinate { x: 0, y: 0 },
            to: Coordinate { x: 0, y: 0 },
        });
        'outer: while let Some(step) = self.stack.pop() {
            log! {"{}", step}
            let index = self.calc_index(step.to.x, step.to.y);
            if step.from.x != step.to.x {
                if step.from.x > step.to.x {
                    self.grid[index] += 2;
                } else {
                    self.grid[index] += 8;
                }
            } else if step.from.y != step.to.y {
                if step.from.y > step.to.y {
                    self.grid[index] += 1;
                } else {
                    self.grid[index] += 4;
                }
            } else {
                // starting cell
                self.grid[index] += 1;
            }
            let mut directions: [Direction; 4] =
                [Direction::N, Direction::E, Direction::S, Direction::W];
            directions.shuffle(&mut thread_rng());
            for dir in directions.iter() {
                match dir {
                    Direction::N => {
                        if step.to.y > 0
                            && self.grid[self.calc_index(step.to.x, step.to.y - 1)] == 0
                        {
                            self.stack.push(Step {
                                from: step.to,
                                to: Coordinate {
                                    x: step.to.x,
                                    y: step.to.y - 1,
                                },
                            });
                            //self.grid[index] += 1;
                            continue 'outer;
                        }
                    }
                    Direction::E => {
                        if step.to.x < self.cols
                            && self.grid[self.calc_index(step.to.x + 1, step.to.y)] == 0
                        {
                            self.stack.push(Step {
                                from: step.to,
                                to: Coordinate {
                                    x: step.to.x + 1,
                                    y: step.to.y,
                                },
                            });
                            //self.grid[index] += 2;
                            continue 'outer;
                        }
                    }
                    Direction::S => {
                        if step.to.y < self.rows
                            && self.grid[self.calc_index(step.to.x, step.to.y + 1)] == 0
                        {
                            self.stack.push(Step {
                                from: step.to,
                                to: Coordinate {
                                    x: step.to.x,
                                    y: step.to.y + 1,
                                },
                            });
                            //self.grid[index] += 4;
                            continue 'outer;
                        }
                    }
                    Direction::W => {
                        if step.to.x > 0
                            && self.grid[self.calc_index(step.to.x - 1, step.to.y)] == 0
                        {
                            self.stack.push(Step {
                                from: step.to,
                                to: Coordinate {
                                    x: step.to.x - 1,
                                    y: step.to.y,
                                },
                            });
                            //self.grid[index] += 8;
                            continue 'outer;
                        }
                    }
                }
            }
            if step.to.x == 0 && step.to.y == 0 {
                break;
            }
            self.stack.push(Step {
                from: step.to,
                to: step.from,
            });
        }
        return &self.grid;
    }
}

pub fn create_maze(cols: u32, rows: u32) -> js_sys::Uint8Array {
    // let mut grid: Vec<u8> = vec![0; (cols * rows).try_into().unwrap()];
    // carve_path(0, 0, &mut grid, Direction::S, cols, rows);
    // grid[calc_index(cols - 1, rows - 1, cols)] += 4;
    let mut maze_generator = MazeGenerator::new(cols, rows);
    let grid = maze_generator.carve_path();
    return js_sys::Uint8Array::from(&grid[..]);
}
