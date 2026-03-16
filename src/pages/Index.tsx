import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { products, categories } from "@/data/products";

const heroLines = [
"Everything Students Need in One Place",
"Affordable Books & Stationery in Nairobi",
"Fast Delivery • Trusted Quality • Student Friendly Prices"];


const Index = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const featured = products.filter((p) => p.badge).slice(0, 8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % heroLines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-surface">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_hsl(191_91%_36%)_0%,_transparent_50%)] animate-pulse-soft" />
        <div className="container mx-auto relative z-10 text-center py-20">
          <span className="handwritten text-2xl md:text-3xl mb-4 block font-semibold">Back to School 2026 ✏️</span>
          <div className="h-24 md:h-20 flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentLine}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl mx-auto leading-tight text-balance">
                
                {heroLines[currentLine]}
              </motion.h1>
            </AnimatePresence>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Affordable Books & Stationery delivered across Nairobi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-display font-bold text-lg hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg">
              
              <i className="fa-solid fa-pencil" /> Shop Stationery
            </Link>
            <Link
              to="/shop?category=textbooks"
              className="inline-flex items-center justify-center gap-2 bg-card text-foreground px-8 py-4 rounded-xl font-display font-bold text-lg border border-border hover:bg-muted transition-all">
              
              <i className="fa-solid fa-book" /> View Textbooks
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
            { icon: "fa-truck-fast", title: "Fast Delivery", desc: "Nairobi CBD & beyond" },
            { icon: "fa-shield-halved", title: "Trusted Quality", desc: "Genuine products" },
            { icon: "fa-tag", title: "Best Prices", desc: "Student-friendly" },
            { icon: "fa-mobile-screen", title: "M-Pesa", desc: "Easy payments" }].
            map((f) =>
            <div key={f.title} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${f.icon} text-accent`} />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="handwritten text-xl">Browse by category</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Shop Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) =>
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}>
              
                <Link
                to={`/shop?category=${cat.id}`}
                className="block p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover text-center transition-all duration-300 hover:-translate-y-1 group paper-texture">
                
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                    <i className={`fa-solid ${cat.icon} text-accent text-xl`} />
                  </div>
                  <p className="font-display text-sm font-semibold">{cat.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count} items</p>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <div className="divider-spiral" />

      {/* Featured Products */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="handwritten text-xl">Handpicked for you</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Featured Products</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-accent font-medium hover:underline">
              View All <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product, i) =>
            <ProductCard key={product.id} product={product} index={i} />
            )}
          </div>
          <div className="sm:hidden text-center mt-8">
            <Link to="/shop" className="inline-flex items-center gap-2 text-accent font-medium">
              View All Products <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <span className="font-handwritten text-warning text-2xl">Limited Time Offer</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-4">Get 20% Off Your First Order</h2>
          <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">
            Use coupon code <span className="font-mono bg-primary-foreground/10 px-3 py-1 rounded-lg font-bold">WELCOME20</span> at checkout
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-display font-bold text-lg hover:-translate-y-0.5 transition-all">
            
            <i className="fa-solid fa-bag-shopping" /> Equip Your Studies
          </Link>
        </div>
      </section>
    </Layout>);

};

export default Index;