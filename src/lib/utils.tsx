export function copySvgToClipboard(svgElement: SVGSVGElement): Promise<void> {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("width", "400");
  clone.setAttribute("height", "400");
  return navigator.clipboard.writeText(clone.outerHTML);
}

export function downloadAsPng(svgElement: SVGSVGElement, filename = "avataar.png"): void {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("width", "400");
  clone.setAttribute("height", "400");

  const blob = new Blob([clone.outerHTML], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    canvas.getContext("2d")?.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = filename;
    a.click();
  };

  img.src = url;
}