import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Footer from './components/Footer';
import BottomSheet from './components/BottomSheet/BottomSheet';
import ModalView from './pages/ModalView';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <BottomSheet />
        <Footer />
      </Router>
      <ModalView />
    </>
  );
}

export default App;
