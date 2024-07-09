import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/:id" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
