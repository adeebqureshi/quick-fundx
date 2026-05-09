import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // In production, replace with a proper logger
    if (import.meta.env.DEV) {
      console.warn(
        "404 — attempted route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-hero gap-6 p-4">
      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
        <Zap className="w-6 h-6 text-primary-foreground" />
      </div>
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-secondary-foreground mb-2">
          404
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          This page doesn't exist.
        </p>
        <Link to="/">
          <Button className="shadow-primary-glow">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
