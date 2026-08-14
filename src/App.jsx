import { useState } from "react";
import { Castle } from "./components/Castle";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 text-white items-center justify-center flex flex-col">
      <p className="text-yellow-400">
        Message for Secret Room:
        <span className="text-purple-300">
          {question ? ` ✔ ${question}` : " Waiting for a message..⏳ "}{" "}
        </span>
      </p>

      <textarea
        value={question}
        onChange={handleQuestion}
        className="bg-white text-black rounded-2xl px-2 py-1 placeholder-pink-300"
        placeholder="Type your message🔤"
      />

      <p className="text-yellow-400">
        Reply from Secret Room:
        <span className="text-green-300">
          {answer ? ` ✔ ${answer}` : " Waiting for a reply..⏳"}
        </span>
      </p>

      <Castle question={question} answer={answer} handleAnswer={handleAnswer} />
    </div>
  );
}
