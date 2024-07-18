import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { ExpenseTracker } from "./pages/expense-tracker/index";

function App() {
  return (
    <div className="App">
      {/* <Router basename="/expense-tracker-vite-react-firebase"> */}
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          {/* <Route path="*" element={<div>Not Found</div>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;