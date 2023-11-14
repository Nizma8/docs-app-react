import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { auth } from '../configure/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';


function Auth({register}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const registerForm = register ? true : false;

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      setPassword(""); // Clear only the password
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
 
<div>
<div
      style={{ width: "100%", height: "100vh" }}
      className="flex justify-center items-center "
    >
      <div className="container  w-1/2 ">/
        <Link
          to={"/"}
          className="  flex justify-center items-center "
        >
          {" "}
          <h5>
            <i className="fa-solid fa-arrow-left"></i> Back To Home{" "}
          </h5>
        </Link>

        <div className="shadow p-5 bg-success">
          <div className=' grid grid-rows-1'>
            <div className=' grid grid-cols-2'>
              <div className=" flex-col flex">
                <div className="flex mt-2 text-white">
                  <span className="h1  font-bold mb-0 all text-white">
                    {" "}
                    <i className="fa-brands fa-stack-overflow fa-bounce me-2 "></i>
                  </span>
                </div>
                <h5 className="fw-normal mt-5 pb-4 text-light">
                  {" "}
                  {registerForm
                    ? "Sign up to your account"
                    : "Sign In to Your Account"}
                </h5>

                <div className="text-light w-75 ">
                 
                  <div className="mb-3" controlId="formBasicEmail1">
                    <input
                      type="email"
                      placeholder="Enter Your Email Id"
                     value={email}
                     onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </div>
                  <div className="mb-3" controlId="formBasicPassword1">
                    <input
                      type="password"
                      placeholder="Enter Your password"
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                    />
                  </div>

                  {registerForm ? (
                    <div>
                      <button onClick={login}
                     
                      >
                        Register
                      </button>
                      <p className="mt-3">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className=" lh-base btn-link ms-2 text-info"
                        >
                          Login Here
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <button onClick={registerUser}>
                        Login
                      </button>
                      <p className="mt-3">
                        New User?{" "}
                        <Link
                          to="/register"
                          className=" fw-bolder text-info lh-base btn-link ms-2"
                        >
                          Register
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='grid grid-col-2' >
              <img
                src=""
                alt=""
                className="glass-container rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>
    
    </div>
</div>
  )
}

export default Auth