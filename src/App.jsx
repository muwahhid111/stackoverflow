import MainPage from "./components/main-page/mainPage";
import { Routes, Route } from "react-router-dom";
import Result from "./components/main-page/result/resultPage";
import { useState } from "react";

function App() {
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
