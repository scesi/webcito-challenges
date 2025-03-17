
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ViewPlans } from "./pages/module-plans/view-plans";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewPlans />} />
      </Routes>
    </Router>
  );
};

export default App;