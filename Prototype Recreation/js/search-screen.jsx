// ----- Main "Find Shipments" screen: search card, results, nav -----

function TopTabs({ tab, setTab }) {
  const tabs = [["search", "Search"], ["saved", "Saved (3)"], ["recent", "Recent"]];
  return (
    <div style={{ display: "flex", background: "var(--gray-0)", borderBottom: "1px solid var(--gray-200)", padding: "0 8px" }}>
      {tabs.map(([id, label]) => (
        <button key={id} onClick={() => setTab(id)} style={{
          flex: 1, background: "none", border: 0, cursor: "pointer", padding: "14px 0 12px",
          font: (tab === id ? "700" : "400") + " 16px/1 var(--font-sans)",
          color: tab === id ? "var(--blue-700)" : "var(--gray-500)",
          borderBottom: "2px solid " + (tab === id ? "var(--blue-600)" : "transparent"), marginBottom: -1,
        }}>{label}</button>
      ))}
    </div>
  );
}

function LocationRow({ label, value, radius, alongRoute, onClick, isPickup }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", background: "none", border: 0, cursor: "pointer", textAlign: "left",
      display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center", gap: 10, padding: "12px 4px",
    }}>
      <span>
        <span style={{ display: "block", font: "400 13px/16px var(--font-sans)", color: "var(--gray-500)" }}>{label}</span>
        <span style={{ display: "block", font: "400 17px/22px var(--font-sans)", color: "var(--gray-800)", marginTop: 1 }}>{value}</span>
      </span>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 5, height: 30, padding: "0 12px", borderRadius: 999,
        background: alongRoute ? "transparent" : "var(--blue-50)", border: "1px solid " + (alongRoute ? "var(--gray-200)" : "var(--blue-200)"),
        font: "600 13px/1 var(--font-sans)", color: alongRoute ? "var(--gray-400)" : "var(--blue-700)",
        textDecoration: alongRoute ? "line-through" : "none",
      }}>
        <Icon name="arrow-left-right" size={14} /> {radius}
      </span>
      <Icon name="chevron-right" size={20} style={{ color: "var(--blue-600)" }} />
    </button>
  );
}

function SearchCard({ pickup, delivery, alongRoute, setAlongRoute, corridor, setCorridor, openLocation }) {
  return (
    <div style={{ padding: "12px 16px 0", background: "var(--gray-0)" }}>
      <div style={{ border: "1px solid var(--gray-300)", borderRadius: 10, padding: "2px 12px" }}>
        <LocationRow label="Pickup Locations" value={pickup} radius="100 mi" alongRoute={alongRoute} isPickup
          onClick={() => openLocation("pickup")} />
        <div className="skid-divider" />
        <LocationRow label="Delivery Locations" value={delivery} radius="50 mi" alongRoute={alongRoute}
          onClick={() => openLocation("delivery")} />
        <div className="skid-divider" />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 4px" }}>
          <Icon name="route" size={22} style={{ color: "var(--blue-600)", flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1 }}>
            <div style={{ font: "700 16px/21px var(--font-sans)", color: "var(--gray-800)" }}>Search Along Route</div>
            <div style={{ font: "400 13px/18px var(--font-sans)", color: "var(--gray-500)", marginTop: 2 }}>
              {alongRoute ? "City radius replaced by corridor width" : "Running this lane? Try corridor search."}
            </div>
          </div>
          <label className="skid-switch" style={{ marginTop: 2 }}>
            <input type="checkbox" checked={alongRoute} onChange={e => setAlongRoute(e.target.checked)} />
            <span className="skid-switch__track" />
          </label>
        </div>
        {alongRoute && (
          <div className="fade-up" style={{ padding: "2px 4px 16px" }}>
            <div style={{ font: "400 13px/16px var(--font-sans)", color: "var(--gray-500)", marginBottom: 10 }}>Corridor Width</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CORRIDOR_OPTIONS.map((o, i) => (
                <button key={o} className="loc-radius-pill" aria-selected={corridor === i} onClick={() => setCorridor(i)}>{o}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChipsRow({ chips, openFilters }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "14px 16px", overflowX: "auto", background: "var(--gray-0)" }}>
      <button className="skid-btn skid-btn--tertiary skid-btn--sm" style={{ flexShrink: 0, height: 38, borderRadius: 999, padding: "0 16px" }} onClick={openFilters}>
        <Icon name="sliders" size={16} /> All Filters
      </button>
      {chips.map(c => (
        <button key={c.id} onClick={c.onRemove} style={{
          flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, height: 38, padding: "0 14px",
          borderRadius: 999, background: "var(--blue-50)", border: "1px solid var(--blue-200)",
          font: "600 14px/1 var(--font-sans)", color: "var(--blue-700)", cursor: "pointer",
        }}>
          {c.label} <Icon name="x" size={15} stroke={2.4} />
        </button>
      ))}
    </div>
  );
}

function Badge({ kind }) {
  if (kind === "exclusive") return <span className="ship-badge ship-badge--ex"><Icon name="gem" size={13} /> EXCLUSIVE</span>;
  if (kind === "autobook") return <span className="ship-badge ship-badge--auto"><Icon name="zap" size={13} /> AUTOBOOK</span>;
  if (kind === "offer") return <span className="ship-badge ship-badge--offer">OFFER</span>;
  return null;
}

function Thumb({ tone, icon, size = "100%", h }) {
  return (
    <div style={{ width: size, height: h, background: tone, display: "grid", placeItems: "center", flexShrink: 0 }}>
      <Icon name={icon} size={h && h < 80 ? 28 : 44} style={{ color: "rgba(0,31,51,.30)" }} stroke={1.6} />
    </div>
  );
}

function BestMatchCard({ r }) {
  return (
    <div style={{ width: 300, flexShrink: 0, background: "var(--gray-0)", border: "1px solid var(--gray-300)", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ position: "relative" }}>
        <Thumb tone={r.tone} icon={r.icon} h={150} />
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
          {r.tags.map(t => <Badge key={t} kind={t} />)}
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ font: "700 18px/23px var(--font-sans)", color: "var(--blue-700)" }}>{r.title}</div>
        <div style={{ font: "400 14px/20px var(--font-sans)", color: "var(--gray-800)", marginTop: 6 }}>{r.route} • {r.miles}</div>
        <div style={{ font: "400 14px/20px var(--font-sans)", color: "var(--gray-500)" }}>{r.cat} • {r.weight}</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 8 }}>
          <span>
            <span style={{ font: "700 22px/1 var(--font-sans)", color: "var(--gray-800)" }} className="tnum">{r.price}</span>
            <span style={{ font: "400 17px/1 var(--font-sans)", color: "var(--gray-400)", marginLeft: 6 }}>low</span>
            <span style={{ font: "700 13px/1 var(--font-sans)", color: "var(--green-700)", marginLeft: 6 }} className="tnum">({r.per}<span style={{ color: "var(--gray-500)", fontWeight: 400 }}>/mi</span>)</span>
          </span>
          <span style={{ font: "400 13px/1 var(--font-sans)", color: "var(--gray-500)" }}>{r.viewed}</span>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ r }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 96px", gap: 14, padding: "16px 16px", borderBottom: "1px solid var(--gray-200)", background: "var(--gray-0)" }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, font: "700 12px/1 var(--font-sans)", letterSpacing: ".4px", color: "var(--purple-600)", marginBottom: 6 }}>
          {r.tags.map((t, i) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 4, color: t === "autobook" ? "var(--blue-700)" : t === "offer" ? "var(--orange-700, #B45309)" : "var(--purple-600)" }}>
              {i > 0 && <span style={{ color: "var(--gray-400)", marginRight: 4 }}>•</span>}
              {t === "exclusive" && <Icon name="gem" size={13} />}
              {t === "autobook" && <Icon name="zap" size={13} />}
              {t.toUpperCase()}
            </span>
          ))}
        </div>
        <div style={{ font: "700 17px/22px var(--font-sans)", color: "var(--blue-700)" }}>{r.title}</div>
        <div style={{ font: "400 14px/20px var(--font-sans)", color: "var(--gray-800)", marginTop: 4 }}>{r.route} • {r.miles}</div>
        <div style={{ font: "400 14px/20px var(--font-sans)", color: "var(--gray-500)" }}>{r.cat} • {r.weight}</div>
        <div style={{ marginTop: 8 }}>
          <span style={{ font: "700 20px/1 var(--font-sans)", color: "var(--gray-800)" }} className="tnum">{r.price}</span>
          <span style={{ font: "400 16px/1 var(--font-sans)", color: "var(--gray-400)", marginLeft: 6 }}>low</span>
          <span style={{ color: "var(--gray-400)", margin: "0 8px" }}>•</span>
          <span style={{ font: "700 16px/1 var(--font-sans)", color: "var(--green-700)" }} className="tnum">{r.per}</span>
          <span style={{ font: "400 14px/1 var(--font-sans)", color: "var(--gray-500)", marginLeft: 3 }}>/mi</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <div style={{ width: 96, height: 72, borderRadius: 8, overflow: "hidden" }}>
          <Thumb tone={r.tone} icon={r.icon} h={72} />
        </div>
        <span style={{ font: "400 12px/1 var(--font-sans)", color: "var(--gray-500)" }}>{r.viewed}</span>
      </div>
    </div>
  );
}

function BottomNav({ active, onNav }) {
  return (
    <div style={{ display: "flex", background: "var(--gray-0)", borderTop: "1px solid var(--gray-200)", padding: "8px 4px calc(8px + env(safe-area-inset-bottom))", flexShrink: 0 }}>
      {NAV.map(n => {
        const on = active === n.id;
        return (
          <button key={n.id} onClick={() => onNav(n.id)} style={{
            flex: 1, background: "none", border: 0, cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 0",
            color: on ? "var(--blue-600)" : "var(--gray-500)",
          }}>
            <Icon name={n.icon} size={24} stroke={on ? 2.2 : 1.8} />
            <span style={{ font: (on ? "700" : "400") + " 11px/1 var(--font-sans)" }}>{n.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SimpleList({ title, items }) {
  return (
    <div className="fade-up" style={{ padding: "8px 16px" }}>
      {items.map((it, i) => (
        <div key={i} style={{ background: "var(--gray-0)", border: "1px solid var(--gray-300)", borderRadius: 10, padding: 16, marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ font: "700 16px/21px var(--font-sans)", color: "var(--gray-800)" }}>{it.route}</span>
            <span className="skid-badge skid-badge--blue skid-badge--sm">{it.count}</span>
          </div>
          <div style={{ font: "400 14px/19px var(--font-sans)", color: "var(--gray-500)", marginTop: 4 }}>{it.meta}</div>
        </div>
      ))}
    </div>
  );
}

function SearchScreen({ state, set, openLocation, openFilters, chips, onNav, navActive }) {
  const [tab, setTab] = useState("search");
  const [collapsed, setCollapsed] = useState(false);
  const bodyRef = useRef(null);

  function onScroll(e) {
    const top = e.target.scrollTop;
    if (top > 130 && !collapsed) setCollapsed(true);
    else if (top < 60 && collapsed) setCollapsed(false);
  }
  function expand() { setCollapsed(false); if (bodyRef.current) bodyRef.current.scrollTop = 0; }

  const filterCount = chips.length;

  return (
    <div className="scr">
      <div className="appbar">
        <StatusBar />
        <div className="appbar__row">
          <button className="appbar__btn appbar__btn--icon appbar__btn--left"><Icon name="chevron-left" size={26} /></button>
          <div className="appbar__title">Find Shipments</div>
          <button className="appbar__btn appbar__btn--text">Save</button>
        </div>
      </div>

      {/* Collapsed sticky summary */}
      {tab === "search" && collapsed && (
        <button onClick={() => { expand(); }} className="fade-up" style={{
          display: "flex", alignItems: "center", gap: 10, width: "calc(100% - 32px)", margin: "12px 16px",
          padding: "12px 14px", background: "var(--gray-0)", border: "1px solid var(--gray-300)", borderRadius: 10, cursor: "pointer",
        }}>
          <Icon name="route" size={20} style={{ color: "var(--blue-600)", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "left", font: "400 16px/1 var(--font-sans)", color: "var(--gray-800)" }}>{state.pickup} → {state.delivery}</span>
          <span onClick={(e) => { e.stopPropagation(); openFilters(); }} style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "700 15px/1 var(--font-sans)", color: "var(--blue-600)" }}>
            {filterCount} filters <Icon name="chevron-down" size={18} />
          </span>
        </button>
      )}

      <div className="scr__body" ref={bodyRef} onScroll={onScroll}>
        {tab !== "search" ? (
          <TabsBelow tab={tab} setTab={setTab} />
        ) : (
          <React.Fragment>
            {!collapsed && (
              <React.Fragment>
                <TopTabs tab={tab} setTab={setTab} />
                <SearchCard pickup={state.pickup} delivery={state.delivery}
                  alongRoute={state.alongRoute} setAlongRoute={v => set({ alongRoute: v })}
                  corridor={state.corridor} setCorridor={v => set({ corridor: v })}
                  openLocation={openLocation} />
                <ChipsRow chips={chips} openFilters={openFilters} />
              </React.Fragment>
            )}

            <div style={{ height: 8, background: "var(--surface-layer-01)" }} />
            <div style={{ font: "700 22px/1 var(--font-sans)", color: "var(--gray-800)", padding: "16px 16px 12px" }}>Best Match</div>
            <div style={{ display: "flex", gap: 14, padding: "0 16px 8px", overflowX: "auto" }}>
              {BEST_MATCH.map(r => <BestMatchCard key={r.id} r={r} />)}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 16px 12px" }}>
              <span style={{ font: "700 22px/1 var(--font-sans)", color: "var(--gray-800)" }}>100 Results</span>
              <button style={{ background: "none", border: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, font: "700 15px/1 var(--font-sans)", color: "var(--blue-600)" }}>
                Listing Date <Icon name="chevron-down" size={18} />
              </button>
            </div>
            <div>
              {RESULTS.map(r => <ResultRow key={r.id} r={r} />)}
            </div>
            <div style={{ height: 24 }} />
          </React.Fragment>
        )}
      </div>

      <BottomNav active={navActive} onNav={onNav} />
    </div>
  );
}

function TabsBelow({ tab, setTab }) {
  return (
    <React.Fragment>
      <TopTabs tab={tab} setTab={setTab} />
      {tab === "saved" ? (
        <SimpleList items={[
          { route: "Austin, TX → Dallas, TX", count: 100, meta: "Furniture • Up to 20,000 lbs • Exclusive" },
          { route: "Houston, TX → Phoenix, AZ", count: 42, meta: "Freight • Any weight" },
          { route: "Anywhere → Denver, CO", count: 18, meta: "Vehicles • Auction" },
        ]} />
      ) : (
        <SimpleList items={[
          { route: "Austin, TX → Dallas, TX", count: 100, meta: "Searched 2h ago" },
          { route: "San Antonio, TX → Anywhere", count: 67, meta: "Searched yesterday" },
          { route: "Dallas, TX → Houston, TX", count: 88, meta: "Searched 3 days ago" },
        ]} />
      )}
    </React.Fragment>
  );
}

window.SearchScreen = SearchScreen;
