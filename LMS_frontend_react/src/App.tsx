import { Toaster } from "@/components/ui/toaster"; 
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Catalogue from "./pages/Catalogue";
import BookDetails from "./pages/BookDetails";
import BooksPage from "./pages/BooksPage";
import MyBooks from "./pages/MyBooks";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import ManageBooks from "./pages/ManageBooks";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/book/:id" element={<BookDetails />} />

          {/* 🔥 Your new backend-connected books page */}
          <Route path="/books" element={<BooksPage />} />

          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
          <Route path="/manage-books" element={<ManageBooks />} />
          <Route path="/profile" element={<Profile />} />

          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
