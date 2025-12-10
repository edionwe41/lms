import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, User, LogOut } from "lucide-react";

const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    available: true,
    category: "Fiction",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    available: true,
    category: "Fiction",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    available: false,
    category: "Fiction",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    available: true,
    category: "Romance",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769174",
    available: true,
    category: "Fiction",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    available: false,
    category: "Fantasy",
  },
];

const Catalogue = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              LibraryMS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/my-books">
              <Button variant="ghost">My Books</Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            Book Catalogue
          </h1>
          <p className="text-muted-foreground">
            Browse and search through our collection
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <Badge variant={book.available ? "default" : "secondary"}>
                    {book.available ? "Available" : "Borrowed"}
                  </Badge>
                </div>
                <CardDescription>{book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    ISBN: {book.isbn}
                  </p>
                  <Badge variant="outline">{book.category}</Badge>
                </div>
                <Link to={`/book/${book.id}`}>
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalogue;
