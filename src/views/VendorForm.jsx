import { useState } from "react";
import COLORS from "../styles/colors";
import { weekDays } from "../data/vendors";

const inputStyle = {
  width: "100%", background: COLORS.card,
  border: `1px solid #242440`,
  borderRadius: 12, padding: "12px 14px",
  color: "#fff", fontFamily: "'Nunito', sans-serif",
  fontSize: 14, outline: "none", boxSizing: "border-box",
};

const labelStyle = {
  display: "block", fontSize: 12,
  color: "#888", fontFamily: "'Nunito', sans-serif",
  fontWeight: 700, marginBottom: 6,
  textTransform: "uppercase", letterSpacing: 1,
};

function SuccessScreen({ form, onReset }) {
  return (
    <div style={{ padding: "40px 24px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, color: COLORS.green, marginBottom: 8 }}>
        You're listed!
      </div>
      <div style={{ fontSize: 15, color: "#888", fontFamily: "'Nunito', sans-serif", marginBottom: 24 }}>
        Students in your area can now find and reserve meals from{" "}
        <span style={{ color: "#fff" }}>{form.name}</span>.
      </div>

      <div style={{
        background: "#1A1A2E", borderRadius: 18, padding: 20,
        border: `1px solid #242440`, textAlign: "left", marginBottom: 24,
      }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", color: "#fff", fontSize: 18, marginBottom: 10 }}>Your Listing</div>
        {[
          ["📛 Name", form.name],
          ["🏠 Type", form.type],
          ["📍 Address", form.address],
          ["📅 Days", form.days.join(", ") || "—"],
          ["⏰ Hours", form.times || "—"],
          ["🪑 Slots", form.slots || "—"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#888", fontFamily: "'Nunito', sans-serif" }}>{k}</span>
            <span style={{ fontSize: 13, color: "#ddd", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </div>

      <button onClick={onReset} style={{
        padding: "12px 28px", borderRadius: 14, border: "none",
        background: COLORS.green, color: "#fff",
        fontFamily: "'Fredoka One', cursive", fontSize: 16, cursor: "pointer",
      }}>Edit Listing</button>
    </div>
  );
}

export default function VendorForm() {
  const [form, setForm] = useState({
    name: "", type: "Home Cook", address: "",
    days: [], times: "", slots: "", meals: "", tags: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleDay = (d) =>
    setForm(f => ({ ...f, days: f.days.includes(d) ? f.days.filter(x => x !== d) : [...f.days, d] }));

  const toggleTag = (t) =>
    setForm(f => ({ ...f, tags: f.tags.includes(t) ? f.tags.filter(x => x !== t) : [...f.tags, t] }));

  const handleSubmit = () => {
    if (form.name && form.address && form.days.length > 0) setSubmitted(true);
  };

  if (submitted) return <SuccessScreen form={form} onReset={() => setSubmitted(false)} />;

  return (
    <div style={{ padding: "20px 16px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: "#fff" }}>
          List Your Meals 🍽️
        </div>
        <div style={{ fontSize: 14, color: "#888", fontFamily: "'Nunito', sans-serif", marginTop: 4 }}>
          Help students in your community on days off school
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Name */}
        <div>
          <label style={labelStyle}>Vendor / Business Name</label>
          <input style={inputStyle} placeholder="e.g. Maria's Kitchen" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>

        {/* Type */}
        <div>
          <label style={labelStyle}>Type</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Home Cook", "Food Truck", "Nonprofit", "Local Restaurant"].map(t => (
              <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))} style={{
                padding: "8px 14px", borderRadius: 30,
                background: form.type === t ? COLORS.green : "#1A1A2E",
                color: form.type === t ? "#fff" : "#888",
                fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12,
                cursor: "pointer", transition: "all 0.2s",
                border: form.type === t ? "none" : `1px solid #242440`,
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Address */}
        <div>
          <label style={labelStyle}>Address / Location</label>
          <input style={inputStyle} placeholder="123 Main St or intersection" value={form.address}
            onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
        </div>

        {/* Days */}
        <div>
          <label style={labelStyle}>Available Days</label>
          <div style={{ display: "flex", gap: 8 }}>
            {weekDays.map(d => (
              <button key={d} onClick={() => toggleDay(d)} style={{
                flex: 1, padding: "8px 0", borderRadius: 10, border: "none",
                background: form.days.includes(d) ? COLORS.orange : "#1A1A2E",
                color: form.days.includes(d) ? "#fff" : "#666",
                fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                fontSize: 11, cursor: "pointer", transition: "all 0.2s",
              }}>{d}</button>
            ))}
          </div>
        </div>

        {/* Times & Slots */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={labelStyle}>Hours</label>
            <input style={inputStyle} placeholder="e.g. 11am – 3pm" value={form.times}
              onChange={e => setForm(f => ({ ...f, times: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Max Students</label>
            <input style={inputStyle} type="number" placeholder="e.g. 20" value={form.slots}
              onChange={e => setForm(f => ({ ...f, slots: e.target.value }))} />
          </div>
        </div>

        {/* Meals */}
        <div>
          <label style={labelStyle}>Menu Items (comma separated)</label>
          <input style={inputStyle} placeholder="Rice & Beans, Chicken Soup, Juice" value={form.meals}
            onChange={e => setForm(f => ({ ...f, meals: e.target.value }))} />
        </div>

        {/* Tags */}
        <div>
          <label style={labelStyle}>Tags</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Free", "$2 Max", "Hot Meals", "Grab & Go", "Vegan", "Breakfast", "Halal"].map(t => (
              <button key={t} onClick={() => toggleTag(t)} style={{
                padding: "6px 14px", borderRadius: 20,
                background: form.tags.includes(t) ? COLORS.purple : "#1A1A2E",
                color: form.tags.includes(t) ? "#fff" : "#888",
                fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12,
                cursor: "pointer", transition: "all 0.2s",
                border: form.tags.includes(t) ? "none" : `1px solid #242440`,
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} style={{
          width: "100%", padding: "14px",
          borderRadius: 14, border: "none",
          background: `linear-gradient(135deg, ${COLORS.green}, #1db485)`,
          color: "#fff", fontFamily: "'Fredoka One', cursive",
          fontSize: 18, cursor: "pointer", marginTop: 8,
          boxShadow: `0 4px 20px ${COLORS.green}40`,
        }}>
          🚀 Publish My Listing
        </button>
      </div>
    </div>
  );
}
