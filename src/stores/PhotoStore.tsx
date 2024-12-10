import { create } from 'zustand';
import { api } from '../utils/api';

type Photo = {
  recordId: string;
  photoId: string;
  url: string;
  lat: number;
  lng: number;
  isSelect: boolean;
};

interface PhotoStore {
  photos: Photo[];
  searchPhotos: (lon: number, lat: number, radius: number) => void;
  togglePhotoSelection: (photoId: string) => void; // 특정 photo의 선택 상태를 반전
}

const MAX_PHOTOS = 20; // 최대 사진 개수

const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  searchPhotos: async (
    lon: number,
    lat: number,
    radius: number
  ): Promise<void> => {
    // console.log('Searching photos:', lon, lat, radius);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      const res: any = await api.get(
        `/photos/${userId}/${lon}/${lat}/${radius}`
      );

      if (Array.isArray(res)) {
        // 기존 사진과 새로운 사진 병합
        const existingPhotos = get().photos;

        const mergedPhotos = [
          ...existingPhotos,
          ...res
            .filter(
              (newPhoto: Photo) =>
                !existingPhotos.some(
                  (existingPhoto) => existingPhoto.photoId === newPhoto.photoId
                )
            )
            .map((newPhoto: Photo) => ({
              ...newPhoto,
              isSelect: false, // 항상 isSelect를 false로 설정
            })),
        ];

        // 최대 개수 제한
        const limitedPhotos = mergedPhotos.slice(-MAX_PHOTOS);

        set({ photos: limitedPhotos });
        // console.log('Fetched photos:', limitedPhotos);
      } else {
        console.error('Unexpected API response:', res);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  },

  togglePhotoSelection: (photoId) => {
    set((state) => ({
      photos: state.photos.map((photo) =>
        photo.photoId === photoId
          ? { ...photo, isSelect: !photo.isSelect } // 선택 상태 반전
          : photo
      ),
    }));
  },
}));

export default usePhotoStore;
