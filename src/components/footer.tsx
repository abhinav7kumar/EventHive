import { Ticket, Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Ticket className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by EventSpotlight. The source of unforgettable events.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Twitter className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Instagram className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Instagram</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Facebook className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Facebook</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
