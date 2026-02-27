import { useState } from "react";
import COLORS from "../styles/colors";
import { weekDays, calendarData } from "../data/vendors";

export default function CalendarView() {
  const [activeDay, setActiveDay] = useState("Sat");
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  return (
    <div>
      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: "#fff", marginBottom: 14 }}>
        📅 Weekly Schedule
      </div>

      {/* Day selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto", paddingBottom: 4 }}>
        {weekDays.map((d, i) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + i);
          const dateNum = date.getDate();
          const hasFood = calendarData[d];

          return (
            <button key={d} onClick={() => hasFood && setActiveDay(d)} style={{
              minWidth: 52, padding: "10px 0",
              borderRadius: 14, border: "none",
              background: activeDay === d ? COLORS.orange : (hasFood ? COLORS.cardLight : COLORS.card),
              cursor: hasFood ? "pointer" : "default",
              opacity: hasFood ? 1 : 0.4,
              transition: "all 0.2s",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            }}>
              <span style={{ fontSize: 11, color: activeDay === d ? "#fff" : "#888", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{d}</span>
              <span style={{ fontSize: 16, color: activeDay === d ? "#fff" : "#ccc", fontFamily: "'Fredoka One', cursive" }}>{dateNum}</span>
              {hasFood && <span style={{ width: 6, height: 6, borderRadius: "50%", background: activeDay === d ? "#fff" : COLORS.orange }} />}
            </button>
          );
        })}
      </div>

      {/* Vendor slots for selected day */}
      {calendarData[activeDay] ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {calendarData[activeDay].map((item, i) => (
            <div key={i} style={{
              background: COLORS.card, borderRadius: 14,
              padding: "14px 16px", display: "flex",
              alignItems: "center", gap: 12,
              borderLeft: `4px solid ${item.color}`,
              border: `1px solid ${item.color}30`,
            }}>
              <span style={{ fontSize: 24 }}>{item.emoji}</span>
              <div>
                <div style={{ fontFamily: "'Fredoka One', cursive", color: "#fff", fontSize: 15 }}>{item.vendor}</div>
                <div style={{ fontSize: 12, color: "#888", fontFamily: "'Nunito', sans-serif" }}>⏰ {item.time}</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <span style={{
                  fontSize: 11, padding: "4px 12px", borderRadius: 20,
                  background: `${item.color}20`, color: item.color,
                  fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                  border: `1px solid ${item.color}40`,
                }}>Open</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "30px 0", color: "#555", fontFamily: "'Nunito', sans-serif" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>😴</div>
          No vendors on this day — check the weekend!
        </div>
      )}
    </div>
  );
}
