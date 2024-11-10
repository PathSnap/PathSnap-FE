import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Footer from './components/Footer';
import BottomSheet from './components/BottomSheet/BottomSheet';
import ModalView from './pages/ModalView';
import BottomAndFooterLayout from './layouts/BottomAndFooterLayout';

function App() {
  return (
    <>
      <Router>
        <BottomAndFooterLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BottomAndFooterLayout>
      </Router>
      <ModalView />
    </>
  );
}

export default App;
