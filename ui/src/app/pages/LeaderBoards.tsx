import { useCallback, useState } from 'react';
import Button from '../atoms/Button';
import { USING_WASM } from '../constants';
import { useInitWasmModule } from '../hooks/useInitWasmModule';
import { useJsonToCsv } from '../hooks/useJsonToCsv';
import { getLeaderBoards } from '../network/getLeaderBoards';
import { useAppSelector } from '../state/hooks';
import { WasmModule } from '../types/WasmModule';

const LeaderBoards = () => {
  const { initialized } = useAppSelector((state) => state.wasm);
  const [isConverted, setIsConverted] = useState(false);
  useInitWasmModule(WasmModule.jsonToCsv);
  const jsonToCsv = useJsonToCsv();

  const convertToCsv = useCallback(async () => {
    if (initialized.includes(WasmModule.jsonToCsv) || !USING_WASM) {
      const data = await getLeaderBoards();
      const csv = await jsonToCsv(data);
      setIsConverted(true);
    }
  }, [initialized, jsonToCsv]);

  return (
    <div>
      <Button id="convert-button" onClick={convertToCsv}>
        Load and convert json to csv
      </Button>
      {isConverted && <span id="loaded-indicator">loaded</span>}
    </div>
  );
};

export default LeaderBoards;
