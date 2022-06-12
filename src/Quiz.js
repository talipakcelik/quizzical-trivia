import React from "react";

export default function Quiz(props) {
  console.log(props.questions);

  const [answers, setAnswers] = React.useState();
  const random = Math.floor(Math.random() * 4) + 0;

  let qArray = [...props.questions.incorrect_answers];

  qArray.splice(random, 0, props.questions.correct_answer);

  console.log(random);
  console.log(qArray);
  return (
    <div>
      <h2>{props.questions.question}</h2>
      <button>{qArray[0]}</button>
      <button>{qArray[1]}</button>
      <button>{qArray[2]}</button>
      <button>{qArray[3]}</button>
      <hr></hr>
    </div>
  );
}
