import { useEffect, useMemo, useState } from "react";
import Question from "../../components/question";
import { useActivityStore } from "../../store/useActivityStore";
import { useAnswerSheet } from "../../store/useAnswerSheet";
import { QuizHeader } from "../../components/quizHeader";
import { useNavigate } from "react-router-dom";
import { QUIZ_MODE } from "../../constants/enum";
import { BOOLEAN_CHOICES } from "../../constants/constants";
import Button from "../../components/button";

interface Question {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: any[];
  feedback: string;
}

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState(QUIZ_MODE.SINGLE);
  const [showRoundTitle, setShowRoundTitle] = useState(false);
  const { activities } = useActivityStore();
  const {
    answerSheet,
    roundIndex,
    questionIndex,
    activityIndex,
    setAnswerSheet,
    setQuestionIndex,
    setRoundIndex,
    setQuizDone,
  } = useAnswerSheet();

  const activity = useMemo(
    () => (activityIndex != null ? activities[activityIndex] || {} : {}),
    [activities, activityIndex]
  );
  const question: Question = questions[questionIndex] || {};
  const roundData = activity.questions ? activity.questions[roundIndex] : {};

  useEffect(() => {
    if (activityIndex == null) {
      navigate("/home");
    }
    if (activities.length > 0) {
      const firstRound = activity.questions || [];
      if (firstRound.length > 0 && firstRound[roundIndex]?.round_title) {
        setQuestions(firstRound[roundIndex].questions);
        setQuizMode(QUIZ_MODE.MULTIPLE);
        if (questionIndex == 0) {
          setShowRoundTitle(true);
        }
      } else {
        setQuestions(firstRound);
      }
    }
  }, [activities, activityIndex]);

  const handleSubmitQuestion = (answer: any) => {
    const key =
      (quizMode == QUIZ_MODE.MULTIPLE ? `R${roundData.order}-` : "") +
      `Q${question.order}`;
    const newAnswer = {
      answer: answer,
      feedback: question.feedback,
    };
    setAnswerSheet({ ...answerSheet, [key]: newAnswer });

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuestionIndex(0);
      if (
        quizMode == QUIZ_MODE.MULTIPLE &&
        activity.questions.length > roundIndex + 1
      ) {
        const rounds = activity.questions;
        setQuestions(rounds[roundIndex + 1].questions);
        setRoundIndex(roundIndex + 1);
        setShowRoundTitle(true);
      } else {
        setQuestionIndex(0);
        setRoundIndex(0);
        setQuizDone(true);
        navigate("/results");
      }
    }
  };

  const sectionLabel =
    `${activity.activity_name}` +
    (quizMode == QUIZ_MODE.MULTIPLE && !showRoundTitle
      ? ` / ${roundData.round_title}`
      : "");

  const titleLabel = showRoundTitle
    ? roundData.round_title
    : `Q${question.order}.`;

  return (
    Object.keys(question).length > 0 && (
      <div>
        <QuizHeader section={sectionLabel} title={titleLabel} />
        {showRoundTitle ? (
          <Button
            label="Continue"
            align="left"
            onClick={() => setShowRoundTitle(false)}
          />
        ) : (
          <Question
            question={question.stimulus}
            choices={BOOLEAN_CHOICES}
            onSubmit={handleSubmitQuestion}
          />
        )}
      </div>
    )
  );
};

export default QuizPage;
