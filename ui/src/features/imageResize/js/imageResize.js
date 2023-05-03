export const resizeImage = async (url, nwidth, nheight) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onerror = function () {
      URL.revokeObjectURL(this.src);
    };
    img.onload = function () {
      URL.revokeObjectURL(this.src);
      const ratio = this.width / this.height;
      const nratio = nwidth / nheight;
      const canvas = document.createElement('canvas');
      canvas.width = nwidth;
      canvas.height = nheight;
      const ctx = canvas.getContext('2d');
      const rect = this.height > this.width ? this.width : this.height;
      if (nratio < ratio) {
        const nw = (this.width / ratio) * nratio;
        ctx.drawImage(img, (this.width - nw) / 2, 0, rect, rect, 0, 0, nwidth, nheight);
      } else {
        const nh = (this.height * ratio) / nratio;
        ctx.drawImage(img, 0, (this.height - nh) / 2, rect, rect, 0, 0, nwidth, nheight);
      }

      const resultUrl = canvas.toDataURL('image/jpeg', 1.0);

      resolve(resultUrl.replace(/^data:([^;]+);base64,/gim, ''));
    };
  });
};
