import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center w-full">
      <div className="w-full text-center space-y-12 px-6 md:px-12">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent py-12">
          IDDEAS
        </h1>
        
        {/** Section Components */}
        {[
          { title: "Who We Are", color: "text-blue-400", gradient: "from-gray-800 to-gray-900", content: "IDDEAS specializes in manufacturing, maintenance, and overhaul of Loco engine parts for Indian Railways and Namma Metro. We are committed to delivering high-quality, durable, and technologically advanced components that power India’s railway and metro systems." },
          { title: "Our Mission & Vision", color: "text-purple-400", gradient: "from-purple-900 to-gray-900", content: "We aim to revolutionize industrial manufacturing and railway engineering by pushing the boundaries of innovation, efficiency, and sustainability. Our mission is to modernize railway infrastructure through high-quality component production and smart maintenance solutions." },
          { title: "Private Sector & Technology Collaborations", color: "text-yellow-400", gradient: "from-yellow-700 to-gray-900", content: "Beyond government contracts, we work with private companies to develop solutions across electronic and software domains." },
          { title: "Founder & CEO", color: "text-red-400", gradient: "from-gray-800 to-gray-900" , content: "Led by Shivansh Rai, a visionary entrepreneur in industrial automation and railway engineering, IDDEAS is shaping the future of locomotive and metro infrastructure." },
          { title: "Manufacturing & Engineering Capabilities", color: "text-green-400", gradient: "from-gray-800 to-gray-900", img: "/manufacturing.jpg", img1:"/loco-engine.jpg", content: "Our manufacturing division is equipped with cutting-edge machinery, CNC technology, and automated production lines to deliver high-precision components." },
          { title: "Our Headquarters", color: "text-cyan-400", gradient: "from-cyan-700 to-gray-900", content: "Office Location: D25, Manyata Tech Park, Nagawara, Yelahanka, Bengaluru - 580036." }
        ].map((section, index) => (
          <section key={index} className={`w-full bg-gradient-to-r ${section.gradient} py-16 px-6 md:px-24 rounded-2xl shadow-lg flex flex-col items-center text-center` }>
            <h2 className={`text-4xl font-semibold ${section.color}`}>{section.title}</h2>
            <div className='md:flex md:gap-6'>
              {section.img && <Image src={section.img1} alt={section.title} width={500} height={400} className="rounded-lg mt-4" />}
              {section.img && <Image src={section.img} alt={section.title} width={500} height={400} className="rounded-lg mt-4" />}
            </div>
            <p className="text-gray-300 mt-6 text-lg max-w-4xl">{section.content}</p>
          </section>
        ))}
        
        <p className="text-gray-400 text-md mt-12 pb-12">
          🚀 We are working on a full-fledged website. Until then, for inquiries, reach out at: 
          <a href="mailto:founder@iddeas.site" className="text-blue-400 hover:text-blue-500"> founder@iddeas.site</a>
        </p>
      </div>
    </div>
  );
}
