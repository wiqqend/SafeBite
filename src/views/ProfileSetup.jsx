import { useState } from "react";
import COLORS from "../styles/colors";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.07)",
  border: `1px solid rgba(255,255,255,0.1)`,
  borderRadius: 14, padding: "14px 16px",
  color: "#fff", fontFamily: "'Nunito', sans-serif",
  fontSize: 15, outline: "none", boxSizing: "border-box",
};

export default function ProfileSetup({ onDone }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [zip, setZip] = useState("");

  const isReady = name && grade && zip.length === 5;

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.dark,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <div style={{ maxWidth: 380, width: "100%" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>🍽️</div>
          <div style={{
            fontFamily: "'Fredoka One', cursive", fontSize: 36,
            background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.yellow})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>SafeBite</div>
          <div style={{ fontSize: 14, color: "#888", fontFamily: "'Nunito', sans-serif", marginTop: 6 }}>
            Connecting students with meals on days off school
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Name */}
          <div>
            <div style={{ fontSize: 12, color: "#888", fontFamily: "'Nunito', sans-serif", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
              Your Name
            </div>
            <input style={inputStyle} placeholder="First name" value={name}
              onChange={e => setName(e.target.value)} />
          </div>

          {/* Grade */}
          <div>
            <div style={{ fontSize: 12, color: "#888", fontFamily: "'Nunito', sans-serif", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
              Grade
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["K–2", "3–5", "6–8", "9–12"].map(g => (
                <button key={g} onClick={() => setGrade(g)} style={{
                  flex: 1, padding: "10px 0", borderRadius: 12, border: "none",
                  background: grade === g ? COLORS.orange : "rgba(255,255,255,0.07)",
                  color: grade === g ? "#fff" : "#888",
                  fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13,
                  cursor: "pointer", transition: "all 0.2s",
                }}>{g}</button>
              ))}
            </div>
          </div>

          {/* ZIP */}
          <div>
            <div style={{ fontSize: 12, color: "#888", fontFamily: "'Nunito', sans-serif", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
              ZIP Code
            </div>
            <input style={inputStyle} placeholder="e.g. 27601" value={zip}
              maxLength={5} onChange={e => setZip(e.target.value)} />
          </div>

          {/* Submit */}
          <button onClick={() => isReady && onDone(name)} style={{
            width: "100%", padding: "14px",
            borderRadius: 14, border: "none",
            background: isReady
              ? `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.yellow})`
              : "#1A1A2E",
            color: isReady ? "#fff" : "#555",
            fontFamily: "'Fredoka One', cursive", fontSize: 18,
            cursor: isReady ? "pointer" : "default",
            marginTop: 8, transition: "all 0.3s",
            boxShadow: isReady ? `0 4px 24px ${COLORS.orange}40` : "none",
          }}>
            Find Food Near Me →
          </button>
        </div>
      </div>
    </div>
  );
}
