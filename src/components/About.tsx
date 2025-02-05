export default function About() {
    return (
      <section id="about" className="py-16 px-4 bg-sky-950">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl text-white font-bold mb-8">About Me</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-300 mb-6">
              A passionate Full-Stack Developer with 3+ years of experience in building web applications.
              Specialized in React.js and Django development with strong interest in cloud security.
              Graduated with a Bachelor's degree in Computer Science & Engineering from Daffodil International University.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="bg-blue-100 text-black px-3 py-1 rounded-full text-sm">React.js</span>
              <span className="bg-blue-100 text-black px-3 py-1 rounded-full text-sm">Python/Django</span>
              <span className="bg-blue-100 text-black px-3 py-1 rounded-full text-sm">Firebase</span>
              <span className="bg-blue-100 text-black px-3 py-1 rounded-full text-sm">PostgreSQL</span>
            </div>
            <a 
              href="/resume.pdf"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>
    );
  }