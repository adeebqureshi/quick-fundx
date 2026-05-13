import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await apiFetch("/auth/otp/send", { method: "POST", body: { phone } });
      setMessage("OTP sent to your phone. Use it to login.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const body = await apiFetch<{
        access_token: string;
        refresh_token: string;
        user: { id: string; phone: string; email: string | null; full_name: string; role: string; kyc_status: string; is_verified: boolean };
      }>("/auth/otp/verify", {
        method: "POST",
        body: { phone, code },
      });
      login(body.user, body.access_token, body.refresh_token);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your phone and OTP to access your account.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">OTP Code</span>
            <input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>

          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            disabled={loading || !phone}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Verify OTP & Login"}
          </button>

          {message && <p className="text-sm text-red-600">{message}</p>}
        </form>
        <p className="mt-6 text-sm text-slate-600">
          New here? <Link className="font-semibold text-sky-600 hover:text-sky-700" to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
