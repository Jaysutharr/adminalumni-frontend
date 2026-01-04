import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sigin.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import fi1 from '../assets/fimage1.png';
import Swal from 'sweetalert2';
import axios from 'axios';

const Sigin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorPopup, setErrorPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#3c4357";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminCredentials = {
      email: "admin@example.com",
      password: "admin123",
    };

    if (
      formData.email === adminCredentials.email &&
      formData.password === adminCredentials.password
    ) {
      navigate('/dashboard');
    } else {
      setErrorPopup(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closePopup = () => {
    setErrorPopup(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseAndRedirect = () => {
    closePopup();
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  // Forgot Password Handler
  const handleForgotPassword = async () => {
    // Step 1: Get email from user
    const { value: email } = await Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'you@email.com',
      showCancelButton: true,
      confirmButtonText: 'Send OTP',
      confirmButtonColor: '#667eea',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your email!';
        }
      }
    });

    if (!email) return;

    try {
      // Step 2: Call API to send OTP
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/v1/send-otp-to-user",
        { email }
      );

      if (response.data.success) {
        // Step 3: Show OTP on screen (DEV MODE)
        const otp = response.data.devOtp;

        const { value: enteredOtp } = await Swal.fire({
          title: '🔑 Enter OTP',
          html: otp ? `
            <div style="background: #f0f0ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <p style="margin: 0; color: #666; font-size: 12px;">DEV MODE - Your OTP Code:</p>
              <div style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px;">
                ${otp}
              </div>
            </div>
          ` : '<p>OTP has been sent to your email</p>',
          input: 'text',
          inputLabel: 'Enter the 6-digit OTP',
          inputPlaceholder: '123456',
          showCancelButton: true,
          confirmButtonText: 'Verify OTP',
          confirmButtonColor: '#667eea',
          inputValidator: (value) => {
            if (!value || value.length !== 6) {
              return 'Please enter a valid 6-digit OTP!';
            }
          }
        });

        if (!enteredOtp) return;

        // Step 4: Get new password
        const { value: newPassword } = await Swal.fire({
          title: 'Set New Password',
          input: 'password',
          inputLabel: 'Enter your new password',
          inputPlaceholder: 'New password (min 8 characters)',
          showCancelButton: true,
          confirmButtonText: 'Reset Password',
          confirmButtonColor: '#667eea',
          inputValidator: (value) => {
            if (!value || value.length < 8) {
              return 'Password must be at least 8 characters!';
            }
          }
        });

        if (!newPassword) return;

        // Step 5: Call API to reset password
        const resetResponse = await axios.post(
          process.env.REACT_APP_BASE_URL + "/api/v1/user-forgot-password",
          { email, OTP: enteredOtp, newPassword }
        );

        if (resetResponse.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Password Reset Successful!',
            text: 'You can now sign in with your new password.',
            confirmButtonColor: '#667eea',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Reset Failed',
            text: resetResponse.data.message || 'Please try again.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Failed to send OTP. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className="signin-wrapper col-sm-6">
            <h2>Sign in</h2>
            <h5>Sign in into your account</h5>
            <div className="signin-form-wrapper">
              <form className="signin-form" onSubmit={handleSubmit}>
                <div className="signin-form-group">
                  <label htmlFor="email" className="signin-form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="signin-form-input"
                  />
                </div>
                <div className="signin-form-group">
                  <label htmlFor="password" className="signin-form-label">Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="signin-form-input"
                    />
                    <span
                      className="toggle-password-icon"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <button type="submit" className="signin-button">Sign in</button>
                <div className="signin-or-container">
                  <hr className="signin-line" />
                  <span className="signin-or-text">OR</span>
                  <hr className="signin-line" />
                </div>
                <button type="button" className="google-signin-button">
                  <span className='google'>G</span> Continue with Google
                </button>
              </form>
              <div className="signin-footer1">
                <p className='signin-forgot1'>
                  Forgot password? <span
                    className="signin-forgot-password1"
                    style={{ cursor: 'pointer' }}
                    onClick={handleForgotPassword}
                  >Reset</span>
                </p>
                <p className='signin-sign1'>
                  Don't have an account? <span className="signin-sign-up1">Sign up</span>
                </p>
                <p className="terms">
                  By continuing, you agree to our <span className="link" style={{ cursor: 'pointer', color: 'rgb(89,158,158)' }}>Terms of Service</span>.<br />
                  Read our <span className="link" style={{ cursor: 'pointer', color: 'rgb(89,158,158)' }}>Privacy Policy</span>.
                </p>
              </div>
            </div>
          </div>
          <div className='background-container-sigin col-sm-6'>
            <img src={fi1} alt="" />
          </div>
        </div>
      </div>

      {/* Error Popup */}
      {errorPopup && (
        <div className="error-popup">
          <div className="error-popup-content">
            <p>You have signed in successfully.</p>
            <button
              onClick={handleCloseAndRedirect}
              className="close-popup-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sigin;
