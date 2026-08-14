import { Chamber } from "./Chamber";

export function Tower({ question, answer, handleAnswer }) {
  return (
    <div className="bg-orange-500 p-6 w-full text-center">
      <h1 className="text-white text-3xl">Tower</h1>
      <p className="text-yellow-400">
        Message for Secret Room:
        <span className="text-purple-300">
          {question ? ` ✔ ${question}` : " Waiting for a message..⏳"}
        </span>
      </p>
      <Chamber
        question={question}
        answer={answer}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
