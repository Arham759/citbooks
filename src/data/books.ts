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
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Programming",
    description:
      "A comprehensive textbook covering a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels.",
    cover: "",
    pages: 1312,
    year: 2022,
  },
  {
    id: "2",
    title: "Computer Networking: A Top-Down Approach",
    author: "James Kurose & Keith Ross",
    category: "Networking",
    description:
      "Unique among networking textbooks with its top-down approach, beginning with the application layer and working down the protocol stack.",
    cover: "",
    pages: 864,
    year: 2021,
  },
  {
    id: "3",
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Database",
    description:
      "Provides comprehensive coverage of database system concepts and their applications in industry.",
    cover: "",
    pages: 1376,
    year: 2020,
  },
  {
    id: "4",
    title: "Learning Web Design",
    author: "Jennifer Niederst Robbins",
    category: "Web Development",
    description:
      "A beginner's guide to HTML, CSS, JavaScript, and web graphics. Perfect for students learning web technologies.",
    cover: "",
    pages: 808,
    year: 2023,
  },
  {
    id: "5",
    title: "The Web Application Hacker's Handbook",
    author: "Dafydd Stuttard & Marcus Pinto",
    category: "Cybersecurity",
    description:
      "Practical guide to discovering and exploiting security flaws in web applications.",
    cover: "",
    pages: 912,
    year: 2021,
  },
  {
    id: "6",
    title: "Python for Data Analysis",
    author: "Wes McKinney",
    category: "Data Science",
    description:
      "Instructions for manipulating, processing, cleaning, and crunching datasets in Python using pandas and NumPy.",
    cover: "",
    pages: 544,
    year: 2022,
  },
  {
    id: "7",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    category: "Operating Systems",
    description:
      "Covers key operating system concepts including process management, memory, storage, and protection.",
    cover: "",
    pages: 976,
    year: 2021,
  },
  {
    id: "8",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    description:
      "A handbook of agile software craftsmanship that teaches best practices for writing clean, maintainable code.",
    cover: "",
    pages: 464,
    year: 2020,
  },
  {
    id: "9",
    title: "JavaScript: The Definitive Guide",
    author: "David Flanagan",
    category: "Web Development",
    description:
      "Comprehensive guide to the JavaScript programming language and the browser-based APIs it works with.",
    cover: "",
    pages: 706,
    year: 2023,
  },
  {
    id: "10",
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    category: "Data Science",
    description:
      "Using Scikit-Learn, Keras, and TensorFlow — covers concepts, tools, and techniques to build intelligent systems.",
    cover: "",
    pages: 856,
    year: 2022,
  },
  {
    id: "11",
    title: "CCNA Certification Study Guide",
    author: "Todd Lammle",
    category: "Networking",
    description:
      "Complete preparation guide for the CCNA certification covering routing, switching, and network fundamentals.",
    cover: "",
    pages: 1104,
    year: 2023,
  },
  {
    id: "12",
    title: "Linux Command Line & Shell Scripting",
    author: "Richard Blum",
    category: "Operating Systems",
    description:
      "Comprehensive guide to Linux command-line operations and shell scripting for system administration.",
    cover: "",
    pages: 792,
    year: 2021,
  },
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
