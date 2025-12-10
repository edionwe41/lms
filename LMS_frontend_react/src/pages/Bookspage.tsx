import React, { useEffect, useState } from "react";
import { getBooks } from "../services/booksApi";

interface Book {
  id: number;
  title: string;
}

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error loading books:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      {books.map((b) => (
        <p key={b.id}>{b.title}</p>
      ))}
    </div>
  );
};

export default BooksPage;
