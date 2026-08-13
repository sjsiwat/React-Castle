import { useState } from "react";
import { Castle } from "./components/Castle";

export default function App() {
  const [question, setQuestion] = useState("Hello");
  const [answer, setAnswer] = useState("Johny");
  return (
    <div className="min-h-screen bg-slate-900 p-4 text-white items-center justify-center flex flex-col">
      <Castle />
      {question}
      {answer}
    </div>
  );
}
