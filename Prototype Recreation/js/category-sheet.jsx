// ----- Category selection (shown inside the Filters bottom sheet) -----

function CategorySheet({ selected, setSelected, onClose, onApply }) {
  const [expanded, setExpanded] = useState({});

  function isLeafOn(cat) { return selected[cat.id] === true; }
  function subsOf(cat) { return Array.isArray(selected[cat.id]) ? selected[cat.id] : []; }

  function toggleLeaf(cat) {
    const next = { ...selected };
    if (next[cat.id]) delete next[cat.id]; else next[cat.id] = true;
    setSelected(next);
  }
  function toggleExpand(cat) { setExpanded(e => ({ ...e, [cat.id]: !e[cat.id] })); }
  function toggleSub(cat, sub) {
    const cur = subsOf(cat);
    const nextSubs = cur.includes(sub) ? cur.filter(s => s !== sub) : [...cur, sub];
    const next = { ...selected };
    if (nextSubs.length) next[cat.id] = nextSubs; else delete next[cat.id];
    setSelected(next);
  }
  function clearAll() { setSelected({}); setExpanded({}); }

  function parentRight(cat) {
    if (expanded[cat.id]) return <span className="cat-row__chev"><Icon name="chevron-down" size={24} style={{ color: "var(--blue-600)" }} /></span>;
    const subs = subsOf(cat);
    if (subs.length === cat.subs.length) return <span className="chk-box" data-on="true"><Icon name="check" size={15} stroke={3} /></span>;
    if (subs.length > 0) return <span className="frow__count">{subs.length}</span>;
    return <Icon name="chevron-right" size={24} style={{ color: "var(--blue-600)" }} />;
  }

  return (
    <React.Fragment>
      <div className="sheet__head">
        <button className="sheet__x" onClick={onClose}><Icon name="x" size={22} stroke={2.4} /></button>
        <h2>Category</h2>
        <button className="sheet__clear" onClick={clearAll}>Clear</button>
      </div>
      <div className="sheet__body">
        {CATEGORIES.map(cat => {
          const subs = subsOf(cat);
          const active = isLeafOn(cat) || subs.length > 0;
          return (
            <div key={cat.id}>
              <button className={"cat-row" + (active ? " cat-row--active" : "")}
                onClick={() => cat.subs ? toggleExpand(cat) : toggleLeaf(cat)}>
                <span className="cat-row__ic"><Icon name={cat.icon} size={24} /></span>
                <span>
                  <span className="cat-row__label">{cat.label}</span>
                  {cat.subs && subs.length > 0 && !expanded[cat.id] && (
                    <span className="cat-row__sub">
                      {subs.slice(0, 2).join(" • ")}{subs.length > 2 ? ` +${subs.length - 2}` : ""}
                    </span>
                  )}
                </span>
                {cat.subs
                  ? parentRight(cat)
                  : <span className="chk-box" data-on={isLeafOn(cat)}>{isLeafOn(cat) && <Icon name="check" size={15} stroke={3} />}</span>}
              </button>
              {cat.subs && expanded[cat.id] && (
                <div className="fade-up" style={{ background: "var(--gray-0)", borderBottom: "1px solid var(--gray-200)", paddingBottom: 6 }}>
                  {cat.subs.map(sub => {
                    const on = subs.includes(sub);
                    return (
                      <button key={sub} className="cat-sub" onClick={() => toggleSub(cat, sub)}>
                        <span className="chk-box" data-on={on}>{on && <Icon name="check" size={15} stroke={3} />}</span>
                        <span className="cat-sub__label">{sub}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <div style={{ height: 8 }} />
      </div>
      <div className="sheet__foot">
        <button className="skid-btn skid-btn--primary btn-block" onClick={onApply}>Apply Filter</button>
        <button className="ghost-link" onClick={onClose}>Cancel</button>
      </div>
    </React.Fragment>
  );
}

window.CategorySheet = CategorySheet;
