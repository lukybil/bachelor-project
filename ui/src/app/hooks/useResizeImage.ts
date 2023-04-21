import { useCallback } from 'react';
import { resizeImage } from 'src/features/imageResize/js/imageResize';
import { resize_image } from 'src/features/imageResize/wasm/resize_image';
import { USING_WASM } from '../constants';
import { useAppSelector } from '../state/hooks';

export const useResizeImage = () => {
  const { initialized } = useAppSelector((state) => state.wasm);
  return useCallback(
    async (url: string, width: number, height: number): Promise<string> => {
      if (USING_WASM && initialized) {
        return 'data:image/jpeg;base64'.concat(
          resize_image(url, width, height)
        );
      } else
        return (
          await resizeImage(url, {
            maxWidth: width,
            maxHeight: height,
            contentType: 'image/jpeg',
            quality: 1,
          })
        ).url;
    },
    [initialized]
  );
};
