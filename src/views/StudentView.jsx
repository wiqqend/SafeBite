import { useState } from "react";
import COLORS from "../styles/colors";
import { mockVendors } from "../data/vendors";
import MapView from "../components/MapView";
import VendorCard from "../components/VendorCard";
import CalendarView from "../components/CalendarView";

export default function StudentView() {
  const [tab, setTab] = useState("nearby");
  const [selectedId, setSelectedId] = useState(1);
  const [bookedIds, setBookedIds] = useState([]);

  const toggleBook = (id) => {
    setBookedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: "20px 16px", maxWidth: 480, margin: "0 auto" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: "#fff", lineHeight: 1.2 }}>
          Hey Alex! 👋
        </div>
        <div style={{ fontSize: 14, color: "#888", fontFamily: "'Nunito', sans-serif", marginTop: 4 }}>
          Find free meals near you this weekend
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {[["nearby", "📍 Nearby"], ["calendar", "📅 Schedule"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding: "8px 18px", borderRadius: 30, border: "none",
            background: tab === key ? COLORS.orange : COLORS.card,
            color: tab === key ? "#fff" : "#888",
            fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13,
            cursor: "pointer", transition: "all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      {tab === "nearby" && (
        <>
          <MapView vendors={mockVendors} selectedId={selectedId} onSelect={setSelectedId} />
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {mockVendors.map(v => (
              <VendorCard
                key={v.id}
                v={v}
                selected={selectedId === v.id}
                onSelect={setSelectedId}
                onBook={toggleBook}
                booked={bookedIds.includes(v.id)}
              />
            ))}
          </div>
        </>
      )}

      {tab === "calendar" && <CalendarView />}
    </div>
  );
}
