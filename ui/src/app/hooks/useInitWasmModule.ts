import { useEffect } from 'react';
import { USING_WASM } from '../constants';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { WasmModule } from '../types/WasmModule';
import { initWasmModule } from '../utils/initWasmModule';

export const useInitWasmModule = (name: WasmModule) => {
  const { initialized } = useAppSelector((state) => state.wasm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (initialized.includes(name) || !USING_WASM) return;
      await dispatch(initWasmModule(name));
    })();
  }, [initialized, name, dispatch]);
};
