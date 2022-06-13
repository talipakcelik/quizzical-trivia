import React from "react";

export default function Quiz(props) {
  // let qArray = [...props.questions.incorrect_answers];

  // const [answers, setAnswers] = React.useState(qArray);
  // const random = Math.floor(Math.random() * 4) + 0;

  // qArray.splice(random, 0, props.questions.correct_answer);

  console.log(props);

  return (
    <div>
      <h2>{props.questions.question}</h2>
      <button onClick={() => props.tog(props.questions.answers[0].id)}>
        {props.questions.answers[0].answer}
      </button>
      <button onClick={() => props.tog(props.questions.answers[1].id)}>
        {props.questions.answers[1].answer}
      </button>
      <button onClick={() => props.tog(props.questions.answers[2].id)}>
        {props.questions.answers[2].answer}
      </button>
      <button onClick={() => props.tog(props.questions.answers[3].id)}>
        {props.questions.answers[3].answer}
      </button>
      <hr></hr>
    </div>
  );
}
