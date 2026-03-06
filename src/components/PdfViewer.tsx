import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface PdfViewerProps {
  url: string;
  title: string;
}

const PdfViewer = ({ url, title }: PdfViewerProps) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const pdfBlob = new Blob([blob], { type: "application/pdf" });
        setObjectUrl(URL.createObjectURL(pdfBlob));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      setObjectUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !objectUrl) {
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
    <div className="flex-1 h-[calc(100vh-3.5rem)]">
      <object
        data={objectUrl}
        type="application/pdf"
        className="w-full h-full"
      >
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="text-muted-foreground">
            Your browser doesn't support inline PDF viewing.
          </p>
          <a
            href={objectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium"
          >
            Open PDF
          </a>
        </div>
      </object>
    </div>
  );
};

export default PdfViewer;
