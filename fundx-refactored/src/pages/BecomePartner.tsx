import { Link } from "react-router-dom";
import { BadgeCheck, Banknote, IdCard, Video, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    title: "Instant Loan Portal Access",
    icon: BadgeCheck,
  },
  {
    title: "Certified Loan Sales Training",
    icon: Video,
  },
  {
    title: "Competitive Commission Structure",
    icon: Banknote,
  },
  {
    title: "Authorized Partner Identity Card",
    icon: IdCard,
  },
];

const steps = [
  {
    title: "Apply Online",
    description: "Submit your partner application with basic details to get started quickly.",
  },
  {
    title: "Get Trained",
    description: "Attend live sessions and access training materials to master the process.",
  },
  {
    title: "Start Earning",
    description: "Begin submitting leads and track status directly from your partner login.",
  },
];

const BecomePartner = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-[72px]">
      <section className="bg-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur">
              Partner Program
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-secondary-foreground">
              Become a Partner
            </h1>
            <p className="text-muted-foreground text-lg mt-4">
              This is a unique DSA service program that helps you grow faster with live training, direct login access, and higher payouts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link to="/register?role=dsa">
                <Button size="lg" className="shadow-primary-glow text-base h-12 px-8">
                  Register Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-12 px-8 border-sidebar-border text-secondary-foreground hover:bg-sidebar-accent"
                >
                  Partner Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why Join Us</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Why Join Us
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              We provide the tools, training, and trust you need to succeed as a DSA partner.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card/90 border border-border/70 rounded-2xl p-6 shadow-card-hover backdrop-blur"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">How It Works</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Start Earning in 3 Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="bg-card rounded-2xl p-6 border border-border/70 shadow-card">
                <div className="text-sm font-semibold text-primary mb-2">Step {index + 1}</div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Reach Out</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Reach Out to Us
            </h2>
          </div>
          <div className="bg-card/90 border border-border/70 rounded-3xl p-6 md:p-10 shadow-card">
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
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-secondary/90 border border-sidebar-border rounded-3xl p-8 md:p-12 text-center shadow-card-hover">
            <h2 className="font-display text-3xl font-bold text-secondary-foreground">
              Ready to Become a Partner?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Join our partner network and get access to training, tools, and market-leading payouts.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/register?role=dsa">
                <Button size="lg" className="shadow-primary-glow text-base h-12 px-8">
                  Become a Partner
                </Button>
              </Link>
              <a href="#partner-contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-12 px-8 border-sidebar-border text-secondary-foreground hover:bg-sidebar-accent"
                >
                  Contact Support
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default BecomePartner;
