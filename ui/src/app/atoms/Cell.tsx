interface CellProps {
  borders: number;
  size: number;
}

const Cell = ({ borders, size }: CellProps) => {
  let bordersData = borders;
  const style: React.CSSProperties = {
    border: `1px solid black`,
    width: `${size}px`,
    height: `${size}px`,
  };
  if (bordersData >= 8) {
    style.borderLeft = 'none';
    bordersData -= 8;
  }
  if (bordersData >= 4) {
    style.borderBottom = 'none';
    bordersData -= 4;
  }
  if (bordersData >= 2) {
    style.borderRight = 'none';
    bordersData -= 2;
  }
  if (bordersData >= 1) {
    style.borderTop = 'none';
    bordersData -= 1;
  }
  return <div style={style}></div>;
};

export default Cell;
