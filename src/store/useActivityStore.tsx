import { create } from "zustand";

type ActivityStore = {
  activities: any[];
  activityIndex: any;
  quizMode: string;
  isLoading: boolean;
  setIsLoading: (newLoadingState: boolean) => void;
  setActivities: (activities: any[]) => void;
};

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  activityIndex: 1,
  quizMode: "",
  isLoading: true,
  setIsLoading: (newLoadingState: boolean) =>
    set(() => ({ isLoading: newLoadingState })),
  setActivities: (activities: any[]) => set(() => ({ activities: activities })),
}));
