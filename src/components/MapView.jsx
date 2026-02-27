import COLORS from "../styles/colors";

const positions = [
  { top: "30%", left: "25%" },
  { top: "50%", left: "55%" },
  { top: "65%", left: "30%" },
  { top: "40%", left: "70%" },
];

export default function MapView({ vendors, selectedId, onSelect }) {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: 260,
      borderRadius: 20,
      overflow: "hidden",
      background: "#16213E",
      border: `1px solid ${COLORS.cardLight}`,
      flexShrink: 0,
    }}>
      {/* Horizontal grid lines */}
      {[...Array(6)].map((_, i) => (
        <div key={`h${i}`} style={{
          position: "absolute", left: 0, right: 0,
          top: `${(i + 1) * 16}%`,
          height: 1, background: "rgba(255,255,255,0.05)"
        }} />
      ))}

      {/* Vertical grid lines */}
      {[...Array(8)].map((_, i) => (
        <div key={`v${i}`} style={{
          position: "absolute", top: 0, bottom: 0,
          left: `${(i + 1) * 12}%`,
          width: 1, background: "rgba(255,255,255,0.05)"
        }} />
      ))}

      {/* Roads */}
      <div style={{ position: "absolute", top: "45%", left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.08)" }} />
      <div style={{ position: "absolute", left: "45%", top: 0, bottom: 0, width: 3, background: "rgba(255,255,255,0.08)" }} />

      <div style={{
        position: "absolute", top: 12, left: 14,
        fontSize: 11, color: "rgba(255,255,255,0.35)",
        fontFamily: "'Nunito', sans-serif", fontWeight: 700,
        letterSpacing: 2, textTransform: "uppercase"
      }}>📍 Your Area</div>

      {/* User location dot */}
      <div style={{
        position: "absolute", top: "47%", left: "47%",
        width: 14, height: 14, borderRadius: "50%",
        background: COLORS.blue,
        boxShadow: `0 0 0 4px rgba(59,130,246,0.3)`,
        transform: "translate(-50%,-50%)"
      }} />

      {/* Vendor pins */}
      {vendors.map((v, i) => (
        <button key={v.id} onClick={() => onSelect(v.id)} style={{
          position: "absolute",
          top: positions[i].top, left: positions[i].left,
          transform: "translate(-50%, -50%)",
          background: selectedId === v.id ? v.color : COLORS.card,
          border: `2px solid ${v.color}`,
          borderRadius: 40, padding: "4px 10px",
          cursor: "pointer", transition: "all 0.2s",
          display: "flex", alignItems: "center", gap: 4,
          boxShadow: selectedId === v.id ? `0 0 16px ${v.color}60` : "none",
        }}>
          <span style={{ fontSize: 14 }}>{v.emoji}</span>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: selectedId === v.id ? "#fff" : v.color,
            fontFamily: "'Nunito', sans-serif",
          }}>{v.distance}</span>
        </button>
      ))}
    </div>
  );
}
