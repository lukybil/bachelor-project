import { useCallback } from 'react';
import { resizeImage } from 'src/features/imageResize/js/imageResize';
import { resize_image } from 'src/features/imageResize/wasm/resize_image';
import { USING_WASM } from '../constants';
import { postMeasurement } from '../network/postMeasurement';
import { useAppSelector } from '../state/hooks';
import { WasmModule } from '../types/WasmModule';

export const useResizeImage = () => {
  const { initialized } = useAppSelector((state) => state.wasm);
  return useCallback(
    async (url: string, width: number, height: number, fileSize: number): Promise<string> => {
      const isWasm = USING_WASM;
      if (isWasm && !initialized.includes(WasmModule.imageResize))
        throw new Error('image resize module not initialised');
      window.performance.mark('start');
      let image: string;
      if (isWasm) {
        image = 'data:image/jpeg;base64,'.concat(resize_image(url, width, height));
      }
      image = 'data:image/jpeg;base64,'.concat(await resizeImage(url, width, height));

      const measurement = window.performance.measure(WasmModule.imageResize, 'start');
      postMeasurement({
        feature: WasmModule.imageResize,
        isWasm,
        time: measurement.duration,
        timestamp: new Date(),
        size: fileSize,
      });

      return image;
    },
    [initialized]
  );
};
