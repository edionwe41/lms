import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Library,
  User,
  LogOut,
  Clock,
  BookMarked,
} from "lucide-react";

const Dashboard = () => {
  const mockStats = {
    borrowed: 3,
    available: 10,
    overdue: 0,
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
            <Link to="/catalogue">
              <Button variant="ghost">Browse Books</Button>
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
            Welcome, User
          </h1>
          <p className="text-muted-foreground">Here's your library overview</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Currently Borrowed
              </CardTitle>
              <BookMarked className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {mockStats.borrowed}
              </div>
              <p className="text-xs text-muted-foreground">Active loans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Available to Borrow
              </CardTitle>
              <Library className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {mockStats.available}
              </div>
              <p className="text-xs text-muted-foreground">Books remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue Items
              </CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {mockStats.overdue}
              </div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Borrowed</CardTitle>
              <CardDescription>Your latest book loans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-border pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        Book Title {i}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Author Name
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Due: Dec {20 + i}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>What would you like to do?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/catalogue" className="block">
                <Button className="w-full" variant="outline">
                  Browse Catalogue
                </Button>
              </Link>
              <Link to="/my-books" className="block">
                <Button className="w-full" variant="outline">
                  View My Books
                </Button>
              </Link>
              <Link to="/profile" className="block">
                <Button className="w-full" variant="outline">
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
