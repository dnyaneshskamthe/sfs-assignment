import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const navigate = useNavigate()
  const auth = useAuth()
  console.log(process.env.REACT_APP_API_URL);
  
  const displaySignup = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };
  const displaySignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };
  const handleSignIn = async () => {
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json(); // Call login function with the token
        // Store the token in the local storage
        // localStorage.setItem("token", data.token);
        auth.login(data.token, username)
        // Sign in successful, navigate to landing page
        navigate('/landingPage');
      } else {
        // Handle sign in error
        alert('Sign in failed');
      }
    } catch (error) {
        alert('Error signing in:', error);
      }
  }
  const handleSignUp = async () => {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        // Sign up successful, switch to sign in view
        displaySignIn();
      } else {
        // Handle sign up error
        alert('Sign up failed');
      }
    } catch (error) {
      alert('Error signing up:', error);
    }
  };

  const handleForgotPw = ()=>{
    navigate('/forgot')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="card-title text-center text-muted fw-bold">Demo App</h1>
          <div className="card my-4 ">
            <div className="card-body">
              {showSignIn && (
                <div id="signin">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="signin-username"
                      placeholder="username"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="signin-password"
                      placeholder="********"
                    />
                  </div>
                  <div className="text-center">
                  <button className="btn btn-primary w-100" onClick={handleSignIn}>Sign In</button>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="forgotPw">
                      Forgot password?{" "}
                      <span
                        className="text-primary"
                        onClick={handleForgotPw}
                      >
                        Reset password
                      </span>{" "}
                    </span>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="">
                      Don't have an account?{" "}
                      <button
                        className="btn btn-secondary"
                        onClick={displaySignup}
                      >
                        Sign up
                      </button>{" "}
                    </span>
                  </div>
                </div>
              )}
              {showSignUp && (
                <div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="signup-username"
                      placeholder="username"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="signup-email"
                      placeholder="email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="signup-password"
                      placeholder="********"
                    />
                  </div>
                  <button className="btn btn-primary w-100" onClick={handleSignUp}>Sign Up</button>
                  <div className="mt-4 text-center">
                    <span className="text-center">
                      Already registered?{" "}
                      <button
                        className="btn btn-secondary"
                        onClick={displaySignIn}
                      >
                        Sign In
                      </button>{" "}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
