// ----- Root app: navigation, shared state, chip logic -----

const LISTING_SHORT = { exclusive: "Exclusive", standard: "Standard", book: "Book It Now" };
const PRICING_SHORT = { auction: "Auction", offer: "Offer" };

function catChipLabel(catSel) {
  const names = [];
  CATEGORIES.forEach(c => {
    if (catSel[c.id] === true) names.push(c.label);
    else if (Array.isArray(catSel[c.id])) catSel[c.id].forEach(s => names.push(s));
  });
  if (!names.length) return null;
  return names[0] + (names.length > 1 ? ` +${names.length - 1}` : "");
}

function App() {
  const [state, setState] = useState({
    pickup: "Austin, TX", delivery: "Dallas, TX",
    alongRoute: false, corridor: 2,
    pickupLoc: { selected: ["Austin, TX"], radius: 2, quick: null },
    deliveryLoc: { selected: ["Dallas, TX"], radius: 1, quick: null },
  });
  const [filters, setFilters] = useState({
    listing: ["exclusive"], pricing: [], weight: "any", weightUnit: "lbs", pickup: "any", location: [], customer: [],
  });
  const [catSel, setCatSel] = useState({ household: ["Furniture", "Appliances", "Home Electronics"] });

  const params = new URLSearchParams(location.search);
  const dbg = params.get("open");
  const [locPicker, setLocPicker] = useState(dbg === "pickup" || dbg === "delivery" ? dbg : null);
  const [filtersOpen, setFiltersOpen] = useState(["filters", "category", "listing", "pricing", "weight", "pickupdate", "location", "customer"].includes(dbg));
  const [navActive, setNavActive] = useState("find");
  const bootView = { category: "category", listing: "listing", pricing: "pricing", weight: "weight", pickupdate: "pickup", location: "location", customer: "customer" }[dbg] || "list";

  const set = patch => setState(s => ({ ...s, ...patch }));
  const booted = useRef(false);
  useEffect(() => { booted.current = true; }, []);
  function openLoc(w) { booted.current = true; setLocPicker(w); }

  // Build active filter chips
  const chips = [];
  const catLabel = catChipLabel(catSel);
  if (catLabel) chips.push({ id: "cat", label: catLabel, onRemove: () => setCatSel({}) });
  (filters.listing || []).forEach(id => chips.push({ id: "l-" + id, label: LISTING_SHORT[id], onRemove: () => setFilters(f => ({ ...f, listing: f.listing.filter(x => x !== id) })) }));
  (filters.pricing || []).forEach(id => chips.push({ id: "p-" + id, label: PRICING_SHORT[id], onRemove: () => setFilters(f => ({ ...f, pricing: f.pricing.filter(x => x !== id) })) }));
  if (filters.weight && filters.weight !== "any") {
    const w = WEIGHT_OPTIONS.find(o => o.id === filters.weight);
    chips.push({ id: "w", label: filters.weight === "custom" ? "Custom weight" : w.title, onRemove: () => setFilters(f => ({ ...f, weight: "any" })) });
  }
  if (filters.pickup && filters.pickup !== "any") {
    const p = PICKUP_DATE_OPTIONS.find(o => o.id === filters.pickup);
    chips.push({ id: "pd", label: filters.pickup === "custom" ? "Specific dates" : p.title, onRemove: () => setFilters(f => ({ ...f, pickup: "any" })) });
  }
  (filters.location || []).forEach(id => {
    const o = LOCATION_TYPE_GROUPS.flatMap(g => g.items).find(i => i.id === id);
    chips.push({ id: "loc-" + id, label: o.label.length > 22 ? o.label.slice(0, 20) + "…" : o.label, onRemove: () => setFilters(f => ({ ...f, location: f.location.filter(x => x !== id) })) });
  });
  (filters.customer || []).forEach(id => {
    const o = CUSTOMER_TYPE.find(i => i.id === id);
    chips.push({ id: "c-" + id, label: o.label, onRemove: () => setFilters(f => ({ ...f, customer: f.customer.filter(x => x !== id) })) });
  });

  function applyLocation(which, result) {
    if (which === "pickup") set({ pickup: result.summary.label, pickupLoc: { selected: result.selected, radius: result.radius, quick: result.quick } });
    else set({ delivery: result.summary.label, deliveryLoc: { selected: result.selected, radius: result.radius, quick: result.quick } });
    setLocPicker(null);
  }

  return (
    <div className="phone">
      <div className="phone__notch" />
      <div className="screen-stack">
        <SearchScreen
          state={state} set={set}
          chips={chips}
          openLocation={openLoc}
          openFilters={() => setFiltersOpen(true)}
          navActive={navActive} onNav={setNavActive}
        />

        {/* Location picker push */}
        {locPicker && (
          <div className={"layer" + (booted.current ? " slide-in-right" : "")} key={locPicker}>
            <LocationPicker
              title={locPicker === "pickup" ? "Pickup Locations" : "Delivery Locations"}
              initial={locPicker === "pickup" ? state.pickupLoc : state.deliveryLoc}
              onBack={() => setLocPicker(null)}
              onApply={r => applyLocation(locPicker, r)}
            />
          </div>
        )}

        {/* Filters sheet + scrim */}
        <div className={"scrim" + (filtersOpen ? " scrim--show" : "")}
          style={{ pointerEvents: filtersOpen ? "auto" : "none" }}
          onClick={() => setFiltersOpen(false)} />
        <FiltersSheet
          show={filtersOpen} bootView={bootView}
          filters={filters} setFilters={setFilters}
          catSel={catSel} setCatSel={setCatSel}
          onClose={() => setFiltersOpen(false)}
        />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
