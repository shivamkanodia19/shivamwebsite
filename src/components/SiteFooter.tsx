import { contactLinks } from "@/data/slides";

export function SiteFooter() {
  return (
    <footer
      id="site-contact"
      className="border-t border-[#1f1f1f] bg-[#0a0a0a] px-6 py-16 md:px-12"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-playfair text-[22px] text-[#e8e8e8]">Shivam Kanodia</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#555]">
            Texas A&M · ISE Honors
          </p>
        </div>
        <div className="flex flex-col gap-3 font-mono text-[12px] text-[#888]">
          <a
            href={`mailto:${contactLinks.email}`}
            className="w-fit transition-colors hover:text-[#fafaf8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888]"
          >
            {contactLinks.email}
          </a>
          <a
            href={contactLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit transition-colors hover:text-[#fafaf8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888]"
          >
            {contactLinks.linkedinLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
