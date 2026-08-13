import { Tower } from "./Tower";
import { Corridor } from "./Corridor";
import { Room } from "./Room";
import { Hall } from "./Hall";
import { Chamber } from "./Chamber";
import { Gallery } from "./Gallery";
import { Nook } from "./Nook";
import { SecretRoom } from "./SecretRoom";

export function Castle() {
  return (
    <div className="bg-red-500 p-6 w-full text-center">
      <h1 className="text-white text-3xl">Castle</h1>
      <Tower />
      <Chamber />
      <Room />
      <Hall />
      <Corridor />
      <Gallery />
      <Nook />
      <SecretRoom />
    </div>
  );
}
