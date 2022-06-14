import React from "react";

export default function Quiz({ questions, answers, id, tog }) {
  function stil(numb) {
    return {
      backgroundColor: answers[numb].isSelected ? "#D6DBF5" : "",
      border: answers[numb].isSelected ? "none" : "",
    };
  }

  return (
    <div className="quiz">
      <h2>{questions}</h2>
      <div
        className="answer"
        style={stil(0)}
        onClick={() => tog(id, answers[0].id)}
      >
        {answers[0].answer}
      </div>
      <div
        className="answer"
        style={stil(1)}
        onClick={() => tog(id, answers[1].id)}
      >
        {answers[1].answer}
      </div>
      <div
        className="answer"
        style={stil(2)}
        onClick={() => tog(id, answers[2].id)}
      >
        {answers[2].answer}
      </div>
      <div
        className="answer"
        style={stil(3)}
        onClick={() => tog(id, answers[3].id)}
      >
        {answers[3].answer}
      </div>
      <hr></hr>
    </div>
  );
}
