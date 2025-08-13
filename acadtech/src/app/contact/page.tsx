'use client';
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission success
    setIsSubmitted(true);

    // You can later integrate with an email API or backend here
    console.log(formData);  // Logging form data (for testing purposes)
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <main className="min-h-screen bg-black/[0.96] py-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-t from-purple-50 to-purple-400 mb-6">Contact Us</h1>
        <p className="text-lg text-white mb-8">
          We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
        </p>

        {isSubmitted ? (
          <div className="bg-purple-600 text-white p-4 rounded-lg">
            <h2 className="text-lg">Thank you for contacting us!</h2>
            <p>We have received your message and will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white text-left">Your Name</label>
              <input
                type="text"
                id="name"
                placeholder='Pranav'
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 rounded-md bg-zinc-800 text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-left">Your Email</label>
              <input
                type="email"
                id="email"
                placeholder='pranav08@gmail.com'
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 rounded-md bg-zinc-800 text-white"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white text-left">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder='Hello, we love Computer Science'
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full p-3 mt-2 rounded-md bg-zinc-800 text-white"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-zinc-600 text-white rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default ContactPage;