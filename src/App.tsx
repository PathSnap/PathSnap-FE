import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ModalView from './pages/ModalView';
import BottomAndFooterLayout from './layouts/BottomAndFooterLayout';
import NoBottomAndFooterLayout from './layouts/NoBottomAndFooterLayout';
import AddFriendPage from './pages/AddFriendPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SerchPage from './pages/SerchPage';
import OAuth2Callback from './pages/OAuth2Callback';
import ProfilePage from './pages/ProfilePage';
import FooterLayout from './layouts/FooterLayout';
import EditProfilePage from './pages/EditProfilePage';

import useAutoSaveRouteRecord from './hooks/Recording/useAutoSaveRouteRecord';

function App() {
  useAutoSaveRouteRecord();
  return (
    <Router>
      <Routes>
        {/* 바텀시트와 푸터가 모두 존재하는 레이아웃 */}
        <Route path="/" element={<BottomAndFooterLayout />}>
          <Route index element={<MainPage />} />
        </Route>

        {/* 푸터만 존재하는 레이아웃 */}
        <Route element={<FooterLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* 바텀시트와 푸터가 모두 존재하지 않는 레이아웃 */}
        <Route element={<NoBottomAndFooterLayout />}>
          <Route path="/add" element={<AddFriendPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/serch" element={<SerchPage />} />
          <Route path="/oauth2/callback" element={<OAuth2Callback />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
        </Route>
      </Routes>
      <ModalView />
    </Router>
  );
}

export default App;
