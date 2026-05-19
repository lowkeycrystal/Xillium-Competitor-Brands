import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  Lightbulb,
  AlertTriangle,
  LayoutGrid,
  List,
  Target,
  Droplets,
  Check,
  Copy,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- DATA ---
const competitors = [
  {
    name: "MyMountainMover",
    main: "#3c9eb2",
    mainName: "Teal Blue",
    sub1: "#4cbfce",
    sub1Name: "Turquoise Blue",
    sub2: "#ff6e26",
    sub2Name: "Blaze Orange",
    url: "https://mymountainmover.com",
    typography:
      "Primary: Montserrat (Geometric Sans). Secondary: Open Sans. Gives a friendly, modern, and accessible vibe.",
    comparison:
      "MMM focuses heavily on 'Faith-Based' and specialized medical/business VAs. Xillium Enterprise stands out by offering a more structured, corporate-scale BPO model with rigorous data security, bypassing the boutique feel for enterprise reliability.",
    vibe: "Accessible, Faith-forward, Friendly",
    imagery:
      "Stock photos of smiling VAs and doctors; leans very heavily on standard professional lifestyle shots.",
    uiElements:
      "Rounded buttons, soft drop shadows, card interfaces that look almost like a consumer app.",
  },
  {
    name: "MedVa",
    main: "#0b319c",
    mainName: "True Blue",
    sub1: "#0b42a4",
    sub1Name: "Royal Blue",
    url: "https://medva.com",
    typography:
      "Primary: Poppins. Secondary: Roboto. Clean, rounded, very standard tech-startup look.",
    comparison:
      "MedVa is highly specialized in healthcare and dental. They emphasize clinical experience. Xillium competes by offering broader 'Enterprise Solutions' that scale across admin, clinical, and back-office, utilizing a more sophisticated tech-forward brand.",
    vibe: "Clinical, Startup-esque, Safe",
    imagery:
      "Very standard medical stock. Lots of stethoscopes, scrubs, and bright white backgrounds.",
    uiElements:
      "Extremely standard SaaS layout. Sharp corners, generic hero sections with 50/50 text/image splits.",
  },
  {
    name: "Neolytix",
    main: "#16215b",
    mainName: "Dark Sapphire",
    sub1: "#0070f8",
    sub1Name: "Azure Radiance",
    sub2: "#18e3a1",
    sub2Name: "Caribbean Green",
    url: "https://neolytix.com",
    typography:
      "Primary: Lato. Classic corporate sans-serif. Highly legible but lacks modern character.",
    comparison:
      "Neolytix is more of a healthcare consulting and marketing firm that also offers MSOs. Xillium's pure BPO/VA play is more focused and operationally scalable. Xillium's new deep navy/purple branding positions it as a more modern software-enabled service compared to Neolytix's traditional consulting look.",
    vibe: "Corporate, Analytics-driven, Dense",
    imagery:
      "Heavy use of data visualization mockups, charts, and traditional corporate consulting photography.",
    uiElements:
      "Information-dense layout, use of gradients, somewhat dated web 2.0 aesthetics in certain components.",
  },
  {
    name: "ApexTeleserv",
    main: "#0056b3",
    mainName: "Dark Cerulean",
    url: "https://apexteleserv.com",
    typography: "Primary: Arial/Helvetica. Very legacy web styling.",
    comparison:
      "Apex operates primarily in the traditional call center space. Xillium provides highly trained dedicated professionals. The visual gap is massive: Xillium looks like a modern tech-enabled partner, whereas Apex retains a highly dated 2010s aesthetic.",
    vibe: "Legacy, Teleco, Utilitarian",
    imagery: "Basic stock photos of people with headsets.",
    uiElements:
      "Standard blocky layouts, hard shadows, lack of dynamic spacing or modern web flow.",
  },
  {
    name: "DrCatalyst",
    main: "#42549f",
    mainName: "Lapis Lazuli",
    sub1: "#56afe3",
    sub1Name: "Picton Blue",
    sub2: "#e31e26",
    sub2Name: "Scarlet Red",
    url: "https://drcatalyst.com",
    typography: "Primary: Source Sans Pro. Neutral, UI-focused sans-serif.",
    comparison:
      "Direct competitor in medical VAs. DrCatalyst focuses on flat hourly rates and 'plug and play' VAs. Xillium's Enterprise approach emphasizes managed teams and integration, appealing to larger practices needing infrastructure, not just a temp worker.",
    vibe: "Transactional, Fast-paced, Aggressive",
    imagery:
      "Use of bold red accents to drive CTAs immediately. Fast conversions desired.",
    uiElements:
      "Chunky buttons, prominent forms, aggressive high-contrast badging.",
  },
  {
    name: "Phoenix Virtual Solutions",
    main: "#1e7ab9",
    mainName: "Cerulean",
    sub1: "#9f1f63",
    sub1Name: "Jazzberry Jam",
    url: "https://phoenixvirtualsolutions.com",
    typography:
      "Primary: Raleway. Elegant but sometimes thin and hard to read at small sizes.",
    comparison:
      "Focuses on healthcare revenue cycle management. Xillium covers RCM as well but packages it inside a more robust enterprise frame. Phoenix's brand feels boutique; Xillium's feels like an institutional partner.",
    vibe: "Boutique, Specialized, Polished",
    imagery: "Polished corporate lifestyle, heavily edited for lighting.",
    uiElements:
      "Elegant thin lines, airy whitespace, magenta/fuchsia high contrast accents.",
  },
  {
    name: "ExtendyourTeam",
    main: "#0047d0",
    mainName: "Cobalt Blue",
    sub1: "#f3b314",
    sub1Name: "Golden Fizz",
    url: "https://extendyourteam.com",
    typography: "Primary: Inter. Clean, highly modern tech typography.",
    comparison:
      "Strong competitor in the generic business VA space. They lean into the tech startup aesthetic. Xillium's enterprise positioning combined with a richer, darker color palette out-sophisticates their bright, playful startup look.",
    vibe: "Startup, Playful, Modern-Generic",
    imagery:
      "Doodles, vector abstract shapes mixed with modern casual headshots.",
    uiElements:
      "Pill buttons, floating elements, aggressive yellow high-lighting.",
  },
  {
    name: "20four7VA",
    main: "#30a0e7",
    mainName: "Azure Blue",
    sub1: "#f66e0a",
    sub1Name: "Tangerine",
    url: "https://20four7va.com",
    typography: "Primary: Roboto. Google's default utilitarian font.",
    comparison:
      "A volume player offering VAs for e-commerce, podcasting, and general admin. Xillium's focus on healthcare and 'Enterprise Solutions' creates a moat. 20four7VA looks like a gig platform; Xillium looks like a B2B infrastructure provider.",
    vibe: "Task-Oriented, Gig Economy, High-Volume",
    imagery:
      "Generic business stock, highly diverse but lacks a cohesive artistic direction.",
    uiElements:
      "Busy navigation, multiple CTA types simultaneously, bright orange urgent elements.",
  },
  {
    name: "myVA360",
    main: "#405ebf",
    mainName: "Ultramarine Blue",
    sub1: "#030009",
    sub1Name: "Dark Charcoal",
    url: "https://myva360.com",
    typography:
      "Primary: Playfair Display (Serif) headers with Sans-serif body. Lifestyle focused.",
    comparison:
      "Aimed at solopreneurs and lifestyle business owners (coaches, realtors). Xillium's Enterprise branding completely sidesteps this market to target serious medical groups and mid-market organizations.",
    vibe: "Lifestyle, Coaching, Solopreneur",
    imagery: "Instagram-style lifestyle shots, coffee cups, clean desks.",
    uiElements:
      "Serif headers giving an editorial feel, dark contrasting buttons.",
  },
  {
    name: "Portiva",
    main: "#053d4c",
    mainName: "Deep Teal",
    sub1: "#4bd684",
    sub1Name: "Emerald Green",
    sub2: "#f78f12",
    sub2Name: "Orange Yellow",
    url: "https://portiva.com",
    typography: "Primary: Open Sans. Very standard medical scribe styling.",
    comparison:
      "Specializes in medical scribing. While Portiva has specific niche dominance, Xillium offers a wider array of unified administrative scaling. Xillium's new brand looks significantly more premium than Portiva's dated, clinical web presence.",
    vibe: "Niche, Clinical Document, Functional",
    imagery: "Standard doctor/patient interactions, clipboards and screens.",
    uiElements:
      'Extremely functional, somewhat dated UI, green highlights for "go" or positivity.',
  },
  {
    name: "RemotoWorkforce",
    main: "#2e3192",
    mainName: "Indigo",
    sub1: "#ffa53b",
    sub1Name: "Orange Peel",
    sub2: "#bea88f",
    sub2Name: "Desert Sand",
    url: "https://remotoworkforce.com",
    typography: "Primary: Muli / Mulish. Friendly, rounded sans-serif.",
    comparison:
      "Focuses heavily on LATAM talent. Xillium's primary strength is its highly trained Philippines-based healthcare/enterprise talent. Xillium's dark enterprise branding projects higher security and compliance standards.",
    vibe: "Nearshore, Warm, Friendly",
    imagery: "Focus on LATAM culture in imagery. Warm lighting, team photos.",
    uiElements: "Warm orange accents, rounded components, inviting whitespace.",
  },
  {
    name: "VA.Care",
    main: "#cd022b",
    mainName: "Crimson Glory",
    sub1: "#f35900",
    sub1Name: "Orange Peel",
    url: "https://va.care",
    typography: "Primary: PT Sans. Compact and utilitarian.",
    comparison:
      "A budget-friendly option for sole practitioners. The bright red/orange brand implies urgency and low cost. Xillium's deep purple/navy signals stability, security, and premium quality.",
    vibe: "Urgent, High-Contrast, Budget",
    imagery: "Standard stock, less focus on brand aesthetic.",
    uiElements: "Harsh red branding commands immediate attention.",
  },
  {
    name: "HelloRache",
    main: "#9925aa",
    mainName: "Royal Fuchsia",
    url: "https://hellorache.com",
    typography:
      "Primary: Nunito. Extremely rounded and friendly, appealing to private practice owners.",
    comparison:
      "The biggest direct competitor in medical VAs. HelloRache is highly successful with a very friendly, accessible brand. Xillium Enterprise Solutions counters this by targeting the 'next level up'—clinics and hospitals that need managed teams, not just individual friendly VAs. Xillium's bold, sharp typography contrasts HelloRache's soft approach.",
    vibe: "Approachable, Friendly, Soft",
    imagery:
      "High quality photography of clearly friendly, smiling individuals. Focus on approachability.",
    uiElements:
      "Everything is rounded. Buttons are pill-shaped, fonts are bubbly. Very anti-corporate.",
  },
  {
    name: "Pineapple Staffing",
    main: "#94a469",
    mainName: "Moss Green",
    sub1: "#f8d366",
    sub1Name: "Golden Rod",
    url: "https://pineapplestaffing.com",
    typography: "Primary: DM Sans. Trendy, Gen-Z/Millennial startup aesthetic.",
    comparison:
      "Highly lifestyle-oriented brand. Fun, vibrant, and appeals to small creative agencies. Xillium operates in an entirely different weight class, targeting compliance-heavy healthcare and enterprise clients where Pineapple would feel too informal.",
    vibe: "Quirky, Gen-Z, Design-Forward",
    imagery:
      "Highly stylized, colorful backgrounds, heavily curated aesthetic.",
    uiElements:
      "Brutalism-lite, bold large typography, yellow/green disruptive components.",
  },
];

const colorDistribution = [
  { name: "Blue / Teal", value: 10, color: "#1e7ab9" },
  { name: "Purple / Indigo", value: 2, color: "#6b21a8" },
  { name: "Red / Crimson", value: 1, color: "#cd022b" },
  { name: "Green", value: 1, color: "#94a469" },
];

const XILLIUM = {
  name: "Xillium Enterprise Solutions",
  oldMain: "#173A64",
  oldMainName: "Midnight Blue",
  oldSub: "#2DA3DC",
  oldSubName: "Cerulean Frost",
  colors: [
    { hex: "#000051", name: "Dark Navy" },
    { hex: "#000080", name: "Navy Blue" },
    { hex: "#4000C0", name: "Deep Purple" },
    { hex: "#6000E0", name: "Vivid Purple" },
    { hex: "#7F00FF", name: "Electric Violet" },
  ],
};

// --- COMPONENTS ---
const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-[#0A0A0A] border border-[#262626] overflow-hidden",
      className,
    )}
  >
    {children}
  </div>
);

const ColorSwatch = ({
  hex,
  name,
  label,
}: {
  hex: string;
  name: string;
  label: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 w-full group">
      <div
        className="w-12 h-12 border border-white/10 flex-shrink-0 relative overflow-hidden"
        style={{ backgroundColor: hex }}
      >
        <button
          onClick={handleCopy}
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
          title="Copy Hex"
        >
          {copied ? (
            <Check className="w-4 h-4 text-white" />
          ) : (
            <Copy className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-[10px] font-bold text-[#737373] uppercase tracking-widest">
          {label}
        </span>
        <span className="text-sm font-semibold text-[#E5E5E5] truncate">
          {name}
        </span>
        <span className="text-xs text-[#A3A3A3] font-mono flex items-center gap-2">
          {hex.toUpperCase()}
          {copied && (
            <span className="text-[10px] text-[#10B981]">Copied!</span>
          )}
        </span>
      </div>
    </div>
  );
};

const SectionHeading = ({
  icon: Icon,
  title,
  description,
  accentColor = "#6366F1",
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  accentColor?: string;
}) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <div
        className="p-1.5 bg-[#171717] border border-[#262626] flex items-center justify-center text-[#E5E5E5]"
        style={{ color: accentColor }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <h2 className="text-xl font-display font-extrabold tracking-tight text-[#F5F5F5]">
        {title}
      </h2>
    </div>
    {description && (
      <p className="text-sm text-[#A3A3A3] ml-11">{description}</p>
    )}
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [activeTabs, setActiveTabs] = useState<
    Record<string, "visuals" | "typography" | "strategic">
  >({});

  const setTab = (
    compName: string,
    tab: "visuals" | "typography" | "strategic",
  ) => {
    setActiveTabs((prev) => ({ ...prev, [compName]: tab }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] pb-24">
      {/* Header */}
      <header className="pt-16 pb-32 px-6 border-b border-[#262626] bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#A3A3A3] text-xs tracking-[0.3em] font-semibold uppercase mb-4">
              <BarChart3 className="w-3.5 h-3.5 text-[#6000E0]" />
              Strategic Analysis
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-[#F5F5F5] mb-4">
              Competitor Brand Analysis
            </h1>
            <p className="text-[#A3A3A3] max-w-2xl text-lg leading-relaxed">
              A comprehensive review of visual branding, typography, and
              strategic positioning across the virtual assistance and BPO sector
              for Xillium Enterprise Solutions.
            </p>
          </div>
          <div className="border border-[#262626] bg-[#171717] p-4 flex items-center gap-4 min-w-[280px]">
            <div className="w-14 h-14 bg-[#000051] border border-white/10 flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-r from-[#6000E0] to-[#7F00FF]"></div>
            </div>
            <div>
              <h3 className="text-[#F5F5F5] font-display font-black tracking-tight flex items-center gap-2">
                Xillium Enterprise
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              </h3>
              <p className="text-xs text-[#A3A3A3] font-mono mt-0.5">
                #000051 / #7F00FF
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-20">
        {/* Executive Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Risks */}
          <Card className="lg:col-span-1 p-6 relative group border-[#6000E0]/30 bg-[#6000E0]/5">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target className="w-32 h-32 text-[#6000E0]" />
            </div>
            <SectionHeading
              icon={Target}
              title="Industry Context: The Sea of Blue"
              accentColor="#6000E0"
            />
            <div className="space-y-5">
              <p className="text-[#A3A3A3] leading-relaxed text-sm relative z-10">
                <strong className="text-[#F5F5F5]">71% of competitors</strong>{" "}
                (10 out of 14) utilize standard blue as their primary brand
                color. This stems from traditional corporate psychology
                associating blue with trust, healthcare, and security.
              </p>
              <div className="p-4 border border-[#6000E0]/30 bg-[#171717]/80 relative z-10">
                <h4 className="text-[#6000E0] font-bold font-display text-xs uppercase tracking-widest mb-2">
                  Xillium's Advantage
                </h4>
                <p className="text-[#E5E5E5] text-xs leading-relaxed">
                  By pivoting to{" "}
                  <span className="font-mono text-[#A3A3A3]">
                    Deep Navy (#000051)
                  </span>{" "}
                  and a{" "}
                  <span className="font-mono text-[#A3A3A3]">
                    Vibrant Purple gradient (#7F00FF)
                  </span>
                  , Xillium Enterprise Solutions successfully differentiates
                  itself from the generic medical blue used by MedVa and
                  DrCatalyst, signaling high-tier tech and innovation.
                </p>
              </div>
            </div>
          </Card>

          {/* Color Distribution Chart */}
          <Card className="lg:col-span-1 p-6 flex flex-col items-center justify-center">
            <h3 className="w-full text-center text-xs font-bold tracking-widest uppercase text-[#F5F5F5] mb-2">
              Competitor Primary Color Breakdown
            </h3>
            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={colorDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {colorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: "0",
                      border: "1px solid #262626",
                      backgroundColor: "#0A0A0A",
                      boxShadow: "none",
                    }}
                    itemStyle={{
                      color: "#E5E5E5",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {colorDistribution.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-xs text-[#A3A3A3] bg-[#171717] border border-[#262626] px-3 py-1.5 rounded-sm"
                >
                  <span
                    className="w-2.5 h-2.5"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </Card>

          {/* Strategic Suggestions */}
          <Card className="lg:col-span-1 p-6 border-[#262626] bg-[#171717]">
            <SectionHeading
              icon={Lightbulb}
              title="Market Positioning"
              accentColor="#10B981"
            />
            <ul className="space-y-5 mt-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5 text-[#10B981] font-bold text-xs tracking-wider">
                  01.
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display text-[#F5F5F5] uppercase tracking-widest">
                    The "Tech-Forward" Signal
                  </h4>
                  <p className="text-xs text-[#A3A3A3] mt-2 leading-relaxed">
                    By heavily featuring Purple/Violet (
                    <em className="text-[#E5E5E5]">#7F00FF</em>), Xillium
                    positions itself closer to SaaS and AI technology platforms,
                    contrasting the traditional BPO/staffing feel of{" "}
                    <em className="text-[#E5E5E5]">MyMountainMover</em> or{" "}
                    <em className="text-[#E5E5E5]">ApexTeleserv</em>.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5 text-[#10B981] font-bold text-xs tracking-wider">
                  02.
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display text-[#F5F5F5] uppercase tracking-widest">
                    Typography Modernization
                  </h4>
                  <p className="text-xs text-[#A3A3A3] mt-2 leading-relaxed">
                    The shift to <em className="text-[#E5E5E5]">Nunito Sans</em>{" "}
                    as the primary display font brings a clean, geometric
                    authority to the brand, complementing the strict{" "}
                    <em className="text-[#E5E5E5]">Inter</em> body copy.
                  </p>
                </div>
              </li>
            </ul>
          </Card>
        </div>

        {/* Xillium Evolution Banner */}
        <div className="mb-12">
          <Card className="p-0 flex flex-col md:flex-row items-stretch">
            <div className="p-8 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#262626] bg-[#0A0A0A]">
              <h2 className="text-2xl font-display font-extrabold text-[#F5F5F5] mb-2">
                Brand Evolution
              </h2>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">
                Transitioning from standard medical blue to an innovative,
                high-contrast enterprise violet identity.
              </p>
            </div>

            <div className="md:w-1/3 p-8 flex flex-col gap-6 relative justify-center bg-[#171717]">
              <div className="absolute top-4 right-5">
                <span className="text-[10px] font-bold text-[#737373] tracking-widest uppercase border border-[#262626] bg-[#0A0A0A] px-2 py-1">
                  Previous
                </span>
              </div>
              <ColorSwatch
                hex={XILLIUM.oldMain}
                name={XILLIUM.oldMainName}
                label="Primary Color"
              />
              <ColorSwatch
                hex={XILLIUM.oldSub}
                name={XILLIUM.oldSubName}
                label="Secondary Color"
              />
            </div>

            <div className="w-12 flex items-center justify-center -mx-6 z-10 hidden md:flex">
              <div className="w-10 h-10 bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-[#A3A3A3]">
                &rarr;
              </div>
            </div>

            <div className="md:w-1/3 p-8 flex flex-col gap-6 relative justify-center border-l md:border-l-0 border-[#262626] bg-[#6000E0]/5">
              <div className="absolute top-4 right-5">
                <span className="text-[10px] font-bold text-[#6000E0] tracking-widest uppercase border border-[#6000E0]/30 bg-[#0A0A0A] px-2 py-1">
                  New Brand
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {XILLIUM.colors.map((color) => (
                  <ColorSwatch
                    key={color.hex}
                    hex={color.hex}
                    name={color.name}
                    label="Palette"
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Competitors List */}
        <div className="flex items-center justify-between mb-8 mt-16 pt-8 border-t border-[#262626]">
          <SectionHeading
            icon={Target}
            title="The Competitor Matrix"
            description="Detailed breakdown of colors, typography, and strategic positioning."
            accentColor="#6000E0"
          />
        </div>

        <motion.div
          layout
          className="grid gap-6 transition-all pb-12 grid-cols-1"
        >
          <AnimatePresence>
            {competitors.map((comp, idx) => {
              // Analyze remarks dynamically
              let remarks = "";
              let isHighContrast = false;
              let isHighlyDistinct = false;

              const mainLower = comp.main.toLowerCase();
              if (
                mainLower === "#9925aa" ||
                mainLower === "#cd022b" ||
                mainLower === "#94a469"
              ) {
                isHighlyDistinct = true;
                remarks =
                  "Stands out significantly by avoiding the industry-standard blue. It captures attention immediately in a sea of corporate palettes.";
              } else if (
                comp.sub1 &&
                (comp.sub1 === "#f3b314" ||
                  comp.sub1 === "#f66e0a" ||
                  comp.sub1 === "#ffa53b" ||
                  comp.sub1 === "#f35900" ||
                  comp.sub1 === "#f8d366")
              ) {
                isHighContrast = true;
                remarks =
                  "Strong visual contrast pairing a corporate base with an aggressive, warm secondary color. Excellent for catching the eye and highlighting CTAs.";
              } else if (
                comp.sub2 &&
                (comp.sub2 === "#ff6e26" ||
                  comp.sub2 === "#e31e26" ||
                  comp.sub2 === "#f78f12")
              ) {
                isHighContrast = true;
                remarks =
                  "Uses a bold tertiary warm accent to bring energy and approachability to an otherwise standard corporate palette.";
              } else {
                remarks =
                  "Highly traditional safe 'medical/corporate' feeling. High risk of blending in and being forgettable without exceptionally strong supporting typography or UI design.";
              }

              const activeTab = activeTabs[comp.name] || "visuals";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={comp.name}
                >
                  <Card className="h-full hover:border-[#6000E0]/50 transition-all duration-300 flex flex-col md:flex-row items-stretch">
                    <div className="p-5 border-[#262626] flex flex-col h-full bg-[#0A0A0A] border-b md:border-b-0 md:border-r md:w-[40%] xl:w-[30%]">
                      <h3 className="text-[#F5F5F5] text-xs font-bold tracking-widest uppercase mb-1">
                        {comp.name}
                      </h3>
                      <a
                        href={comp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-wider text-[#10B981] hover:text-[#34D399] transition-colors mb-5 inline-flex w-fit uppercase font-mono"
                      >
                        {comp.url.replace("https://", "")}
                      </a>

                      <div className="flex flex-col gap-4 mt-auto">
                        <ColorSwatch
                          hex={comp.main}
                          name={comp.mainName}
                          label="Main Color"
                        />
                        {comp.sub1 && (
                          <ColorSwatch
                            hex={comp.sub1}
                            name={comp.sub1Name}
                            label="Sub Color 1"
                          />
                        )}
                        {comp.sub2 && (
                          <ColorSwatch
                            hex={comp.sub2}
                            name={comp.sub2Name}
                            label="Sub Color 2"
                          />
                        )}
                      </div>
                    </div>

                    <div className="p-0 bg-[#171717] flex-1 flex flex-col">
                      {/* Tabs Header */}
                      <div className="flex border-b border-[#262626] bg-[#0A0A0A]/50">
                        <button
                          onClick={() => setTab(comp.name, "visuals")}
                          className={cn(
                            "flex-1 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors",
                            activeTab === "visuals"
                              ? "border-[#6000E0] text-[#F5F5F5]"
                              : "border-transparent text-[#737373] hover:text-[#A3A3A3]",
                          )}
                        >
                          Visual Identity
                        </button>
                        <button
                          onClick={() => setTab(comp.name, "typography")}
                          className={cn(
                            "flex-1 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors",
                            activeTab === "typography"
                              ? "border-[#6000E0] text-[#F5F5F5]"
                              : "border-transparent text-[#737373] hover:text-[#A3A3A3]",
                          )}
                        >
                          Typography
                        </button>
                        <button
                          onClick={() => setTab(comp.name, "strategic")}
                          className={cn(
                            "flex-1 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors",
                            activeTab === "strategic"
                              ? "border-[#10B981] text-[#F5F5F5]"
                              : "border-transparent text-[#737373] hover:text-[#A3A3A3]",
                          )}
                        >
                          Strategic Review
                        </button>
                      </div>

                      {/* Tab Content */}
                      <div className="p-6 flex flex-col flex-1">
                        {activeTab === "visuals" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col h-full gap-4"
                          >
                            <div>
                              <h4 className="text-[10px] uppercase font-bold text-[#6000E0] tracking-widest mb-1 mt-1">
                                Mood & Vibe
                              </h4>
                              <p className="text-sm font-semibold text-[#E5E5E5]">
                                {comp.vibe}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-[10px] uppercase font-bold text-[#A3A3A3] tracking-widest mb-1">
                                Photography Direction
                              </h4>
                              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                                {comp.imagery}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-[10px] uppercase font-bold text-[#A3A3A3] tracking-widest mb-1">
                                UI & Layout Components
                              </h4>
                              <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
                                {comp.uiElements}
                              </p>
                            </div>

                            <div className="flex gap-2 flex-wrap mt-auto pt-4 border-t border-[#262626]">
                              <span className="text-[10px] font-mono text-[#737373] mr-2 my-auto">
                                Color Remarks:
                              </span>
                              {isHighlyDistinct && (
                                <span className="px-2 py-1 text-[#10B981] text-[10px] font-bold uppercase tracking-widest border border-[#10B981]/30">
                                  Distinctive Base
                                </span>
                              )}
                              {isHighContrast && (
                                <span className="px-2 py-1 text-[#FACC15] text-[10px] font-bold uppercase tracking-widest border border-[#FACC15]/30">
                                  High Contrast Pop
                                </span>
                              )}
                              {!isHighContrast && !isHighlyDistinct && (
                                <span className="px-2 py-1 text-[#A3A3A3] text-[10px] font-bold uppercase tracking-widest border border-[#262626]">
                                  Traditional / Safe
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {activeTab === "typography" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col h-full"
                          >
                            <h4 className="text-[#E5E5E5] font-serif italic text-lg mb-3">
                              Typography Profile
                            </h4>
                            <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
                              {comp.typography}
                            </p>
                          </motion.div>
                        )}

                        {activeTab === "strategic" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col h-full"
                          >
                            <h4 className="text-[#E5E5E5] font-serif italic text-lg mb-3">
                              vs Xillium Enterprise
                            </h4>
                            <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
                              {comp.comparison}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer Bar */}
      <footer className="mt-24 bg-[#0F172A] px-8 py-4 flex flex-col md:flex-row justify-between items-center border-t border-white/5 gap-4">
        <div className="text-[10px] text-[#475569] font-mono tracking-[0.2em] uppercase">
          Xillium Brand Audit // 2025
        </div>
        <div className="flex gap-6">
          <div className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider">
            Confidential
          </div>
          <div className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider">
            Internal Release Only
          </div>
        </div>
      </footer>
    </div>
  );
}
