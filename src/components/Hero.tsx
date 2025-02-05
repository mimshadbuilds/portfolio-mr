export default function Hero() {
  return (
    <section id="home" className="bg-sky-950 text-white py-20 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 text-center text-white md:text-left">
          <h1 className="text-4xl font-bold mb-4">Engr. Md. Mimshadur Rahman</h1>
          <p className="text-xl mb-6">Full-Stack Developer | React & Django Specialist</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://github.com/mimsha7" className="bg-black text-white hover:bg-white hover:text-black px-6 py-2 rounded-lg custom-hover">GitHub</a>
            <a href="https://linkedin.com/in/mimshad7" className="bg-blue-600 text-white hover:bg-blue-900 px-6 py-2 rounded-lg">LinkedIn</a>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="/assets/images/IMG_1.jpeg"
            alt="Md. Mimshadur Rahman"
            className="rounded-full w-64 h-64 object-cover border-4 border-blue-500"
          />
        </div>
      </div>
    </section>
  );
}