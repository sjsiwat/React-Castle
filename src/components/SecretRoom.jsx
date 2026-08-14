export function SecretRoom({ question, answer, handleAnswer }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-gray-500">
      <h1>Secret Room</h1>
      <p className="text-yellow-400">
        Message for Secret Room :
        <span className="text-purple-300">
          {question ? ` ✔ ${question}` : " Waiting for a message..⏳"}
        </span>
      </p>
      <p className="text-yellow-400">
        Message from Secret Room:
        <span className="text-purple-300">
          {answer ? ` ✔ ${answer}` : " Waiting for a message..⏳"}
        </span>
      </p>

      <textarea
        value={answer}
        onChange={handleAnswer}
        className="bg-white text-black rounded-2xl px-2 py-1"
        placeholder="Reply to back to the Castle 🔙"
      />
    </div>
  );
}
