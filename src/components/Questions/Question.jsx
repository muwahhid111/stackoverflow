import React from "react";

const Question = ({ item }) => {
  const { tags, owner, score, title, view_count } = item;
  console.log(item);
  const handleFetchByTag = (tag) => {};
  return (
    <div>
      <div>owner-{owner.display_name}</div>
      <div>score-{score}</div>
      <div>
        tags:
        {tags.map((item) => (
          <span
            key={item}
            onClick={() => {
              handleFetchByTag(item);
            }}
          >
            {`${item}; `}
          </span>
        ))}
      </div>
      <div>title:{title}</div>
      <div>view_count: {view_count}</div>
    </div>
  );
};

export default Question;
