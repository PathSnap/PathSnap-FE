import { create } from 'zustand';
import { api } from '../utils/api';

interface userInfo {
  userName: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  imageId?: string;
}
interface UserInfoStoreState {
  userInfo: userInfo;
  setUserInfo: (userInfo: userInfo) => void;
  updateUserInfo: (userInfo: userInfo) => Promise<void>;
}

const useUserInfoStore = create<UserInfoStoreState>((set) => ({
  userInfo: {
    userName: '',
    birthDate: '',
    phoneNumber: '',
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

      set({ userInfo: res.data });
      console.log('프로필 저장 성공:', res.data);
    } catch (error) {
      console.error('프로필 저장 실패:', error);
    }
  },
}));

export default useUserInfoStore;
