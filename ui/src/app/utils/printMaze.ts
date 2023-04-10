export const printMaze = (grid: number[], cols: number, rows: number) => {
  const root = document.getElementById('root');
  if (!root) return;
  root.firstChild && root.removeChild(root.firstChild);
  const maze = document.createElement('div');
  for (let y = 0; y < grid.length / cols; y++) {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';
    rowDiv.style.flexDirection = 'row';
    for (let x = 0; x < cols; x++) {
      const div = document.createElement('div');
      div.style.boxSizing = 'border-box';
      div.style.border = '1px solid black';
      div.style.width = '4px';
      div.style.height = '4px';
      // div.innerHTML = cell;
      let borders = grid[y * cols + (x % cols)];
      if (borders >= 8) {
        div.style.borderLeft = 'none';
        borders -= 8;
      }
      if (borders >= 4) {
        div.style.borderBottom = 'none';
        borders -= 4;
      }
      if (borders >= 2) {
        div.style.borderRight = 'none';
        borders -= 2;
      }
      if (borders >= 1) {
        div.style.borderTop = 'none';
        borders -= 1;
      }
      rowDiv.appendChild(div);
    }
    maze.appendChild(rowDiv);
  }
  root.appendChild(maze);
};
