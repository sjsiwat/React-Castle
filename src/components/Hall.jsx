import { Corridor } from "./Corridor";

export function Hall({ question, answer, handleAnswer }) {
  return (
    <div className="bg-teal-500 p-6 w-full text-center">
      <h1 className="text-white text-3xl">Hall</h1>
      <p className="text-yellow-400">
        Message for Secret Room:
        <span className="text-purple-300">
          {question ? ` ✔ ${question}` : " Waiting for a message..⏳"}
        </span>
      </p>
      <Corridor
        question={question}
        answer={answer}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
