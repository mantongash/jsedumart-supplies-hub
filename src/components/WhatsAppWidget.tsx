import { useState } from "react";

const WHATSAPP_NUMBER = "254748332788";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChat = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello JSEdumart! I'd like to inquire about your products.")}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="bg-card rounded-xl shadow-lg border border-border p-4 w-72 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center shrink-0">
              <i className="fa-brands fa-whatsapp text-white text-lg" />
            </div>
            <div>
              <p className="font-display text-sm font-bold">JSEdumart Support</p>
              <p className="text-xs text-muted-foreground">Typically replies within minutes</p>
            </div>
          </div>
          <div className="bg-surface rounded-lg p-3 mb-3 text-sm text-muted-foreground">
            👋 Hi! How can we help you today? Ask us about products, orders, or delivery.
          </div>
          <button
            onClick={handleChat}
            className="w-full bg-success text-white py-2.5 rounded-lg font-display font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <i className="fa-brands fa-whatsapp" /> Start Chat
          </button>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-success text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-brands fa-whatsapp"} text-2xl`} />
      </button>
    </div>
  );
};

export default WhatsAppWidget;
