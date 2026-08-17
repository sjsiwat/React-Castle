import { useState, useEffect } from "react";
export function SecretRoom({ question, answer, handleAnswer }) {
  const [prisoner, setprisoner] = useState(null);

  useEffect(() => {
    async function fetchPrisoner(params) {
      try {
        const randomId = Math.floor(Math.random() * 649) + 1;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`,
        );
        if (!response.ok) throw new Error("cannot get Prisoner");
        setprisoner(await response.json());
      } catch (error) {
        console.log(error);
      }
    }
    fetchPrisoner();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-gray-500">
      <h1 className="text-4xl text-slate-300">Secret Room</h1>

      {prisoner && (
        <div className="rounded border-2 border-red-300 p-4 text-center flex flex-col items-center justify-center">
          <p className="font-bold text-red-400 text-2xl">
            Prisoner is trapped here!
          </p>
          <img
            className="h-48 w-48"
            src={
              prisoner.sprites.versions["generation-v"]["black-white"].animated
                .front_default ?? prisoner.sprites.front_default
            }
            alt="prisoner.name"
          />
          <p className="text-sm capitalize">{prisoner.name}</p>
        </div>
      )}
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
