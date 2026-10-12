import { lazy, Suspense } from "react";
import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import { usePortfolio } from "./context/PortfolioContext";
import { PortfolioProvider } from "./context/PortfolioProvider";

const AdminPanel = lazy(() => import("./components/AdminPanel"));

function PublicPortfolio() {
  const { error } = usePortfolio();

  return (
    <div className="min-h-screen">
      {error && (
        <div
          role="status"
          className="border-b border-amber-400/20 bg-amber-950/80 px-4 py-2 text-center text-xs text-amber-200"
        >
          Showing built-in content because saved portfolio data could not be
          loaded.
        </div>
      )}
      <Header />
      <Hero />
      <Projects />
      <Blogs />
      <About />
      <Footer />
    </div>
  );
}

function App() {
  const isAdminRoute = window.location.pathname.replace(/\/+$/, "") === "/admin";

  return (
    <PortfolioProvider>
      {isAdminRoute ? (
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-300">
              Loading admin panel…
            </div>
          }
        >
          <AdminPanel />
        </Suspense>
      ) : (
        <PublicPortfolio />
      )}
    </PortfolioProvider>
  );
}

export default App;
