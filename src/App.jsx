import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const copyTextRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_+=[]{}'~";

    for (let i = 0; i < length; i++) {
      let randomNum = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomNum);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const copyPassToCip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    copyTextRef.current.innerHTML = "Copied"; 
    copyTextRef.current.classList.add("bg-green-700")
    setTimeout(() => {
      copyTextRef.current.innerHTML = "Copy"; 
      copyTextRef.current.classList.remove("bg-green-700")
    }, 2000)
  }, [password]);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 my-12 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center text-xl mt-2 mb-5">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full h-9 py-1 px-3 text-gray-900"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
            className="outline-none bg-[#0B60B0] hover:bg-green-600 text-white px-3 py-0.5 shrink-0"
            onClick={copyPassToCip}
            ref={copyTextRef}
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-5">
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              id="passLength"
              min={6} 
              max={50} 
              value={length} 
              className="cursor-pointer"
              onChange={(event) => setLength(event.target.value)}
            />
            <label htmlFor="passLength">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => setNumAllowed(prevValue => !prevValue)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed(prevValue => !prevValue)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
