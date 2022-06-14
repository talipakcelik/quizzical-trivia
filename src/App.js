import React from "react";
import Quiz from "./Quiz";
import { nanoid } from "nanoid";

export default function App() {
  const [start, setStart] = React.useState(false);
  const [quiz, setQuiz] = React.useState();

  let quizElements;

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple").then((res) =>
      res.json().then((data) => {
        const newArr = data.results.map((el) => ({
          id: nanoid(),
          question: el.question,
          answers: [...el.incorrect_answers, el.correct_answer].map((el) => ({
            answer: el,
            id: nanoid(),
            isSelected: false,
          })),
        }));

        return setQuiz(newArr);
      })
    );
  }, []);

  function toggle(id, subId) {
    setQuiz((oldState) =>
      oldState.map((el) => {
        return el.id === id
          ? {
              ...el,
              answers: el.answers.map((el2) => {
                return el2.id === subId
                  ? {
                      ...el2,
                      isSelected: !el2.isSelected,
                    }
                  : {
                      ...el2,
                      isSelected: false,
                    };
              }),
            }
          : el;
      })
    );
  }

  if (typeof quiz === "object") {
    quizElements = quiz.map((item, index) => (
      <Quiz
        key={index}
        answers={item.answers}
        questions={item.question}
        id={item.id}
        tog={toggle}
      />
    ));
  }

  console.log(quiz);

  return (
    <main>
      {!start ? (
        <div className="start-container">
          <h1>Quizzical</h1>
          <button onClick={() => setStart(true)}>Start quiz</button>
        </div>
      ) : (
        quizElements
      )}
    </main>
  );
}
