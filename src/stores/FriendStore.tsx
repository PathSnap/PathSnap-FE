import { create } from 'zustand';
import { api } from '../utils/api';

type Friend = {
  friendId: string;
  name: string;
  imageId: string;
  url: string;
};
interface FriendStore {
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
  searchFriends: (recordId: string) => void;
}

const useFriendStore = create<FriendStore>((set) => ({
  friends: [],
  setFriends: (friends) => set({ friends }),
  searchFriends: async (recordId: string) => {
    try {
      const res: any = await api.get(`/friends/${recordId}`);
      console.log(res.friends);
      set({ friends: res.friends });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useFriendStore;
