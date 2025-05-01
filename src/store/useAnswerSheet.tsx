import { create } from "zustand";
import { persist } from "zustand/middleware";

type AnswerSheet = {
  [key: string]: any;
};

type AnswerSheetStore = {
  answerSheet: AnswerSheet;
  questionIndex: number;
  roundIndex: number;
  activityIndex: number | null;
  quizDone: boolean;
  setAnswerSheet: (newAnswerSheet: object) => void;
  setQuestionIndex: (newIndex: number) => void;
  setRoundIndex: (newIndex: number) => void;
  setActivityIndex: (newIndex: number | null) => void;
  setQuizDone: (quizDone: boolean) => void;
};

export const useAnswerSheet = create<AnswerSheetStore>()(
  persist(
    (set) => ({
      answerSheet: {},
      questionIndex: 0,
      roundIndex: 0,
      activityIndex: null,
      quizDone: false,
      setAnswerSheet: (answerSheet: object) =>
        set(() => ({ answerSheet: answerSheet })),
      setQuestionIndex: (questionIndex: number) =>
        set(() => ({ questionIndex: questionIndex })),
      setRoundIndex: (roundIndex: number) =>
        set(() => ({ roundIndex: roundIndex })),
      setActivityIndex: (activityIndex: number | null) =>
        set(() => ({ activityIndex: activityIndex })),
      setQuizDone: (quizDone: boolean) => set(() => ({ quizDone: quizDone })),
    }),
    {
      name: "answer-sheet",
    }
  )
);
