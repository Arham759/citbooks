import { Book } from "@/data/books";
import { BookOpen, FileText, Calendar } from "lucide-react";

interface BookCardProps {
  book: Book;
  onView: (book: Book) => void;
  index: number;
}

const categoryColors: Record<string, string> = {
  Programming: "bg-blue-100 text-blue-800",
  Networking: "bg-green-100 text-green-800",
  Database: "bg-purple-100 text-purple-800",
  "Web Development": "bg-orange-100 text-orange-800",
  Cybersecurity: "bg-red-100 text-red-800",
  "Data Science": "bg-teal-100 text-teal-800",
  "Operating Systems": "bg-indigo-100 text-indigo-800",
};

const categoryIcons: Record<string, string> = {
  Programming: "📘",
  Networking: "🌐",
  Database: "🗄️",
  "Web Development": "💻",
  Cybersecurity: "🔐",
  "Data Science": "📊",
  "Operating Systems": "⚙️",
};

const BookCard = ({ book, onView, index }: BookCardProps) => {
  return (
    <div
      className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => onView(book)}
    >
      {/* Cover area */}
      <div className="h-48 bg-primary/5 flex items-center justify-center relative overflow-hidden">
        <span className="text-6xl">{categoryIcons[book.category] || "📖"}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <span
          className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${
            categoryColors[book.category] || "bg-muted text-muted-foreground"
          }`}
        >
          {book.category}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight mb-1 line-clamp-2 group-hover:text-accent transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {book.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            {book.pages} pages
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {book.year}
          </span>
          <span className="flex items-center gap-1 text-accent font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            Read
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
