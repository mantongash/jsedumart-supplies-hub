import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useStore } from "@/context/StoreContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, couponCode, setCouponCode, discount, applyCoupon } = useStore();
  const discountAmount = (cartTotal * discount) / 100;
  const shipping = cartTotal > 2000 ? 0 : 150;
  const finalTotal = cartTotal - discountAmount + shipping;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <i className="fa-solid fa-bag-shopping text-6xl text-muted-foreground mb-6" />
          <h1 className="font-display text-3xl font-bold mb-2">Your School Bag is Empty</h1>
          <p className="text-muted-foreground mb-8">Let's fill it with some awesome supplies!</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md">
            <i className="fa-solid fa-store" /> Start Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="font-display text-3xl font-bold mb-8">
          <i className="fa-solid fa-bag-shopping mr-3 text-accent" />Your School Bag
        </h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl shadow-card">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-surface rounded-lg p-2" />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="font-display font-semibold text-sm hover:text-accent transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                  <p className="font-display font-bold mt-1">KSh {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 hover:bg-muted transition-colors text-sm">
                      <i className="fa-solid fa-minus text-xs" />
                    </button>
                    <span className="px-3 py-2 text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 hover:bg-muted transition-colors text-sm">
                      <i className="fa-solid fa-plus text-xs" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-muted-foreground hover:text-discount transition-colors">
                    <i className="fa-solid fa-trash-can" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl shadow-card p-6 h-fit sticky top-32">
            <h3 className="font-display text-lg font-bold mb-4">
              <i className="fa-solid fa-receipt mr-2 text-accent" />Order Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>KSh {cartTotal.toLocaleString()}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-success"><span>Discount ({discount}%)</span><span>-KSh {discountAmount.toLocaleString()}</span></div>
              )}
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? <span className="text-success">Free</span> : `KSh ${shipping}`}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-lg">
                <span>Total</span><span>KSh {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 px-3 py-2 rounded-lg border border-border text-sm bg-background"
              />
              <button onClick={applyCoupon} className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Apply
              </button>
            </div>

            <Link
              to="/checkout"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md"
            >
              <i className="fa-solid fa-lock" /> Proceed to Checkout
            </Link>
            <Link to="/shop" className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm text-accent hover:underline">
              <i className="fa-solid fa-arrow-left" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
