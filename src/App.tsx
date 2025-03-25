import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/quizz";
import { QuizData } from "./interfaces/types";

export default function App() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data: QuizData) => {
        setQuizData(data);
        console.log("Données chargées :", data);
      })

      .catch((error) => console.error("Erreur de chargement du JSON:", error));
  }, []);

  if (!quizData) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Mon profil IT</h1>
      <div className="App">
        <Quiz data={quizData} />
      </div>
    </div>
  );
}
