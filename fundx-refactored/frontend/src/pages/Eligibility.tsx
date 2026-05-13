import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/store/authStore";
import type { LoanProduct, EligibilityResponse } from "@/types";

const Eligibility = () => {
  const navigate = useNavigate();
  const { isAuthenticated, accessToken } = useAuth();
  const [products, setProducts] = useState<LoanProduct[]>([]);
  const [loanProductId, setLoanProductId] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [tenureMonths, setTenureMonths] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [cibilScore, setCibilScore] = useState("");
  const [result, setResult] = useState<EligibilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    apiFetch<LoanProduct[]>("/loans/products", {
      authToken: accessToken ?? undefined,
    })
      .then(setProducts)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load products"));
  }, [accessToken, isAuthenticated]);

  const selectedLoanProduct = useMemo(
    () => products.find((product) => product.id === loanProductId),
    [loanProductId, products],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const body = await apiFetch<EligibilityResponse>("/loans/eligibility", {
        method: "POST",
        authToken: accessToken ?? undefined,
        body: {
          loan_product_id: loanProductId,
          requested_amount: Number(requestedAmount),
          tenure_months: Number(tenureMonths),
          monthly_income: Number(monthlyIncome),
          cibil_score: cibilScore ? Number(cibilScore) : undefined,
        },
      });
      setResult(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check eligibility");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Loan Eligibility Checker</h1>
        <p className="mt-2 text-sm text-slate-600">
          {isAuthenticated
            ? "Choose a product and submit your details to get a quick eligibility score."
            : "Please login to use the eligibility checker."}
        </p>

        {!isAuthenticated ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
            <p className="text-sm">You must be logged in to access this service.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Loan product</span>
                <select
                  value={loanProductId}
                  onChange={(event) => setLoanProductId(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Requested amount (₹)</span>
                <input
                  type="number"
                  min="1"
                  value={requestedAmount}
                  onChange={(event) => setRequestedAmount(event.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Tenure (months)</span>
                <input
                  type="number"
                  min="1"
                  value={tenureMonths}
                  onChange={(event) => setTenureMonths(event.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Monthly income (₹)</span>
                <input
                  type="number"
                  min="1"
                  value={monthlyIncome}
                  onChange={(event) => setMonthlyIncome(event.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">CIBIL score (optional)</span>
              <input
                type="number"
                min="300"
                max="900"
                value={cibilScore}
                onChange={(event) => setCibilScore(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
              disabled={loading}
            >
              {loading ? "Checking..." : "Check Eligibility"}
            </button>
          </form>
        )}

        {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

        {result && (
          <div className="mt-8 rounded-3xl border border-sky-200 bg-sky-50 p-6 text-slate-900 shadow-sm">
            <p className="font-semibold">Eligibility result</p>
            <p className="mt-3 text-sm">Eligible: {result.eligible ? "Yes" : "No"}</p>
            <p className="mt-2 text-sm">Score: {result.score.toFixed(1)}</p>
            <p className="mt-2 text-sm">Recommended tenure: {result.suggested_tenure_months ?? "N/A"} months</p>
            {result.reasons.length > 0 && (
              <div className="mt-4 text-sm text-slate-700">
                <p className="font-medium">Reasons</p>
                <ul className="list-disc space-y-1 pl-5">
                  {result.reasons.map((reason) => (
                    <li key={reason}>{reason.replaceAll("_", " ")}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Eligibility;
