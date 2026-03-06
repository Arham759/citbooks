import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

// Load pdf.js from CDN
const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379";

function loadPdfJs(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).pdfjsLib) {
      resolve((window as any).pdfjsLib);
      return;
    }
    const script = document.createElement("script");
    script.src = `${PDFJS_CDN}/pdf.min.mjs`;
    script.type = "module";
    script.onload = () => resolve((window as any).pdfjsLib);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

interface PdfViewerProps {
  url: string;
  title: string;
}

const PdfViewer = ({ url, title }: PdfViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    // Fetch PDF as array buffer to avoid CORS issues with pdf.js
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.arrayBuffer();
      })
      .then(async (data) => {
        if (cancelled) return;
        // Dynamically import pdf.js as ES module
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

    return () => {
      cancelled = true;
    };
  }, [url]);

  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current || !containerRef.current) return;
      try {
        const p = await pdfDoc.getPage(pageNum);
        const containerWidth = containerRef.current.clientWidth - 32; // padding
        const unscaledViewport = p.getViewport({ scale: 1 });
        const scale = Math.min(containerWidth / unscaledViewport.width, 2.5);
        const viewport = p.getViewport({ scale });

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await p.render({ canvasContext: ctx, viewport }).promise;
      } catch (err) {
        console.error("Page render error:", err);
      }
    },
    [pdfDoc]
  );

  useEffect(() => {
    if (pdfDoc) renderPage(page);
  }, [page, renderPage, pdfDoc]);

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

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Page controls */}
      <div className="flex items-center justify-center gap-4 py-2 bg-card border-b border-border">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="p-1.5 rounded-full hover:bg-muted disabled:opacity-30 transition-colors text-foreground"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-foreground font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="p-1.5 rounded-full hover:bg-muted disabled:opacity-30 transition-colors text-foreground"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex justify-center bg-muted/50 p-4"
      >
        <canvas ref={canvasRef} className="shadow-lg max-w-full" />
      </div>
    </div>
  );
};

export default PdfViewer;
