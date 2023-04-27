import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./resultPage.module.css";

import Questions from "../../Questions/Questions";

const Result = () => {
  const [base, setBase] = useState([]);
  const [userId, setUserId] = useState(null);
  const [questions, setQuestions] = useState(null);

  const { keyWord } = useParams();

  const fun = async () => {
    const req = await fetch(
      "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
    );
    const res = await req.json();
    setBase(
      res.items.filter((el) =>
        el.title.toLowerCase().trim().includes(keyWord.toLowerCase().trim())
      )
    );
  };
  const fun2 = async (id) => {
    const req = await fetch(
      `https://api.stackexchange.com/2.3/users/${id}/questions?order=desc&sort=activity&site=stackoverflow`
    );
    const res = await req.json();
    setQuestions(res.items);
  };
  const handleFetchUserById = (id) => {
    setUserId(id);
  };
  useEffect(() => {
    fun();
  }, []);
  useEffect(() => {
    if (userId) {
      fun2(userId);
    }
  }, [userId]);
  console.log(userId);
  console.log(questions);
  return (
    <>
      <div className={styles.table}>
        <div className={styles.cell}>Тема</div>
        <div className={styles.cell}>Теги</div>
        <div className={styles.cell}>Кол-во ответов</div>
        <div className={styles.cell}>Имя автора</div>
      </div>
      <div className={styles.table2}>
        <div className={styles.cell2}>
          <ul className={styles.ul}>
            {base.map((item, index) => (
              <li key={index}>{`${index + 1}) ${item.title}`}</li>
            ))}
          </ul>
        </div>
        <div className={styles.cell2}>
          <ul className={styles.ul}>
            {base.map((item) => item.tags.map((tag) => <li>#{tag}</li>))}
          </ul>
        </div>
        <div className={styles.cell2}>
          <ul className={styles.ul}>
            {base.map((item, index) => (
              <li key={index}>{`${index + 1}) ${item.answer_count}`}</li>
            ))}
          </ul>
        </div>
        <div className={styles.cell2}>
          <ul className={styles.ul}>
            {base.map((item, index) => (
              <li
                key={index}
                onClick={() => handleFetchUserById(item?.owner?.user_id)}
              >
                {`${index + 1}) ${item.owner.display_name}`}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.modal}>
        {questions ? <Questions arr={questions} /> : ""}
      </div>
    </>
  );
};
export default Result;
