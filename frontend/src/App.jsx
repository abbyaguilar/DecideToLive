import { BrowserRouter, Routes, Route } from "react-router-dom";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import MainApp from "./MainApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
