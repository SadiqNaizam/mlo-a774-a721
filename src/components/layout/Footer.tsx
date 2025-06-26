import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-2 text-primary-foreground">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">DelishDash</span>
            </Link>
            <p className="text-sm">Your favorite food, delivered fast.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-2 gap-8">
              <div>
                  <h3 className="font-semibold text-foreground mb-4">Company</h3>
                  <nav className="flex flex-col gap-2">
                      <Link to="#" className="hover:text-primary">About Us</Link>
                      <Link to="#" className="hover:text-primary">Careers</Link>
                      <Link to="#" className="hover:text-primary">Press</Link>
                  </nav>
              </div>
              <div>
                  <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                  <nav className="flex flex-col gap-2">
                      <Link to="#" className="hover:text-primary">Terms of Service</Link>
                      <Link to="#" className="hover:text-primary">Privacy Policy</Link>
                      <Link to="#" className="hover:text-primary">FAQ</Link>
                  </nav>
              </div>
              <div>
                  <h3 className="font-semibold text-foreground mb-4">Support</h3>
                  <nav className="flex flex-col gap-2">
                      <Link to="#" className="hover:text-primary">Contact Us</Link>
                      <Link to="#" className="hover:text-primary">Help Center</Link>
                  </nav>
              </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <h3 className="font-semibold text-foreground">Follow Us</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {currentYear} DelishDash. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;