import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [toggle, setToggle] = useState(false);
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const navigate = useNavigate();

  const handleData = async (e) => {
    e.preventDefault();
    const newData = {
      mail: mail,
      password: pass,
    };
    if (!toggle) {
      if (await checkdata(newData)) {
        setSignedUp(true);
        setMsg("You have already signed up with this mail!");
        return;
      }
      sendData(newData);
      setSignedUp(true);
      setMsg("You have successfully signed in!");
    } else {
      if (await checkdata(newData)) {
        const fetchData = await loginData(newData);
        if(fetchData){
          navigate(`/loggedin/${fetchData.id}`)
        }
        else{
          setSignedUp(true);
          setMsg("Password doesnt match for this mail");
        }
      } else {
        setSignedUp(true);
        setMsg("You dont have account with this mail!");
      }
    }
  };

  const sendData = async (newData) => {
    await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
  };

  const checkdata = async (newData) => {
    const data = await fetch("http://localhost:8000/users");
    const res = await data.json();
    for (let r of res) {
      if (r.mail === newData.mail) {
        return true;
      }
    }
    return false;
  };

  const loginData = async (newData) => {
    const data = await fetch("http://localhost:8000/users");
    const res = await data.json();
    for (let r of res) {
      if (r.mail === newData.mail && r.password === newData.password) {
        return r; // return the user object
      }
    }
    return null;
  };

  return (
    <div className="bg-slate-700 min-h-screen flex justify-center items-center">
      <div className="border border-slate-900/5 drop-shadow-2xl drop-shadow-slate-900 rounded-lg overflow-hidden flex">
        <div
          className={`p-6  w-[250px] ${
            toggle
              ? "translate-x-[100%] bg-blue-800"
              : "translate-x-0 bg-fuchsia-800"
          } transition-all duration-500 linear z-50`}
        >
          <h1 className="text-center font-bold">
            {toggle ? "Login" : "Sign Up"}
          </h1>
          <form onSubmit={handleData}>
            <div className="relative group">
              <div
                className={`absolute text-slate-300 tracking-wider top-[10px] left-[10px] pointer-events-none ${
                  mail !== ""
                    ? "text-xs translate-y-[-10px] translate-x-[-2px]"
                    : ""
                } group-focus-within:text-xs group-focus-within:translate-y-[-10px] group-focus-within:translate-x-[-2px] transition-all duration-300 linear`}
              >
                Email
              </div>
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="bg-slate-700 text-white rounded-md pt-4 pb-2 px-2 mt-2 block z-50"
                required
                data-testid="email-input"
              />
            </div>

            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="bg-slate-700 text-white rounded-md p-2 mt-2"
              minLength={8}
              required
              placeholder="********"
              data-testid="password-input"
            />
            <div className="text-center">
              <button
                type="submit"
                data-testid="submit-button"
                className="cursor-pointer mt-2 bg-black text-white p-2 rounded-md font-bold hover:opacity-80"
              >
                {toggle ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
        <div
          className={`p-6 bg-white flex flex-col ${
            toggle ? "translate-x-[-100%]" : "translate-x-0"
          } transition-all duration-500 linear justify-center items-center w-[250px]`}
        >
          <h1>
            {toggle ? "Dont have an account?" : "Already have an account?"}
          </h1>
          <div>
            <button
              className="bg-black text-white p-2 rounded-md font-bold mt-2 cursor-pointer hover:opacity-90"
              onClick={() => {
                setToggle(!toggle);
                setSignedUp(false);
              }}
            >
              {toggle ? "Sign Up" : "Login"}
            </button>
          </div>
          <p
            className={`mt-2 text-center ${
              !signedUp ? "hidden" : "animate-hriday"
            }`}
          >
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Auth;
