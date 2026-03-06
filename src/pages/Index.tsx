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
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    if (!readingBook?.pdfUrl) return;
    setPdfLoading(true);
    setPdfError(false);
    let cancelled = false;

    fetch(readingBook.pdfUrl)
      .then((res) => res.blob())
      .then((blob) => {
        if (cancelled) return;
        setBlobUrl(URL.createObjectURL(blob));
        setPdfLoading(false);
      })
      .catch(() => {
        if (!cancelled) { setPdfError(true); setPdfLoading(false); }
      });

    return () => {
      cancelled = true;
      setBlobUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    };
  }, [readingBook]);

  const closeReader = () => {
    setReadingBook(null);
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    setBlobUrl(null);
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

        <div className="flex-1">
          {pdfLoading && (
            <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          {pdfError && (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] gap-4">
              <p className="text-muted-foreground">Failed to load PDF.</p>
              <a
                href={readingBook.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium"
              >
                Open in new tab
              </a>
            </div>
          )}
          {blobUrl && (
            <iframe
              src={blobUrl}
              title={readingBook.title}
              className="w-full h-[calc(100vh-3.5rem)] border-none"
              allow="fullscreen"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Library className="w-7 h-7 text-accent" />
            <span className="font-display text-xl font-bold text-foreground">
              CIT Library
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>{books.length} Books Available</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            CIT Book Collection
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Browse and access PDF textbooks for Computer & Information Technology courses — all in one place.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow text-base"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground border border-border hover:border-accent hover:text-foreground"
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
