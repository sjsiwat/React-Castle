import { Hall } from "./Hall";

export function Room({ question, answer, handleAnswer }) {
  return (
    <div className="bg-green-500 p-6 w-full text-center">
      <h1 className="text-white text-3xl">Room</h1>
      <p className="text-yellow-400">
        Message for Secret Room:
        <span className="text-purple-300">
          {question ? ` ✔ ${question}` : " Waiting for a message..⏳"}
        </span>
      </p>
      <Hall question={question} answer={answer} handleAnswer={handleAnswer} />
    </div>
  );
}
