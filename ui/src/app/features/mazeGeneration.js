const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

class MazeGenerator {
  width;
  height;
  grid;
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array(width).fill(0).map(() => new Array(height).fill(0));
  }
  carvePath = (x, y, fromDir) => {
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
    this.grid[y][x] += dirFootprint;
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
      if (
        nX >= 0 &&
        nY >= 0 &&
        nX < this.width &&
        nY < this.heigth &&
        this.grid[nY][nX] === 0
      ) {
        this.grid[y][x] += dirFootprint;
        this.carvePath(nX, nY, dir);
      }
    });
  };
  generateMaze = () => {
    this.carvePath(0, 0, 'S');
    this.grid[this.height - 1][this.width - 1] += 4;
    return this.grid;
  };
}

export const generateMaze = (width, height) => {
  const generator = new MazeGenerator(width, height);
  const maze = generator.generateMaze();
  return maze;
};
