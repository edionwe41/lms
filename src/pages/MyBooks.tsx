import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, User, LogOut, Calendar } from "lucide-react";

const mockBorrowedBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    dueDate: "2025-12-15",
    daysLeft: 5,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    dueDate: "2025-12-20",
    daysLeft: 10,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    dueDate: "2025-12-10",
    daysLeft: 0,
    overdue: true,
  },
];

const mockHistory = [
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    borrowDate: "2025-10-01",
    returnDate: "2025-10-15",
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    borrowDate: "2025-09-15",
    returnDate: "2025-09-29",
  },
];

const MyBooks = () => {
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
            <Link to="/catalogue">
              <Button variant="ghost">Browse Books</Button>
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
          <h1 className="text-4xl font-bold mb-2 text-foreground">My Books</h1>
          <p className="text-muted-foreground">
            Manage your borrowed books and history
          </p>
        </div>

        <Tabs defaultValue="borrowed" className="space-y-6">
          <TabsList>
            <TabsTrigger value="borrowed">Currently Borrowed</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="borrowed" className="space-y-4">
            {mockBorrowedBooks.map((book) => (
              <Card key={book.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </div>
                    {book.overdue ? (
                      <Badge variant="destructive">Overdue</Badge>
                    ) : (
                      <Badge
                        variant={book.daysLeft <= 3 ? "secondary" : "default"}
                      >
                        {book.daysLeft} days left
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {book.dueDate}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Renew
                      </Button>
                      <Button size="sm">Return</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {mockHistory.map((book) => (
              <Card key={book.id}>
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Borrowed: {book.borrowDate}</span>
                    <span>Returned: {book.returnDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyBooks;
