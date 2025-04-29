import { create } from "zustand";

type ActivityStore = {
    activities: any[]
    activityIndex: any
    quizMode: string
    setActivities: (activities: any[]) => void
}

export const useActivityStore = create<ActivityStore>((set) => ({
    activities: [],
    activityIndex: 1,
    quizMode: "",
    setActivities: (activities: any[]) => set(() => ({ activities: activities })),
}));
