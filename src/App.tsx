import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ModalView from './pages/ModalView';
import BottomAndFooterLayout from './layouts/BottomAndFooterLayout';
import NoBottomAndFooterLayout from './layouts/NoBottomAndFooterLayout';
import AddFriendPage from './pages/AddFriendPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 바텀시트와 푸터가 모두 존재하는 레이아웃 */}
        <Route path="/" element={<BottomAndFooterLayout />}>
          <Route index element={<MainPage />} />
        </Route>

        {/* 바텀시트와 푸터가 모두 존재하지 않는 레이아웃 */}
        <Route element={<NoBottomAndFooterLayout />}>
          <Route path="/add" element={<AddFriendPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/profile" element={<RegisterPage />} />
        </Route>
      </Routes>
      <ModalView />
    </Router>
  );
}

export default App;
