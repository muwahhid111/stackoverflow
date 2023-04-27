import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./resultPage.module.css";

import Questions from "../../Questions/Questions";

const Result = () => {
  const [base, setBase] = useState([]);
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
    setQuestions(
      res.items.sort((a, b) => b.view_count - a.view_count).slice(0, 5)
    );
  };
  const handleFetchUserById = (id) => {
    fun2(id);
  };
  const handleFetchTagById = async (tag) => {
    const req = await fetch(
      `https://api.stackexchange.com/2.3/tags/${tag}/faq?pagesize=5&site=stackoverflow`
    );

    const res = await req.json();
    setQuestions(res.items);
  };
  const handleFetchQuestionById = (question) => {
    setQuestions([question]);
  };
  useEffect(() => {
    fun();
  }, []);

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
              <li onClick={() => handleFetchQuestionById(item)} key={index}>{`${
                index + 1
              }) ${item.title}`}</li>
            ))}
          </ul>
        </div>
        <div className={styles.cell2}>
          <ul className={styles.ul}>
            {base.map((item) =>
              item.tags.map((tag) => (
                <li onClick={() => handleFetchTagById(tag)}>#{tag}</li>
              ))
            )}
          </ul>
        </div>
        <div className={styles.cell2}>
          <ul className={styles.ul}>
            {base.map((item, index) => (
              <li onClick={() => handleFetchQuestionById(item)} key={index}>{`${index + 1}) ${item.answer_count}`}</li>
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
