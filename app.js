const { useMemo, useState } = React;

const image = (name) => name;
const products = [
  { id: 1, name: "Colorful Clay Diya Collection", category: "Colorful Decorative Diyas", image: "WhatsApp Image 2026-10-29 at 10.59.19 AM (1).jpeg", badge: "Festive special", description: "Hand-painted orange, purple, pink and yellow clay diyas that bring playful colour to every festive corner." },
  { id: 2, name: "Traditional Terracotta Diyas", category: "Traditional Mitti Ke Diye", image: "WhatsApp Image 2026-10-29 at 10.59.19 AM.jpeg", badge: "Timeless", description: "A warm terracotta diya collection inspired by the quiet glow of a traditional Indian home." },
  { id: 3, name: "Diya Celebration Collection", category: "Diya Sets & Combos", image: "WhatsApp Image 2026-10-29 at 10.59.20 AM.jpeg", badge: "Celebration pick", description: "A joyful assortment of colourful diya shapes, gathered together for a bright festive display." },
  { id: 4, name: "Red Festive Kalash", category: "Decorative Kalash & Festive Pots", image: "WhatsApp Image 2026-10-29 at 10.59.22 AM.jpeg", badge: "New arrival", description: "A red decorative pot with shimmering accents, perfect for a welcoming Diwali arrangement." },
  { id: 5, name: "Devotional Red Idol", category: "Festive Decoration", image: "WhatsApp Image 2026-10-29 at 10.59.18 AM.jpeg", badge: "Sacred detail", description: "A vibrant red devotional idol with gold-toned details for a meaningful festive setting." },
  { id: 6, name: "Lotus-Shaped Decorative Diya", category: "Colorful Decorative Diyas", image: "WhatsApp Image 2026-10-29 at 10.59.18 AM (1).jpeg", badge: "Hand-finished", description: "A bright lotus-shaped diya with joyful pink, green and gold detailing." },
  { id: 7, name: "Classic Mitti Diya Arrangement", category: "Traditional Mitti Ke Diye", image: "WhatsApp Image 2026-10-29 at 10.59.20 AM (1).jpeg", badge: "Traditional", description: "Simple, beautifully shaped terracotta diyas for a timeless row of festive light." },
  { id: 8, name: "Colour Pop Diya Assortment", category: "Diya Sets & Combos", image: "WhatsApp Image 2026-10-29 at 10.59.19 AM (3).jpeg", badge: "Popular", description: "A vibrant mix of red, purple and golden diyas for a colourful celebration." }
];

const categories = [
  ["All Products", "✦", "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=80"],
  ["Traditional Mitti Ke Diye", "◒", "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=900&q=80"],
  ["Colorful Decorative Diyas", "◉", "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=900&q=80"],
  ["Diya Sets & Combos", "▣", "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=80"],
  ["Decorative Kalash & Festive Pots", "♢", "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=80"],
  ["Lakshmi Ji Idols", "ॐ", "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=900&q=80"],
  ["Festive Decoration", "✺", "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=80"]
];

function ProductCard({ product, isFavourite, onToggle, onDetails }) {
  return <article className="product-card">
    <div className="product-image">
      <img src={image(product.image)} alt={`${product.name} - ${product.category}`} loading="lazy" />
      <span className="badge">{product.badge}</span>
      <button className={`wish ${isFavourite ? "saved" : ""}`} onClick={() => onToggle(product)} aria-label={`${isFavourite ? "Remove" : "Add"} ${product.name} ${isFavourite ? "from" : "to"} favourites`} aria-pressed={isFavourite}>{isFavourite ? "♥" : "♡"}</button>
    </div>
    <div className="product-info">
      <span className="product-category">{product.category}</span>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="card-actions">
        <button className="btn btn-outline" onClick={() => onDetails(product)}>View details <span>↗</span></button>
        <button className={`favourite-action ${isFavourite ? "selected" : ""}`} onClick={() => onToggle(product)}>{isFavourite ? "Saved to favourites" : "Add to favourites"}</button>
      </div>
    </div>
  </article>;
}

function DetailModal({ product, isFavourite, onToggle, onClose, onPrevious, onNext }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={(event) => event.stopPropagation()}>
    <button className="close" onClick={onClose} aria-label="Close product details">×</button>
    <div className="detail"><div className="detail-image"><img src={image(product.image)} alt={`${product.name} - ${product.category}`} /></div><div className="detail-copy">
      <span className="product-category">{product.category}</span><h2>{product.name}</h2><p>{product.description}</p>
      <button className={`btn ${isFavourite ? "btn-saved" : "btn-primary"}`} onClick={() => onToggle(product)}>{isFavourite ? "♥ Saved to favourites" : "♡ Add to favourites"}</button>
      <div className="detail-nav"><button onClick={onPrevious} aria-label="Previous product">← Previous</button><button onClick={onNext} aria-label="Next product">Next →</button></div>
    </div></div>
  </div></div>;
}

function App() {
  const [category, setCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const [favourites, setFavourites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("daksh-diwali-favourites") || "[]"); } catch { return []; }
  });
  const [modalIndex, setModalIndex] = useState(null);
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts = useMemo(() => products.filter(product =>
    (category === "All Products" || product.category === category) &&
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (!favouritesOnly || favourites.includes(product.id))
  ), [category, search, favouritesOnly, favourites]);

  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  const toggleFavourite = (product) => {
    const alreadySaved = favourites.includes(product.id);
    const next = alreadySaved ? favourites.filter(id => id !== product.id) : [...favourites, product.id];
    setFavourites(next);
    localStorage.setItem("daksh-diwali-favourites", JSON.stringify(next));
    showToast(alreadySaved ? "Removed from your favourites." : "Added to your favourites!");
  };
  const scrollTo = (id) => { setMenuOpen(false); document.getElementById(id).scrollIntoView({ behavior: "smooth" }); };
  const openDetails = (product) => setModalIndex(products.findIndex(item => item.id === product.id));
  const moveDetail = (step) => setModalIndex((modalIndex + step + products.length) % products.length);

  return <div className="page-shell">
    <div className="topline">A celebration of light, colour and tradition</div>
    <nav className="nav" id="home">
      <button className="brand" onClick={() => scrollTo("home")} aria-label="Go to home"><span className="brand-mark">ॐ</span><span className="brand-name">DAKSH STUDY & STATIONERY HUB</span></button>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}><button onClick={() => scrollTo("home")}>Home</button><button onClick={() => scrollTo("collection")}>Diwali Collection</button><button onClick={() => scrollTo("categories")}>Categories</button><button onClick={() => { setFavouritesOnly(true); scrollTo("collection"); }}>My Favourites <span className="nav-count">{favourites.length}</span></button></div>
      <div className="nav-actions"><button className="favourite-nav" onClick={() => { setFavouritesOnly(true); scrollTo("collection"); }} aria-label={`View ${favourites.length} favourites`}>♥ <span>{favourites.length}</span></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">{menuOpen ? "×" : "☰"}</button></div>
    </nav>
    <header className="hero"><div className="particles" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ "--i": index }}></i>)}</div><div className="hero-content"><span className="eyebrow">The festive edit · 2026</span><h1>Diwali Special <span>Collection</span></h1><p className="hero-lead">Bring Home the Beauty of Traditional Indian Festivities</p><p className="tagline">Har Diya Mein Khushi, Har Roshni Mein Apnapan</p><div className="hero-ctas"><button className="btn btn-primary" onClick={() => scrollTo("collection")}>Explore Collection <span>→</span></button><button className="btn btn-outline" onClick={() => { setFavouritesOnly(true); scrollTo("collection"); }}>My Favourites <span>♥</span></button></div></div><div className="hero-art" aria-hidden="true"><div className="rangoli"></div><div className="floating-diya diya-one"></div><div className="floating-diya diya-two"></div><div className="art-diya"></div></div></header>
    <section className="section categories" id="categories"><div className="section-heading"><div><span className="eyebrow">Curated by feeling</span><h2>Find your festive glow</h2></div><p>Explore handcrafted colour, classic terracotta and meaningful festive details for every corner of your home.</p></div><div className="category-grid">{categories.map(([name, symbol, categoryImage]) => <button key={name} className={`category ${category === name && !favouritesOnly ? "active" : ""}`} onClick={() => { setCategory(name); setFavouritesOnly(false); scrollTo("collection"); }}><span className="category-image"><img src={categoryImage} alt="" loading="lazy" /></span><span className="category-symbol">{symbol}</span><span>{name}</span></button>)}</div></section>
    <section className="section products" id="collection"><div className="section-heading"><div><span className="eyebrow">{favouritesOnly ? "Your saved glow" : "The collection"}</span><h2>{favouritesOnly ? "My Favourites" : "Light up your home"}</h2></div><p>{favouritesOnly ? "Your favourite festive pieces, kept close for whenever inspiration strikes." : "Real pieces from our festive shelf, photographed in-store and described with care."}</p></div><div className="toolbar"><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection..." aria-label="Search the collection" /></label>{favouritesOnly && <button className="clear-favourites" onClick={() => setFavouritesOnly(false)}>View all products</button>}</div><div className="product-grid">{visibleProducts.length ? visibleProducts.map(product => <ProductCard key={product.id} product={product} isFavourite={favourites.includes(product.id)} onToggle={toggleFavourite} onDetails={openDetails} />) : <div className="empty-state"><span>♡</span><h3>No saved pieces yet</h3><p>Tap the heart on a product to create your festive favourites.</p><button className="btn btn-primary" onClick={() => setFavouritesOnly(false)}>Explore the collection</button></div>}</div></section>
    <footer className="footer"><div className="footer-grid"><div><h3>DAKSH STUDY & STATIONERY HUB</h3><p>Celebrating the Festival of Lights with colour, craft and a little more warmth in every corner.</p></div><div><h3>Quick navigation</h3><div className="footer-links"><button onClick={() => scrollTo("home")}>Home</button><button onClick={() => scrollTo("collection")}>Diwali Collection</button><button onClick={() => scrollTo("categories")}>Categories</button><button onClick={() => { setFavouritesOnly(true); scrollTo("collection"); }}>My Favourites</button></div></div><div><h3>Festive note</h3><p>May your home glow with joy, your days with togetherness, and your Diwali with beautiful memories.</p></div></div><div className="footer-bottom">© 2026 DAKSH STUDY & STATIONERY HUB · Har Diya Mein Khushi, Har Roshni Mein Apnapan</div></footer>
    {modalIndex !== null && <DetailModal product={products[modalIndex]} isFavourite={favourites.includes(products[modalIndex].id)} onToggle={toggleFavourite} onClose={() => setModalIndex(null)} onPrevious={() => moveDetail(-1)} onNext={() => moveDetail(1)} />}
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
