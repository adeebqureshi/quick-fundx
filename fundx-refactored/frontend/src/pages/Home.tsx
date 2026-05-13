import { Link } from "react-router-dom";

const Home = () => (
  <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-sky-100 text-slate-900 px-6 py-12">
    <div className="mx-auto max-w-4xl rounded-3xl bg-white/90 p-10 shadow-xl ring-1 ring-slate-200">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-sky-600">QuickFundX</p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            The AI-powered loan marketplace for Indian borrowers and partners.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Check eligibility, share leads, and manage loans with secure KYC workflows backed by FastAPI and PostgreSQL.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-sky-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-2xl ring-1 ring-white/10">
          <h2 className="text-xl font-semibold">Launch checklist</h2>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
            <li>✔ Customer registration with OTP login</li>
            <li>✔ Eligibility scoring API connection</li>
            <li>✔ Role-based protected dashboard</li>
            <li>✔ Production-ready FastAPI backend</li>
          </ul>
        </div>
      </div>
    </div>
  </main>
);

export default Home;
