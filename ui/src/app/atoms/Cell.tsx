interface CellProps {
  id: string;
  borders: number;
  size: number;
}

const Cell = ({ borders, size, id }: CellProps) => {
  let bordersData = borders;
  const style: React.CSSProperties = {
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
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
  return <div id={id} style={style}></div>;
};

export default Cell;
