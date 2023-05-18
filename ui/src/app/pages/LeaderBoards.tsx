import { useCallback, useState } from 'react';
import Button from '../atoms/Button';
import { useInitWasmModule } from '../hooks/useInitWasmModule';
import { useJsonToCsv } from '../hooks/useJsonToCsv';
import { getLeaderBoards } from '../network/getLeaderBoards';
import { WasmModule } from '../types/WasmModule';

const LeaderBoards = () => {
  const [isConverted, setIsConverted] = useState(false);
  useInitWasmModule(WasmModule.jsonToCsv);
  const jsonToCsv = useJsonToCsv();

  const convertToCsv = useCallback(async () => {
    setIsConverted(false);
    const data = await getLeaderBoards();
    const csv = await jsonToCsv(data);
    setIsConverted(true);
  }, [jsonToCsv]);

  return (
    <div>
      <Button id="convert-button" onClick={convertToCsv}>
        Load and convert json to csv
      </Button>
      {isConverted && <span id="converted-indicator">converted</span>}
    </div>
  );
};

export default LeaderBoards;
