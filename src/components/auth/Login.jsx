import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/getUserRole'; // make sure this path is correct

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handelLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const role = await getUserRole(uid);

      if (!role) {
        setErrorMsg("Unable to determine role. Contact support.");
        return;
      }

      if (role === "admin") navigate("/admin");
      else if (role === "manager" || role === "pending") navigate("/dashboard");
      else navigate("/dashboard");

    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <StyledWrapper>
      <div className='flex items-center justify-center font-bold text-3xl bg-[#121212] text-blue-500'>
        <h1>Loan Application Portal</h1>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <form className="form" onSubmit={handelLogin}>
          <p className="title">Login</p>
          <p className="message">Login Here</p>

          {errorMsg && <p className='text-red-400 text-sm'>{errorMsg}</p>}

          <label>
            <input
              className="input"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
          </label>

          <button className="submit">Submit</button>
          <p className="signin">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 25%;
    max-width: 1000px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
  }

  .message, 
  .signin {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: #00bfff;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 5px 5px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    background-color: #00bfff;
  }

  .submit:hover {
    background-color: #00bfff96;
  }
`;

export default Login;
