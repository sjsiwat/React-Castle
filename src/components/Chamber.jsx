import { Room } from "./Room";

export function Chamber({ question, answer, handleAnswer }) {
  return (
    <div className="bg-yellow-500 p-6 w-full text-center">
      <h1 className="text-white text-3xl">Chamber</h1>
      <p className="text-yellow-400">
        Message for Secret Room:
        <span className="text-purple-300">
          {question ? ` ✔ ${question}` : " Waiting for a message..⏳ "}{" "}
        </span>
      </p>
      <Room question={question} answer={answer} handleAnswer={handleAnswer} />
    </div>
  );
}
