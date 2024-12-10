import { create } from 'zustand';
import { api } from '../utils/api';

interface userInfo {
  userName: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  lat: number;
  lng: number;
  imageId?: string;
}
interface UserInfoStoreState {
  userInfo: userInfo;
  setUserInfo: (userInfo: userInfo) => void;
  updateUserInfo: (userInfo: userInfo) => Promise<void>;
  getUserInfo: () => Promise<void>;
}

const useUserInfoStore = create<UserInfoStoreState>((set) => ({
  userInfo: {
    userName: '',
    birthDate: '',
    phoneNumber: '',
    lat: 0,
    lng: 0,
    address: '',
    imageId: '',
  },
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
  updateUserInfo: async (userInfo: userInfo): Promise<void> => {
    try {
      const filteredUserInfo = { ...userInfo };
      // imageId 없을 경우 빼서 요청 보내기
      if (!filteredUserInfo.imageId) {
        delete filteredUserInfo.imageId;
      }

      const res: any = await api.patch('/profiles', {
        userId: localStorage.getItem('userId'),
        userInfo: filteredUserInfo,
      });

      set({ userInfo: res });
      console.log('프로필 저장 성공:', res);
    } catch (error) {
      console.error('프로필 저장 실패:', error);
    }
  },
  getUserInfo: async (): Promise<void> => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
      const res: any = await api.get(`/profiles/${userId}`);
      set({ userInfo: res });
    } catch (error) {
      console.error('프로필 정보 불러오기 실패:', error);
    }
  },
}));

export default useUserInfoStore;
