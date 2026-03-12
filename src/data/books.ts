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
];
