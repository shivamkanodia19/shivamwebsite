import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-bold">
              Shivam Kanodia
            </Link>
            <p className="text-primary-foreground/70 text-sm mt-2">
              Engineering Honors Student at Texas A&M University
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/projects" className="hover:text-primary-foreground transition-colors">Projects</Link>
              <Link to="/blog" className="hover:text-primary-foreground transition-colors">Blogs</Link>
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/shivamkanodia19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/shivamkanodia19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:shivamkanodia77@gmail.com?subject=Portfolio%20Inquiry"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Shivam Kanodia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
