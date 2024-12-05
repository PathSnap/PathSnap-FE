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
      // console.log(res);
      // console.log('friends : ', get().friends);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useFriendStore;
