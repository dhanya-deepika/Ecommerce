// src/components/ContactForm.tsx
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      form.current!,
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      alert('Message sent successfully!');
      form.current?.reset();
    })
    .catch((error) => {
      console.error(error);
      alert('Failed to send message. Try again.');
    });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4 max-w-md mx-auto">
      <input type="text" name="user_name" placeholder="Your Name" className="w-full border p-2" required />
      <input type="email" name="user_email" placeholder="Your Email" className="w-full border p-2" required />
      <textarea name="message" placeholder="Your Message" className="w-full border p-2" rows={4} required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send Message</button>
    </form>
  );
};

export default ContactForm;
