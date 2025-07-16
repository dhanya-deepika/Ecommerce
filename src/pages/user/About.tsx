// src/pages/About.tsx

import React from "react";

const About = () => {
  return (
<div className="max-w-xl mx-auto px-4 py-10">
<h1 className="text-4xl font-bold mb-6 text-center text-black">About Q-SHOP</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to <strong>Q-SHOP</strong> — your trusted online shopping destination for fashion, electronics, accessories, and more!
      </p>
      <p className="text-gray-600 mb-4">
        Our mission is to provide a seamless, affordable, and enjoyable shopping experience for everyone. With a wide range of high-quality products and a user-friendly platform, we ensure that our customers always get the best value.
      </p>
      <p className="text-gray-600 mb-4">
        eKart started with a vision to bridge the gap between quality products and affordable pricing. Whether you're shopping for the latest gadgets or everyday fashion, we’ve got you covered.
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li>🚚 Fast & Reliable Delivery</li>
        <li>🔒 100% Secure Payments</li>
        <li>✅ Easy Returns & Customer Support</li>
      </ul>
    </div>
  );
};


export default About;
