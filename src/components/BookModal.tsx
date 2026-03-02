import { Book } from "@/data/books";
import { X, Download, BookOpen, FileText, Calendar, User } from "lucide-react";

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

const BookModal = ({ book, onClose }: BookModalProps) => {
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      style={{ animationDuration: "0.2s" }}
    >
      <div
        className="bg-card rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex-1 pr-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              {book.title}
            </h2>
            <p className="text-muted-foreground flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {book.author}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-foreground/80 leading-relaxed">{book.description}</p>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted rounded-lg p-3 text-center">
              <FileText className="w-5 h-5 mx-auto mb-1 text-accent" />
              <p className="text-sm font-medium text-foreground">{book.pages}</p>
              <p className="text-xs text-muted-foreground">Pages</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1 text-accent" />
              <p className="text-sm font-medium text-foreground">{book.year}</p>
              <p className="text-xs text-muted-foreground">Year</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-accent" />
              <p className="text-sm font-medium text-foreground">{book.category}</p>
              <p className="text-xs text-muted-foreground">Category</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => book.pdfUrl && window.open(book.pdfUrl, '_blank')}
              disabled={!book.pdfUrl}
              className={`flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-3 font-medium hover:opacity-90 transition-opacity ${!book.pdfUrl ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <BookOpen className="w-5 h-5" />
              Read PDF
            </button>
            <button
              onClick={() => {
                if (!book.pdfUrl) return;
                const a = document.createElement('a');
                a.href = book.pdfUrl;
                a.download = book.title + '.pdf';
                a.click();
              }}
              disabled={!book.pdfUrl}
              className={`flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground rounded-lg py-3 font-medium hover:opacity-90 transition-opacity ${!book.pdfUrl ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            PDF files are for educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
