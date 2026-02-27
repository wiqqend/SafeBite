import { useState } from "react";
import COLORS from "./styles/colors";
import Header from "./components/Header";
import ProfileSetup from "./views/ProfileSetup";
import StudentView from "./views/StudentView";
import VendorForm from "./views/VendorForm";

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [mode, setMode] = useState("Student");

  if (!onboarded) {
    return (
      <>
        <GlobalStyles />
        <ProfileSetup onDone={() => setOnboarded(true)} />
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: "100vh", background: COLORS.dark, color: "#fff" }}>
        <Header mode={mode} setMode={setMode} />
        {mode === "Student" ? <StudentView /> : <VendorForm />}
      </div>
    </>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #0F0F1A; }
      ::-webkit-scrollbar { width: 0; }
      input::placeholder { color: #555; }
    `}</style>
  );
}
