import React from "react";

export default function Quiz(props) {
  // let qArray = [...props.questions.incorrect_answers];

  // const [answers, setAnswers] = React.useState(qArray);
  // const random = Math.floor(Math.random() * 4) + 0;

  // qArray.splice(random, 0, props.questions.correct_answer);

  console.log(props);

  const q = {};
  return (
    <div className="quiz">
      <h2>{props.questions}</h2>
      <div
        className="answer"
        style={{
          backgroundColor: props.answers[0].isSelected ? "#D6DBF5" : "",
        }}
        onClick={() => props.tog(props.answers[0].id)}
      >
        {props.answers[0].answer}
      </div>
      <div
        className="answer"
        style={{
          backgroundColor: props.answers[1].isSelected ? "#D6DBF5" : "",
        }}
        onClick={() => props.tog(props.answers[1].id)}
      >
        {props.answers[1].answer}
      </div>
      <div
        className="answer"
        style={{
          backgroundColor: props.answers[2].isSelected ? "#D6DBF5" : "",
        }}
        onClick={() => props.tog(props.answers[2].id)}
      >
        {props.answers[2].answer}
      </div>
      <div
        className="answer"
        style={{
          backgroundColor: props.answers[3].isSelected ? "#D6DBF5" : "",
        }}
        onClick={() => props.tog(props.answers[3].id)}
      >
        {props.answers[3].answer}
      </div>
      <hr></hr>
    </div>
  );
}
