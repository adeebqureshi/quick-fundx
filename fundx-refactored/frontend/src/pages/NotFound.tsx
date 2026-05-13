import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen bg-slate-50 px-6 py-12">
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">404</p>
      <h1 className="mt-4 text-4xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mt-4 text-sm text-slate-600">The page you are looking for does not exist or has been moved.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
      >
        Back to home
      </Link>
    </div>
  </div>
);

export default NotFound;
