import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className='bg-zinc-950 text-gray-400 w-full'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 sm:px-8 lg:px-12 py-12'>
      <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm">
            Unleash the power of technology with our platform, built to complement the field of Computer Science. Computer Science is integral to progress and problem-solving.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><Link href="/" className="text-sm hover:text-purple-400">Home</Link></li>
              <li><Link href="https://www.coursera.org/browse/computer-science" className="text-sm hover:text-purple-400">Courses</Link></li>
              {/* <li><Link href="/about" className="text-sm hover:text-purple-400">About</Link></li> */}
              <li><Link href="/contact" className="text-sm hover:text-purple-400">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul>
              <li><a href="https://x.com" target="_blank" className="hover:text-purple-400">X</a></li>
              <li><a href="https://facebook.com" target="_blank" className="hover:text-purple-400">Facebook</a></li>
              <li><a href="https://linkedin.com" target="_blank" className="hover:text-purple-400">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" className="hover:text-purple-400">GitHub</a></li>
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: <a href="mailto:proxyhacker1985@gmail.com" className="hover:text-purple-400">admin@ecs.com</a></p>
            <p className="text-sm">Phone: +91 9160111111</p>
          </div>
      </div>
      <div className="bg-black py-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Computer Science. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer