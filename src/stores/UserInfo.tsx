import { create } from 'zustand';
import { api } from '../utils/api';

interface userInfo {
  userName: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  lat: number;
  lng: number;
  images?: [
    {
      imageId: string;
      url: string;
    },
  ];
}
interface UserInfoStoreState {
  userInfo: userInfo;
  setUserInfo: (userInfo: userInfo) => void;
  getUserInfo: () => Promise<void>;
  updateUserInfo: (userInfo: userInfo) => Promise<void>;
}

const useUserInfoStore = create<UserInfoStoreState>((set) => ({
  userInfo: {
    userName: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    lat: 0,
    lng: 0,
    images: [
      {
        imageId: '',
        url: '',
      },
    ],
  },
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
  getUserInfo: async (): Promise<void> => {
    try {
      const userId = localStorage.getItem('userId');
      const res: any = await api.get(`/profiles/${userId}`);

      set({ userInfo: res });
    } catch (error) {
      console.error('프로필 불러오기 실패:', error);
    }
  },
  updateUserInfo: async (userInfo: userInfo): Promise<void> => {
    try {
      const filteredUserInfo = { ...userInfo };
      // imageId 없을 경우 빼서 요청 보내기
      if (!filteredUserInfo.images || !filteredUserInfo.images[0].imageId) {
        delete filteredUserInfo.images;
      }

      const res: any = await api.patch('/profiles', {
        userId: localStorage.getItem('userId'),
        userInfo: filteredUserInfo,
      });

      set({ userInfo: res.data });
      console.log('프로필 저장 성공:', res.data);
    } catch (error) {
      console.error('프로필 저장 실패:', error);
    }
  },
}));

export default useUserInfoStore;
