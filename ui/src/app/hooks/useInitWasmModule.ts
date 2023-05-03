import { useEffect } from 'react';
import { USING_WASM } from '../constants';
import { useAppDispatch } from '../state/hooks';
import store from '../store';
import { WasmModule } from '../types/WasmModule';
import { initWasmModule } from '../utils/initWasmModule';

export const useInitWasmModule = (name: WasmModule) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (store.getState().wasm.initialized.includes(name) || !USING_WASM) return;
      await dispatch(initWasmModule(name));
    })();
  }, [name, dispatch]);
};
