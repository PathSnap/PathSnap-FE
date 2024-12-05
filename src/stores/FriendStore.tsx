import { create } from 'zustand';
import { api } from '../utils/api';

export type Friend = {
  friendId: string;
  name: string;
  imageId: string;
  url?: string;
  phoneNumber?: string;
};

type Leader = {
  userId: string;
  userName: string;
  imageId: string;
  url: string;
};

interface FriendStore {
  // 기록에 속한 유저 조회
  leader: Leader;
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
  searchFriendsAtRecord: (recordId: string) => void;
  // 유저 검색
  searchResults: Friend[];
  setSearchResults: (friends: Friend[]) => void;
  searchFriends: (name: string) => Promise<Friend[]>;
  // 유저 삭제
  deleteFriend: (friendId: string) => void;
  addFriend: (userId: string, recordId: string) => void;
}

const useFriendStore = create<FriendStore>((set, get) => ({
  leader: {
    userId: '',
    userName: '',
    imageId: '',
    url: '',
  },
  friends: [],
  setFriends: (friends) => set({ friends }),
  searchFriendsAtRecord: async (recordId: string) => {
    try {
      const res: any = await api.get(`/friends/${recordId}`);
      console.log(res);
      set({ leader: res.user });
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
      const friends = res.map((friend: any) => ({
        ...friend,
        friendId: friend.userId,
      }));

      get().setSearchResults(friends);
      return friends;
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
  addFriend: async (userId: string, recordId: string) => {
    try {
      const res = await api.post(`/friends/${userId}/${recordId}`);
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useFriendStore;
