declare module "@/lib/utils" {
  export function cn(...inputs: any[]): string;
}

declare module "@/components/ui/button" {
  import * as React from "react";
  export const buttonVariants: (...args: any[]) => string;
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
  }
  export const Button: React.ForwardRefExoticComponent<any>;
}

declare module "@/components/ui/toaster" {
  export function Toaster(): JSX.Element;
}

declare module "@/components/ui/sonner" {
  export function Toaster(props: any): JSX.Element;
  export const toast: any;
}

declare module "@/components/ui/tooltip" {
  export const Tooltip: any;
  export const TooltipTrigger: any;
  export const TooltipContent: any;
  export const TooltipProvider: any;
}

declare module "@/components/ui/separator" {
  import * as React from "react";
  export const Separator: React.ForwardRefExoticComponent<any>;
}

// Page module declarations
declare module "@/pages/home" {
  const Home: React.ComponentType<any>;
  export default Home;
}

declare module "@/pages/login" {
  const Login: React.ComponentType<any>;
  export default Login;
}

declare module "@/pages/register" {
  const Register: React.ComponentType<any>;
  export default Register;
}

declare module "@/pages/dashboard" {
  const Dashboard: React.ComponentType<any>;
  export default Dashboard;
}

declare module "@/pages/catalogue" {
  const Catalogue: React.ComponentType<any>;
  export default Catalogue;
}

declare module "@/pages/bookdetails" {
  const BookDetails: React.ComponentType<any>;
  export default BookDetails;
}

declare module "@/pages/mybooks" {
  const MyBooks: React.ComponentType<any>;
  export default MyBooks;
}

declare module "@/pages/libariandashboard" {
  const LibrarianDashboard: React.ComponentType<any>;
  export default LibrarianDashboard;
}

declare module "@/pages/managebooks" {
  const ManageBooks: React.ComponentType<any>;
  export default ManageBooks;
}

declare module "@/pages/profie" {
  const Profile: React.ComponentType<any>;
  export default Profile;
}

declare module "@/pages/notfound" {
  const NotFound: React.ComponentType<any>;
  export default NotFound;
}
