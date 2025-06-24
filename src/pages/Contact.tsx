// src/pages/Contact.tsx

import React from "react";
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-black-700">Contact Us</h1>

      <form className="flex flex-col space-y-4 bg-white p-6 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 p-3 rounded outline-black-500"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-300 p-3 rounded outline-black-500"
          required
        />
        <textarea
          placeholder="Your Message"
          className="border border-gray-300 p-3 rounded outline-black-500"
          rows={5}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-black hover:bg-bl-700 text-white p-3 rounded font-semibold"
        >
          Send Message
        </button>
      </form>

      <div className="mt-8 text-gray-700 text-center">
        <p>📧 Email: support@Q-SHOP.com</p>
        <p>📞 Phone: +91 6302621489 </p>
        <p>📍 Address: Bengaluru, India</p>
      

      </div>
    </div>
  );
};

export default Contact;
