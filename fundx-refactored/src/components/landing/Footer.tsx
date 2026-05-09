import { Zap } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-secondary py-14 border-t border-sidebar-border/80">
    <div className="container mx-auto px-4">
      <div className="mb-12">
        <div className="text-center mb-8">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Reach Out</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-foreground mt-2">
            Reach Out to Us
          </h2>
        </div>
        <div className="bg-card/90 border border-sidebar-border/70 rounded-3xl p-6 md:p-10 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border/60 p-5 bg-background">
              <h3 className="font-display text-base font-semibold text-card-foreground">Email</h3>
              <p className="text-sm text-muted-foreground mt-2">support@example.com</p>
              <p className="text-sm text-muted-foreground">partner@example.com</p>
            </div>
            <div className="rounded-2xl border border-border/60 p-5 bg-background">
              <h3 className="font-display text-base font-semibold text-card-foreground">Phone</h3>
              <p className="text-sm text-muted-foreground mt-2">+91-XXXXXXXXXX</p>
              <p className="text-sm text-muted-foreground">+91-XXXXXXXXXX</p>
            </div>
            <div className="rounded-2xl border border-border/60 p-5 bg-background">
              <h3 className="font-display text-base font-semibold text-card-foreground">Office</h3>
              <p className="text-sm text-muted-foreground mt-2">Your office name</p>
              <p className="text-sm text-muted-foreground">Street address, City</p>
              <p className="text-sm text-muted-foreground">State, ZIP</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-secondary-foreground">
              Quick Fund<span className="text-primary">x</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            India's fastest & reliable loan distribution platform for DSAs and borrowers.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            Trusted by 50+ lenders nationwide
          </div>
        </div>
        {[
          { title: "Products", links: ["Personal Loan", "Business Loan", "Home Loan", "Loan Against Property"] },
          { title: "Company", links: ["About Us", "How It Works", "Pricing", "Blog"] },
          { title: "Support", links: ["Contact", "FAQs", "Privacy Policy", "Terms of Service"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-semibold text-secondary-foreground mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-sidebar-border/80 pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Quick Fundx. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
