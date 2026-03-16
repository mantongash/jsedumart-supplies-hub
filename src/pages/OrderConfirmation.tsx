import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id") || "JSE-XXXXX";

  return (
    <Layout>
      <div className="container mx-auto py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-circle-check text-success text-5xl" />
          </div>
        </motion.div>
        <h1 className="font-display text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-2">Thank you for shopping with JSEdumart 🎉</p>
        <p className="text-lg font-display font-semibold mb-8">
          Order ID: <span className="font-mono text-accent">{orderId}</span>
        </p>
        <div className="bg-card rounded-xl shadow-card p-6 max-w-md mx-auto mb-8 text-left">
          <h3 className="font-display font-semibold mb-3"><i className="fa-solid fa-info-circle mr-2 text-accent" />What's Next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><i className="fa-solid fa-check mr-2 text-success" />You'll receive a confirmation SMS</li>
            <li><i className="fa-solid fa-check mr-2 text-success" />Our team will prepare your order</li>
            <li><i className="fa-solid fa-check mr-2 text-success" />Delivery within 24-48 hours in Nairobi</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/track-order" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all">
            <i className="fa-solid fa-location-dot" /> Track Order
          </Link>
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-xl font-display font-bold hover:bg-muted transition-all">
            <i className="fa-solid fa-store" /> Continue Shopping
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
