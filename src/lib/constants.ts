export const APP_NAME = "MelodyGigs";
export const APP_DESCRIPTION =
  "The premier marketplace connecting music professionals, creative artists, and clients across Africa and worldwide.";

export const PLATFORM_COMMISSION_RATE = Number(
  process.env.PLATFORM_COMMISSION_RATE ?? 5
);

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    maxAds: 2,
    maxGigApplications: 5,
    maxPortfolioItems: 5,
    features: [
      "2 active adverts",
      "Basic profile",
      "Basic search visibility",
      "Unlimited inquiries",
      "Apply to 5 active gigs",
    ],
  },
  PROFESSIONAL: {
    name: "Professional",
    price: 30,
    maxAds: 10,
    maxGigApplications: Infinity,
    maxPortfolioItems: Infinity,
    features: [
      "Up to 10 adverts",
      "Featured placement",
      "Higher search ranking",
      "Homepage priority",
      "Pro badge",
      "Analytics dashboard",
      "Unlimited portfolio items",
      "Priority support",
    ],
  },
  UNLIMITED: {
    name: "Unlimited",
    price: 50,
    maxAds: Infinity,
    maxGigApplications: Infinity,
    maxPortfolioItems: Infinity,
    features: [
      "Unlimited active adverts",
      "Premium badge",
      "Highest homepage priority",
      "Highest search ranking",
      "Featured creator spotlight",
      "Advanced analytics",
      "Early access to features",
      "Dedicated premium support",
    ],
  },
} as const;

export const CREATOR_CATEGORIES = [
  "Music Producer",
  "Mixing Engineer",
  "Mastering Engineer",
  "Song Writer",
  "Vocalist",
  "Instrumentalist",
  "Session Musician",
  "Guitar Player",
  "Pianist",
  "Bass Player",
  "Drummer",
  "Saxophone Player",
  "Trumpet Player",
  "Church Band",
  "Live Band",
  "Event Band",
  "DJ",
  "Video Creator",
  "Photographer",
  "Videographer",
  "Graphics Designer",
  "Cover Art Designer",
  "Content Creator",
  "Voice Over Artist",
  "Beat Maker",
  "Composer",
  "Music Director",
] as const;

export const POPULAR_CATEGORIES = [
  "Music Producer",
  "Mixing Engineer",
  "Vocalist",
  "Instrumentalist",
  "Live Band",
  "DJ",
  "Beat Maker",
  "Video Creator",
] as const;

export const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "price_low", label: "Lowest Price" },
  { value: "price_high", label: "Highest Price" },
  { value: "reviews", label: "Most Reviews" },
  { value: "hired", label: "Most Hired" },
] as const;

export const NAV_LINKS = {
  public: [
    { href: "/search", label: "Find Creators" },
    { href: "/gigs", label: "Browse Gigs" },
    { href: "/categories", label: "Categories" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ],
  client: [
    { href: "/dashboard/client", label: "Overview" },
    { href: "/dashboard/client/projects", label: "Projects" },
    { href: "/dashboard/client/gigs", label: "Posted Gigs" },
    { href: "/dashboard/client/payments", label: "Payments" },
    { href: "/dashboard/client/messages", label: "Messages" },
    { href: "/dashboard/client/saved", label: "Saved Creators" },
    { href: "/dashboard/client/reviews", label: "Reviews" },
    { href: "/dashboard/client/settings", label: "Settings" },
  ],
  creator: [
    { href: "/dashboard/creator", label: "Overview" },
    { href: "/dashboard/creator/ads", label: "Active Ads" },
    { href: "/dashboard/creator/portfolio", label: "Portfolio" },
    { href: "/dashboard/creator/projects", label: "Projects" },
    { href: "/dashboard/creator/messages", label: "Messages" },
    { href: "/dashboard/creator/payments", label: "Payments" },
    { href: "/dashboard/creator/earnings", label: "Earnings" },
    { href: "/dashboard/creator/reviews", label: "Reviews" },
    { href: "/dashboard/creator/analytics", label: "Analytics" },
    { href: "/dashboard/creator/subscription", label: "Subscription" },
    { href: "/dashboard/creator/settings", label: "Settings" },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview" },
    { href: "/dashboard/admin/users", label: "Users" },
    { href: "/dashboard/admin/payments", label: "Payments" },
    { href: "/dashboard/admin/withdrawals", label: "Withdrawals" },
    { href: "/dashboard/admin/chats", label: "Chats" },
    { href: "/dashboard/admin/reviews", label: "Reviews" },
    { href: "/dashboard/admin/content", label: "Content" },
    { href: "/dashboard/admin/categories", label: "Categories" },
    { href: "/dashboard/admin/settings", label: "Settings" },
  ],
} as const;
