export default function Projects() {
  const projects = [
    {
      title: "Intelligent Tourism System",
      tech: "Python-Django, PostgreSQL",
      description: "Full-stack travel platform with admin panel.",
      link: "#",
      backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80)'
    },
    {
      title: "E-commerce Site",
      tech: "React.js, Firebase, Material UI",
      description: "Responsive online store with login/signup features.",
      link: "#",
      backgroundImage: 'url(https://i.ibb.co/JMZJcJH/eComm.jpg)'
    },
    {
      title: "Metro Rail Ticketing System",
      tech: "React.js, Google Maps API, Firebase",
      description: "Location tracking and local database integration",
      link: "#",
      backgroundImage: 'url(https://i.ibb.co/KzjGQMGM/Train-on-Bridge-Hero-Sunset-Teal-Sydney-Metro-6k-1.jpg)'
    },
  ];

  return (
    <section id="projects" className="py-16 px-4 bg-gray-200">
      <div className="container mx-auto">
        <h2 className="text-4xl text-black font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundImage: project.backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              <div className="relative z-10 p-6">
                <h3 className="text-xl text-white font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <p className="text-sm text-blue-300 mb-4">{project.tech}</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href={project.link}
                    className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 transition-colors"
                    style={{ color: 'white' }}>
                    Live Site
                  </a>
                  <a 
                    href={project.link}
                    className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 transition-colors"
                    style={{ color: 'white' }}>
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}