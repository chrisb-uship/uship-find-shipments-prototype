// ----- Location Picker (full-screen push) — handles all 5 states -----
const { useState, useEffect, useRef } = React;

function PillRow({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((o, i) => (
        <button key={o} className="loc-radius-pill" aria-selected={value === i}
          onClick={() => onChange(i)}>{o}</button>
      ))}
    </div>
  );
}

function LocationPicker({ title, initial, onApply, onBack }) {
  const [selected, setSelected] = useState(initial.selected || []);
  const [radius, setRadius] = useState(initial.radius ?? 2);
  const [quick, setQuick] = useState(initial.quick ?? (initial.selected && initial.selected.length ? null : "anywhere"));
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const results = ALL_PLACES.filter(p => p.name.toLowerCase().includes(query.trim().toLowerCase()));
  const searching = focused;

  function pick(place) {
    if (!selected.includes(place.name)) setSelected([...selected, place.name]);
    setQuick(null);
    setQuery("");
    setFocused(false);
    inputRef.current && inputRef.current.blur();
  }
  function removeChip(name) {
    const next = selected.filter(s => s !== name);
    setSelected(next);
    if (next.length === 0) setQuick("anywhere");
  }
  function chooseAnywhere() { setQuick("anywhere"); setSelected([]); }
  function chooseCurrent() {
    setQuick("current");
    if (!selected.includes("My Location")) setSelected(["My Location"]);
  }
  function clearAll() { setSelected([]); setQuick("anywhere"); setRadius(2); setQuery(""); }

  function apply() {
    let summary;
    if (quick === "anywhere") summary = { label: "Anywhere", count: 0 };
    else if (selected.length) {
      const city = selected[0].split(",")[0];
      summary = { label: selected.length > 1 ? `${city} +${selected.length - 1}` : selected[0], count: selected.length };
    } else summary = { label: "Anywhere", count: 0 };
    onApply({ selected, radius, quick, summary });
  }

  const applyLabel = selected.length > 0 ? `Apply (${selected.length})` : "Apply";

  return (
    <div className="scr">
      <div className="appbar">
        <StatusBar />
        <div className="appbar__row">
          <button className="appbar__btn appbar__btn--icon appbar__btn--left" onClick={onBack}>
            <Icon name="chevron-left" size={26} />
          </button>
          <div className="appbar__title">{title}</div>
          <button className="appbar__btn appbar__btn--text" onClick={clearAll}>Clear</button>
        </div>
      </div>

      <div className="scr__body">
        {/* Search field */}
        <div style={{ padding: "16px 16px 12px", background: "var(--gray-0)", borderBottom: "1px solid var(--gray-200)" }}>
          <div className="skid-search" style={{ maxWidth: "none" }}>
            <div className="skid-search__control">
              <Icon name="search" size={20} className="skid-search__icon" />
              <input ref={inputRef} value={query} placeholder="Search city, state, or ZIP"
                onFocus={() => setFocused(true)}
                onChange={e => setQuery(e.target.value)} />
              {(focused || query) && (
                <button className="skid-search__clear" onClick={() => { setQuery(""); setFocused(false); inputRef.current && inputRef.current.blur(); }}>
                  <Icon name="circle-x" size={22} />
                </button>
              )}
            </div>
          </div>
        </div>

        {searching ? (
          <div>
            <div className="loc-section-label">{query.trim() ? "Search Results" : "Recent locations"}</div>
            <div style={{ background: "var(--gray-0)" }}>
              {(query.trim() ? results : RECENT_LOCATIONS).map((p, i, arr) => (
                <button key={p.name} className="loc-result" onClick={() => pick(p)}
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--gray-200)" : "0" }}>
                  <Icon name="map-pin" size={20} style={{ color: "var(--gray-500)" }} />
                  <span className="loc-result__main">
                    <span className="loc-result__name">{p.name}</span>
                    <span className="loc-result__type">{p.type}</span>
                  </span>
                </button>
              ))}
              {query.trim() && results.length === 0 && (
                <div style={{ padding: "20px 16px", color: "var(--gray-500)", font: "400 15px/20px var(--font-sans)" }}>No matches for “{query}”.</div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {selected.length > 0 && (
              <div className="loc-block">
                <div className="loc-block__label">Selected ({selected.length})</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                  {selected.map(name => (
                    <span key={name} className="loc-chip">
                      {name}
                      <button onClick={() => removeChip(name)} aria-label={"Remove " + name}>
                        <Icon name="x" size={14} stroke={2.4} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selected.length > 0 && (
              <div className="loc-block" style={{ borderTop: "1px solid var(--gray-200)" }}>
                <div className="loc-block__label">Radius</div>
                <PillRow options={RADIUS_OPTIONS} value={radius} onChange={setRadius} />
                {selected.length > 1 && (
                  <div className="loc-applied">Applied to all {selected.length} {title.toLowerCase().includes("pickup") ? "pickup" : "delivery"} locations.</div>
                )}
              </div>
            )}

            <div className="loc-block" style={{ borderTop: selected.length ? "1px solid var(--gray-200)" : "0" }}>
              <div className="loc-block__label">Quick options</div>
              <button className="loc-quick" onClick={chooseAnywhere} style={{ borderBottom: "1px solid var(--gray-200)" }}>
                <span className="loc-quick__ic" data-on={quick === "anywhere"}><Icon name="globe" size={20} /></span>
                <span className="loc-quick__main">
                  <span className="loc-quick__title" data-on={quick === "anywhere"}>Anywhere</span>
                  <span className="loc-quick__sub">No location restriction</span>
                </span>
                {quick === "anywhere" && <Icon name="check" size={22} style={{ color: "var(--blue-600)" }} />}
              </button>
              <button className="loc-quick" onClick={chooseCurrent}>
                <span className="loc-quick__ic" data-on={quick === "current"}><Icon name="locate-fixed" size={20} /></span>
                <span className="loc-quick__main">
                  <span className="loc-quick__title" data-on={quick === "current"}>Current Location</span>
                </span>
                {quick === "current" && <Icon name="check" size={22} style={{ color: "var(--blue-600)" }} />}
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "12px 16px 24px", background: "var(--gray-0)", borderTop: "1px solid var(--gray-200)" }}>
        <button className="skid-btn skid-btn--primary btn-block" onClick={apply}>{applyLabel}</button>
      </div>
    </div>
  );
}
window.LocationPicker = LocationPicker;
