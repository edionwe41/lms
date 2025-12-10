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
  Users,
  LogOut,
  TrendingUp,
  AlertCircle,
  BookMarked,
} from "lucide-react";

const LibrarianDashboard = () => {
  const mockStats = {
    totalBooks: 1247,
    borrowed: 324,
    available: 923,
    overdue: 12,
    totalUsers: 456,
    activeLoans: 324,
  };

  const recentActivity = [
    {
      id: 1,
      user: "John Doe",
      action: "Borrowed",
      book: "The Great Gatsby",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Returned",
      book: "1984",
      time: "4 hours ago",
    },
    {
      id: 3,
      user: "Bob Johnson",
      action: "Reserved",
      book: "The Hobbit",
      time: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              LibraryMS - Librarian
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/manage-books">
              <Button variant="ghost">Manage Books</Button>
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
            Librarian Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage library operations and monitor activity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {mockStats.totalBooks}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockStats.available} available, {mockStats.borrowed} borrowed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {mockStats.totalUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockStats.activeLoans} active loans
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue Books
              </CardTitle>
              <AlertCircle className="h-5 w-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {mockStats.overdue}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest library transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex justify-between items-start border-b border-border pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {activity.user}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}: {activity.book}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common librarian tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/manage-books" className="block">
                <Button className="w-full" variant="outline">
                  <BookMarked className="mr-2 h-4 w-4" />
                  Manage Books
                </Button>
              </Link>
              <Button className="w-full" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View All Users
              </Button>
              <Button className="w-full" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Reports
              </Button>
              <Button className="w-full" variant="outline">
                <AlertCircle className="mr-2 h-4 w-4" />
                Manage Overdue Books
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LibrarianDashboard;
