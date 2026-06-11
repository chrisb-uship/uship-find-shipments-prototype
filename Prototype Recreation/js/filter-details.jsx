// ----- Individual filter detail screens (pushed over the Filters sheet) -----

function DetailShell({ title, onBack, onClear, children, foot }) {
  return (
    <div className="scr" style={{ background: "var(--gray-0)" }}>
      <div style={{ height: 8 }} />
      <div className="appbar" style={{ background: "var(--gray-0)" }}>
        <div className="appbar__row" style={{ borderBottom: "1px solid var(--gray-200)" }}>
          <button className="appbar__btn appbar__btn--left" style={{ color: "var(--blue-600)" }} onClick={onBack}>
            <Icon name="chevron-left" size={26} />
          </button>
          <div className="appbar__title" style={{ color: "var(--gray-800)" }}>{title}</div>
          <button className="appbar__btn appbar__btn--text" style={{ color: "var(--blue-600)" }} onClick={onClear}>Clear</button>
        </div>
      </div>
      <div className="scr__body">{children}</div>
      {foot}
    </div>
  );
}

function CheckRow({ label, gem, on, onToggle, last }) {
  return (
    <button className="chk-row" onClick={onToggle} style={last ? { borderBottom: "0" } : null}>
      <span className="chk-row__label">
        {label}
        {gem && <Icon name="gem" size={18} style={{ color: "var(--purple-600)" }} />}
      </span>
      <span className="chk-box" data-on={on}>{on && <Icon name="check" size={15} stroke={3} />}</span>
    </button>
  );
}

function FilterDetail({ which, filters, setFilters, onBack }) {
  function toggleArr(key, id) {
    const cur = filters[key] || [];
    setFilters({ ...filters, [key]: cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id] });
  }

  if (which === "listing") {
    return (
      <DetailShell title="Listing Access" onBack={onBack} onClear={() => setFilters({ ...filters, listing: [] })}>
        <div style={{ padding: "16px 16px 8px" }}>
          <div style={{ font: "700 17px/22px var(--font-sans)", color: "var(--gray-800)" }}>Listing Access</div>
          <div style={{ font: "400 14px/20px var(--font-sans)", color: "var(--gray-600)", marginTop: 4 }}>Select specific types or leave blank for all</div>
        </div>
        <div style={{ background: "var(--gray-0)", borderTop: "1px solid var(--gray-200)" }}>
          {LISTING_ACCESS.map((o, i) => (
            <CheckRow key={o.id} label={o.label} gem={o.gem} on={(filters.listing || []).includes(o.id)}
              onToggle={() => toggleArr("listing", o.id)} last={i === LISTING_ACCESS.length - 1} />
          ))}
        </div>
      </DetailShell>
    );
  }

  if (which === "pricing") {
    return (
      <DetailShell title="Pricing Type" onBack={onBack} onClear={() => setFilters({ ...filters, pricing: [] })}>
        <div className="detail-intro">Select the pricing types you prefer or leave blank for all.</div>
        <div style={{ background: "var(--gray-0)", borderTop: "1px solid var(--gray-200)", marginTop: 8 }}>
          {PRICING_TYPE.map((o, i) => (
            <CheckRow key={o.id} label={o.label} on={(filters.pricing || []).includes(o.id)}
              onToggle={() => toggleArr("pricing", o.id)} last={i === PRICING_TYPE.length - 1} />
          ))}
        </div>
      </DetailShell>
    );
  }

  if (which === "customer") {
    return (
      <DetailShell title="Customer Type" onBack={onBack} onClear={() => setFilters({ ...filters, customer: [] })}>
        <div className="detail-intro">Select all customer types or leave blank for all.</div>
        <div style={{ background: "var(--gray-0)", borderTop: "1px solid var(--gray-200)", marginTop: 8 }}>
          {CUSTOMER_TYPE.map((o, i) => (
            <CheckRow key={o.id} label={o.label} on={(filters.customer || []).includes(o.id)}
              onToggle={() => toggleArr("customer", o.id)} last={i === CUSTOMER_TYPE.length - 1} />
          ))}
        </div>
      </DetailShell>
    );
  }

  if (which === "location") {
    return (
      <DetailShell title="Location Type" onBack={onBack} onClear={() => setFilters({ ...filters, location: [] })}>
        <div className="detail-intro">Select all location types you can service or leave blank for all.</div>
        {LOCATION_TYPE_GROUPS.map(g => (
          <div key={g.group}>
            <div className="detail-group-h">{g.group}</div>
            <div style={{ background: "var(--gray-0)", borderTop: "1px solid var(--gray-200)" }}>
              {g.items.map((o, i) => (
                <CheckRow key={o.id} label={o.label} on={(filters.location || []).includes(o.id)}
                  onToggle={() => toggleArr("location", o.id)} last={i === g.items.length - 1} />
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: 24 }} />
      </DetailShell>
    );
  }

  if (which === "weight") {
    const unit = filters.weightUnit || "lbs";
    return (
      <DetailShell title="Weight" onBack={onBack} onClear={() => setFilters({ ...filters, weight: "any" })}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 16px", borderBottom: "1px solid var(--gray-200)" }}>
          <span style={{ font: "700 17px/22px var(--font-sans)", color: "var(--gray-800)" }}>Weight Measurement</span>
          <span className="seg-toggle">
            <button aria-selected={unit === "lbs"} onClick={() => setFilters({ ...filters, weightUnit: "lbs" })}>lbs</button>
            <button aria-selected={unit === "kgs"} onClick={() => setFilters({ ...filters, weightUnit: "kgs" })}>kgs</button>
          </span>
        </div>
        <div style={{ font: "700 17px/22px var(--font-sans)", color: "var(--gray-800)", padding: "18px 16px 12px" }}>Show shipments you can carry</div>
        <div style={{ padding: "0 16px" }}>
          {WEIGHT_OPTIONS.map(o => (
            <button key={o.id} className="opt-card" aria-selected={filters.weight === o.id}
              onClick={() => setFilters({ ...filters, weight: o.id })}>
              <span className="opt-card__radio" />
              <span>
                <span className="opt-card__title">{o.title}</span>
                <span className="opt-card__desc">{o.desc}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="or-divider">OR</div>
        <div style={{ padding: "0 16px 24px" }}>
          <button className="skid-btn skid-btn--tertiary btn-block"
            onClick={() => setFilters({ ...filters, weight: "custom" })}>Set Custom Max Weight</button>
        </div>
      </DetailShell>
    );
  }

  if (which === "pickup") {
    return (
      <DetailShell title="Pickup Date" onBack={onBack} onClear={() => setFilters({ ...filters, pickup: "any" })}>
        <div style={{ padding: "16px 16px 4px" }}>
          <div style={{ font: "700 17px/22px var(--font-sans)", color: "var(--gray-800)" }}>Earliest Pickup Date</div>
          <div style={{ font: "400 14px/20px var(--font-sans)", color: "var(--gray-600)", marginTop: 4 }}>Filter by when shipments need pickup</div>
        </div>
        <div style={{ padding: "12px 16px 0" }}>
          {PICKUP_DATE_OPTIONS.map(o => (
            <button key={o.id} className="opt-card" aria-selected={filters.pickup === o.id}
              onClick={() => setFilters({ ...filters, pickup: o.id })}>
              <span className="opt-card__radio" />
              <span>
                <span className="opt-card__title">{o.title}</span>
                <span className="opt-card__desc">{o.desc}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="or-divider">OR</div>
        <div style={{ padding: "0 16px 24px" }}>
          <button className="skid-btn skid-btn--tertiary btn-block"
            onClick={() => setFilters({ ...filters, pickup: "custom" })}>Set Specific Pickup Dates</button>
        </div>
      </DetailShell>
    );
  }
  return null;
}

window.FilterDetail = FilterDetail;
