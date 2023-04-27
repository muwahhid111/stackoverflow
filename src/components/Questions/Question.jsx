import React from "react";
import styles from './Questions.module.css'
const Question = ({ item }) => {
  const { answer_count, tags, owner, title, view_count } = item;
  

  return (
    <div className={styles.bodyMain}>
      <div className={styles.body}>
      <div>Имя: {owner.display_name}</div>
      <div>Кол-во ответов: {answer_count}</div>
      <div>
        Теги:
        {tags.map((item) => (
          <span key={item}>{`${item}; `}</span>
        ))}
      </div>
      <div>Вопрос:{title}</div>
      
      </div>
    </div>
  );
};

export default Question;
