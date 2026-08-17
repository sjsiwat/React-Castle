import { useState, useEffect } from "react";
import { Castle } from "./components/Castle";

export default function App() {
  // ===== ส่วนที่ 1: กล่องเก็บข้อมูล (state) =====
  // useState = สร้างกล่องเก็บของที่ "จำค่าได้" และ "พอค่าเปลี่ยน หน้าเว็บวาดใหม่เอง"
  // ตัวหน้า = ค่าปัจจุบัน / ตัวหลัง = ฟังก์ชันไว้เปลี่ยนค่า / ในวงเล็บ = ค่าตั้งต้น

  const [question, setQuestion] = useState(""); // ข้อความที่พิมพ์ส่งเข้าไปในปราสาท เริ่มจากว่าง
  const [answer, setAnswer] = useState(""); // ข้อความที่นักโทษตอบกลับออกมา เริ่มจากว่าง
  const [pokemon, setPokemon] = useState(null); // ข้อมูล gengar ที่โหลดจาก API เริ่มเป็น null เพราะยังไม่โหลด
  const [friends, setFriends] = useState([]); // เพื่อนที่เรียกมา เก็บเป็น array เริ่มจาก array ว่าง
  const [escapePod, setEscapePod] = useState(false); // ยานสร้างเสร็จหรือยัง? เริ่มที่ "ยัง"
  const [building, setBuilding] = useState(false); // กำลังสร้างยานอยู่ไหม? เริ่มที่ "ยังไม่ได้สร้าง"
  const [progress, setProgress] = useState(0); // สร้างไปกี่ % แล้ว เริ่มที่ 0

  // ===== ส่วนที่ 2: ค่าที่คำนวณจาก state =====
  // ไม่ต้องทำเป็น state เพราะคำนวณจาก answer ได้ตรงๆ
  // ถ้าทำเป็น state จะต้องคอยอัปเดตสองที่ แล้วมันจะไม่ตรงกันเวลาลืม
  // .trim() ตัดช่องว่างหน้าหลัง / .toLowerCase() แปลงเป็นตัวเล็กหมด (จะได้รับทั้ง HELP, Help, help)
  // .includes("help") = ในข้อความมีคำว่า help มั้ย → ได้ true หรือ false
  const isHelp = answer.trim().toLowerCase().includes("help");

  // ===== ส่วนที่ 3: ฟังก์ชันรับค่าจากช่องพิมพ์ =====
  // e = event ที่เบราว์เซอร์ส่งมาตอนพิมพ์
  // e.target = ช่องที่พิมพ์อยู่ / e.target.value = ตัวหนังสือที่อยู่ในช่องนั้นตอนนี้
  const handleQuestion = (e) => setQuestion(e.target.value);
  const handleAnswer = (e) => setAnswer(e.target.value);

  // ===== ส่วนที่ 4: useEffect — โค้ดที่รันตอนหน้าเว็บโหลดหรือค่าบางอย่างเปลี่ยน =====

  // โหลด gengar มาแสดง — ทำครั้งเดียวตอนเปิดหน้า
  useEffect(() => {
    async function fetchPokemon() {
      try {
        // await = รอให้โหลดเสร็จก่อนค่อยไปบรรทัดถัดไป
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/gengar",
        );
        // ถ้า response not ok จะส่งค่า new error โหลดไม่สำเร็จ
        if (!response.ok) throw new Error("โหลดไม่สำเร็จ");
        // แต่ถ้าโหลดได้ จะแปลง response เป็น .json() แปลงข้อมูลที่ได้มาให้เป็น object ที่ JS ใช้ได้
        setPokemon(await response.json());
      } catch (error) {
        // ถ้าพังตรงไหนก็ตามด้านบน อันนี้จะจะโชว์ตรงที่พัง ไว้ดัก error
        console.error(error);
      }
    }
    fetchPokemon();
  }, []); // [] ว่าง = รันครั้งเดียวตอนเปิดหน้า ถ้าไม่ใส่เลยจะรันทุกครั้งที่หน้าวาดใหม่ = วนไม่จบ

  // แถบเปอร์เซ็นต์ตอนสร้างยาน
  useEffect(() => {
    if (!building) return; // ถ้ายังไม่กดปุ่มสร้าง ก็ไม่ต้องทำอะไร ออกไปเลย

    // setInterval = สั่งให้ทำซ้ำทุกๆ กี่มิลลิวินาที (ในที่นี้ 60ms เพิ่มทีละ 2% → เต็มใน ~3 วิ)
    const timer = setInterval(() => {
      // ต้องเขียนแบบส่งฟังก์ชันเข้าไป (prev) => ... ห้ามเขียน setProgress(progress + 2)
      // เพราะข้างใน setInterval ตัวแปร progress จะค้างอยู่ที่ค่าตอนสร้างนาฬิกาตลอด
      // การส่งฟังก์ชันเข้าไปคือบอก React ว่า "ขอค่าล่าสุดหน่อย" ซึ่งได้ค่าถูกเสมอ
      setProgress((prev) => prev + 2);
    }, 60);

    // ตัวที่ return ออกไปคือ "คำสั่งเก็บกวาด" React จะเรียกให้เองตอนที่ไม่ใช้แล้ว
    // เปิดอะไรไว้ต้องปิดตรงนั้น — เหมือนเปิดไฟแล้วต้องปิดก่อนออกจากห้อง
    // ถ้าไม่ปิด จะวิ่งต่อไปเรื่อยๆ กินทรัพยากรฟรี
    return () => clearInterval(timer);
  }, [building]); // รันใหม่ทุกครั้งที่ building เปลี่ยนค่า

  // พอเปอร์เซ็นต์เต็ม 100 ค่อยปิดงาน
  useEffect(() => {
    if (progress >= 100) {
      setBuilding(false); // เลิกโหลด
      setEscapePod(true); // ยานเสร็จแล้ว
    }
  }, [progress]); // รันทุกครั้งที่ progress ขยับ
  // แยกเป็น useEffect ตัวที่สองเพราะถ้ายัดรวมกับตัวบน จะต้องใส่ progress เป็น dependency ด้วย
  // แล้วนาฬิกาจะถูกสร้างใหม่ทุกครั้งที่ % ขยับ ซึ่งไม่ใช่สิ่งที่ต้องการ

  // ===== ส่วนที่ 5: ฟังก์ชันเรียกเพื่อน =====
  async function callFriends() {
    try {
      // สุ่มเลข id 4 ตัวไม่ให้ซ้ำกัน
      const ids = [];
      while (ids.length < 4) {
        // Math.random() ได้ทศนิยม 0 ถึงเกือบ 1 → คูณ 649 → ปัดลง → บวก 1 = ได้ 1-649
        // ใช้แค่ถึง 649 เพราะสไปรท์แบบขยับได้มีถึงเจน 5 เท่านั้น
        const id = Math.floor(Math.random() * 649) + 1;
        if (!ids.includes(id)) ids.push(id); // ถ้ายังไม่มีในลิสต์ค่อยใส่ ถ้ามีแล้วก็วนสุ่มใหม่
      }

      // Promise.all = ยิงขอข้อมูลทั้ง 4 ตัวพร้อมกัน แล้วรอให้ครบทุกตัวค่อยไปต่อ
      // ถ้าใช้ for loop แล้ว await ทีละตัว มันจะรอต่อคิว ช้ากว่า 4 เท่า
      const results = await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          if (!res.ok) throw new Error(`โหลด id ${id} ไม่สำเร็จ`);
          return res.json();
        }),
      );

      setFriends(results); // เก็บทั้ง 4 ตัวลงกล่อง friends
    } catch (error) {
      console.error(error);
    }
  }

  // ===== ส่วนที่ 6: หน้าตาที่แสดงจริง =====
  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10 text-slate-100">
      <div className="mx-auto w-fit text-3xl text-red-400">Outside Castle!</div>

      {/* {เงื่อนไข && <ของที่จะแสดง/>} = ถ้าเงื่อนไขจริงถึงจะวาด ถ้าเท็จก็ข้ามไปเฉยๆ
          ต้องเช็ค pokemon ก่อน เพราะตอนเปิดหน้าแรกสุดมันยังเป็น null อยู่
          ถ้าไม่เช็คแล้วไปหยิบ pokemon.sprites เลย จะพังทันทีเพราะ null ไม่มี sprites */}
      {pokemon && (
        <div className="flex justify-center">
          <img
            className="h-48 w-48"
            alt={pokemon.name}
            // ไล่เข้าไปในข้อมูลหลายชั้นเพื่อเอาสไปรท์แบบขยับได้จากเกมเจน 5
            src={
              pokemon.sprites.versions["generation-v"]["black-white"].animated
                .front_default
            }
          />
        </div>
      )}

      {/* แสดงเพื่อนที่เรียกมา — ต้องเช็ค .length > 0 ไม่ใช่เช็ค friends เฉยๆ
          เพราะ array ว่าง [] ในภาษา JS ถือว่าเป็นค่าจริง จะแสดงกล่องเปล่าออกมา */}
      {friends.length > 0 && (
        <div
          // template literal (เครื่องหมาย ` ) = ผสมข้อความกับเงื่อนไขได้
          // คลาสข้างหน้าคือของพื้นฐานที่มีตลอด ส่วนข้างในปีกกาคือของที่เติมเข้ามาตามเงื่อนไข
          // ถ้าสร้างยานเสร็จแล้ว (escapePod เป็นจริง) ค่อยเติมกรอบเรืองแสงเข้าไป
          className={`mx-auto flex w-fit flex-wrap justify-center gap-4 py-4 ${
            escapePod
              ? "rounded-3xl border-4 border-cyan-300 bg-cyan-950/40 px-6 shadow-lg shadow-cyan-400/50"
              : ""
          }`}
        >
          {/* .map() = วนทีละตัวใน array แล้วเปลี่ยนเป็น JSX
              ระวัง: ข้างในต้องใช้ตัวแปรลูป (friend) ทุกจุด ถ้าเผลอไปเรียกตัวแปรข้างนอกจะไม่ error
              แต่จะได้ผลผิด เช่นได้รูปตัวเดียวกันซ้ำ 4 ตัว */}
          {friends.map((friend) => (
            // key = ป้ายชื่อให้ React รู้ว่าอันไหนคืออันไหนตอนวาดใหม่ ใช้ id ดีกว่าใช้ลำดับ
            <div key={friend.id} className="text-center">
              <img
                className="mx-auto h-20 w-20"
                alt={friend.name}
                // ?? = ถ้าตัวหน้าเป็น null ให้ใช้ตัวหลังแทน
                // เผื่อบางตัวไม่มีสไปรท์แบบขยับ จะได้ใช้รูปนิ่งแทน ไม่ใช่รูปหาย
                src={
                  friend.sprites.versions["generation-v"]["black-white"]
                    .animated.front_default ?? friend.sprites.front_default
                }
              />
              {/* capitalize = ทำให้ตัวแรกเป็นตัวใหญ่ เพราะ API ส่งชื่อมาเป็นตัวเล็กหมด */}
              <p className="text-xs capitalize">{friend.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* ข้อความยานพร้อม โผล่ตอนสร้างเสร็จ animate-pulse คือของสำเร็จรูปของ Tailwind จางเข้าจางออกเอง */}
      {escapePod && (
        <p className="mx-auto w-fit animate-pulse text-cyan-300">
          🚀 Escape Pod ready!
        </p>
      )}

      <div className="flex flex-col items-center justify-center gap-2 pt-6">
        <p className="text-yellow-400">
          Message for Secret Room:
          <span className="text-purple-300">
            {/* ternary: เงื่อนไข ? เอาอันนี้ : ไม่งั้นเอาอันนี้
                ข้อความว่าง "" ถือเป็นค่าเท็จ เลยเช็คแบบนี้ได้เลยว่ามีข้อความมั้ย */}
            {question ? ` ✔ ${question}` : " Waiting for a message..⏳"}
          </span>
        </p>

        {/* value ผูกกับ state + onChange คอยอัปเดต state = controlled input
            คือให้ React เป็นเจ้าของค่าในช่อง ไม่ใช่ปล่อยให้เบราว์เซอร์จำเอง
            ถ้าใส่ value อย่างเดียวไม่ใส่ onChange จะพิมพ์ไม่ได้เลย เพราะค่าถูกล็อกไว้ */}
        <textarea
          value={question}
          onChange={handleQuestion}
          className="rounded-2xl bg-white px-2 py-1 text-black placeholder-pink-300"
          placeholder="Type your message🔤"
        />

        {/* ปุ่มเรียกพวก โผล่เมื่อ: นักโทษพิมพ์ help แล้ว และ ยังไม่เคยเรียก
            ที่ต้องเช็ค friends.length === 0 ด้วย เพื่อให้ปุ่มหายไปหลังกดแล้ว ไม่ค้างอยู่ */}
        {isHelp && friends.length === 0 && (
          <button
            // ส่งชื่อฟังก์ชันเปล่าๆ ไม่ต้องมีวงเล็บ ให้ React เรียกตอนคลิก
            // ถ้าใส่ callFriends() มันจะทำงานทันทีตอนวาดหน้า แล้ววนไม่จบ
            onClick={callFriends}
            className="rounded-full bg-yellow-400 px-4 py-2 text-2xl font-bold text-slate-950 hover:bg-yellow-300"
            type="button"
          >
            🆘 Call Reinforcement !!
          </button>
        )}

        {/* ปุ่มสร้างยาน โผล่เมื่อ: มีเพื่อนแล้ว + ยังไม่เสร็จ + ยังไม่ได้กำลังสร้าง
            เช็ค !building ด้วยเพื่อไม่ให้กดซ้ำระหว่างโหลดอยู่ */}
        {friends.length > 0 && !escapePod && !building && (
          <button
            onClick={() => {
              setProgress(0); // รีเซ็ตเปอร์เซ็นต์กลับไปที่ 0
              setBuilding(true); // เปิดสวิตช์ → useEffect ข้างบนเห็นแล้วจะเริ่มเดินนาฬิกาให้เอง
            }}
            className="rounded bg-green-400 px-4 py-2 font-bold text-white hover:bg-green-300"
            type="button"
          >
            Build Escape Pod !
          </button>
        )}

        {/* กล่องโหลด โผล่ระหว่างสร้างเท่านั้น */}
        {building && (
          <div className="mx-auto w-fit rounded-xl border-4 border-yellow-400 bg-slate-800 px-8 py-6 text-center">
            <p className="pb-3 font-bold text-yellow-400">
              Building Escape Pod...
            </p>

            {/* กล่องนอกสีเทา = รางของหลอด, overflow-hidden กันแถบในล้นออกนอกขอบมน */}
            <div className="h-4 w-56 overflow-hidden rounded-full bg-slate-600">
              <div
                className="h-full rounded-full bg-yellow-400 transition-all duration-100"
                // ต้องใช้ style ธรรมดา ใช้คลาส Tailwind ไม่ได้
                // เพราะความกว้างเปลี่ยนตามตัวเลข แต่ Tailwind ต้องรู้ชื่อคลาสตั้งแต่ตอน build
                // ปีกกาสองชั้น: ชั้นนอกบอกว่า "นี่คือโค้ด JS" ชั้นในคือ object ของสไตล์
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="pt-2 font-bold">{progress}%</p>
          </div>
        )}

        <p className="text-yellow-400">
          Reply from Secret Room:
          <span className="text-green-300">
            {answer ? ` ✔ ${answer}` : " Waiting for a reply..⏳"}
          </span>
        </p>

        {/* ส่งค่าลงไปให้ห้องข้างในผ่าน props
            question กับ answer ต้องเก็บไว้ที่ App เพราะทั้งข้างนอกและ SecretRoom ใช้ทั้งคู่
            หลักการ: ข้อมูลที่ใช้ที่เดียว เก็บไว้ที่นั่น / ใช้หลายที่ ยกขึ้นมาไว้ตรงกลาง
            ส่วน handleAnswer ส่งลงไปเพื่อให้ห้องข้างในส่งค่ากลับขึ้นมาได้ (ข้อมูลวิ่งขึ้น) */}
        <Castle
          question={question}
          answer={answer}
          handleAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
