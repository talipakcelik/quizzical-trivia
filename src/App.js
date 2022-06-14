import React from "react";
import Quiz from "./Quiz";
import { nanoid } from "nanoid";

export default function App() {
  const [start, setStart] = React.useState(false);
  const [quiz, setQuiz] = React.useState();
  const [over, setOver] = React.useState(false);

  let quizElements;

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple").then((res) =>
      res.json().then((data) => {
        const newArr = data.results.map((el) => ({
          id: nanoid(),
          question: el.question,
          answers: [...el.incorrect_answers, el.correct_answer]
            .sort(() => Math.random() - 0.5)
            .map((el) => ({
              answer: el,
              id: nanoid(),
              isSelected: false,
              isCorrectAnswer: false,
            })),
        }));

        const newArr2 = newArr.map((el) => {
          return {
            ...el,
            answers: el.answers.map((el2) => {
              return {
                ...el2,
                isCorrectAnswer: data.results.find(
                  (el) => el.correct_answer === el2.answer
                )
                  ? true
                  : false,
              };
            }),
          };
        });

        console.log(data);
        return setQuiz(newArr2);
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
        questions={item.question}
        answers={item.answers}
        id={item.id}
        tog={toggle}
        over={over}
      />
    ));
  }

  console.log(quiz);

  function check() {
    setOver(true);
  }

  return (
    <main>
      {!start ? (
        <div className="start-container">
          <h1>Quizzical</h1>
          <button onClick={() => setStart(true)}>Start quiz</button>
        </div>
      ) : (
        quizElements.concat(
          <button key={nanoid()} onClick={check}>
            Check answers
          </button>
        )
      )}
    </main>
  );
}
