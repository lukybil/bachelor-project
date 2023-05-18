import { useCallback } from 'react';
import { jsonToCsv } from 'src/features/jsonToCsv/js/jsonToCsv';
import { json_to_csv } from 'src/features/jsonToCsv/wasm/wasm_csv_json';
import { USING_WASM } from '../constants';
import { postMeasurement } from '../network/postMeasurement';
import { useAppSelector } from '../state/hooks';
import { WasmModule } from '../types/WasmModule';

export const useJsonToCsv = () => {
  const { initialized } = useAppSelector((state) => state.wasm);
  return useCallback(
    async (data: any): Promise<string> => {
      const isWasm = USING_WASM;
      if (isWasm && !initialized.includes(WasmModule.jsonToCsv)) throw new Error('json to csv module not initialised');
      window.performance.mark('start');
      let csv = '';
      if (isWasm) {
        csv = json_to_csv(data);
      } else {
        csv = jsonToCsv(data);
      }

      const measurement = window.performance.measure(WasmModule.jsonToCsv, 'start');
      postMeasurement({
        feature: WasmModule.jsonToCsv,
        isWasm,
        time: measurement.duration,
        timestamp: new Date(),
        size: data.length,
      });

      return csv;
    },
    [initialized]
  );
};
