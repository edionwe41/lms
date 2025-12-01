import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  User,
  LogOut,
  ArrowLeft,
  Calendar,
  Building2,
} from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();

  // Mock data
  const book = {
    id: id,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    available: true,
    category: "Fiction",
    publisher: "Scribner",
    publishYear: "1925",
    pages: 180,
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    location: "Shelf A-23, Floor 2",
  };

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
              <Button variant="ghost">Catalogue</Button>
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
        <Link to="/catalogue">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalogue
          </Button>
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-3xl">{book.title}</CardTitle>
                  <Badge
                    variant={book.available ? "default" : "secondary"}
                    className="text-base px-4 py-1"
                  >
                    {book.available ? "Available" : "Borrowed"}
                  </Badge>
                </div>
                <CardDescription className="text-lg">
                  {book.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">
                    Description
                  </h3>
                  <p className="text-muted-foreground">{book.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ISBN</p>
                    <p className="font-medium text-foreground">{book.isbn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <Badge variant="outline">{book.category}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Publisher</p>
                    <p className="font-medium text-foreground">
                      {book.publisher}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium text-foreground">
                      {book.publishYear}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pages</p>
                    <p className="font-medium text-foreground">{book.pages}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">
                      {book.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {book.available ? (
                  <>
                    <Button className="w-full">Borrow Book</Button>
                    <Button className="w-full" variant="outline">
                      Reserve Book
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full" disabled>
                      Currently Unavailable
                    </Button>
                    <Button className="w-full" variant="outline">
                      Join Waitlist
                    </Button>
                  </>
                )}
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Max loan: 14 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>Available at: Main Library</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
