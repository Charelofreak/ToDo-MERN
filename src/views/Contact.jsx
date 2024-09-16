import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Footer from '../conponents/Footer';
import Header from '../conponents/Header';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentMessage, setSentMessage] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      // Assuming you have a backend API to handle the email sending
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        setSentMessage('Your message has been sent successfully!');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSentMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
<>
<Header active={"contact"}></Header>
<div className="bg-gray-100 min-h-screen flex mt-12 justify-center items-center">
      <div ref={formRef} className="max-w-lg w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Contact Us</h1>
        {sentMessage && <p className="text-green-600 mb-4 text-center">{sentMessage}</p>}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  <Footer></Footer>
</>
  );
};

export default Contact;
