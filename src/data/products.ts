export interface Product {
  id: string;
  name: string;
  category: 'Running' | 'Football' | 'Basketball' | 'Lifestyle' | 'Training' | 'Apparel';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage?: string;
  description: string;
  features: string[];
  techSpecs: { label: string; value: string }[];
  sizes: string[];
  colors: { name: string; hex: string; image: string }[];
  isLimited?: boolean;
  stockLeft?: number;
  gallery360?: string[];
}


export const products: Product[] = [
  {
    id: "phantom-alpha",
    name: "FOX Phantom Alpha",
    category: "Running",
    price: 220,
    rating: 4.9,
    reviewsCount: 124,
    image: "/images/cyber_fox.png",
    description: "Engineered for elite runners. Features a curved full-length Carbon Fiber Plate embedded in our energy-returning dual-density foam to shave seconds off your personal best.",
    features: [
      "Full-length curved carbon fiber plate for maximum propulsive snap",
      "VaporKnit upper offers breathable, sock-like comfort",
      "Dynamic rubber grip sole for traction in all weather conditions",
      "Unmatched lightweight cushioning with dual-density foam"
    ],
    techSpecs: [
      { label: "Weight", value: "6.8 oz / 193 g (Men's size 9)" },
      { label: "Offset", value: "8mm (Forefoot: 32mm, Heel: 40mm)" },
      { label: "Cushioning", value: "Maximum Energy Return" },
      { label: "Plate Material", value: "100% Autoclaved Carbon Fiber" }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Neon Green", hex: "#39ff14", image: "/images/cyber_fox.png" },
      { name: "Electric Blue", hex: "#00e5ff", image: "/images/cyber_fox.png" }
    ],
    gallery360: ["/images/cyber_fox.png"]
  },
  {
    id: "strike-v1",
    name: "FOX Strike V1 Elite",
    category: "Football",
    price: 240,
    rating: 4.8,
    reviewsCount: 89,
    image: "/images/football_boot.png",
    description: "Engineered with a micro-textured synthetic upper and an innovative Ultra Grip sole configuration. Built to provide absolute traction and high-speed stability on firm ground pitches.",
    features: [
      "Aero-Grid textured synthetic upper for superior touch and control",
      "Carbon-matrix outsole plate provides structural stiffness and responsiveness",
      "Precision stud layout optimized for explosive acceleration and agile cuts",
      "Low-profile collar provides a natural locked-in feel"
    ],
    techSpecs: [
      { label: "Weight", value: "7.1 oz / 201 g" },
      { label: "Best For", value: "Firm Ground (FG) Pitches" },
      { label: "Upper", value: "Fox-Grip Microtexturized Synthetic" },
      { label: "Lacing", value: "Off-center asymmetrical speed laces" }
    ],
    sizes: ["8", "9", "10", "11"],
    colors: [
      { name: "Electric Blue", hex: "#00e5ff", image: "/images/football_boot.png" },
      { name: "Volt Yellow", hex: "#ccff00", image: "/images/football_boot.png" }
    ]
  },
  {
    id: "apex-court",
    name: "FOX Apex Court",
    category: "Basketball",
    price: 200,
    rating: 4.7,
    reviewsCount: 156,
    image: "/images/fox_basketball.png",
    description: "Unlock high-flying performance with locked-in stability. Apex Court features custom responsive air cushioning in the heel and forefoot, shielded by a carbon wrap-around wing.",
    features: [
      "Multi-directional herringbone traction pattern for elite stopping power",
      "Zoom-Air inspired pressurized cushion cells for energetic spring-back",
      "High-top padded collar for supreme ankle protection and comfort",
      "TPU side stabilizers prevent foot slippage during lateral cuts"
    ],
    techSpecs: [
      { label: "Weight", value: "14.2 oz / 402 g" },
      { label: "Cushioning", value: "Pressurized Air Cushion Cells" },
      { label: "Shank", value: "Composite midfoot stability shank" },
      { label: "Collar Height", value: "High-Top" }
    ],
    sizes: ["9", "10", "11", "12", "13"],
    colors: [
      { name: "Carbon Black / Orange", hex: "#ff5e00", image: "/images/fox_basketball.png" },
      { name: "Cyber White", hex: "#ffffff", image: "/images/fox_basketball.png" }
    ]
  },
  {
    id: "urban-pulse",
    name: "FOX Urban Pulse",
    category: "Lifestyle",
    price: 160,
    rating: 4.6,
    reviewsCount: 212,
    image: "/images/fox_urban.png",
    description: "The ultimate streetwear statement. Blends our premium athletic comfort with minimalist aesthetic lines. Features a supple leather upper and a lightweight shock-absorbing midsole.",
    features: [
      "Premium full-grain leather upper with dynamic silver metallic overlays",
      "Sculpted light foam midsole for all-day comfort",
      "Padded mesh tongue and collar with neon detail stitching",
      "Non-marking solid rubber cupsole for long-lasting wear"
    ],
    techSpecs: [
      { label: "Weight", value: "11.5 oz / 326 g" },
      { label: "Material", value: "Full-Grain Leather & Mesh" },
      { label: "Style", value: "Low-Top Lifestyle" },
      { label: "Insole", value: "Removable memory foam sockliner" }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Cyber White / Silver", hex: "#ffffff", image: "/images/fox_urban.png" },
      { name: "Volt / Carbon", hex: "#ccff00", image: "/images/fox_urban.png" }
    ]
  },

  {
    id: "carbon-drop",
    name: "AUTOCLAVE CARBON 001",
    category: "Lifestyle",
    price: 350,
    rating: 5.0,
    reviewsCount: 37,
    image: "/images/fox_carbon_volt.png",
    description: "EXTREMELY LIMITED DROP. Only 100 pairs manufactured. Built with direct autoclave raw carbon fiber panels, custom serialized neon lace locks, and premium velvet dust bag packaging.",
    features: [
      "Individually serialized laser engraving on the tongue plate",
      "Exposed genuine carbon fiber structural panels",
      "Special edition neon-orange glow in the dark outsole",
      "Includes collector's edition matte black acrylic showcase box"
    ],
    techSpecs: [
      { label: "Release", value: "Edition of 100 (Serialized)" },
      { label: "Finish", value: "Raw Carbon Fiber & Volt Glow" },
      { label: "Box", value: "Matte Black Display Acrylic Box" },
      { label: "Lacing", value: "Quick-lace magnetic lock system" }
    ],
    sizes: ["9", "10", "11"],
    colors: [
      { name: "Carbon Volt Drop", hex: "#ccff00", image: "/images/fox_carbon_volt.png" }
    ],
    isLimited: true,
    stockLeft: 7
  },
  {
    id: "aero-knit-trainer",
    name: "FOX Aero Knit Trainer",
    category: "Training",
    price: 150,
    rating: 4.5,
    reviewsCount: 64,
    image: "/images/fox_trainer.png",
    description: "Designed for high-intensity training. The flat, wide heel creates a stable base for lifting, while the breathable knit upper keeps you cool during dynamic agility drills.",
    features: [
      "Engineered knit upper with elastic compression zones for adaptive lock",
      "Flat, wide rubber outsole creates maximum ground contact stability",
      "Dual-density midsole for heavy squats and dynamic box jumps",
      "Integrated side wrap rubber traction wraps the midfoot for rope climbs"
    ],
    techSpecs: [
      { label: "Weight", value: "10.4 oz / 295 g" },
      { label: "Heel Drop", value: "4mm for flat lifting stability" },
      { label: "Climb Assist", value: "High-wear midfoot rubber arches" }
    ],
    sizes: ["8", "9", "10", "11", "12"],
    colors: [
      { name: "Neon Volt", hex: "#39ff14", image: "/images/fox_trainer.png" },
      { name: "Graphite", hex: "#171717", image: "/images/fox_trainer.png" }
    ]
  },
  {
    id: "aethelion-elite",
    name: "FOX Aethelion Elite",
    category: "Running",
    price: 195,
    rating: 4.8,
    reviewsCount: 42,
    image: "/images/limited_shoe.png",
    description: "Premium neutral running shoe built for high-mileage comfort. Features advanced lightweight foam cushioning and a seamless mesh upper for supreme breathability.",
    features: [
      "Ultra-responsive Nitro-Core cushioning system",
      "Seamless engineered mesh upper to reduce friction",
      "Reinforced carbon-rubber outsole for high durability",
      "Integrated heel counter for locked-in stability"
    ],
    techSpecs: [
      { label: "Weight", value: "9.2 oz / 260 g" },
      { label: "Drop", value: "10mm" },
      { label: "Arch Support", value: "Neutral" }
    ],
    sizes: ["8", "9", "10", "11", "12"],
    colors: [
      { name: "Glacier Grey / Blue", hex: "#a3b1c6", image: "/images/limited_shoe.png" }
    ]
  },
  {
    id: "velocity-shorts",
    name: "FOX Velocity Run Shorts",
    category: "Apparel",
    price: 55,
    rating: 4.7,
    reviewsCount: 78,
    image: "/images/fox_athlete.png",
    description: "Ultra-lightweight running shorts engineered for zero-distraction miles. Crafted with moisture-wicking recycled fabric and bonded seams to prevent chafing.",
    features: [
      "4-way stretch fabric maximizes natural range of motion",
      "Laser-cut ventilation holes along the sides for cooling",
      "Secure zippered rear pocket fits modern smartphone sizes",
      "Reflective neon branding for high-visibility training runs"
    ],
    techSpecs: [
      { label: "Inseam", value: "5 inches" },
      { label: "Material", value: "88% Recycled Polyester, 12% Spandex" },
      { label: "Lining", value: "Built-in breathable compression brief" }
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Carbon Black", hex: "#000000", image: "/images/fox_athlete.png" }
    ]
  },
  {
    id: "aeroflow-tee",
    name: "FOX AeroFlow Compression Tee",
    category: "Apparel",
    price: 65,
    rating: 4.8,
    reviewsCount: 92,
    image: "/images/fox_athlete.png",
    description: "Next-generation athletic compression wear. Designed with specialized muscle-mapping panels to support blood flow and reduce recovery time.",
    features: [
      "Graduated compression supports key upper body muscle groups",
      "AeroFlow ventilation meshes on back and underarms",
      "Flatlock seams prevent skin irritation over long sessions",
      "Anti-microbial and quick-dry premium yarn construction"
    ],
    techSpecs: [
      { label: "Fit", value: "Second-Skin High Compression" },
      { label: "Material", value: "78% Nylon, 22% Elastane" },
      { label: "Sun Protection", value: "UPF 50+ UV protection rating" }
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Black", hex: "#0a0a0a", image: "/images/fox_athlete.png" }
    ]
  },
];
