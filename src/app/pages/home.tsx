import { useNavigate } from 'react-router-dom';
import { useActivityStore } from '../../store/useActivityStore';
import { useAnswerSheet } from '../../store/useAnswerSheet';
import { useEffect } from 'react';

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
      <div className='px-12 pt-8 uppercase font-bold text-xl'>CAE</div>
      <div className='px-12 py-12 font-bold text-6xl'>Error Find</div>
      <div className="flex w-full">
        {
          activities.map((activity, idx) => {
            return (
              <button
                key={idx}
                className='flex w-full items-center uppercase justify-center p-8 border-y hover:bg-[#444]'
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