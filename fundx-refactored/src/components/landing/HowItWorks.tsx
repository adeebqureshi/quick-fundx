import { motion } from "framer-motion";
import { FileText, Calculator, GitCompare, CheckCircle } from "lucide-react";

const steps = [
  { icon: FileText, title: "Apply in Minutes", desc: "Fill a simple form with your details and loan requirements." },
  { icon: Calculator, title: "Instant Pre-Scoring", desc: "Our system instantly evaluates your eligibility across 50+ lenders." },
  { icon: GitCompare, title: "Compare Offers", desc: "See personalized offers ranked by approval probability & rates." },
  { icon: CheckCircle, title: "Get Funded", desc: "Choose your best offer and get funds disbursed quickly." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">How It Works</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          Four Simple Steps to Your Loan
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          A streamlined digital flow designed for faster approvals, transparent offers, and a smooth disbursal experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            className="relative p-6 rounded-2xl bg-card/90 border border-border/60 shadow-card hover:shadow-card-hover transition-all group hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="absolute top-4 right-4 text-5xl font-display font-bold text-muted/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
