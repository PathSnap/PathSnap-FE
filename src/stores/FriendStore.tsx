import { create } from 'zustand';
import { api } from '../utils/api';

export type Friend = {
  friendId: string;
  name: string;
  imageId: string;
  url: string;
  phoneNumber?: string;
};

interface FriendStore {
  // 기록에 속한 유저 조회
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
  searchFriendsAtRecord: (recordId: string) => void;
  // 유저 검색
  searchResults: Friend[];
  setSearchResults: (friends: Friend[]) => void;
  searchFriends: (name: string) => Promise<Friend[]>;
  // 유저 삭제
  deleteFriend: (friendId: string) => void;
}

const useFriendStore = create<FriendStore>((set, get) => ({
  friends: [],
  setFriends: (friends) => set({ friends }),
  searchFriendsAtRecord: async (recordId: string) => {
    try {
      const res: any = await api.get(`/friends/${recordId}`);
      console.log(res.friends);
      set({ friends: res.friends });
    } catch (error) {
      console.error(error);
    }
  },
  searchResults: [],
  setSearchResults: (friends) => set({ searchResults: friends }),
  searchFriends: async (name: string) => {
    try {
      const res: any = await api.get(`/friends/search/${name}`);
      get().setSearchResults(res);

      return res;
    } catch (error) {
      console.error(error);
    }
  },
  deleteFriend: async (friendId: string) => {
    try {
      const res = api.delete(`/friends/delete/${friendId}`);
      console.log(res);
    } catch (error) {}
  },
}));

export default useFriendStore;
