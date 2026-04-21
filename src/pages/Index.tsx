import { useState, useMemo } from "react";
import { Search, BookOpen, Library, ArrowLeft, Download } from "lucide-react";
import { books, categories, Category, Book } from "@/data/books";
import BookCard from "@/components/BookCard";
import BookModal from "@/components/BookModal";
import AdBanner from "@/components/AdBanner";
import PdfViewer from "@/components/PdfViewer";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);

  const closeReader = () => {
    setReadingBook(null);
  };

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || b.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  // If reading a book, show the PDF reader view
  if (readingBook) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={closeReader}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="font-display text-base font-semibold text-foreground truncate">
                  {readingBook.title}
                </h1>
                <p className="text-xs text-muted-foreground truncate">
                  {readingBook.author}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = readingBook.pdfUrl!;
                a.download = readingBook.title + ".pdf";
                a.click();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </header>

        <PdfViewer url={readingBook.pdfUrl!} title={readingBook.title} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-card/70 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-default">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full animate-glow-pulse" />
              <Library className="relative w-7 h-7 text-accent" />
            </div>
            <span className="font-display text-xl font-bold text-foreground tracking-tight">
              CIT Library
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5 rounded-full border border-border/60 bg-card/50">
            <BookOpen className="w-4 h-4 text-accent" />
            <span>{books.length} Books Available</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grain opacity-50" />
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-float" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative py-20 sm:py-28 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-accent/30 bg-accent/10 text-xs font-medium text-foreground backdrop-blur-sm opacity-0 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
              Curated for CIT Students
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight text-balance opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              The CIT{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-accent bg-clip-text text-transparent">Book Collection</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M0 4 Q 50 0, 100 4 T 200 4" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" opacity="0.6" />
                </svg>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              Browse and access PDF textbooks for Computer & Information Technology courses — all in one beautifully organized place.
            </p>

            <div className="relative max-w-xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="absolute inset-0 bg-gradient-accent rounded-2xl blur-xl opacity-30" />
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl bg-card/90 backdrop-blur-md border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent transition-all text-base shadow-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 -mt-2">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth opacity-0 animate-fade-in-up ${
                activeCategory === cat
                  ? "bg-gradient-primary text-primary-foreground shadow-elegant scale-105"
                  : "bg-card text-muted-foreground border border-border hover:border-accent hover:text-foreground hover:shadow-soft"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Book Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((book, i) => (
              <>
                <BookCard
                  key={book.id}
                  book={book}
                  onView={setSelectedBook}
                  index={i}
                />
                {i === 3 && (
                  <div key="ad-inline" className="sm:col-span-2">
                    <AdBanner variant="inline" />
                  </div>
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-lg text-muted-foreground">
              No books found. Try a different search or category.
            </p>
          </div>
        )}
      </section>

      <AdBanner variant="bottom" />

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 CIT Library — For educational purposes only</p>
      </footer>

      {/* Modal */}
      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onRead={(book) => { setSelectedBook(null); setReadingBook(book); }}
      />
    </div>
  );
};

export default Index;
