import { motion } from "framer-motion";
import { Home, Briefcase, User, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const products = [
  { icon: User, title: "Personal Loan", rate: "10.5%", amount: "Up to ₹25L", desc: "For medical, travel, wedding, or any personal need." },
  { icon: Briefcase, title: "Business Loan", rate: "12%", amount: "Up to ₹5Cr", desc: "Working capital, expansion, and equipment financing." },
  { icon: Home, title: "Home Loan", rate: "8.5%", amount: "Up to ₹10Cr", desc: "Purchase, construction, or renovation of property." },
  { icon: Building2, title: "Loan Against Property", rate: "9.5%", amount: "Up to ₹10Cr", desc: "Leverage your property for high-value funding." },
];

const LoanProducts = () => (
  <section id="loan-products" className="py-20 bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Loan Products</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          Find the Right Loan for You
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Transparent pricing, flexible tenures, and offers tailored to your profile across leading lenders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            className="p-6 rounded-2xl bg-card/90 border border-border/60 shadow-card hover:shadow-card-hover transition-all group cursor-pointer hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <p.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-card-foreground">{p.title}</h3>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    From {p.rate}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 mb-4">{p.desc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{p.amount}</span>
                  <span className="text-secondary-foreground font-medium">Fast approvals</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/eligibility">
          <Button size="lg" className="shadow-primary-glow">
            Check Your Eligibility <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default LoanProducts;
