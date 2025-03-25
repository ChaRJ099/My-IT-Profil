// Quiz.tsx
import { useState } from "react";
import { QuizProps } from "../interfaces/types"; // Import des interfaces

export default function Quiz({ data }: QuizProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<
    {
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }[]
  >([]);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(
    null
  );

  // Mettre à jour la réponse de l'utilisateur
  const handleAnswerChange = (questionIndex: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  // Calculer le score
  const calculateScore = () => {
    let correctAnswers = 0;
    let totalQuestions = 0;
    let detailedResults: {
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }[] = [];

    data.questionnaire.forEach((theme, themeIndex) => {
      theme.questions.forEach((question, questionIndex) => {
        const userAnswer = answers[`${themeIndex}-${questionIndex}`];
        totalQuestions++;

        const isCorrect = userAnswer === question.answer;
        if (isCorrect) correctAnswers++;

        detailedResults.push({
          question: question.question,
          userAnswer: userAnswer || "Aucune réponse",
          correctAnswer: question.answer,
          isCorrect,
        });
      });
    });

    return { correctAnswers, totalQuestions, detailedResults };
  };

  // Soumettre le quiz et afficher le score
  const handleSubmit = () => {
    const { correctAnswers, totalQuestions, detailedResults } =
      calculateScore();
    setScore({ correct: correctAnswers, total: totalQuestions });
    setResults(detailedResults);
  };

  return (
    <div className="Quiz">
      <h2>Quiz de Compétences</h2>
      {data.questionnaire.map((theme, themeIndex) => (
        <div key={themeIndex}>
          <h3>{theme.theme}</h3>
          {theme.questions.map((question, questionIndex) => (
            <div key={`${themeIndex}-${questionIndex}`}>
              <p>{question.question}</p>
              {question.choices.map((choice, choiceIndex) => (
                <div
                  key={`${themeIndex}-${questionIndex}-choice-${choiceIndex}`}
                >
                  <input
                    type="radio"
                    id={`q${themeIndex}-${questionIndex}-c${choiceIndex}`}
                    name={`question-${themeIndex}-${questionIndex}`}
                    value={choice}
                    checked={
                      answers[`${themeIndex}-${questionIndex}`] === choice
                    }
                    onChange={() =>
                      handleAnswerChange(
                        `${themeIndex}-${questionIndex}`,
                        choice
                      )
                    }
                  />
                  <label
                    htmlFor={`q${themeIndex}-${questionIndex}-c${choiceIndex}`}
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Valider</button>
      {score !== null && (
        <p>
          Votre score : {score.correct} / {score.total}
        </p>
      )}
      {results.length > 0 && (
        <div className="results">
          <h3>Résultats du Quiz</h3>
          <ul>
            {results.map((result, index) => (
              <li
                key={index}
                style={{ color: result.isCorrect ? "green" : "red" }}
              >
                <strong>Q :</strong> {result.question} <br />
                <strong>Votre réponse :</strong> {result.userAnswer} <br />
                <strong>Bonne réponse :</strong> {result.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
