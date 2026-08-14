import { SecretRoom } from "./SecretRoom";

export function Nook({ question, answer, handleAnswer }) {
  return (
    <div className="bg-purple-800 p-6 w-full text-center">
      <h1 className="text-white text-3xl">Nook</h1>
      <p className="text-yellow-400">
        Message for Secret Room:
        <span className="text-purple-300">
          {question ? ` ✔ ${question}` : " Waiting for a message..⏳"}
        </span>
      </p>
      <SecretRoom
        question={question}
        answer={answer}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
