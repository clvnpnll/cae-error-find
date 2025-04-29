import { useEffect, useMemo, useState } from "react";
import { useActivityStore } from "../../store/useActivityStore";
import { useAnswerSheet } from "../../store/useAnswerSheet";
import { QuizHeader } from "../../components/quizHeader";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { activities = [] } = useActivityStore();
  const { answerSheet, activityIndex, quizDone } = useAnswerSheet();
  const [resultsList, setResultsList] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const activity = useMemo(
    () => (activityIndex != null ? activities[activityIndex] || {} : {}),
    [activities, activityIndex]
  );

  const checkAnswers = () => {
    let score = 0;
    let totalQuestions = 0;
    const items: any[] = [];

    activity.questions?.forEach((question: any) => {
      if (question.round_title) {
        items.push({
          roundTitle: question.round_title,
        });

        question.questions.forEach((item: any) => {
          const questionKey = `R${question.order}-Q${item.order}`;
          const isCorrect = answerSheet[questionKey].answer == item.is_correct;

          items.push({
            key: `Q${item.order}`,
            isCorrect: isCorrect,
            feedback: answerSheet[questionKey].feedback,
          });

          if (isCorrect) {
            score += 1;
          }
          totalQuestions += 1;
        });
      } else {
        const questionKey = `Q${question.order}`;
        const isCorrect =
          answerSheet[questionKey].answer == question.is_correct;

        items.push({
          key: questionKey,
          isCorrect: isCorrect,
          feedback: answerSheet[questionKey].feedback,
        });

        if (isCorrect) {
          score += 1;
        }
        totalQuestions += 1;
      }

      setResultsList(items);
      setScore(score);
      setTotalQuestions(totalQuestions);
    });
  };

  useEffect(() => {
    if (activityIndex == null) {
      navigate("/home");
    } else if (!quizDone) {
      navigate("/quiz");
    } else {
      checkAnswers();
    }
  }, [activities]);

  const renderResults = () => {
    return resultsList.map((question: any, idx: number) => {
      if (question.roundTitle) {
        return (
          <div
            className="py-8 px-12 w-full text-lg font-bold"
            key={question.roundTitle}
          >
            {question.roundTitle}
          </div>
        );
      } else {
        return (
          <div
            key={idx}
            className={`py-4 px-20 flex justify-between font-medium ${
              question.isCorrect ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <p>{question.key}</p>
            <p
              className={question.isCorrect ? "text-green-600" : "text-red-600"}
            >
              {question.isCorrect ? "Correct" : "Incorrect"}
            </p>
          </div>
        );
      }
    });
  };

  return (
    <div className="py-8 w-full">
      <QuizHeader
        section={activity.activity_name}
        title={
          <div className="flex justify-between">
            <p>Results</p>
            <p>
              {score}/{totalQuestions}
            </p>
          </div>
        }
      />
      <div className="flex flex-col w-full divide-y border-y mb-12">
        {renderResults()}
      </div>
      <Button label="Home" align="center" onClick={() => navigate("/home")} />
    </div>
  );
};

export default ResultsPage;
