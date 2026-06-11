// ----- Filters bottom sheet (list + pushes detail screens / category) -----

function catSummary(sel) {
  const names = CATEGORIES.filter(c => sel[c.id] === true || (Array.isArray(sel[c.id]) && sel[c.id].length)).map(c => c.label);
  let count = 0;
  CATEGORIES.forEach(c => {
    if (sel[c.id] === true) count += 1;
    else if (Array.isArray(sel[c.id])) count += sel[c.id].length;
  });
  if (!names.length) return { label: "All available shipments", count: 0 };
  const label = names.slice(0, 2).join(" • ") + (names.length > 2 ? ` +${names.length - 2} more` : "");
  return { label, count };
}

function arrSummary(arr, options, dflt) {
  if (!arr || !arr.length) return { label: dflt, count: 0 };
  const labels = arr.map(id => (options.find(o => o.id === id) || {}).label).filter(Boolean);
  return { label: labels.join(" • "), count: arr.length };
}

function FiltersSheet({ show, bootView, filters, setFilters, catSel, setCatSel, onClose }) {
  const [view, setView] = useState(bootView || "list"); // list | category | <detailKey>
  const [navAnim, setNavAnim] = useState(false);
  const go = v => { setNavAnim(v !== "list"); setView(v); };
  const anim = navAnim ? " slide-in-right" : "";

  useEffect(() => { if (show) { setView(bootView || "list"); setNavAnim(false); } }, [show]);

  const cat = catSummary(catSel);
  const listing = arrSummary(filters.listing, LISTING_ACCESS, "All available shipments");
  const pricing = (filters.pricing && filters.pricing.length)
    ? arrSummary(filters.pricing, PRICING_TYPE, "") : { label: "All (Auction, Offer, Book It Now)", count: 0 };
  const weightOpt = WEIGHT_OPTIONS.find(o => o.id === filters.weight);
  const weight = (filters.weight && filters.weight !== "any")
    ? { label: filters.weight === "custom" ? "Custom max weight" : weightOpt.title, count: 1 } : { label: "Any weight", count: 0 };
  const pickOpt = PICKUP_DATE_OPTIONS.find(o => o.id === filters.pickup);
  const pickup = (filters.pickup && filters.pickup !== "any")
    ? { label: filters.pickup === "custom" ? "Specific dates" : pickOpt.title, count: 1 } : { label: "Any date", count: 0 };
  const locCount = (filters.location || []).length;
  const location = locCount
    ? { label: (LOCATION_TYPE_GROUPS.flatMap(g => g.items).find(o => o.id === filters.location[0]) || {}).label + (locCount > 1 ? ` + ${locCount - 1} more` : ""), count: locCount }
    : { label: "Any location type", count: 0 };
  const customer = arrSummary(filters.customer, CUSTOMER_TYPE, "All customer types");

  const rows = [
    { key: "category", title: "Categories", ...cat },
    { key: "listing", title: "Listing Access", ...listing },
    { key: "pricing", title: "Pricing Type", ...pricing },
    { key: "weight", title: "Weight Range", ...weight },
    { key: "pickup", title: "Pickup Date", ...pickup },
    { key: "location", title: "Location Type", ...location },
    { key: "customer", title: "Customer Type", ...customer },
  ];

  function clearAll() {
    setFilters({ listing: [], pricing: [], weight: "any", weightUnit: "lbs", pickup: "any", location: [], customer: [] });
    setCatSel({});
  }

  return (
    <div className={"sheet" + (show ? " sheet--show" : "")} style={{ height: "88%" }}>
      {view === "category" ? (
        <div className={"layer" + anim} style={{ display: "flex", flexDirection: "column", background: "var(--gray-0)" }}>
          <CategorySheet selected={catSel} setSelected={setCatSel}
            onClose={() => go("list")} onApply={() => go("list")} />
        </div>
      ) : view !== "list" ? (
        <div className={"layer" + anim} key={view}>
          <FilterDetail which={view} filters={filters} setFilters={setFilters} onBack={() => go("list")} />
        </div>
      ) : null}

      {/* list (kept mounted underneath) */}
      <div className="sheet__grab" />
      <div className="sheet__head">
        <button className="sheet__x" onClick={onClose}><Icon name="x" size={22} stroke={2.4} /></button>
        <h2>Filters</h2>
        <button className="sheet__clear" onClick={clearAll}>Clear All</button>
      </div>
      <div className="sheet__body">
        {rows.map(r => (
          <button key={r.key} className={"frow" + (r.count ? " frow--active" : "")} onClick={() => go(r.key)}>
            <span>
              <span className="frow__title">{r.title}</span>
              <span className="frow__sub">{r.label}</span>
            </span>
            {r.count ? <span className="frow__count">{r.count}</span> : <span />}
            <span className="frow__chev"><Icon name="chevron-right" size={22} /></span>
          </button>
        ))}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

window.FiltersSheet = FiltersSheet;
