import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  User,
  LogOut,
  Mail,
  Calendar,
  BookMarked,
} from "lucide-react";

const Profile = () => {
  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    userType: "Student",
    joinDate: "January 15, 2024",
    booksAllowed: 10,
    currentlyBorrowed: 3,
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
              <Button variant="ghost">Browse Books</Button>
            </Link>
            <Link to="/my-books">
              <Button variant="ghost">My Books</Button>
            </Link>
            <Button variant="outline" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {mockUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-foreground">
                {mockUser.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {mockUser.userType}
              </p>
              <Separator className="my-4" />
              <div className="w-full space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {mockUser.joinDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookMarked className="h-4 w-4" />
                  <span>
                    {mockUser.currentlyBorrowed} / {mockUser.booksAllowed} books
                    borrowed
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={mockUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={mockUser.email}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex gap-3">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
