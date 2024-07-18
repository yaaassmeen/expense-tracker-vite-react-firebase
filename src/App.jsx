import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { ExpenseTracker } from "./pages/expense-tracker/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/expense-tracker-vite-react-firebase" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="*" element={<div>Not Found</div>} /> {/* Fallback route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;