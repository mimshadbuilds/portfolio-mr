import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Footer />
    </div>
  );
}

export default App;
