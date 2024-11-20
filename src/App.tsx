import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ModalView from './pages/ModalView';
import BottomAndFooterLayout from './layouts/BottomAndFooterLayout';
import NoBottomAndFooterLayout from './layouts/NoBottomAndFooterLayout';
import AddFriend from './pages/AddFriend';

function App() {
  return (
    <Router>
      <Routes>
        {/* 바텀시트와 푸터가 모두 존재하는 레이아웃 */}
        <Route path="/" element={<BottomAndFooterLayout />}>
          {/* Outlet을 통해 하위 컴포넌트가 렌더링됩니다 */}
          <Route index element={<MainPage />} />
        </Route>

        {/* 바텀시트와 푸터가 모두 존재하지 않는 레이아웃 */}
        <Route path="/add" element={<NoBottomAndFooterLayout />}>
          <Route index element={<AddFriend />} />
        </Route>
      </Routes>
      <ModalView />
    </Router>
  );
}

export default App;
