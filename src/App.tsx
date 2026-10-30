import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectDetail from "./components/ProjectDetail";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Skills from "./components/Skills";
import { usePortfolio } from "./context/PortfolioContext";
import { PortfolioProvider } from "./context/PortfolioProvider";

const AdminPanel = lazy(() => import("./components/AdminPanel"));

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

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
      <Skills />
      <Blogs />
      <About />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route
            path="/admin"
            element={
              <Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-300">
                    Loading admin panel…
                  </div>
                }
              >
                <AdminPanel />
              </Suspense>
            }
          />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<PublicPortfolio />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
