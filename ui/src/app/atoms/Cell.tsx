const SIZE = '10px';

interface CellProps {
  borders: number;
}

const Cell = ({ borders }: CellProps) => {
  let bordersData = borders;
  const style: React.CSSProperties = {
    border: '1px solid black',
    width: SIZE,
    height: SIZE,
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
