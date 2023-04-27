import { useEffect, useState } from "react";
import styles from "../main-page/main-page.module.css";
import { Link } from "react-router-dom";
const MainPage = () => {
  const [base, setBase] = useState(null);
  const [value, setValue] = useState("");
  const handleValue = (e) => {
    setValue(e.target.value);
  };
  const onClickAdd = () => {
    setBase(
      base.filter((item) => {
        return (
          item.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !==
            -1 && item
        );
      })
    );
  };
  const fun = async () => {
    const req = await fetch(
      "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
    );
    const res = await req.json();
    console.log(res);
    setBase(res.items.map((el) => el.title));
  };
  console.log(base);

  useEffect(() => {
    fun();
  }, []);

  return (
    <>
      <div className={styles.searchDiv}>
        <input
          onChange={handleValue}
          className={styles.searchInput}
          type="text"
        />
        <div>
          <Link to={value} onClick={onClickAdd} className={styles.searchButton}>
            Искать
          </Link>
        </div>
      </div>

      <div>
        <ul>
          {base?.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default MainPage;
