import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth, roleToPath } from "@/store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    // Simulate async login (replace with real API call)
    setTimeout(() => {
      login(email, password);
      toast.success("Welcome back!", { description: "You've been signed in." });
      // Navigate based on role derived in the store
      const role = email.includes("admin")
        ? "admin"
        : email.includes("dsa") || email.includes("partner")
          ? "dsa"
          : email.includes("lender")
            ? "lender"
            : "customer";
      navigate(roleToPath(role), { replace: true });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-secondary-foreground">
              Quick Fund<span className="text-primary">x</span>
            </span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-secondary-foreground">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to your account
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-card/90 border border-border/60 rounded-2xl p-8 shadow-card-hover space-y-5 backdrop-blur"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                aria-label={showPw ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full shadow-primary-glow h-11"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
            Demo: Use <strong>admin@</strong>, <strong>dsa@</strong>,{" "}
            <strong>lender@</strong>, or any email to access different dashboards.
            Any password ≥ 6 chars works.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
