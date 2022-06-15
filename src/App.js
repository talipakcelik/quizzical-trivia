import React from "react";
import Quiz from "./Quiz";
import { nanoid } from "nanoid";

export default function App() {
  const [start, setStart] = React.useState(false);
  const [quiz, setQuiz] = React.useState();
  const [over, setOver] = React.useState(false);
  const [score, setScore] = React.useState();

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

  function check() {
    setOver(true);
    countAnswers();
  }

  function countAnswers() {
    let numberOfCorrectAnswers = quiz.filter((el) =>
      el.answers.find((el) => {
        return el.isSelected && el.isCorrectAnswer;
      })
    ).length;
    setScore(
      `You scored ${numberOfCorrectAnswers}/${quiz.length} correct answers`
    );
  }

  return (
    <main>
      {!start ? (
        <div className="start-container">
          <h1>Quizzical</h1>
          <button className="start" onClick={() => setStart(true)}>
            Start quiz
          </button>
        </div>
      ) : (
        quizElements.concat(
          <div key={nanoid()} className="text-btn-container">
            <p className="score-text">{`${!over ? "" : score}`}</p>
            <button onClick={check}>
              {`${!over ? "Check answers" : "Play again"}`}
            </button>
          </div>
        )
      )}
    </main>
  );
}
