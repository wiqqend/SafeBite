import COLORS from "../styles/colors";

export default function Header({ mode, setMode }) {
  return (
    <header style={{
      background: COLORS.dark,
      borderBottom: `2px solid ${COLORS.cardLight}`,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 28 }}>🍽️</span>
        <span style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: 24,
          background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.yellow})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: 1,
        }}>SafeBite</span>
      </div>

      <div style={{
        display: "flex",
        background: COLORS.cardLight,
        borderRadius: 40,
        padding: 4,
        gap: 4,
      }}>
        {["Student", "Vendor"].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: "6px 20px",
            borderRadius: 36,
            border: "none",
            cursor: "pointer",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            transition: "all 0.25s",
            background: mode === m ? (m === "Student" ? COLORS.orange : COLORS.green) : "transparent",
            color: mode === m ? "#fff" : "#888",
          }}>{m}</button>
        ))}
      </div>

      <div style={{ width: 120, display: "flex", justifyContent: "flex-end" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, cursor: "pointer",
        }}>👤</div>
      </div>
    </header>
  );
}
