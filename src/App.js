import React from "react";
import Quiz from "./Quiz";
export default function App() {
  const [start, setStart] = React.useState(false);
  const [questions, setQuestions] = React.useState();

  let questionElements;

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple").then((res) =>
      res.json().then((data) => setQuestions(data.results))
    );
  }, []);

  if (typeof questions === "object") {
    questionElements = questions.map((question, index) => (
      <Quiz key={index} questions={question} />
    ));
    console.log(questions);
  }

  return (
    <main>
      {!start ? (
        <div className="start-container">
          <h1>Quizzical</h1>
          <button onClick={() => setStart(true)}>Start quiz</button>
        </div>
      ) : (
        questionElements
      )}
    </main>
  );
}
