import Layout from "@/components/layout/Layout";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/products/ProductCard";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useStore();

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="font-display text-3xl font-bold mb-8">
          <i className="fa-solid fa-heart mr-3 text-discount" />My Wishlist
        </h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-regular fa-heart text-6xl text-muted-foreground mb-6" />
            <h2 className="font-display text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save items you love for later</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-display font-bold">
              <i className="fa-solid fa-store" /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
