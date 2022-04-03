import React, { useState, useCallback } from "react";

import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";
import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow Toggling</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;

//? In React apps we work with components, typically with function components in modern React. Those components have one job in the end, and that is this JSX code, which they return. This tells React what the output of that component should be. Now in your React components, you can work with state, or with props, or with context,though props and context, all come down to state changes in the end, to make changes to a component and to make changes to the data that affects this component or that affects parts of your application. Whenever you change state in a component that component where the state changed is re-evaluated. And that simply means that the component function is executed again. So all this code runs again, and therefore we get a new output. This might actually be exactly the same output as before, but it could also look different. For example, if suddenly a paragraph is rendered or not, or as in the case of the "DemoOutput" component, if the text is rendered or not. React simply takes the result of this latest evaluation and compares it to the previous evaluation's result. And it does that for all affected components.And then it hands off any changes, any differences it identified to, in our case, React DOM because we are using React-DOM to render our React app here in the "index.JS" file, and ReactDOM will take those changes and apply them to the real DOM in the browser, and really only those changes, nothing else. Now, when React re-evaluates a component, it does not just re-evaluate that component, but since it re-runs the entire function and therefore all the rebuilds, this JSX code rebuilds the output for this latest snapshot, so to say.It will also re-run all components that you have in this JSX code. Like in this case, it will re-run the "DemoOutput" and the "Button" components.
//! How to avoid these unnecessary re-executions :
//? Now to avoid unnecessary re-executions of child components, you can use "React.memo()" to tell React only execute this component function again if the props really changed, so if we got real new values in there. If we got no new values, don't re-execute this function. Now since re-evaluating a component means that the entire component function runs again, that can have strange effects if you're not aware of the fact that this really means that everything in his function runs again. And therefore, if you, for example, create functions in the function and you pass those functions through props to our components, you will indeed get a new function object and even "React.memo()" will then not be able to help you because objects are "reference values" and comparing them with equal signs, which is what "React.memo()" does under the hood, will not work for "primitive values", you will therefore not have that problem.
//! How to fix the function re-creating :
//? That's where "useCallback()" comes in and can help you, because with "useCallback()", you can tell React that it should store a function and not re-create it when the surrounding function runs again, as long as certain dependencies didn't change.
//?  when a component re-renders, every function inside of the component is recreated and therefore these functions’ references change between renders "useCallback(callback, dependencies)" will return a memoized instance of the callback that only changes if one of the dependencies has changed. This means that instead of re-creating the function object on every re-render, we can use the same function object between renders.
