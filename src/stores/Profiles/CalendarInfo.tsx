import { create } from 'zustand';
import { api } from '../../utils/api';

export type SelectedDate = {
  selectedYear: number;
  selectedMonth: number;
};

type Trip = {
  recordId: string;
  startDate: string;
  recordName: string;
  image: {
    imageId: string;
    url: string;
  };
};

type PackTrip = {
  packTripId: string;
  packTripName: string;
  dates: string[];
};

type PackTripReq = {
  userId: string;
  packTripName: string;
  dates: string[];
};

interface CalendarInfoStore {
  selectedDate: SelectedDate;
  setSelectedDate: (newDate: Partial<SelectedDate>) => void;
  searchMonthTrip: (selectedDate: SelectedDate) => void;
  trips: Trip[];
  packTrips: PackTrip[];
  savePackTrips: (pakcTripReq: PackTripReq) => void;
}

const useCalendarInfoStore = create<CalendarInfoStore>((set) => ({
  selectedDate: {
    selectedYear: new Date().getFullYear(),
    selectedMonth: new Date().getMonth() + 1,
  },
  setSelectedDate: (newDate: Partial<SelectedDate>) =>
    set((state) => ({
      selectedDate: {
        ...state.selectedDate,
        ...newDate,
      },
    })),
  searchMonthTrip: async (selectedDate: SelectedDate) => {
    try {
      set({ selectedDate: selectedDate });
      const res: any = await api.get(
        `/profiles/calendar/${localStorage.getItem('userId')}/${selectedDate.selectedMonth}`
      );
      set({ trips: res.calendar });
      set({ packTrips: res.newTrips });
    } catch (error) {
      console.error(error);
    }
  },
  trips: [],
  packTrips: [],
  savePackTrips: async (packTripReq: PackTripReq) => {
    api.post('/profiles/trips/profiles/trips', packTripReq);
  },
}));

export default useCalendarInfoStore;
