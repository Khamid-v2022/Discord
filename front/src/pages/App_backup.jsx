import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import "../style/app.scss";
import "../style/fonts.scss";
import Guid from "./Guide/Guid";
import MyLinks from "./MyLinks/MyLinks";
import Replenish from "./Replenish/Replenish";

export default function App() {
  return (
    <section id="app">
      <Guid />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/mylinks" element={<MyLinks />} />
        <Route path="/replenish" element={<Replenish />} />
      </Routes>
    </section>
  );
}
