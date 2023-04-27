import React from "react";
import Question from "./Question";

const Questions = ({ arr }) => {
  return (
    <div>
      {arr?.map((item) => {
        return <Question key={item.question_id} item={item} />;
      })}
    </div>
  );
};

export default Questions;
