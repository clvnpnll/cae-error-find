import { useNavigate } from 'react-router-dom'
import { QuizHeader } from '../../components/quizHeader'
import Button from '../../components/button'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='py-8'>
      <QuizHeader
        section="Page not found" 
        title="404" 
      />
      <Button label="Home" onClick={() => navigate("/")} />
    </div>
  )
}

export default NotFound