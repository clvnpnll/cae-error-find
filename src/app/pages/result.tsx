import { useEffect, useMemo } from 'react';
import { useActivityStore } from '../../store/useActivityStore';
import { useAnswerSheet } from '../../store/useAnswerSheet';
import { QuizHeader } from '../../components/quizHeader';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { activities = [] } = useActivityStore();
  const { answerSheet, activityIndex, quizDone } = useAnswerSheet();

  const activity = useMemo(() => activityIndex != null ? activities[activityIndex] || {} : {}, [activities, activityIndex]);

  const handleHome = () => {
    navigate("/home");
  }

  useEffect(() => {
    if (activityIndex == null) {
      navigate('/home');
    } else if (!quizDone) {
      navigate("/quiz");
    }
  }, [activities]);

  const renderResults = () => {
    return activity.questions?.map((question: any, idx: number) => {
      if (question.round_title) {
        const items = [];
        items.push(
          <div className='py-8 px-12 w-full text-lg font-bold' key={question.round_title}>{question.round_title}</div>
        );

        question.questions.forEach((item: any, idx: number) => {
          const questionKey = `R${question.order}-Q${item.order}`;
          const correct = answerSheet[questionKey].answer == item.is_correct;

          items.push(
            <div 
              key={idx}
              className={`py-4 px-20 flex justify-between ${correct ? 'bg-green-50' : 'bg-red-50'}`}
            >
              <p>Q{item.order}</p>
              <p className={correct ? 'text-green-600' : 'text-red-600'}>{correct ? "Correct" : "Incorrect"}</p>
            </div>
          )
        })

        return items;
      } else {
        const questionKey = `Q${question.order}`;
        console.log(answerSheet[questionKey]);
        const correct = answerSheet[questionKey].answer == question.is_correct;
        return (
          <div 
            key={idx}
            className={`py-4 px-20 flex justify-between ${correct ? 'bg-green-50' : 'bg-red-50'}`}
          >
            <p>Q{question.order}</p>
            <p className={correct ? 'text-green-600' : 'text-red-600'}>{correct ? "Correct" : "Incorrect"}</p>
          </div>
        )
      }
    })
  }

  return (
    <div className='py-8 w-full'>
      <QuizHeader section={activity.activity_name} title="Results" />
      <div className='flex flex-col w-full divide-y border-y mb-12'>
        {renderResults()}
      </div>
      <Button label="Home" align="center" onClick={handleHome} />
    </div>
  )
}

export default ResultsPage