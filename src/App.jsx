import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import mystyles from "./App.module.css";

import HomePage from './HomePage';
import BookPage from './BookPage';
import DonatePage from './DonatePage';
import ContactPage from './ContactPage';
import NotFound from './components/NotFound/NotFound';
import ActivityPage from './ActivityPage';

function App() {
  return (
    <div className={mystyles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookPage" element={<BookPage />} />
          <Route path="/activityPage" element={<ActivityPage />} />
          <Route path="/donatePage" element={<DonatePage />} />
          <Route path="/contactPage" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
