"use client"

const Questions = [
    {
      title: "What is JSX?",
      variants: ["A syntax extension for JavaScript that looks like HTML","A new programming language", "A database query language"],
      correct: 0,
    },
    {
      title: "What is the purpose of the 'useState' hook in React?",
      variants: ["To fetch data from an API", "To manage state in a functional component", "To define a new component"],
      correct: 1,
    },
    {
      title: "Which lifecycle method is used for side effects in functional components?",
      variants: ["componentDidMount", "shouldComponentUpdate", "useEffect"],
      correct: 2,
    },
    {
        title: "What does the 'map()' function do in JavaScript?",
        variants: ["Sorts an array in ascending order", "Creates a new array by applying a function to each element", "Removes elements from an array"],
        correct: 1,
    },
    {
        title: "What is the Virtual DOM in React?",
        variants: ["A lightweight copy of the real DOM that improves performance", "A separate database for storing UI components", "A feature that makes JavaScript faster"],
        correct: 0,
    },
    {
        title: "What does the 'setTimeout' function do in JavaScript?",
        variants: ["Immediately executes a function multiple times", "Executes a function after a specified delay", "Stops all JavaScript execution for a given time"],
        correct: 1,
    },
    {
        title: "What does the 'useEffect' hook do in React?",
        variants: ["Handles state updates", "Creates a new component", "Runs side effects in a functional component"],
        correct: 2,
    },
    {
        title: "What is the default behavior of JavaScript when comparing objects ({}) with === ?",
        variants: ["Returns true if the objects have the same properties and values", "Throws an error", "Returns false because objects are compared by reference, not value"],
        correct: 2,
    },
    {
        title: "What does 'props' stand for in React?",
        variants: ["Short for 'properties', used to pass data between components", "A built-in React hook", "A JavaScript method for manipulating arrays"],
        correct: 0,
    },
];

export default Questions;