import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, BookOpen } from "lucide-react";
import { books } from "@/data/books";

const ReadBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id);

  if (!book || !book.pdfUrl) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <BookOpen className="w-16 h-16 text-muted-foreground/50" />
        <h1 className="text-2xl font-display font-bold text-foreground">
          Book not available
        </h1>
        <p className="text-muted-foreground">
          This book doesn't have a PDF available yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="font-display text-base font-semibold text-foreground truncate">
                {book.title}
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                {book.author}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const a = document.createElement("a");
              a.href = book.pdfUrl!;
              a.download = book.title + ".pdf";
              a.click();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </header>

      {/* PDF Viewer */}
      <div className="flex-1">
        <iframe
          src={book.pdfUrl!}
          title={book.title}
          className="w-full h-[calc(100vh-3.5rem)] border-none"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default ReadBook;
