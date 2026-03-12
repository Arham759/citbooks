export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  cover: string;
  pages: number;
  year: number;
  pdfUrl?: string;
}

export const categories = [
  "All",
  "Programming",
  "Networking",
  "Database",
  "Web Development",
  "Cybersecurity",
  "Data Science",
  "Operating Systems",
] as const;

export type Category = (typeof categories)[number];

export const books: Book[] = [
  {
    id: "13",
    title: "MGM 211",
    author: "CIT Faculty",
    category: "Programming",
    description:
      "A curated collection of essential textbooks for Computer & Information Technology students.",
    cover: "",
    pages: 500,
    year: 2024,
    pdfUrl: "https://idczsfnlvpsiwgsdxjmr.supabase.co/storage/v1/object/public/cit-books-00/cit-mgm-211",
  },
  {
    id: "14",
    title: "Tarjama Tul Quran - Grade 12",
    author: "Ustad 360",
    category: "Operating Systems",
    description:
      "Tarjama Tul Quran textbook for Grade 12 students.",
    cover: "",
    pages: 200,
    year: 2023,
    pdfUrl: "https://idczsfnlvpsiwgsdxjmr.supabase.co/storage/v1/object/public/cit-books-00/(ustad360.com) Tarjama Tul Quran 12 02-06-23 Grade 12_Freeze.pdf",
  {
    id: "15",
    title: "Math Notes Paper A",
    author: "CIT Faculty",
    category: "Programming",
    description:
      "Mathematics notes and study materials for Paper A.",
    cover: "",
    pages: 150,
    year: 2024,
    pdfUrl: "https://idczsfnlvpsiwgsdxjmr.supabase.co/storage/v1/object/public/cit-books-00//MATH_NOTES_PAPER_A.pdf",
  },
];
