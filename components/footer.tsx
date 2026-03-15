'use client';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="container flex flex-col items-center justify-center mx-auto max-w-7xl gap-4 py-10 md:h-24 md:py-0">
      <p className="text-center text-sm leading-loose text-muted-foreground">
        © {new Date().getFullYear()} Stylo Bot. All rights reserved.
      </p>
      </div>
    </footer>
  );
};

export default Footer;
