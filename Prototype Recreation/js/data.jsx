// ----- Shared data for the Find Shipments prototype -----

const CATEGORIES = [
  { id: "household", label: "Household Items", icon: "sofa",
    subs: ["Furniture", "Appliances", "Home Electronics", "Outdoor Equipment", "Sporting Equipment", "Antiques", "Art & Glass", "Pianos", "Pool Tables"] },
  { id: "vehicles", label: "Vehicles", icon: "car",
    subs: ["Cars", "Trucks", "SUVs / Vans", "Project / Non-running"] },
  { id: "moto", label: "Motorcycles & ATVs", icon: "bike",
    subs: ["Motorcycles", "ATVs / UTVs", "Scooters / Mopeds", "Powersports"] },
  { id: "boats", label: "Boats", icon: "sailboat",
    subs: ["Powerboats", "Sailboats", "Personal Watercraft", "Trailers"] },
  { id: "freight", label: "Freight", icon: "package",
    subs: ["LTL Pallets", "Full Truckload", "Crated Freight", "Machinery"] },
  { id: "heavy", label: "Heavy Equipment", icon: "hard-hat", subs: null },
  { id: "moves", label: "Household Moves", icon: "package-open",
    subs: ["Full House Move", "Partial / Studio", "Office Move"] },
  { id: "animals", label: "Animals", icon: "dog",
    subs: ["Dogs", "Horses", "Livestock", "Other Animals"] },
  { id: "other", label: "Other", icon: "boxes", subs: null },
];

const RADIUS_OPTIONS = ["25 mi", "50 mi", "100 mi", "250 mi", "500 mi"];
const CORRIDOR_OPTIONS = ["25 mi", "50 mi", "100 mi", "250 mi", "500 mi"];

const RECENT_LOCATIONS = [
  { name: "Dallas, TX", type: "City" },
  { name: "Dallas County, TX", type: "County" },
  { name: "Dallas, NM", type: "City" },
  { name: "Texas", type: "Entire state" },
];

const ALL_PLACES = [
  { name: "Austin, TX", type: "City" },
  { name: "Austin, NM", type: "City" },
  { name: "Dallas, TX", type: "City" },
  { name: "Dallas County, TX", type: "County" },
  { name: "Dallas, NM", type: "City" },
  { name: "Houston, TX", type: "City" },
  { name: "Houston County, TX", type: "County" },
  { name: "San Antonio, TX", type: "City" },
  { name: "Phoenix, AZ", type: "City" },
  { name: "Denver, CO", type: "City" },
  { name: "Texas", type: "Entire state" },
];

// Result listings — gray placeholder imagery, on-brand icon fallbacks.
const RESULTS = [
  { id: 1, title: "Queen sized bed frame", route: "Austin, TX → Dallas, TX", miles: "195 mi",
    cat: "Furniture", weight: "300 lbs", price: "$550", per: "$1.00", tags: ["exclusive", "autobook"],
    viewed: "Viewed 6h", tone: "#e9ded3", icon: "sofa" },
  { id: 2, title: "Wooden Bar & Stools", route: "Austin, TX → Dallas, TX", miles: "195 mi",
    cat: "Furniture", weight: "240 lbs", price: "$420", per: "$0.76", tags: ["exclusive", "offer"],
    viewed: "Viewed 2h", tone: "#d9e0e6", icon: "package" },
  { id: 3, title: "Heavy oak dresser", route: "Austin, TX → Dallas, TX", miles: "210 mi",
    cat: "Furniture", weight: "420 lbs", price: "$610", per: "$1.10", tags: ["exclusive"],
    viewed: "Viewed 9h", tone: "#e3ddd0", icon: "sofa" },
  { id: 4, title: "Pallet of appliances", route: "Houston, TX → Dallas, TX", miles: "240 mi",
    cat: "Freight", weight: "1,200 lbs", price: "$880", per: "$0.92", tags: ["autobook"],
    viewed: "Viewed 1h", tone: "#dfe5e0", icon: "package" },
  { id: 5, title: "Riding lawn mower", route: "San Antonio, TX → Dallas, TX", miles: "275 mi",
    cat: "Outdoor", weight: "520 lbs", price: "$510", per: "$0.74", tags: ["offer"],
    viewed: "Viewed 4h", tone: "#e7e1d6", icon: "hard-hat" },
];

const BEST_MATCH = [RESULTS[0], RESULTS[2], RESULTS[3]];

const NAV = [
  { id: "find", label: "Find", icon: "search" },
  { id: "watch", label: "Watch List", icon: "bookmark" },
  { id: "ship", label: "Shipments", icon: "truck" },
  { id: "alerts", label: "Alerts", icon: "bell" },
  { id: "account", label: "Account", icon: "settings" },
];

// Weight radio options
const WEIGHT_OPTIONS = [
  { id: "any", title: "Any weight", desc: "Show all available shipments" },
  { id: "500", title: "Up to 500 lbs", desc: "Small items, boxes" },
  { id: "2000", title: "Up to 2,000 lbs", desc: "Furniture, appliances (van/pickup)" },
  { id: "10000", title: "Up to 10,000 lbs", desc: "Vehicles, machinery (box truck)" },
  { id: "20000", title: "Up to 20,000 lbs", desc: "Heavy equipment (semi-truck)" },
  { id: "over", title: "Over 20,000 lbs", desc: "Heavy haul loads only" },
];

const PICKUP_DATE_OPTIONS = [
  { id: "any", title: "Any date", desc: "Show all available shipments" },
  { id: "today", title: "Today", desc: "Oct 28, 2025" },
  { id: "tomorrow", title: "Tomorrow", desc: "Oct 29, 2025" },
  { id: "7", title: "Next 7 days", desc: "Oct 28 - Nov 4, 2025" },
  { id: "30", title: "Next 30 days", desc: "Oct 28 - Nov 27, 2025" },
];

const LISTING_ACCESS = [
  { id: "exclusive", label: "Exclusive Shipments", gem: true },
  { id: "standard", label: "Standard Shipments" },
  { id: "book", label: "Book It Now" },
];

const LOCATION_TYPE_GROUPS = [
  { group: "Residential", items: [{ id: "residence", label: "Residence/Home Business" }] },
  { group: "Business Locations", items: [
    { id: "dock", label: "With loading dock or forklift" },
    { id: "nodock", label: "Without loading dock or forklift" },
  ] },
  { group: "Industrial & Commercial", items: [
    { id: "port", label: "Port" },
    { id: "construction", label: "Construction Site" },
    { id: "storage", label: "Storage Facility" },
    { id: "tradeshow", label: "Trade Show / Convention Center" },
  ] },
  { group: "Restricted Access", items: [
    { id: "military", label: "Military Base" },
    { id: "airport", label: "Airport" },
    { id: "secured", label: "Other secured or limited access" },
  ] },
];

const CUSTOMER_TYPE = [
  { id: "shipper", label: "Shipper" },
  { id: "broker", label: "Broker" },
];

const PRICING_TYPE = [
  { id: "auction", label: "Auction Listings" },
  { id: "offer", label: "Offer Listings" },
];

Object.assign(window, {
  CATEGORIES, RADIUS_OPTIONS, CORRIDOR_OPTIONS, RECENT_LOCATIONS, ALL_PLACES,
  RESULTS, BEST_MATCH, NAV, WEIGHT_OPTIONS, PICKUP_DATE_OPTIONS, LISTING_ACCESS,
  LOCATION_TYPE_GROUPS, CUSTOMER_TYPE, PRICING_TYPE,
});
