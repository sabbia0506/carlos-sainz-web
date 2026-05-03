import { useState, useEffect, useContext, createContext, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

/* ─────────────────────────────────────────────
   CONSTANTS – fans page
───────────────────────────────────────────── */
const LOGO_URL =
  "https://i.pinimg.com/1200x/67/3f/6f/673f6fa5d07f2f3f3a9f80b16babb181.jpg";
const AVATAR_URL =
  "https://i.pinimg.com/1200x/3a/c5/54/3ac554c3c029b5d7b5971927de8f2514.jpg";
const FOOTER_IMG =
  "https://i.pinimg.com/736x/ae/a7/57/aea757eed64cad4c206999c369422386.jpg";
const CARLOS_POSE =
  "https://i.pinimg.com/1200x/19/b1/ff/19b1ff7f8519900ef0e81e7adbb22e02.jpg";
const POSTER_URL =
  "https://i.pinimg.com/736x/2a/17/a8/2a17a8b1dd96b95e6286503d50f45943.jpg";

const carouselPhotos = [
  { id: 1, src: "https://i.pinimg.com/736x/5c/99/3b/5c993b9a2791a6b6ee36fe2c95f094cd.jpg", alt: "Carlos Sainz Portrait" },
  { id: 2, src: "https://i.pinimg.com/736x/c1/df/7c/c1df7c66e118fe35d6c62d171a563682.jpg", alt: "Carlos Sainz Paddock" },
  { id: 3, src: "https://i.pinimg.com/736x/84/12/87/841287a631891dd4d69ed15dee0bb1aa.jpg", alt: "Carlos Sainz Racing" },
  { id: 4, src: "https://i.pinimg.com/1200x/d2/7c/72/d27c72f6573e73da51150812d39f6eda.jpg", alt: "Carlos Sainz Celebration" },
  { id: 5, src: "https://i.pinimg.com/736x/e2/30/e0/e230e02a24fa623829c09e8868332aa9.jpg", alt: "Carlos Sainz Podium" },
  { id: 6, src: "https://i.pinimg.com/736x/9c/6a/ac/9c6aac3f72d2910b9c9abe34ea08fa47.jpg", alt: "Carlos Sainz Williams" },
  { id: 7, src: "https://i.pinimg.com/736x/ec/a4/01/eca401270bead635588cf6c144b71ccb.jpg", alt: "Carlos Sainz Close Up" },
];

const cardData = [
  { id: 1, category: "Off Track", title: "Smooth Operator", body: "Carlos off the circuit, proving that style and charisma extend far beyond the cockpit walls.", image: "https://i.pinimg.com/1200x/cd/6b/b3/cd6bb31aa251d2b1d05a2ccdc8ebc6b2.jpg" },
  { id: 2, category: "Off Track", title: "Golden Hour", body: "Bathed in warm light during a rare quiet moment away from the roar of engines and the heat of competition.", image: "https://i.pinimg.com/1200x/f1/59/dc/f159dce5dc427e16eb46cc1858d160a8.jpg" },
  { id: 3, category: "Off Track", title: "Madrid Roots", body: "Born and raised in the Spanish capital, the city that shaped the racer the world admires today.", image: "https://i.pinimg.com/736x/0a/f3/45/0af345d797fe1d8222254aa6f1c05744.jpg" },
  { id: 4, category: "Off Track", title: "Casual Carlos", body: "No helmet, no firesuit, just vibes, confidence, and that unmistakable Sainz grin on full display.", image: "https://i.pinimg.com/1200x/f6/28/3d/f6283d23afb854948dac8c5cd95bbcde.jpg" },
  { id: 5, category: "Off Track", title: "Off Duty", body: "Even champions need their downtime to recharge before the next grand prix weekend arrives.", image: "https://i.pinimg.com/736x/08/af/bb/08afbb5df878332505f6613f2c2646a2.jpg" },
  { id: 6, category: "Off Track", title: "Street Style", body: "Effortlessly blending fashion with that quiet confidence only a racing driver carries off the track.", image: "https://i.pinimg.com/736x/f7/49/0c/f7490c7094fe36007907c606e8892e4b.jpg" },
  { id: 7, category: "Off Track", title: "Unfiltered", body: "A candid glimpse behind the public persona, showing someone authentic, grounded, and always himself.", image: "https://i.pinimg.com/736x/0c/dc/38/0cdc38970dd8f5afa739c9263e0ec019.jpg" },
  { id: 8, category: "Race Day", title: "Suited & Ready", body: "Zipped up and locked in, capturing the transformation from Carlos the person to Sainz the competitor.", image: "https://i.pinimg.com/1200x/cf/84/c5/cf84c5f697b3899e6dbc32de6490d377.jpg" },
  { id: 9, category: "Race Day", title: "Post-Race Glow", body: "Sweat-soaked and adrenaline-fueled, the look of a driver who left everything on the track today.", image: "https://i.pinimg.com/736x/0c/4c/57/0c4c5708b824b6970e2860ab3fe657ba.jpg" },
  { id: 10, category: "Race Day", title: "Helmet On", body: "Behind the visor lives a competitor who refuses to settle for anything less than the top step.", image: "https://i.pinimg.com/736x/b5/31/2b/b5312b642b96626af5d1fdb3aa918713.jpg" },
  { id: 11, category: "Race Day", title: "Grid Walk", body: "Those final moments on the grid, absorbing the atmosphere before the lights go out and racing begins.", image: "https://i.pinimg.com/736x/c4/fa/8f/c4fa8f296a99b89da7f67fcb5f085f7d.jpg" },
  { id: 12, category: "Race Day", title: "Pit Wall Focus", body: "Communicating with the team and strategizing mid-race where every second and every word counts.", image: "https://i.pinimg.com/736x/31/6f/77/316f77f43b212d140224ef2b0dcfab31.jpg" },
  { id: 13, category: "Race Day", title: "Victory Stance", body: "Arms raised and heart pounding, the culmination of relentless pursuit captured in one single frame.", image: "https://i.pinimg.com/736x/72/af/a7/72afa7841e3041f2332b320143f5921e.jpg" },
  { id: 14, category: "Race Day", title: "Debrief", body: "Analyzing every lap and every overtake, the relentless work ethic that separates good from great.", image: "https://i.pinimg.com/1200x/03/d4/86/03d4862d1a8caeba7df576ce47baf096.jpg" },
  { id: 15, category: "Machine", title: "Williams FW46", body: "Gulf livery meeting cutting-edge aerodynamics in a machine built to challenge the established order.", image: "https://i.pinimg.com/736x/23/5a/24/235a24eaac71fd6fdc66ae9a15079ed1.jpg" },
  { id: 16, category: "Machine", title: "Pit Lane Ready", body: "Tires stacked and mechanics poised, the controlled chaos of a sub-three-second pit stop awaits.", image: "https://i.pinimg.com/1200x/97/ec/42/97ec429c1a06856b45c072f968a3ee0d.jpg" },
  { id: 17, category: "Machine", title: "Corner Attack", body: "Late braking into the apex at over 200 km/h where bravery and precision collide at full speed.", image: "https://i.pinimg.com/736x/92/7a/5b/927a5b2b1cd40ef1f8a89ac5f9e848af.jpg" },
  { id: 18, category: "Machine", title: "Straight Line Speed", body: "Full throttle down the main straight with the V6 turbo-hybrid screaming at its absolute peak.", image: "https://i.pinimg.com/1200x/eb/6f/13/eb6f13cbd026a5470c1b454f6cff01a2.jpg" },
  { id: 19, category: "Machine", title: "Rain Master", body: "Wet tarmac, zero visibility, maximum commitment in conditions that separate the brave from the rest.", image: "https://i.pinimg.com/736x/ea/18/e7/ea18e7f63271bde0ef89d825db9df8a3.jpg" },
  { id: 20, category: "Machine", title: "Garage Shot", body: "Stripped bare under the fluorescent lights where every bolt and wing element is meticulously prepared.", image: "https://i.pinimg.com/1200x/fb/56/71/fb56719b2daae0774c174db78a48b955.jpg" },
  { id: 21, category: "Machine", title: "Formation Lap", body: "Weaving through the pack to build tire temperature, the calm ritual before controlled aggression.", image: "https://i.pinimg.com/1200x/4b/31/fc/4b31fc7951a2fb4ca12e9ed96efcb89c.jpg" },
];

/* ─────────────────────────────────────────────
   SHOP DATA – Carlos Sainz merchandise
───────────────────────────────────────────── */
const SHOP_PRODUCTS = [
  {
    id: "s1",
    name: "Carlos Sainz Signs Tee",
    category: "Apparel",
    price: 549000,
    discount: 0,
    tag: "New",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    images: [
      "https://i.pinimg.com/736x/3d/48/dc/3d48dcc679397c48942d9c713f4a13f8.jpg",
      "https://i.pinimg.com/736x/61/f4/ad/61f4adadd6115e2824d10678048617a3.jpg",
      "https://i.pinimg.com/736x/6a/6c/41/6a6c417069524ffc9c30e8b650ab7c65.jpg",
      "https://i.pinimg.com/736x/84/85/b1/8485b154b22a61cb7621c9e127f6dba8.jpg",
    ],
    description: "Hit the road in style with the Carlos Sainz Street Sign Graphic Tee. Featuring a bold design of street signs representing iconic race destinations, this tee celebrates Carlos Sainz and his global journey. Printed on soft, high-quality fabric.",
    details: ["Regular Fit", "Colour: Cream / White", "Material: 100% Cotton", "Official Williams F1 x Sainz merchandise"],
    fit: "Regular Fit — true to size. If between sizes, size up.",
    shipping: "Worldwide shipping. Estimated 7–14 business days. Free shipping on orders over Rp 500.000.",
  },
  {
    id: "s2",
    name: "Carlos Sainz Glitch Helmet Tee",
    category: "Apparel",
    price: 629000,
    discount: 10,
    tag: "Sale",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    images: [
      "https://i.pinimg.com/736x/15/8e/ae/158eae72e83482aa98707ca1fab656e8.jpg",
      "https://i.pinimg.com/736x/d0/c1/80/d0c180ecc6e4e072e32bb624f3c23473.jpg",
      "https://i.pinimg.com/736x/d0/a0/dc/d0a0dceaed079be3f550e700f25fcb68.jpg",
      "https://i.pinimg.com/736x/03/7b/0d/037b0d716ad6e17cc39364753d14170b.jpg",
    ],
    description: "The Glitch Helmet Tee channels the energy of race day with a distorted, glitch-art print of Carlos Sainz's iconic helmet. Dark base, electric graphics — made for fans who race through the streets.",
    details: ["Slim Fit", "Colour: Carbon Black", "Material: 95% Cotton, 5% Elastane", "Official licensed product"],
    fit: "Slim Fit — size up for a relaxed look.",
    shipping: "Worldwide shipping. Estimated 7–14 business days. Free shipping on orders over Rp 500.000.",
  },
  {
    id: "s3",
    name: "Built for Athletes Carlos Sainz Patch",
    category: "Accessories",
    price: 189000,
    discount: 0,
    tag: "",
    sizes: ["One Size"],
    images: [
      "https://i.pinimg.com/736x/58/c4/19/58c419233a85ca3e4b36920f8da26072.jpg",
    ],
    description: "A premium embroidered patch celebrating Carlos Sainz #55. Iron-on or sew-on, perfect for jackets, bags, and caps. Show your allegiance anywhere.",
    details: ["Size: 8cm x 8cm", "Embroidered detail", "Iron-on backing", "Collector's item"],
    fit: "One Size — universal patch.",
    shipping: "Worldwide shipping. Estimated 5–10 business days.",
  },
  {
    id: "s4",
    name: "2026 Sainz Beanie",
    category: "Headwear",
    price: 349000,
    discount: 0,
    tag: "New",
    sizes: ["One Size"],
    images: [
      "https://i.pinimg.com/736x/3c/9c/55/3c9c558cf1cb013043e041a9199e87c1.jpg",
      "https://i.pinimg.com/736x/8c/ab/0d/8cab0d89cf2511cffb85c325cd926a1f.jpg",
    ],
    description: "Stay warm and stylish with the official 2026 Sainz Beanie. Knitted with the Williams Racing colour palette and embroidered #55 detail. Perfect for race weekends or winter drives.",
    details: ["One Size Fits Most", "Material: 100% Acrylic Knit", "Embroidered #55 detail", "Williams Racing palette"],
    fit: "One Size — stretch knit fits all head sizes.",
    shipping: "Worldwide shipping. Estimated 7–14 business days.",
  },
  {
    id: "s5",
    name: "2026 Sainz Cap 9FORTY",
    category: "Headwear",
    price: 449000,
    discount: 15,
    tag: "Sale",
    sizes: ["One Size"],
    images: [
      "https://i.pinimg.com/736x/78/fc/95/78fc9542e2b0a5679bae3982c9338da6.jpg",
      "https://i.pinimg.com/736x/0e/ca/cd/0ecacd357bf864c90781119073f40a90.jpg",
    ],
    description: "The 9FORTY silhouette meets Williams F1 racing culture. Adjustable strap, structured front, low-profile crown. Carlos Sainz #55 branding on the side panel.",
    details: ["9FORTY Adjustable Fit", "Structured front panel", "Adjustable back strap", "Embroidered Sainz #55 logo"],
    fit: "Adjustable — one size fits most.",
    shipping: "Worldwide shipping. Estimated 7–14 business days.",
  },
  {
    id: "s6",
    name: "Carlos Sainz Kids Glitch Helmet Hoodie",
    category: "Apparel",
    price: 729000,
    discount: 0,
    tag: "New",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    images: [
      "https://i.pinimg.com/736x/94/b1/77/94b1770311d4af496ae0cbf9d5ef5a7b.jpg",
      "https://i.pinimg.com/736x/9f/fb/c6/9ffbc62818904d77522e6574844da82d.jpg",
    ],
    description: "The littlest Sainz fans deserve the best. The Kids Glitch Helmet Hoodie features the same iconic helmet graphic in a soft, warm hoodie cut for young racers aged 3–12.",
    details: ["Kids sizing (3–12Y)", "Soft fleece lining", "Colour: Carbon Black", "Material: 80% Cotton, 20% Polyester"],
    fit: "Regular Fit — size up for a comfy, oversized look.",
    shipping: "Worldwide shipping. Estimated 7–14 business days.",
  },
  {
    id: "s7",
    name: "2026 Sainz Tech Tee",
    category: "Apparel",
    price: 479000,
    discount: 0,
    tag: "New",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    images: [
      "https://i.pinimg.com/736x/0d/b2/e2/0db2e200315f9ec547e67de9897e19dd.jpg",
    ],
    description: "Engineered for performance, inspired by the cockpit. The 2026 Sainz Tech Tee uses moisture-wicking fabric with a subtle Williams Racing stripe and the Sainz #55 on the chest.",
    details: ["Athletic Fit", "Moisture-wicking fabric", "Williams Racing stripe detail", "Material: 88% Polyester, 12% Elastane"],
    fit: "Athletic Fit — fitted through shoulders and chest.",
    shipping: "Worldwide shipping. Estimated 7–14 business days.",
  },
];

const SHOP_CATEGORIES = ["All", "Apparel", "Headwear", "Accessories"];

/* ─────────────────────────────────────────────
   CONTEXT – Auth & Cart
───────────────────────────────────────────── */
const AuthContext = createContext();
const CartContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cs_user")); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("cs_token") || null);

  const login = (userData, tkn) => {
    setUser(userData);
    setToken(tkn);
    localStorage.setItem("cs_user", JSON.stringify(userData));
    localStorage.setItem("cs_token", tkn);
  };
  const logout = () => {
    setUser(null); setToken(null);
    localStorage.removeItem("cs_user");
    localStorage.removeItem("cs_token");
  };
  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cs_cart")) || []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("cs_cart", JSON.stringify(cart)); }, [cart]);

  const addToCart = (product, size) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === size);
      if (exists) return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, size, qty: 1 }];
    });
  };
  const removeFromCart = (id, size) => setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  const updateQty = (id, size, delta) => setCart(prev => prev.map(i => {
    if (i.id === id && i.size === size) { const q = i.qty + delta; return q > 0 ? { ...i, qty: q } : i; }
    return i;
  }));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => {
    const p = i.discount > 0 ? i.price * (1 - i.discount / 100) : i.price;
    return s + p * i.qty;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQty, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function formatRp(n) { return "Rp " + n.toLocaleString("id-ID"); }

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const api = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  register: async (data) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

/* ─────────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #0F1A2B; color: #fff; }

  /* ── NAVBAR ── */
  .nav-root {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    background: rgba(15,26,43,0.97);
    border-bottom: 1px solid #1C2E4A;
    backdrop-filter: blur(14px);
    font-family: 'DM Sans', sans-serif;
  }
  .nav-inner {
    max-width: 1280px; margin: 0 auto; padding: 0 24px;
    height: 60px; display: flex; align-items: center; gap: 24px;
  }
  .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
  .nav-brand img { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
  .nav-brand-name { color: #fff; font-weight: 800; font-size: 16px; letter-spacing: 1px; }
  .nav-brand-sub { color: #BDC4D4; font-size: 10px; letter-spacing: 3px; margin-left: 6px; }
  .nav-links { display: flex; align-items: center; gap: 6px; margin-left: auto; }
  .nav-link {
    color: #BDC4D4; text-decoration: none; font-size: 13px; font-weight: 500;
    padding: 6px 14px; border-radius: 20px; transition: all 0.2s; letter-spacing: 0.5px;
  }
  .nav-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .nav-link.active { color: #fff; background: rgba(255,255,255,0.08); }
  .nav-shop-link {
    background: linear-gradient(135deg, #E8303A, #B02028);
    color: #fff !important; font-weight: 700; letter-spacing: 1px;
    border-radius: 20px; padding: 6px 18px;
    box-shadow: 0 2px 12px rgba(232,48,58,0.4);
    transition: all 0.2s;
  }
  .nav-shop-link:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(232,48,58,0.6); background: linear-gradient(135deg, #E8303A, #B02028) !important; }
  .nav-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
  .nav-user-info { display: flex; align-items: center; gap: 8px; }
  .nav-hi { color: #BDC4D4; font-size: 13px; }
  .nav-username { color: #fff; font-weight: 700; font-size: 14px; }
  .nav-avatar { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 2px solid #E8303A; }
  .nav-avatar-icon {
    width: 34px; height: 34px; border-radius: 50%;
    background: #1C2E4A; border: 1px solid #52677D;
    display: flex; align-items: center; justify-content: center; color: #BDC4D4;
  }
  .nav-cart-btn {
    position: relative; background: none; border: none; cursor: pointer;
    color: #BDC4D4; padding: 6px; border-radius: 8px; transition: color 0.2s;
    display: flex; align-items: center;
  }
  .nav-cart-btn:hover { color: #fff; }
  .cart-badge {
    position: absolute; top: -2px; right: -2px;
    background: #E8303A; color: #fff; font-size: 10px; font-weight: 800;
    width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  }
  .nav-auth-btns { display: flex; gap: 8px; }
  .btn-nav-login {
    color: #BDC4D4; font-size: 13px; font-weight: 500; border: 1px solid #1C2E4A;
    background: none; border-radius: 20px; padding: 5px 14px; cursor: pointer;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-nav-login:hover { color: #fff; border-color: #52677D; }
  .btn-nav-signup {
    background: #fff; color: #0F1A2B; font-size: 13px; font-weight: 700;
    border-radius: 20px; padding: 5px 16px; cursor: pointer;
    text-decoration: none; border: none; transition: all 0.2s;
  }
  .btn-nav-signup:hover { background: #E8303A; color: #fff; }
  .nav-mobile-toggle { display: none; background: none; border: none; color: #BDC4D4; cursor: pointer; font-size: 22px; margin-left: auto; }
  .nav-mobile-menu { display: none; flex-direction: column; gap: 4px; padding: 12px 24px 16px; border-top: 1px solid #1C2E4A; }
  .nav-mobile-menu.open { display: flex; }
  .nav-mobile-menu .nav-link { padding: 10px 0; border-radius: 0; border-bottom: 1px solid rgba(82,103,125,0.2); }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-right .nav-auth-btns { display: none; }
    .nav-right .nav-user-info .nav-username { display: none; }
    .nav-mobile-toggle { display: block; }
  }

  /* ── SHOP PAGE ── */
  .shop-page { min-height: 100vh; padding-top: 60px; background: #0A1422; }
  .shop-hero {
    background: linear-gradient(135deg, #0A1422 0%, #1a0a0a 50%, #0A1422 100%);
    padding: 60px 24px 40px; text-align: center; position: relative; overflow: hidden;
    border-bottom: 1px solid #1C2E4A;
  }
  .shop-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(232,48,58,0.15) 0%, transparent 70%);
  }
  .shop-hero-eyebrow {
    font-family: 'Bebas Neue', sans-serif; font-size: 12px; letter-spacing: 6px;
    color: #E8303A; margin-bottom: 12px; position: relative;
  }
  .shop-hero-title {
    font-family: 'Bebas Neue', sans-serif; font-size: clamp(52px, 10vw, 96px);
    line-height: 0.9; color: #fff; margin-bottom: 16px; position: relative;
    text-shadow: 0 0 80px rgba(232,48,58,0.3);
  }
  .shop-hero-title span { color: #E8303A; }
  .shop-hero-sub { color: #BDC4D4; font-size: 15px; letter-spacing: 1px; position: relative; }

  .shop-controls {
    max-width: 1200px; margin: 0 auto; padding: 28px 24px 0;
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  }
  .shop-cat-btn {
    padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 600;
    border: 1px solid #1C2E4A; background: none; color: #BDC4D4; cursor: pointer;
    transition: all 0.2s; letter-spacing: 0.5px; font-family: 'DM Sans', sans-serif;
  }
  .shop-cat-btn:hover { border-color: #52677D; color: #fff; }
  .shop-cat-btn.active { background: #E8303A; border-color: #E8303A; color: #fff; box-shadow: 0 2px 12px rgba(232,48,58,0.4); }

  .shop-grid {
    max-width: 1200px; margin: 0 auto; padding: 28px 24px 80px;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;
  }

  /* Product Card */
  .prod-card {
    background: #0F1A2B; border: 1px solid #1C2E4A; border-radius: 12px;
    overflow: hidden; cursor: pointer; position: relative;
    transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease, border-color 0.25s;
    text-decoration: none; color: inherit;
    transform-style: preserve-3d;
  }
  .prod-card:hover {
    transform: translateY(-6px) rotateX(2deg) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px #E8303A, inset 0 1px 0 rgba(255,255,255,0.05);
    border-color: #E8303A;
  }
  .prod-card-img-wrap { position: relative; overflow: hidden; height: 280px; }
  .prod-card-img-wrap img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.5s ease;
  }
  .prod-card:hover .prod-card-img-wrap img { transform: scale(1.08); }
  .prod-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,20,34,0.8) 0%, transparent 50%);
    opacity: 0; transition: opacity 0.3s;
    display: flex; align-items: flex-end; padding: 16px;
  }
  .prod-card:hover .prod-card-overlay { opacity: 1; }
  .prod-card-sizes { display: flex; gap: 6px; flex-wrap: wrap; }
  .prod-card-size-pill {
    background: rgba(255,255,255,0.15); backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.3); border-radius: 6px;
    padding: 3px 8px; font-size: 11px; color: #fff; font-weight: 600;
  }
  .prod-card-tag {
    position: absolute; top: 12px; left: 12px;
    font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
    padding: 3px 10px; border-radius: 20px;
  }
  .prod-card-tag.new { background: #E8303A; color: #fff; }
  .prod-card-tag.sale { background: #F59E0B; color: #000; }
  .prod-card-body { padding: 16px; }
  .prod-card-cat { font-size: 10px; letter-spacing: 2px; color: #E8303A; font-weight: 700; margin-bottom: 4px; }
  .prod-card-name { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px; line-height: 1.3; }
  .prod-card-price { display: flex; align-items: center; gap: 8px; }
  .prod-card-price-main { font-size: 16px; font-weight: 800; color: #fff; }
  .prod-card-price-orig { font-size: 12px; color: #52677D; text-decoration: line-through; }
  .prod-card-disc { font-size: 10px; background: rgba(245,158,11,0.15); color: #F59E0B; padding: 2px 6px; border-radius: 4px; font-weight: 700; }

  /* ── PRODUCT DETAIL ── */
  .pd-page { min-height: 100vh; padding: 80px 24px 60px; background: #0A1422; }
  .pd-breadcrumb { max-width: 1100px; margin: 0 auto 24px; font-size: 12px; color: #52677D; display: flex; gap: 8px; align-items: center; }
  .pd-breadcrumb a { color: #52677D; text-decoration: none; transition: color 0.2s; }
  .pd-breadcrumb a:hover { color: #fff; }
  .pd-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 420px; gap: 48px; }
  @media(max-width:900px) { .pd-inner { grid-template-columns: 1fr; } }

  .pd-gallery { position: sticky; top: 80px; }
  .pd-main-img-wrap {
    border-radius: 14px; overflow: hidden; aspect-ratio: 3/4;
    background: #0F1A2B; border: 1px solid #1C2E4A; margin-bottom: 12px;
    position: relative;
  }
  .pd-main-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .pd-main-img-wrap:hover img { transform: scale(1.04); }
  .pd-img-nav {
    position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 8px; align-items: center;
  }
  .pd-img-nav button {
    background: rgba(255,255,255,0.2); border: none; border-radius: 50%;
    width: 28px; height: 28px; cursor: pointer; color: #fff; font-size: 14px;
    display: flex; align-items: center; justify-content: center; transition: background 0.2s;
    backdrop-filter: blur(4px);
  }
  .pd-img-nav button:hover { background: rgba(232,48,58,0.7); }
  .pd-img-counter { color: rgba(255,255,255,0.7); font-size: 12px; background: rgba(0,0,0,0.4); padding: 2px 8px; border-radius: 10px; }
  .pd-thumbs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
  .pd-thumbs::-webkit-scrollbar { height: 3px; }
  .pd-thumbs::-webkit-scrollbar-thumb { background: #1C2E4A; border-radius: 2px; }
  .pd-thumb {
    flex-shrink: 0; width: 72px; height: 72px; border-radius: 8px; overflow: hidden;
    border: 2px solid transparent; cursor: pointer; transition: border-color 0.2s;
  }
  .pd-thumb.active { border-color: #E8303A; }
  .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }

  .pd-info { padding-top: 8px; }
  .pd-tag-line { font-size: 11px; letter-spacing: 3px; color: #E8303A; font-weight: 700; margin-bottom: 8px; }
  .pd-name { font-family: 'Syne', sans-serif; font-size: clamp(22px, 3vw, 32px); font-weight: 800; color: #fff; margin-bottom: 16px; line-height: 1.1; }
  .pd-price-row { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .pd-price-main { font-size: 28px; font-weight: 800; color: #fff; }
  .pd-price-orig { font-size: 16px; color: #52677D; text-decoration: line-through; }
  .pd-disc-badge { background: rgba(245,158,11,0.15); color: #F59E0B; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; }

  .pd-section-label { font-size: 12px; letter-spacing: 2px; color: #BDC4D4; font-weight: 700; margin-bottom: 10px; }
  .pd-sizes { margin-bottom: 24px; }
  .pd-size-grid { display: flex; gap: 8px; flex-wrap: wrap; }
  .pd-size-btn {
    width: 52px; height: 44px; border-radius: 8px; border: 1px solid #1C2E4A;
    background: #0F1A2B; color: #BDC4D4; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center;
    font-family: 'DM Sans', sans-serif;
  }
  .pd-size-btn:hover { border-color: #52677D; color: #fff; }
  .pd-size-btn.active { background: #E8303A; border-color: #E8303A; color: #fff; box-shadow: 0 0 12px rgba(232,48,58,0.4); }

  .pd-actions { display: flex; gap: 12px; margin-bottom: 24px; }
  .btn-add-cart, .btn-buy-now {
    flex: 1; padding: 14px; border-radius: 10px; font-size: 15px; font-weight: 700;
    cursor: pointer; border: none; transition: all 0.25s; font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .btn-add-cart { background: #1C2E4A; color: #fff; border: 1px solid #52677D; }
  .btn-add-cart:hover { background: #2a3f5e; border-color: #fff; }
  .btn-buy-now { background: linear-gradient(135deg, #E8303A, #B02028); color: #fff; box-shadow: 0 4px 16px rgba(232,48,58,0.35); }
  .btn-buy-now:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,48,58,0.5); }

  .pd-login-warning {
    background: rgba(232,48,58,0.1); border: 1px solid rgba(232,48,58,0.4);
    border-radius: 10px; padding: 12px 16px; color: #F87171; font-size: 13px;
    margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }
  .pd-accordion { border-top: 1px solid #1C2E4A; }
  .pd-accordion-item { border-bottom: 1px solid #1C2E4A; }
  .pd-accordion-btn {
    width: 100%; padding: 16px 0; background: none; border: none; color: #fff;
    font-size: 14px; font-weight: 700; cursor: pointer; display: flex; justify-content: space-between;
    align-items: center; font-family: 'DM Sans', sans-serif; text-align: left;
  }
  .pd-accordion-btn:hover { color: #BDC4D4; }
  .pd-accordion-body { padding: 0 0 16px; color: #BDC4D4; font-size: 13px; line-height: 1.7; }
  .pd-accordion-body ul { padding-left: 16px; }
  .pd-accordion-body li { margin-bottom: 4px; }

  /* ── CART PAGE ── */
  .cart-page { min-height: 100vh; padding: 80px 24px 60px; background: #0A1422; }
  .cart-inner { max-width: 1000px; margin: 0 auto; }
  .cart-page-title { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 32px; }
  .cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
  @media(max-width:768px) { .cart-layout { grid-template-columns: 1fr; } }
  .cart-items-wrap { display: flex; flex-direction: column; gap: 12px; }
  .cart-item-card {
    background: #0F1A2B; border: 1px solid #1C2E4A; border-radius: 12px;
    padding: 16px; display: flex; gap: 16px; align-items: center;
    transition: border-color 0.2s;
  }
  .cart-item-card:hover { border-color: #52677D; }
  .cart-item-img { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .cart-item-size { font-size: 12px; color: #52677D; margin-bottom: 8px; }
  .cart-item-price { font-size: 15px; font-weight: 800; color: #fff; }
  .cart-qty-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
  .cart-qty-btn {
    width: 28px; height: 28px; border-radius: 6px; border: 1px solid #1C2E4A;
    background: none; color: #BDC4D4; cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center; transition: all 0.2s;
  }
  .cart-qty-btn:hover { border-color: #52677D; color: #fff; }
  .cart-qty-num { font-size: 14px; font-weight: 700; color: #fff; min-width: 20px; text-align: center; }
  .cart-remove-btn {
    background: none; border: none; color: #52677D; cursor: pointer; font-size: 12px;
    padding: 4px 8px; border-radius: 4px; transition: color 0.2s;
  }
  .cart-remove-btn:hover { color: #F87171; }
  .cart-summary-box {
    background: #0F1A2B; border: 1px solid #1C2E4A; border-radius: 12px;
    padding: 24px; position: sticky; top: 80px; height: fit-content;
  }
  .cart-summary-title { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 20px; }
  .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: #BDC4D4; }
  .summary-total { display: flex; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid #1C2E4A; }
  .summary-total-label { font-size: 15px; font-weight: 700; color: #fff; }
  .summary-total-val { font-size: 20px; font-weight: 800; color: #fff; }
  .btn-checkout-full {
    width: 100%; margin-top: 20px; padding: 14px; border-radius: 10px;
    background: linear-gradient(135deg, #E8303A, #B02028); border: none; color: #fff;
    font-size: 15px; font-weight: 800; cursor: pointer; transition: all 0.25s;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-checkout-full:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,48,58,0.5); }
  .empty-state { text-align: center; padding: 80px 24px; }
  .empty-state-icon { font-size: 64px; margin-bottom: 16px; }
  .empty-state-text { color: #BDC4D4; font-size: 16px; margin-bottom: 24px; }
  .empty-state a { color: #E8303A; text-decoration: none; font-weight: 700; }
  .checkout-success-wrap { text-align: center; padding: 120px 24px; }
  .checkout-success-icon { font-size: 72px; margin-bottom: 24px; animation: popIn 0.5s ease; }
  .checkout-success-title { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 12px; }
  .checkout-success-sub { color: #BDC4D4; font-size: 16px; }
  @keyframes popIn { 0% { transform: scale(0); } 80% { transform: scale(1.1); } 100% { transform: scale(1); } }

  /* ── AUTH PAGE ── */
  .auth-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #0A1422; padding: 80px 24px 40px; position: relative;
  }
  .auth-bg-glow {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 600px; height: 400px;
    background: radial-gradient(ellipse, rgba(232,48,58,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .auth-card {
    width: 100%; max-width: 460px; background: #0F1A2B;
    border: 1px solid #1C2E4A; border-radius: 16px; padding: 40px;
    position: relative;
  }
  .auth-logo-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }
  .auth-logo-wrap img { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; }
  .auth-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .auth-sub { color: #52677D; font-size: 13px; }
  .form-group { margin-bottom: 16px; }
  .form-group label { display: block; font-size: 12px; font-weight: 700; letter-spacing: 1px; color: #BDC4D4; margin-bottom: 6px; }
  .form-group input {
    width: 100%; padding: 11px 14px; background: #0A1422; border: 1px solid #1C2E4A;
    border-radius: 8px; color: #fff; font-size: 14px; outline: none;
    transition: border-color 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .form-group input:focus { border-color: #E8303A; }
  .form-group small { color: #52677D; font-size: 11px; margin-top: 4px; display: block; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .auth-error { background: rgba(232,48,58,0.1); border: 1px solid rgba(232,48,58,0.4); border-radius: 8px; padding: 10px 14px; color: #F87171; font-size: 13px; margin-bottom: 16px; }
  .btn-auth-submit {
    width: 100%; padding: 13px; background: linear-gradient(135deg, #E8303A, #B02028);
    border: none; border-radius: 10px; color: #fff; font-size: 15px; font-weight: 800;
    cursor: pointer; transition: all 0.25s; font-family: 'DM Sans', sans-serif; margin-top: 8px;
  }
  .btn-auth-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(232,48,58,0.5); }
  .btn-auth-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .auth-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
  .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: #1C2E4A; }
  .auth-divider span { color: #52677D; font-size: 12px; }
  .btn-auth-switch {
    display: block; text-align: center; color: #BDC4D4; font-size: 13px; text-decoration: none;
    padding: 10px; border-radius: 8px; border: 1px solid #1C2E4A; transition: all 0.2s;
  }
  .btn-auth-switch:hover { border-color: #52677D; color: #fff; }

  /* ── FANS PAGE SECTIONS (preserved) ── */
  .fans-hero { position: relative; width: 100%; height: 75vh; overflow: hidden; }
  .fans-hero-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; transition: all 0.7s ease-in-out; }
  .fans-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, #0F1A2B 0%, rgba(15,26,43,0.3) 50%, transparent 100%);
  }
  .fans-hero-content {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end; padding-bottom: 64px;
    font-family: 'DM Sans', sans-serif;
  }
  .fans-hero-num { letter-spacing: 0.3em; font-size: 12px; margin-bottom: 12px; color: #BDC4D4; font-weight: 500; }
  .fans-hero-title { font-size: clamp(40px, 8vw, 72px); font-weight: 800; color: #fff; text-align: center; margin-bottom: 16px; }
  .fans-hero-title span { color: #52677D; }
  .fans-hero-sub { font-size: 14px; max-width: 480px; text-align: center; margin-bottom: 40px; color: #BDC4D4; }
  .carousel-controls { display: flex; align-items: center; gap: 24px; }
  .carousel-btn {
    width: 48px; height: 48px; border-radius: 50%; border: 1px solid #52677D;
    background: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 20px; transition: background 0.2s;
  }
  .carousel-btn:hover { background: rgba(255,255,255,0.1); }
  .carousel-dots { display: flex; gap: 8px; }
  .carousel-dot {
    height: 8px; border-radius: 4px; border: none; cursor: pointer; transition: all 0.3s;
    background: #52677D;
  }
  .carousel-dot.active { background: #D1CFC9; width: 24px; }
  .carousel-dot:not(.active) { width: 8px; }

  /* Dashboard */
  .dashboard-section { padding: 56px 24px; background: #1C2E4A; }
  .section-eyebrow { letter-spacing: 0.2em; font-size: 11px; text-align: center; margin-bottom: 8px; color: #BDC4D4; }
  .section-title { font-size: clamp(22px, 3vw, 30px); font-weight: 800; color: #fff; text-align: center; margin-bottom: 32px; font-family: 'Syne', sans-serif; }
  .dashboard-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 900px; margin: 0 auto 32px; }
  .stat-card { background: #0F1A2B; border: 1px solid #52677D; border-radius: 10px; padding: 20px; text-align: center; }
  .stat-label { font-size: 11px; letter-spacing: 2px; color: #52677D; margin-bottom: 8px; }
  .stat-value { font-size: clamp(28px, 4vw, 40px); font-weight: 800; color: #D1CFC9; }
  .stat-value.sm { font-size: 18px; }
  .dashboard-bars { background: #0F1A2B; border: 1px solid #52677D; border-radius: 10px; padding: 24px; max-width: 900px; margin: 0 auto; }
  .bar-label { display: flex; justify-content: space-between; margin-bottom: 6px; }
  .bar-label span { font-size: 13px; color: #BDC4D4; }
  .bar-track { width: 100%; height: 12px; border-radius: 6px; background: #1C2E4A; margin-bottom: 16px; }
  .bar-fill { height: 12px; border-radius: 6px; transition: width 0.5s ease; }

  /* Gallery */
  .gallery-section { padding: 56px 24px; background: #0F1A2B; }
  .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto; }
  .gallery-card {
    border-radius: 10px; overflow: hidden; background: #0F1A2B;
    border: 2px solid #1C2E4A; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    font-family: 'DM Sans', sans-serif;
  }
  .gallery-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
  .gallery-card-img { width: 100%; height: 288px; object-fit: cover; transition: transform 0.5s; }
  .gallery-card:hover .gallery-card-img { transform: scale(1.05); }
  .gallery-card-body { padding: 20px; }
  .gallery-card-title { color: #fff; font-size: 17px; font-weight: 700; margin-bottom: 8px; }
  .gallery-card-body p { color: #BDC4D4; font-size: 13px; line-height: 1.6; margin-bottom: 20px; }
  .like-btn-row { display: flex; justify-content: space-between; align-items: center; }
  .like-btn {
    display: flex; align-items: center; gap: 10px; padding: 8px 20px;
    border-radius: 24px; border: none; cursor: pointer; background: rgba(189,196,212,0.1); transition: all 0.2s;
  }
  .like-btn.liked { background: rgba(248,113,113,0.15); }
  .like-count { font-size: 13px; color: #52677D; font-weight: 600; }

  /* Footer */
  .fans-footer { font-family: 'DM Sans', sans-serif; }
  .footer-top { padding: 40px 24px; background: #fff; display: flex; justify-content: center; }
  .footer-top img { max-height: 200px; object-fit: contain; border-radius: 8px; }
  .footer-bottom { padding: 40px 24px 24px; background: #D1CFC9; }
  .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 40px; margin-bottom: 32px; }
  @media(max-width:768px) { .footer-grid { grid-template-columns: 1fr; } }
  .footer-brand-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .footer-brand-row img { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
  .footer-text { font-size: 13px; color: #52677D; line-height: 1.7; margin-bottom: 8px; }
  .footer-link { color: #0F1A2B; font-size: 13px; font-weight: 700; text-decoration: none; transition: opacity 0.2s; }
  .footer-link:hover { opacity: 0.7; }
  .footer-nav-title { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #0F1A2B; margin-bottom: 16px; }
  .footer-nav a { display: block; font-size: 13px; color: #52677D; text-decoration: none; margin-bottom: 8px; transition: color 0.2s; }
  .footer-nav a:hover { color: #000; }
  .footer-copy { max-width: 1200px; margin: 0 auto; padding-top: 24px; border-top: 1px solid #BDC4D4; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
  .footer-copy p { font-size: 12px; color: #52677D; }

  /* Misc utility */
  .page-pt { padding-top: 60px; }
  .not-found-page { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; gap: 16px; }
  .not-found-page a { color: #E8303A; text-decoration: none; font-weight: 700; }
`;

function GlobalStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

/* ─────────────────────────────────────────────
   NAVBAR (shared)
───────────────────────────────────────────── */
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Helmet icon (SVG inline)
  const HelmetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C7.5 3 4 7 4 12H20C20 7 16.5 3 12 3Z" fill="#E8303A"/>
      <path d="M4 12C4 16.5 7 20 12 20C15 20 17.5 18.5 19 16H4V12Z" fill="#BDC4D4"/>
      <rect x="4" y="14" width="16" height="2" rx="1" fill="#52677D"/>
      <rect x="14" y="16" width="5" height="3" rx="1.5" fill="#1C2E4A"/>
    </svg>
  );
  const PersonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="#BDC4D4" strokeWidth="1.5"/>
      <path d="M4 20C4 16.134 7.582 13 12 13C16.418 13 20 16.134 20 20" stroke="#BDC4D4" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  const CartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke="#BDC4D4" strokeWidth="1.5"/>
      <path d="M3 6H21" stroke="#BDC4D4" strokeWidth="1.5"/>
      <path d="M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10" stroke="#BDC4D4" strokeWidth="1.5"/>
    </svg>
  );

  return (
    <nav className="nav-root">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <img src={LOGO_URL} alt="Sainz" />
          <div>
            <span className="nav-brand-name">SAINZ</span>
            <span className="nav-brand-sub">FANS PAGE</span>
          </div>
        </Link>

        <div className="nav-links">
          <Link to="/#gallery" className="nav-link">Gallery</Link>
          <Link to="/#dashboard" className="nav-link">Dashboard</Link>
          <Link to="/#about" className="nav-link">About</Link>
          <Link to="/shop" className="nav-link nav-shop-link">🏪 Shop</Link>
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <button className="nav-cart-btn" onClick={() => navigate("/cart")}>
                <CartIcon />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
              <div className="nav-user-info">
                <span className="nav-hi">Hi,</span>
                <span className="nav-username">{user.name || user.username}</span>
                <HelmetIcon />
                <img src={AVATAR_URL} alt="avatar" className="nav-avatar" />
              </div>
              <button onClick={logout} style={{ background: "none", border: "none", color: "#52677D", cursor: "pointer", fontSize: 12, paddingLeft: 4 }}>Logout</button>
            </>
          ) : (
            <div className="nav-auth-btns">
              <Link to="/login" className="btn-nav-login">Login</Link>
              <Link to="/register" className="btn-nav-signup">Sign Up</Link>
              <div className="nav-avatar-icon"><PersonIcon /></div>
            </div>
          )}
          <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div className={`nav-mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/#gallery" className="nav-link" onClick={() => setMenuOpen(false)}>Gallery</Link>
        <Link to="/#dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/shop" className="nav-link nav-shop-link" onClick={() => setMenuOpen(false)}>🏪 Shop</Link>
        {!user && (
          <div style={{ display: "flex", gap: 8, paddingTop: 8 }}>
            <Link to="/login" className="btn-nav-login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="btn-nav-signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </div>
        )}
        {user && (
          <button onClick={() => { logout(); setMenuOpen(false); }} style={{ background: "none", border: "none", color: "#F87171", cursor: "pointer", fontSize: 13, textAlign: "left", padding: "8px 0" }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   FANS PAGE components (restored)
───────────────────────────────────────────── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(c => c === 0 ? carouselPhotos.length - 1 : c - 1);
  const next = () => setCurrent(c => c === carouselPhotos.length - 1 ? 0 : c + 1);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => c === carouselPhotos.length - 1 ? 0 : c + 1), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="fans-hero" style={{ marginTop: 60 }}>
      <img src={carouselPhotos[current].src} alt={carouselPhotos[current].alt} className="fans-hero-img" />
      <div className="fans-hero-overlay" />
      <div className="fans-hero-content">
        <p className="fans-hero-num">#55</p>
        <h1 className="fans-hero-title">Carlos <span>Sainz</span></h1>
        <p className="fans-hero-sub">Formula 1 Driver for @williamsf1official and Smooth Operator</p>
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={prev}>‹</button>
          <div className="carousel-dots">
            {carouselPhotos.map((_, i) => (
              <button key={i} className={`carousel-dot ${i === current ? "active" : ""}`} onClick={() => setCurrent(i)} />
            ))}
          </div>
          <button className="carousel-btn" onClick={next}>›</button>
        </div>
      </div>
    </section>
  );
}

function Dashboard({ likes, totalLikes }) {
  const likedCount = likes.filter(l => l > 0).length;
  const maxLike = Math.max(...likes, 0);
  const mostPopularIndex = likes.indexOf(maxLike);
  const mostPopularTitle = maxLike > 0 ? cardData[mostPopularIndex]?.title : "—";
  const categories = ["Off Track", "Race Day", "Machine"];
  const likesPerCategory = categories.map(cat => cardData.reduce((s, c, i) => c.category === cat ? s + likes[i] : s, 0));
  const maxCatLike = Math.max(...likesPerCategory, 1);
  const barColors = ["#6EE7B7", "#F87171", "#60A5FA"];
  return (
    <section id="dashboard" className="dashboard-section">
      <div>
        <p className="section-eyebrow">LIVE STATS</p>
        <h2 className="section-title">Appreciation Dashboard</h2>
        <div className="dashboard-stats">
          <div className="stat-card"><p className="stat-label">Total Likes</p><p className="stat-value">{totalLikes}</p></div>
          <div className="stat-card"><p className="stat-label">Cards Liked</p><p className="stat-value">{likedCount}</p></div>
          <div className="stat-card"><p className="stat-label">Most Popular</p><p className="stat-value sm">{mostPopularTitle}</p></div>
        </div>
        <div className="dashboard-bars">
          <p style={{ color: "#fff", fontWeight: 700, marginBottom: 20 }}>Likes per Category</p>
          {categories.map((cat, i) => {
            const pct = (likesPerCategory[i] / maxCatLike) * 100;
            return (
              <div key={cat}>
                <div className="bar-label"><span>{cat}</span><span style={{ color: barColors[i], fontWeight: 700 }}>{likesPerCategory[i]}</span></div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.max(pct, 0)}%`, backgroundColor: barColors[i] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, likeCount, onLike }) {
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState(false);
  const catColors = {
    "Off Track": { border: "#6EE7B7", tag: "rgba(110,231,183,0.15)", text: "#6EE7B7" },
    "Race Day": { border: "#F87171", tag: "rgba(248,113,113,0.15)", text: "#F87171" },
    "Machine": { border: "#60A5FA", tag: "rgba(96,165,250,0.15)", text: "#60A5FA" },
  };
  const cs = catColors[item.category];
  const handleLike = () => { setAnimate(true); onLike(); setTimeout(() => setAnimate(false), 300); };
  return (
    <div
      className="gallery-card"
      style={{ borderColor: hovered ? cs.border : "#1C2E4A", borderWidth: hovered ? 3 : 2 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={item.image} alt={item.title} className="gallery-card-img" />
        <span style={{ position: "absolute", top: 12, left: 12, background: cs.tag, color: cs.text, fontSize: 10, letterSpacing: 2, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
          {item.category.toUpperCase()}
        </span>
      </div>
      <div className="gallery-card-body">
        <h3 className="gallery-card-title">{item.title}</h3>
        <p>{item.body}</p>
        <div className="like-btn-row">
          <button
            className={`like-btn ${likeCount > 0 ? "liked" : ""}`}
            onClick={handleLike}
            style={{ transform: animate ? "scale(1.15)" : "scale(1)" }}
          >
            <span style={{ fontSize: 20 }}>{likeCount > 0 ? "❤️" : "🤍"}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: likeCount > 0 ? "#F87171" : "#BDC4D4" }}>Like</span>
          </button>
          <span className="like-count">{likeCount} {likeCount === 1 ? "like" : "likes"}</span>
        </div>
      </div>
    </div>
  );
}

function FansFooter() {
  const IgIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#52677D" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="5" stroke="#52677D" strokeWidth="1.5"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="#52677D"/>
    </svg>
  );
  return (
    <footer id="about" className="fans-footer">
      <div className="footer-top">
        <img src={FOOTER_IMG} alt="Carlos Sainz" />
      </div>
      <div className="footer-bottom">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-row">
              <img src={LOGO_URL} alt="Sainz" />
              <div><span style={{ fontWeight: 800, fontSize: 16, color: "#0F1A2B" }}>SAINZ</span><span style={{ fontSize: 10, marginLeft: 6, letterSpacing: 3, color: "#52677D" }}>FANS PAGE</span></div>
            </div>
            <p className="footer-text">Carlos Sainz delivered an incredible victory for Williams Racing at the Azerbaijan Grand Prix in Baku, marking the team's first win in years. The Spaniard drove a flawless race with brilliant tire management and strategic overtakes.</p>
            <p className="footer-text">This result proved that Sainz's move to Williams was far from a step backward, reigniting one of Formula 1's most storied teams.</p>
            <a href="https://www.espn.com/racing/f1/story/_/id/46345403/carlos-sainz-baku-grand-prix-williams-formula-one-analysis" target="_blank" rel="noopener noreferrer" className="footer-link">Read Full Article on ESPN →</a>
          </div>
          <div>
            <p className="footer-nav-title">NAVIGATE</p>
            <nav className="footer-nav">
              <a href="#gallery">Gallery</a>
              <a href="#dashboard">Dashboard</a>
              <a href="#about">About</a>
              <Link to="/shop" style={{ color: "#E8303A", fontWeight: 700 }}>🏪 Shop</Link>
            </nav>
            <p className="footer-nav-title" style={{ marginTop: 28 }}>FOLLOW CARLOS SAINZ</p>
            <a href="https://www.instagram.com/carlossainz55/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <IgIcon /><span style={{ color: "#52677D", fontSize: 13, fontWeight: 500 }}>@carlossainz55</span>
            </a>
          </div>
          <div>
            <p className="footer-nav-title">LATEST POST</p>
            <a href="https://www.instagram.com/p/DXsHCnUCEOW/" target="_blank" rel="noopener noreferrer">
              <img src={POSTER_URL} alt="Latest Post" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
            </a>
          </div>
        </div>
        <div className="footer-copy">
          <p>© 2026 Carlos Sainz 55 Fans Page</p>
          <p>By Sabbia Meilandri Putri Delarosya</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE (fans page)
───────────────────────────────────────────── */
function HomePage() {
  const [likes, setLikes] = useState(new Array(cardData.length).fill(0));
  const totalLikes = likes.reduce((s, l) => s + l, 0);
  const handleLike = (idx) => {
    const nl = [...likes]; nl[idx] += 1; setLikes(nl);
    if ((totalLikes + 1) % 10 === 0) {
      setTimeout(() => alert(`🏎️ Amazing! ${totalLikes + 1} appreciations! Smooth Operator fans unite!`), 50);
    }
  };
  return (
    <>
      <HeroCarousel />
      <Dashboard likes={likes} totalLikes={totalLikes} />
      <section id="gallery" className="gallery-section">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-eyebrow">GALLERY</p>
          <h2 className="section-title">Carlos Sainz Collection</h2>
          <div className="gallery-grid">
            {cardData.map((item, i) => (
              <GalleryCard key={item.id} item={item} likeCount={likes[i]} onLike={() => handleLike(i)} />
            ))}
          </div>
        </div>
      </section>
      <FansFooter />
    </>
  );
}

/* ─────────────────────────────────────────────
   SHOP PAGE
───────────────────────────────────────────── */
function ShopPage() {
  const [activeCat, setActiveCat] = useState("All");
  const filtered = activeCat === "All" ? SHOP_PRODUCTS : SHOP_PRODUCTS.filter(p => p.category === activeCat);

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <p className="shop-hero-eyebrow">OFFICIAL MERCHANDISE</p>
        <h1 className="shop-hero-title">SAINZ<br /><span>STORE</span></h1>
        <p className="shop-hero-sub">Wear the legacy. Feel the speed.</p>
      </div>
      <div className="shop-controls">
        {SHOP_CATEGORIES.map(cat => (
          <button key={cat} className={`shop-cat-btn ${activeCat === cat ? "active" : ""}`} onClick={() => setActiveCat(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div className="shop-grid">
        {filtered.map(p => <ShopProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

function ShopProductCard({ product }) {
  const discPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;
  return (
    <Link to={`/shop/product/${product.id}`} className="prod-card">
      {product.tag && <span className={`prod-card-tag ${product.tag.toLowerCase()}`}>{product.tag}</span>}
      <div className="prod-card-img-wrap">
        <img src={product.images[0]} alt={product.name} />
        <div className="prod-card-overlay">
          <div className="prod-card-sizes">
            {product.sizes.slice(0, 5).map(s => <span key={s} className="prod-card-size-pill">{s}</span>)}
            {product.sizes.length > 5 && <span className="prod-card-size-pill">+{product.sizes.length - 5}</span>}
          </div>
        </div>
      </div>
      <div className="prod-card-body">
        <p className="prod-card-cat">{product.category.toUpperCase()}</p>
        <h3 className="prod-card-name">{product.name}</h3>
        <div className="prod-card-price">
          <span className="prod-card-price-main">{formatRp(discPrice)}</span>
          {product.discount > 0 && <>
            <span className="prod-card-price-orig">{formatRp(product.price)}</span>
            <span className="prod-card-disc">-{product.discount}%</span>
          </>}
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT DETAIL PAGE
───────────────────────────────────────────── */
function ProductDetailPage() {
  const { id } = useParams();
  const product = SHOP_PRODUCTS.find(p => p.id === id);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [imgIdx, setImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  if (!product) return (
    <div className="not-found-page" style={{ paddingTop: 80 }}>
      <h2>Product not found</h2>
      <Link to="/shop">← Back to Shop</Link>
    </div>
  );

  const discPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;
  const related = SHOP_PRODUCTS.filter(p => p.id !== id && p.category === product.category).slice(0, 3);

  const handleAddToCart = () => {
    if (!user) { navigate("/login"); return; }
    if (!selectedSize) { alert("Please select a size first!"); return; }
    addToCart(product, selectedSize);
    alert(`✅ "${product.name}" (${selectedSize}) ditambahkan ke keranjang!`);
  };
  const handleBuyNow = () => {
    if (!user) { navigate("/login"); return; }
    if (!selectedSize) { alert("Please select a size first!"); return; }
    addToCart(product, selectedSize);
    navigate("/cart");
  };

  const accordionItems = [
    { key: "details", label: "Product Details", content: <ul>{product.details.map((d,i) => <li key={i}>{d}</li>)}</ul> },
    { key: "desc", label: "Product Description", content: <p>{product.description}</p> },
    { key: "fit", label: "Product Fit", content: <p>{product.fit}</p> },
    { key: "ship", label: "Shipping and Returns", content: <p>{product.shipping}</p> },
  ];

  return (
    <div className="pd-page">
      <div className="pd-breadcrumb">
        <Link to="/shop">Shop</Link> / <span style={{ color: "#fff" }}>{product.name}</span>
      </div>
      <div className="pd-inner">
        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-main-img-wrap">
            <img src={product.images[imgIdx]} alt={product.name} />
            {product.images.length > 1 && (
              <div className="pd-img-nav">
                <button onClick={() => setImgIdx(i => i === 0 ? product.images.length - 1 : i - 1)}>‹</button>
                <span className="pd-img-counter">{imgIdx + 1} / {product.images.length}</span>
                <button onClick={() => setImgIdx(i => i === product.images.length - 1 ? 0 : i + 1)}>›</button>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="pd-thumbs">
              {product.images.map((img, i) => (
                <div key={i} className={`pd-thumb ${i === imgIdx ? "active" : ""}`} onClick={() => setImgIdx(i)}>
                  <img src={img} alt={`thumb-${i}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pd-info">
          <p className="pd-tag-line">SAINZ · OFFICIAL MERCH</p>
          <h1 className="pd-name">{product.name}</h1>
          <div className="pd-price-row">
            <span className="pd-price-main">{formatRp(discPrice)}</span>
            {product.discount > 0 && <>
              <span className="pd-price-orig">{formatRp(product.price)}</span>
              <span className="pd-disc-badge">-{product.discount}%</span>
            </>}
          </div>

          {!user && (
            <div className="pd-login-warning">
              ⚠️ <span>Kamu harus <Link to="/login" style={{ color: "#E8303A", fontWeight: 700 }}>login</Link> dulu untuk menambahkan produk ke keranjang.</span>
            </div>
          )}

          <div className="pd-sizes">
            <p className="pd-section-label">SIZE</p>
            <div className="pd-size-grid">
              {product.sizes.map(s => (
                <button key={s} className={`pd-size-btn ${selectedSize === s ? "active" : ""}`} onClick={() => setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="pd-actions">
            <button className="btn-add-cart" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="btn-buy-now" onClick={handleBuyNow}>
              ⚡ Buy Now
            </button>
          </div>

          {/* Accordion */}
          <div className="pd-accordion">
            {accordionItems.map(item => (
              <div key={item.key} className="pd-accordion-item">
                <button className="pd-accordion-btn" onClick={() => setOpenAccordion(openAccordion === item.key ? null : item.key)}>
                  {item.label} <span>{openAccordion === item.key ? "−" : "+"}</span>
                </button>
                {openAccordion === item.key && <div className="pd-accordion-body">{item.content}</div>}
              </div>
            ))}
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <p className="pd-section-label">YOU MIGHT ALSO LIKE</p>
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                {related.map(p => {
                  const dp = p.discount > 0 ? p.price * (1 - p.discount / 100) : p.price;
                  return (
                    <Link key={p.id} to={`/shop/product/${p.id}`} onClick={() => setImgIdx(0)} style={{ textDecoration: "none", flexShrink: 0, width: 140 }}>
                      <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #1C2E4A", background: "#0F1A2B", transition: "border-color 0.2s" }}>
                        <img src={p.images[0]} alt={p.name} style={{ width: "100%", height: 100, objectFit: "cover" }} />
                        <div style={{ padding: 8 }}>
                          <p style={{ fontSize: 11, color: "#BDC4D4", lineHeight: 1.3, marginBottom: 4 }}>{p.name.length > 30 ? p.name.slice(0, 30) + "…" : p.name}</p>
                          <p style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{formatRp(dp)}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CART PAGE
───────────────────────────────────────────── */
function CartPage() {
  const { cart, removeFromCart, updateQty, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { cartTotal } = useContext(CartContext);
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" />;

  const handleCheckout = () => {
    setPaid(true);
    setTimeout(() => { setCart([]); setPaid(false); navigate("/shop"); }, 3000);
  };

  if (paid) return (
    <div className="cart-page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="checkout-success-wrap">
        <div className="checkout-success-icon">🎉</div>
        <h2 className="checkout-success-title">Pembayaran Berhasil!</h2>
        <p className="checkout-success-sub">Terima kasih, {user.name || user.username}! Pesananmu sedang diproses. Redirecting...</p>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <h2 className="cart-page-title">🛒 Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🛍️</div>
            <p className="empty-state-text">Keranjang kamu kosong.</p>
            <Link to="/shop" style={{ color: "#E8303A", fontWeight: 700, textDecoration: "none", fontSize: 15 }}>→ Mulai belanja</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-wrap">
              {cart.map(item => {
                const dp = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
                return (
                  <div key={`${item.id}-${item.size}`} className="cart-item-card">
                    <img src={item.images[0]} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-size">Ukuran: {item.size}</p>
                      <p className="cart-item-price">{formatRp(dp)}</p>
                      <div className="cart-qty-row">
                        <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.size, -1)}>−</button>
                        <span className="cart-qty-num">{item.qty}</span>
                        <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.size, 1)}>+</button>
                        <button className="cart-remove-btn" onClick={() => removeFromCart(item.id, item.size)}>🗑 Hapus</button>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>{formatRp(dp * item.qty)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-summary-box">
              <h3 className="cart-summary-title">Ringkasan</h3>
              <div className="summary-row"><span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} item)</span><span>{formatRp(cartTotal)}</span></div>
              <div className="summary-row"><span>Ongkir</span><span>Gratis</span></div>
              <div className="summary-row"><span>Voucher</span><span>-Rp 0</span></div>
              <div className="summary-total">
                <span className="summary-total-label">Grand Total</span>
                <span className="summary-total-val">{formatRp(cartTotal)}</span>
              </div>
              <button className="btn-checkout-full" onClick={handleCheckout}>Checkout →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AUTH PAGES
───────────────────────────────────────────── */
function AuthPage({ type }) {
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState(
    type === "login"
      ? { email: "", password: "" }
      : { name: "", username: "", email: "", phone: "", password: "", confirmPassword: "" }
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (type === "register") {
        if (form.password !== form.confirmPassword) { setError("Password tidak cocok!"); setLoading(false); return; }
        const res = await api.register({ name: form.name, username: form.username, email: form.email, phone: form.phone, password: form.password });
        if (res.success) { navigate("/login"); }
        else { setError(res.message || "Registrasi gagal."); }
      } else {
        const res = await api.login(form.email, form.password);
        if (res.success) {
          const userData = res.data?.user || res.user || res.data;
          const token = res.data?.token || res.token || "";
          authLogin(userData, token);
          navigate("/");
        } else { setError(res.message || "Login gagal."); }
      }
    } catch {
      setError("Tidak bisa terhubung ke server. Pastikan backend sudah berjalan.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow" />
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <img src={LOGO_URL} alt="Sainz" />
          <div>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>SAINZ</p>
            <p style={{ color: "#52677D", fontSize: 10, letterSpacing: 3 }}>FANS PAGE</p>
          </div>
        </div>
        <h2 className="auth-title">{type === "login" ? "Welcome back 👋" : "Create account"}</h2>
        <p className="auth-sub">{type === "login" ? "Login untuk akses Shop & Cart" : "Daftar untuk belanja merchandise Sainz"}</p>
        <br />
        {error && <div className="auth-error">⚠️ {error}</div>}
        <form onSubmit={handleSubmit}>
          {type === "register" && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>FULL NAME</label>
                  <input required placeholder="Nama lengkap" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>USERNAME</label>
                  <input required placeholder="Username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>EMAIL</label>
                  <input type="email" required placeholder="email@kamu.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <small>Digunakan untuk login</small>
                </div>
                <div className="form-group">
                  <label>PHONE</label>
                  <input placeholder="08xxxxxxxxxx" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>PASSWORD</label>
                  <input type="password" required placeholder="Min. 8 karakter" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>CONFIRM PASSWORD</label>
                  <input type="password" required placeholder="Ulangi password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} />
                </div>
              </div>
            </>
          )}
          {type === "login" && (
            <>
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" required placeholder="email@kamu.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>PASSWORD</label>
                <input type="password" required placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              </div>
            </>
          )}
          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? "Mohon tunggu..." : type === "login" ? "Login →" : "Daftar →"}
          </button>
        </form>
        <div className="auth-divider"><span>ATAU</span></div>
        <Link to={type === "login" ? "/register" : "/login"} className="btn-auth-switch">
          {type === "login" ? "Belum punya akun? Sign Up" : "Sudah punya akun? Login"}
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP SHELL
───────────────────────────────────────────── */
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <GlobalStyles />
          <Routes>
            {/* Auth routes – no Navbar */}
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/register" element={<AuthPage type="register" />} />

            {/* All other routes – with Navbar */}
            <Route path="*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/shop/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="*" element={
                    <div className="not-found-page" style={{ paddingTop: 80 }}>
                      <h2 style={{ fontSize: 32 }}>404</h2>
                      <p style={{ color: "#BDC4D4" }}>Halaman tidak ditemukan.</p>
                      <Link to="/">← Kembali ke Home</Link>
                    </div>
                  } />
                </Routes>
              </>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
