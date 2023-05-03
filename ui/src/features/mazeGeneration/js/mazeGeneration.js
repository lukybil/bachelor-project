const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

class MazeGenerator {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array(width * height).fill(0);
  }
  at = (x, y) => (x % this.width) + y * this.width;
  carvePath(x, y, fromDir) {
    let dirFootprint = 0;
    switch (fromDir) {
      case 'N':
        dirFootprint = 4;
        break;
      case 'E':
        dirFootprint = 8;
        break;
      case 'S':
        dirFootprint = 1;
        break;
      case 'W':
        dirFootprint = 2;
        break;
    }
    this.grid[this.at(x, y)] += dirFootprint;
    const directions = shuffle(['N', 'E', 'S', 'W']);
    directions.forEach((dir) => {
      let nX = x,
        nY = y;
      switch (dir) {
        case 'N':
          nY--;
          dirFootprint = 1;
          break;
        case 'E':
          nX++;
          dirFootprint = 2;
          break;
        case 'S':
          nY++;
          dirFootprint = 4;
          break;
        case 'W':
          nX--;
          dirFootprint = 8;
          break;
      }
      if (nX >= 0 && nY >= 0 && nX < this.width && nY < this.height && this.grid[this.at(nX, nY)] === 0) {
        this.grid[this.at(x, y)] += dirFootprint;
        this.carvePath(nX, nY, dir);
      }
    });
  }
  generateMaze() {
    this.carvePath(0, 0, 'S');
    this.grid[this.at(this.width - 1, this.height - 1)] += 4;
    return this.grid;
  }
}

export const generateMaze = (width, height) => {
  const generator = new MazeGenerator(width, height);
  const maze = generator.generateMaze();
  // const maze = generateIterative(width, height);
  return maze;
};
