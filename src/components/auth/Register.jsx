import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    requestManager: false
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Assign role securely
      const assignedRole = formData.requestManager ? "pending_manager" : "user";

      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: assignedRole,
        createdAt: new Date()
      });

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <StyledWrapper>
      <div className='flex items-center justify-center font-bold text-3xl bg-[#121212] text-blue-500'>
        <h1>Loan Application Portal</h1>
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register</p>
          <p className="message">Signup now and get full access to our app.</p>

          {/* First & Last Name */}
          <div className="flex">
            <label>
              <span>Firstname</span>
              <input className="input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>
            <label>
              <span>Lastname</span>
              <input className="input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label>
          </div>

          {/* Email */}
          <label>
            <span>Email</span>
            <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          {/* Password */}
          <label>
            <span>Password</span>
            <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>

          {/* Confirm Password */}
          <label>
            <span>Confirm password</span>
            <input className="input" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </label>

          {/* Request Manager Access */}
          <label className="text-white flex gap-2 items-center">
            <input type="checkbox" name="requestManager" checked={formData.requestManager} onChange={handleChange} />
            Request Manager Access (requires admin approval)
          </label>

          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

          <button type="submit" className="submit">Register</button>
          <p className="signin">
            Already have an account? <Link to="/login">Signin</Link>
          </p>
        </form>
      </div>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem;
    background: #121212;
    color: #00bfff;
    letter-spacing: 1px;
  }

  .form-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .form {
    background-color: #1e1e1e;
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    max-width: 420px;
    border: 1px solid #333;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .title {
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    color: #00bfff;
    margin-bottom: 0.5rem;
  }

  .message {
    font-size: 0.9rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1rem;
  }

  .form label {
    position: relative;
    display: block;
  }

  .input {
    background-color: #2a2a2a;
    border: 1px solid #444;
    color: #fff;
    padding: 14px 10px;
    border-radius: 8px;
    width: 100%;
    font-size: 0.95rem;
    outline: none;
    transition: border 0.3s ease;
  }

  .input:focus {
    border-color: #00bfff;
  }

  .form label span {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
    transition: 0.3s ease;
  }

  .input:focus + span,
  .input:not(:placeholder-shown) + span {
    top: -6px;
    left: 8px;
    font-size: 0.7rem;
    color: #00bfff;
    background-color: #1e1e1e;
    padding: 0 4px;
  }

  .submit {
    background-color: #00bfff;
    border: none;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .submit:hover {
    background-color: #00a2d6;
  }

  .signin {
    text-align: center;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .signin a {
    color: #00bfff;
    text-decoration: none;
    margin-left: 4px;
  }

  .signin a:hover {
    text-decoration: underline;
  }
`;

export default Register;
