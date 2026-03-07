import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import AdBanner from "./AdBanner";

const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379";

interface PdfViewerProps {
  url: string;
  title: string;
}

const PdfViewer = ({ url, title }: PdfViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [renderedPages, setRenderedPages] = useState<string[]>([]);

  // Load PDF
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.arrayBuffer();
      })
      .then(async (data) => {
        if (cancelled) return;
        const pdfjsLib = await import(
          /* @vite-ignore */
          `${PDFJS_CDN}/pdf.min.mjs`
        );
        pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.mjs`;
        const doc = await pdfjsLib.getDocument({ data }).promise;
        if (cancelled) return;
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("PDF load error:", err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [url]);

  // Render all pages as images for smooth scrolling
  useEffect(() => {
    if (!pdfDoc) return;
    let cancelled = false;

    const renderAll = async () => {
      const pages: string[] = [];
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        if (cancelled) return;
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;
        pages.push(canvas.toDataURL("image/jpeg", 0.85));
      }
      if (!cancelled) setRenderedPages(pages);
    };

    renderAll();
    return () => { cancelled = true; };
  }, [pdfDoc]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] gap-4">
        <p className="text-muted-foreground">Failed to load PDF.</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium"
        >
          Open in new tab
        </a>
      </div>
    );
  }

  const showRendering = renderedPages.length === 0 && totalPages > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Page count bar */}
      <div className="flex items-center justify-center gap-4 py-2 bg-card border-b border-border">
        <span className="text-sm text-foreground font-medium">
          {showRendering
            ? "Rendering pages..."
            : `${totalPages} pages — Scroll to read`}
        </span>
      </div>

      {/* Scrollable pages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-muted/50"
      >
        <div className="max-w-3xl mx-auto py-4 px-4 space-y-4">
          {showRendering && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}

          {renderedPages.map((src, i) => (
            <div key={i}>
              <div className="relative">
                <img
                  src={src}
                  alt={`Page ${i + 1}`}
                  className="w-full shadow-lg rounded"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-3 text-xs bg-foreground/70 text-background px-2 py-0.5 rounded">
                  {i + 1} / {totalPages}
                </span>
              </div>

              {/* Insert ad every 5 pages */}
              {(i + 1) % 5 === 0 && i < renderedPages.length - 1 && (
                <div className="my-4">
                  <AdBanner variant="inline" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom ad */}
      <AdBanner variant="bottom" />
    </div>
  );
};

export default PdfViewer;
