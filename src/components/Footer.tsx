const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Shivam Kanodia. All rights reserved.
        </p>
        <p className="text-sm text-primary-foreground/70 mt-2">
          Built with passion for engineering and innovation
        </p>
      </div>
    </footer>
  );
};

export default Footer;
