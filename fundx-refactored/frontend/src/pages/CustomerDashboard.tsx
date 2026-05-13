import { useAuth } from "@/store/authStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface LoanApplicationSummary {
  id: string;
  application_number: string;
  requested_amount: string;
  status: string;
  created_at: string;
}

const CustomerDashboard = () => {
  const { user, accessToken, logout } = useAuth();
  const [applications, setApplications] = useState<LoanApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    apiFetch<LoanApplicationSummary[]>("/loans/applications", {
      authToken: accessToken,
    })
      .then(setApplications)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-sky-600">Customer dashboard</p>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Welcome back, {user?.full_name ?? "Customer"}</h1>
            <p className="mt-3 text-sm text-slate-600">View your open applications, eligibility history, and document status.</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            { title: "Applications", description: "Track all your loan applications.", href: "/dashboard" },
            { title: "Eligibility", description: "Run your loan eligibility score.", href: "/eligibility" },
            { title: "Documents", description: "Upload KYC documents securely.", href: "/" },
          ].map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-sky-300 hover:bg-white"
            >
              <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{card.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-sky-50 p-6 text-slate-900">
          <p className="font-medium">Your current status</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">KYC status</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{user?.kyc_status ?? "unknown"}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Verified</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{user?.is_verified ? "Yes" : "No"}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Role</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{user?.role ?? "customer"}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Recent applications</h2>
              <p className="mt-1 text-sm text-slate-500">Latest loan requests from your account.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {applications.length} applications
            </span>
          </div>

          {loading ? (
            <div className="mt-6 text-sm text-slate-500">Loading applications...</div>
          ) : error ? (
            <div className="mt-6 text-sm text-red-600">{error}</div>
          ) : applications.length === 0 ? (
            <div className="mt-6 text-sm text-slate-500">No applications found. Submit a loan request to get started.</div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Application #</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-4 font-mono text-slate-900">{application.application_number}</td>
                      <td className="px-4 py-4">₹{Number(application.requested_amount).toLocaleString()}</td>
                      <td className="px-4 py-4 text-slate-700">{application.status}</td>
                      <td className="px-4 py-4 text-slate-500">{new Date(application.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
