"use client"

import React, { useState } from "react";
import Link from "next/link";
// import "./index.scss";
import Questions from "../../../components/Questions"

// const questions = [
//   {
//     title: "React - это ... ?",
//     variants: ["библиотека", "фреймворк", "приложение"],
//     correct: 0,
//   },
//   {
//     title: "Компонент - это ... ",
//     variants: ["приложение", "часть приложения или страницы", "то, что я не знаю что такое"],
//     correct: 1,
//   },
//   {
//     title: "Что такое JSX?",
//     variants: ["Это простой HTML", "Это функция", "Это тот же HTML, но с возможностью выполнять JS-код"],
//     correct: 2,
//   },
// ];

function Result({ correct }) {
  return (
    <div className="result">
      <h2>You answer {correct} questions out of {Questions.length}</h2>
      <Link href="/">
        <button>Try again</button>
      </Link>
    </div>
  );
}

function Game({ step, question, onClickVariant }) {
  const percentage = Math.round((step / Questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li onClick={() => onClickVariant(index)} key={text}>
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function MiniProject() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const question = Questions[step];

  const onClickVariant = (index) => {
    if (index === question.correct) {
      setCorrect(correct + 1);
    }
    setStep(step + 1);
  };

  return (
    <div className="App">
      {step !== Questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant} />
      ) : (
        <Result correct={correct} />
      )}
    </div>
  );
}
