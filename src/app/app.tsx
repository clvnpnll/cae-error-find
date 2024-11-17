import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home';
import QuizPage from './pages/quiz';
import ResultsPage from './pages/result';
import { useEffect } from 'react';
import { useActivityStore } from '../store/useActivityStore';
import axios from 'axios';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="home" element={<HomePage />} />
      <Route path="quiz" element={<QuizPage />} />
      <Route path="results" element={<ResultsPage />} />
    </Route>
  )
)

const ACTIVITIES_URL = "https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json";

const ACTIVITIES = {
  "name": "Error Find",
  "heading": "This game teaches you to find mistakes in written text.",
  "activities": [
      {
          "activity_name": "Activity One",
          "order": 1,
          "questions": [
              {
                  "is_correct": false,
                  "stimulus": "I really enjoy *to play football* with friends.",
                  "order": 1,
                  "user_answers": [],
                  "feedback": "I really enjoy *playing football* with friends."
              },
              {
                  "is_correct": true,
                  "stimulus": "I think that *starting* a school science magazine is an excellent idea!",
                  "order": 2,
                  "user_answers": [],
                  "feedback": "I think that *starting* a school science magazine is an excellent idea!"
              },
              {
                  "is_correct": false,
                  "stimulus": "Watching films at home is *more cheaper* than at the cinema.",
                  "order": 3,
                  "user_answers": [],
                  "feedback": "Watching films at home is *cheaper* than at the cinema."
              },
              {
                  "is_correct": false,
                  "stimulus": "On the one hand, small cameras are comfortable. *In the other hand*, larger ones take better photos.",
                  "order": 4,
                  "user_answers": [],
                  "feedback": "On the one hand, small cameras are comfortable. *On the other hand*, larger ones take better photos."
              },
              {
                  "is_correct": false,
                  "stimulus": "My friend *like listening* to songs in English",
                  "order": 5,
                  "user_answers": [],
                  "feedback": "My friend *likes listening* to songs in English"
              }
          ]
      },
      {
          "activity_name": "Activity Two",
          "order": 2,
          "questions": [
              {
                  "round_title": "Round 1",
                  "order": 1,
                  "questions": [
                      {
                          "is_correct": false,
                          "stimulus": "Watching films at home is *more cheaper* than at the cinema.",
                          "order": 1,
                          "user_answers": [],
                          "feedback": "Watching films at home is *cheaper* than at the cinema."
                      },
                      {
                          "is_correct": false,
                          "stimulus": "On the one hand, small cameras are comfortable. *In the other hand*, larger ones take better photos.",
                          "order": 2,
                          "user_answers": [],
                          "feedback": "On the one hand, small cameras are comfortable. *On the other hand*, larger ones take better photos."
                      }
                  ]
              },
              {
                  "round_title": "Round 2",
                  "order": 2,
                  "questions": [
                      {
                          "is_correct": true,
                          "stimulus": "I can't go out because I *haven't finished* my homework yet.",
                          "order": 1,
                          "user_answers": [],
                          "feedback": "I can't go out because I *haven't finished* my homework yet."
                      },
                      {
                          "is_correct": false,
                          "stimulus": "My friend *like listening* to songs in English",
                          "order": 2,
                          "user_answers": [],
                          "feedback": "My friend *likes listening* to songs in English"
                      }
                  ]
              }
          ]
      }
  ]
};

function App() {
  const { setActivities } = useActivityStore();

  useEffect(() => {
    const fetchActivities = async () => {
      // const res = await axios.get(ACTIVITIES_URL);

      // if (res.status == axios.HttpStatusCode.Ok) {
      //   console.log(res.data);
      //   setActivities(res.data.activities);
      // }

      setActivities(ACTIVITIES.activities);
    }

    fetchActivities();
  }, []);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
