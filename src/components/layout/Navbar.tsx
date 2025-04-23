
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Features", path: "/#features" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "For Recruiters", path: "/#for-recruiters" },
    { name: "For Job Seekers", path: "/#for-job-seekers" },
    { name: "Pricing", path: "/#pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-jobaura-black/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">JA</span>
          </div>
          <span className="text-xl font-bold gradient-text">JobAura</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background flex flex-col pt-20 px-4 md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-800">
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="outline" className="w-full">Sign In</Button>
            </Link>
            <Link to="/signup" onClick={toggleMenu}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
