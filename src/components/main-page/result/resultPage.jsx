import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./resultPage.module.css";
import { type } from "@testing-library/user-event/dist/type";

const Result = () => {
  const [base, setBase] = useState([]);
  const [userId, setUserId] = useState("");

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
  const fun2 = async () => {
    const req = await fetch(
      `https://api.stackexchange.com/2.3/users/${userId}/questions/featured?order=desc&sort=activity&site=stackoverflow`
    );
    const res = await req.json();
  };
  

  useEffect(() => {
    fun();
  }, []);
  useEffect(() => {
    fun2();
  }, []);
  console.log(userId);
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
              <li>{`${index + 1}) ${item.title}`}</li>
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
              <li>{`${index + 1}) ${item.answer_count}`}</li>
            ))}
          </ul>
        </div>
        <div className={styles.cell2}>
          <ul className={styles.ul}>
            {base.map((item, index) => (
              <li onClick={() => setUserId(item?.owner?.user_id)}>
                {`${index + 1}) ${item.owner.display_name}`}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Result;
