import { Book } from "@/data/books";
import { X, Download, BookOpen, FileText, Calendar, User } from "lucide-react";

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
  onRead?: (book: Book) => void;
}

const BookModal = ({ book, onClose, onRead }: BookModalProps) => {
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      style={{ animationDuration: "0.2s" }}
    >
      <div
        className="relative bg-gradient-card rounded-2xl shadow-elegant max-w-lg w-full max-h-[90vh] overflow-y-auto border border-border opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-accent rounded-t-2xl" />

        <div className="flex items-start justify-between p-6 pb-5 border-b border-border">
          <div className="flex-1 pr-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1.5 leading-tight">
              {book.title}
            </h2>
            <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <User className="w-4 h-4" />
              {book.author}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-all text-muted-foreground hover:text-foreground hover:rotate-90 duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-foreground/80 leading-relaxed">{book.description}</p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: FileText, value: book.pages, label: "Pages" },
              { icon: Calendar, value: book.year, label: "Year" },
              { icon: BookOpen, value: book.category, label: "Category" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-muted/60 border border-border/60 rounded-xl p-3 text-center hover:border-accent/40 hover:bg-muted transition-colors"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-1.5 text-accent" />
                <p className="text-sm font-semibold text-foreground truncate">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onRead?.(book)}
              disabled={!book.pdfUrl}
              className={`flex-1 flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground rounded-xl py-3 font-medium shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-0.5 ${!book.pdfUrl ? "opacity-50 cursor-not-allowed hover:translate-y-0" : ""}`}
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
              className={`flex-1 flex items-center justify-center gap-2 bg-gradient-accent text-accent-foreground rounded-xl py-3 font-medium shadow-soft hover:shadow-glow transition-smooth hover:-translate-y-0.5 ${!book.pdfUrl ? "opacity-50 cursor-not-allowed hover:translate-y-0" : ""}`}
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
