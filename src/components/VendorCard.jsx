import COLORS from "../styles/colors";

export default function VendorCard({ v, selected, onSelect, onBook, booked }) {
  const pct = Math.round((v.booked / v.slots) * 100);

  return (
    <div onClick={() => onSelect(v.id)} style={{
      background: selected ? COLORS.cardLight : COLORS.card,
      borderRadius: 18,
      border: `2px solid ${selected ? v.color : "transparent"}`,
      padding: "16px 18px",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: selected ? `0 4px 24px ${v.color}30` : "none",
      flexShrink: 0,
    }}>
      {/* Card Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: `${v.color}25`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, border: `1px solid ${v.color}40`,
          }}>{v.emoji}</div>
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 17, color: "#fff" }}>{v.name}</div>
            <div style={{ fontSize: 12, color: "#888", fontFamily: "'Nunito', sans-serif" }}>
              {v.type} · {v.distance} · ⭐ {v.rating}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 120 }}>
          {v.tags.map(t => (
            <span key={t} style={{
              fontSize: 10, padding: "2px 8px", borderRadius: 20,
              background: t === "Free" ? `${COLORS.green}25` : `${v.color}25`,
              color: t === "Free" ? COLORS.green : v.color,
              fontWeight: 700, fontFamily: "'Nunito', sans-serif",
              border: `1px solid ${t === "Free" ? COLORS.green : v.color}40`,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Expanded Details */}
      {selected && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 12, color: "#888", fontFamily: "'Nunito', sans-serif", marginBottom: 6 }}>
            📅 Available: {v.days.join(", ")} · ⏰ {v.times}
          </div>
          <div style={{ fontSize: 12, color: "#888", fontFamily: "'Nunito', sans-serif", marginBottom: 10 }}>
            📍 {v.address}
          </div>

          {/* Slots bar */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif" }}>Slots remaining</span>
              <span style={{ fontSize: 11, color: v.color, fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
                {v.slots - v.booked} / {v.slots}
              </span>
            </div>
            <div style={{ background: COLORS.dark, borderRadius: 10, height: 6 }}>
              <div style={{ width: `${pct}%`, height: "100%", borderRadius: 10, background: v.color, transition: "width 0.5s" }} />
            </div>
          </div>

          {/* Menu */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "#bbb", fontFamily: "'Nunito', sans-serif", marginBottom: 6, fontWeight: 700 }}>Menu:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {v.meals.map(m => (
                <span key={m} style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 20,
                  background: COLORS.dark, color: "#ccc",
                  fontFamily: "'Nunito', sans-serif",
                  border: `1px solid ${COLORS.cardLight}`,
                }}>{m}</span>
              ))}
            </div>
          </div>

          {/* Reserve button */}
          <button onClick={(e) => { e.stopPropagation(); onBook(v.id); }} style={{
            width: "100%", padding: "10px",
            borderRadius: 12, border: "none",
            background: booked ? `${COLORS.green}20` : v.color,
            color: booked ? COLORS.green : "#fff",
            fontFamily: "'Fredoka One', cursive",
            fontSize: 15, cursor: "pointer",
            transition: "all 0.2s",
            border: booked ? `1px solid ${COLORS.green}` : "none",
          }}>
            {booked ? "✓ Reserved!" : "Reserve a Spot"}
          </button>
        </div>
      )}
    </div>
  );
}
