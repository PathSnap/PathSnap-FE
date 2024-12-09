import { create } from 'zustand';
import { api } from '../../utils/api';

export type SelectedDate = {
  selectedYear: number;
  selectedMonth: number;
};

interface CalendarInfoStore {
  selectedDate: SelectedDate;
  setSelectedDate: (newDate: Partial<SelectedDate>) => void;
  searchMonthTrip: (selectedDate: SelectedDate) => void;
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
  searchMonthTrip: (selectedDate: SelectedDate) => {
    try {
      set({ selectedDate: selectedDate });
      api.get(
        `/profiles/calendar/${localStorage.getItem('userId')}/${selectedDate.selectedMonth}`
      );
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCalendarInfoStore;
