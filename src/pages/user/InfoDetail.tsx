import { useParams } from "react-router-dom";

const infoContent: Record<string, { title: string; content: string }> = {
  "free-shipping": {
    title: "Free Shipping",
    content: "We offer free shipping on all orders above ₹499. No hidden charges.",
  },
  "money-back": {
    title: "100% Money Back",
    content: "If you’re not satisfied with your purchase, get a full refund within 7 days.",
  },
  support: {
    title: "Support 24/7",
    content: "Our team is available 24/7 via live chat, email, or call to help you with any issues.",
  },
  "secure-payment": {
    title: "Payment Secure",
    content: "Your payments are encrypted and securely processed through trusted gateways.",
  },
  discount: {
    title: "Best Discounts",
    content: "Enjoy exciting deals and seasonal discounts across all categories.",
  },
};

const InfoDetail = () => {
  const { topic } = useParams();

  const info = topic ? infoContent[topic] : null;

  if (!info) {
    return <div className="text-center mt-10">Information not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{info.title}</h1>
      <p className="text-gray-700 text-lg">{info.content}</p>
    </div>
  );
};

export default InfoDetail;
