import { useNavigate } from 'react-router-dom';
import { useActivityStore } from '../../store/useActivityStore';
import { useAnswerSheet } from '../../store/useAnswerSheet';
import { useEffect } from 'react';
import { QuizHeader } from '../../components/quizHeader';

const HomePage = () => {
  const navigate = useNavigate();
  const activities = useActivityStore((state) => state.activities) || [];
  const { setAnswerSheet, setActivityIndex, setQuestionIndex, setRoundIndex, setQuizDone } = useAnswerSheet();

  useEffect(() => {
    setAnswerSheet({});
    setActivityIndex(null);
    setQuestionIndex(0);
    setRoundIndex(0);
    setQuizDone(false);
  }, []);

  const openActivity = (index: number) => {
    setActivityIndex(index);
    navigate("/quiz");
  }

  return (
    <div className='py-8'>
      <QuizHeader section='CAE' title="Error Find" />
      <div className="flex flex-col w-full divide-y border-y">
        {
          activities.map((activity, idx) => {
            return (
              <button
                key={idx}
                className='flex w-full items-center uppercase justify-center p-8 font-bold hover:bg-slate-100'
                onClick={() => openActivity(idx)}
              >
                {activity.activity_name}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default HomePage