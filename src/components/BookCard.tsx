import { Book } from "@/data/books";
import { BookOpen, FileText, Calendar, ArrowUpRight } from "lucide-react";

interface BookCardProps {
  book: Book;
  onView: (book: Book) => void;
  index: number;
}

const categoryIcons: Record<string, string> = {
  Programming: "📘",
  Networking: "🌐",
  Database: "🗄️",
  "Web Development": "💻",
  Cybersecurity: "🔐",
  "Data Science": "📊",
  "Operating Systems": "⚙️",
  Quran: "📖",
};

const BookCard = ({ book, onView, index }: BookCardProps) => {
  return (
    <div
      className="group relative bg-gradient-card rounded-2xl border border-border overflow-hidden cursor-pointer opacity-0 animate-fade-in-up shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-2"
      style={{ animationDelay: `${index * 90}ms` }}
      onClick={() => onView(book)}
    >
      {/* Decorative glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/20 via-transparent to-primary/10" />

      {/* Cover area */}
      <div className="relative h-52 overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-grain opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
            {categoryIcons[book.category] || "📖"}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

        {/* Category chip */}
        <span className="absolute top-3 left-3 inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-md bg-background/80 text-foreground border border-border/60">
          {book.category}
        </span>

        {/* Arrow */}
        <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-md border border-border/60 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-accent" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight mb-1 line-clamp-2 group-hover:text-accent transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
        <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-2 mb-4">
          {book.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            {book.pages} pages
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {book.year}
          </span>
          <span className="flex items-center gap-1.5 text-accent font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Read
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
