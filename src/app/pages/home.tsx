import { useNavigate } from "react-router-dom";
import { useActivityStore } from "../../store/useActivityStore";
import { useAnswerSheet } from "../../store/useAnswerSheet";
import { useEffect } from "react";
import { QuizHeader } from "../../components/quizHeader";
import Button from "../../components/button";

const HomePage = () => {
  const navigate = useNavigate();
  const activities = useActivityStore((state) => state.activities) || [];
  const {
    quizDone,
    setAnswerSheet,
    setActivityIndex,
    setQuestionIndex,
    setRoundIndex,
    setQuizDone,
  } = useAnswerSheet();

  useEffect(() => {
    setQuestionIndex(0);
    setRoundIndex(0);
  }, []);

  const openActivity = (index: number) => {
    setAnswerSheet({});
    setActivityIndex(index);
    setQuizDone(false);
    navigate("/quiz");
  };

  return (
    <div>
      <QuizHeader section="CAE" title="Grammar Check" />
      <div className="flex flex-col w-full divide-y border-y mb-12">
        {activities.map((activity, idx) => {
          return (
            <button
              key={idx}
              className="flex w-full items-center uppercase justify-center p-8 font-bold hover:bg-slate-100"
              onClick={() => openActivity(idx)}
            >
              {activity.activity_name}
            </button>
          );
        })}
      </div>
      <Button
        disabled={!quizDone}
        // className="bg-teal-500 text-white"
        label="Results"
        align="center"
        onClick={() => navigate("/results")}
      />
    </div>
  );
};

export default HomePage;
