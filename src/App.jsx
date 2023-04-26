import MainPage from "./components/main-page/mainPage";
import { Routes, Route } from "react-router-dom";
import Result from "./components/main-page/result/resultPage";
import { useState } from "react";

function App() {
//   const [result, setResult] = useState();
//   const fun = async () => {
//     const req = await fetch(
//       "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
//     );
//     const res = await req.json();
//     setResult(res);
//   };

// console.log(result);
// fun();
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:keyWord" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
