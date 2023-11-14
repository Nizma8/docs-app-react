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
      await createUserWithEmailAndPassword(auth, email, password);
      setPassword(""); // Clear only the password
      navigate("/");
      ;
    } catch (err) {
      handleError(err)
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
       await signInWithEmailAndPassword(auth, email, password);
      navigate("/add");
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (error) => {
    let errorMessage = "An error occurred.";

    // Customize error messages based on error code
    if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address.";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "User not registered.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Invalid password.";
    } else if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email already in use.";
    }

    // Show the error alert
    alert(errorMessage);
  };
  return (
 
<div>
<div
      style={{ width: "100%", height: "100vh" }}
      className="flex justify-center items-center "
    >
      <div className=" w-4/5 py-16 border shadow-lg  bg-blue-200 flex  justify-around items-center">
        
         
            
              <div className="">
                
                <h5 className="text-lg  mt-5 pb-4 text-light">
                  {" "}
                  {registerForm
                    ? "Sign up to your account"
                    : "Sign In to Your Account"}
                </h5>

                <div className="text-light w-75 ">
                 
                  <div className="mb-3" >
                    <input
                    className='py-1 px-3 rounded-sm focus:ring-1'
                      type="email"
                      placeholder="Enter Your Email Id"
                     value={email}
                     onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                   className=' py-1 px-3 rounded-sm  focus:ring-slate-500'
                      type="password"
                      placeholder="Enter Your password"
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                    />
                  </div>

                  {registerForm ? (
                    <div>
                      <button onClick={login}
                      className='shadow rounded-lg p-2 hover:bg-inherit bg-white'
                      >
                        Register
                      </button>
                      <p className="mt-3">
                        Already have an account?{" "}
                        <Link
                          to="/"
                          className=" text-blue-500"
                        >
                          Login Here
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <button onClick={registerUser} className='shadow rounded-lg p-2 hover:bg-white'>
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
            
            <div className='w-1/3' >
              <img
                src="https://i.pinimg.com/originals/d9/c8/4a/d9c84abcf4b69b73c59b1c28682f47cd.png"
                alt=""
                className="glass-container rounded shadow"
              />
            </div>
          
       
      </div>
    
    </div>
</div>
  )
}

export default Auth