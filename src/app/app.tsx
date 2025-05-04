import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/home";
import QuizPage from "./pages/quiz";
import ResultsPage from "./pages/result";
import { useEffect } from "react";
import { useActivityStore } from "../store/useActivityStore";
import NotFound from "./pages/not-found";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="quiz" element={<QuizPage />} />
      <Route path="results" element={<ResultsPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const { setActivities } = useActivityStore();

  useEffect(() => {
    const fetchActivities = async () => {
      const res = await axios.post(import.meta.env.VITE_PROXY_API_URL, {
        "my-url": import.meta.env.VITE_ACTIVITIES_API_URL,
      });

      if (res.status == axios.HttpStatusCode.Ok) {
        setActivities(res.data.activities);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="py-4 md:py-8">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
