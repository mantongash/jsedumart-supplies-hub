import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addToCart, addToWishlist, isInWishlist, isInCart } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative bg-card rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 paper-texture"
    >
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-accent text-accent-foreground text-xs font-semibold">
          {product.badge}
        </span>
      )}
      <button
        onClick={() => addToWishlist(product)}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isInWishlist(product.id)
            ? "bg-discount text-primary-foreground"
            : "bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-discount"
        }`}
      >
        <i className={`fa-${isInWishlist(product.id) ? "solid" : "regular"} fa-heart text-sm`} />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-surface p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fa-${i < Math.floor(product.rating) ? "solid" : "regular"} fa-star text-warning text-xs`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-foreground">
            KSh {product.price.toLocaleString()}
          </span>
          <button
            onClick={() => addToCart(product)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              isInCart(product.id)
                ? "bg-success text-primary-foreground"
                : "bg-primary text-primary-foreground hover:bg-accent"
            }`}
          >
            <i className={`fa-solid ${isInCart(product.id) ? "fa-check" : "fa-plus"} text-sm`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
