import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import { useAuth, roleToPath } from "@/store/authStore";

const roles = [
  {
    value: "customer",
    label: "Borrower",
    desc: "Apply for loans and track your applications",
  },
  {
    value: "dsa",
    label: "DSA Partner",
    desc: "Distribute loans and earn commissions",
  },
] as const;

type RegistrationRole = (typeof roles)[number]["value"];

const Register = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState<RegistrationRole>(
    (params.get("role") as RegistrationRole) ?? "customer"
  );
  const [name, setName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email address.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (role === "dsa") {
      if (!firmName.trim()) errs.firmName = "Firm name is required.";
      if (!mobile.trim()) errs.mobile = "Mobile number is required.";
      else if (!/^\d{10}$/.test(mobile))
        errs.mobile = "Enter a valid 10-digit mobile number.";
      if (!city.trim()) errs.city = "City is required.";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const user = await register({
        name,
        email,
        password,
        role: role === "dsa" ? "DSA" : "CUSTOMER",
        phone: mobile || undefined,
      });
      toast.success("Account created!", {
        description: "Welcome to Quick Fundx.",
      });
      navigate(roleToPath(user.role), { replace: true });
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Unable to create account." });
    } finally {
      setLoading(false);
    }
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
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Start your journey with Quick Fundx
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card/90 border border-border/60 rounded-2xl p-8 shadow-card-hover space-y-5 backdrop-blur"
        >
          {/* Role selector */}
          <div className="space-y-2">
            <Label>I am a</Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  type="button"
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    role === r.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="font-display text-sm font-semibold text-card-foreground">
                    {r.label}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {r.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* DSA-only fields */}
          {role === "dsa" && (
            <>
              <div className="space-y-1">
                <Label htmlFor="firmName">Firm Name</Label>
                <Input
                  id="firmName"
                  placeholder="Your firm or agency name"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                />
                {errors.firmName && (
                  <p className="text-xs text-destructive">{errors.firmName}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {errors.mobile && (
                  <p className="text-xs text-destructive">{errors.mobile}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && (
                  <p className="text-xs text-destructive">{errors.city}</p>
                )}
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          {errors.form && (
            <p className="text-sm text-destructive font-medium">{errors.form}</p>
          )}

          <Button
            type="submit"
            className="w-full shadow-primary-glow h-11"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create Account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
