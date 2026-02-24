/**
 * Copies the avatar SVG to clipboard — strips the first <rect> if it is a
 * solid background added purely for preview purposes.
 */
export function copySvgToClipboard(svgElement: SVGSVGElement): Promise<void> {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("width", "400");
  clone.setAttribute("height", "400");

  // Remove the preview background rect (first child if it covers the full canvas)
  const firstChild = clone.firstElementChild;
  if (
    firstChild?.tagName === "rect" &&
    firstChild.getAttribute("width") === "100" &&
    firstChild.getAttribute("height") === "100"
  ) {
    clone.removeChild(firstChild);
  }

  return navigator.clipboard.writeText(clone.outerHTML);
}

/**
 * Renders the avatar (without preview background) and downloads it as PNG.
 */
export function downloadAsPng(svgElement: SVGSVGElement, filename = "avataar.png"): void {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("width", "400");
  clone.setAttribute("height", "400");

  // Remove preview background rect
  const firstChild = clone.firstElementChild;
  if (
    firstChild?.tagName === "rect" &&
    firstChild.getAttribute("width") === "100" &&
    firstChild.getAttribute("height") === "100"
  ) {
    clone.removeChild(firstChild);
  }

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