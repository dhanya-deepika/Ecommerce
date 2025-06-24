import {
  FaShippingFast,
  FaMoneyBillWave,
  FaLock,
  FaTag,
  FaHeadset,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const InfoSection = () => {
  const navigate = useNavigate();

  const infoItems = [
    {
      key: "free-shipping",
      icon: <FaShippingFast className="text-3xl text-red-600" />,
      title: "Free Shipping",
      description: "Get your orders delivered with no extra cost",
    },
    {
      key: "money-back",
      icon: <FaMoneyBillWave className="text-3xl text-red-600" />,
      title: "100% Money Back",
      description: "Full refund if you are not satisfied",
    },
    {
      key: "support",
      icon: <FaHeadset className="text-3xl text-red-600" />,
      title: "Support 24/7",
      description: "We are here to assist you anytime",
    },
    {
      key: "secure-payment",
      icon: <FaLock className="text-3xl text-red-600" />,
      title: "Payment Secure",
      description: "Your payment information is safe with us",
    },
    {
      key: "discount",
      icon: <FaTag className="text-3xl text-red-600" />,
      title: "Discount",
      description: "Enjoy the best prices on our products",
    },
  ];

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {infoItems.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(`/info/${item.key}`)}
              className="w-full flex flex-col items-center text-center p-6 border rounded-lg shadow-md cursor-pointer bg-white"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
