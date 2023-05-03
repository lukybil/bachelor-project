import { useCallback, useEffect, useMemo, useState } from 'react';
import { DIFFICULTY } from '../constants';
import { Difficulty } from '../types/Difficulty';
import { GameRecord } from '../types/GameRecord';

interface Sort {
  column: keyof GameRecord;
  desc?: boolean;
}

interface DataTableProps {
  data: GameRecord[];
}

const PAGE_SIZE = 50;

const DataTable = (props: DataTableProps) => {
  const [data, setData] = useState(props.data);
  const [page, setPage] = useState(0);
  const [activeSort, setActiveSort] = useState<Sort | null>(null);
  const [activeFilter, setActiveFilter] = useState<Difficulty | null>(null);

  const sort = useCallback(
    ({ column, desc = false }: Sort) => {
      const newData = [...data];
      newData.sort((a, b) => ((desc ? a[column] > b[column] : b[column] > a[column]) ? 1 : -1));
      setData(newData);
    },
    [data]
  );

  useEffect(() => {
    sort(activeSort ?? { column: 'completionTime' });
  }, [activeSort, sort]);

  useEffect(() => {
    if (activeFilter) {
      const newData = data.filter((record) => record.difficulty === activeFilter);
      setData(newData);
    } else {
      setData(props.data);
    }
  }, [activeFilter, data, props.data]);

  const renderedRows = useMemo(
    () =>
      data.slice(PAGE_SIZE * page, PAGE_SIZE * page + 1).map((record) => (
        <tr>
          <td>{record.username}</td>
          <td>{DIFFICULTY[record.difficulty]}</td>
          <td>{record.completionTime}</td>
        </tr>
      )),
    [data, page]
  );

  const handleHeaderClick = () => {};

  return (
    <div>
      <table>
        <tr>
          <th>User</th>
          <th>Difficulty</th>
          <th>Completion time [s]</th>
        </tr>
        {renderedRows}
      </table>
    </div>
  );
};

export default DataTable;
