import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ref = useRef(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showPass, setPassShow] = useState(false);

  console.log(formData, "formdatt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isStrongpassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (!formData.name) {
      toast.warn("First Name is required.");
      isValid = false;
    }
    if (!formData.phone) {
      toast.warn("Mobile Number is required");
      isValid = false;
    }
    if (!formData.email) {
      toast.warn("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      toast.warn("Invalid email format.");
      isValid = false;
    }
    if (!formData.password) {
      toast.warn("Password is required.");
      isValid = false;
    } else if (!isStrongpassword(formData.password)) {
      toast.warn("Invalid password format.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    ref.current.continuousStart();
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        const response = await fetch(`${BASE_URL}/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data, "data");
        if (data.success === true) {
          toast.success("Registration complete");
          ref.current.complete();
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.user.role);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          // Handle registration failure
          console.error("Registration failed");
          ref.current.complete();
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Registration Failed");
        ref.current.complete();
        console.error("Error during registration:", error);
      }
    }
    ref.current.complete();
  };

  return (
    <div className="containerr">
      <LoadingBar color="#f11946" ref={ref} />
      <form className="form_containerr">
        <MdOutlineAirplaneTicket className="logo_container" />
        <div className="title_containerr">
          <p className="title">Create Your Account</p>
         
        </div>
        <div className="input_containerr">
          <label className="input_labelr" htmlFor="name_field">
            Name
          </label>
          <input
            required
            placeholder="John Smith"
            title="Input title"
            name="name"
            type="text"
            className="input_fieldr"
            id="name_field"
            onChange={handleChange}
          />
        </div>
        <div className="input_containerr">
          <label className="input_labelr" htmlFor="mobile_field">
            Mobile Number
          </label>
          <input
            required
            placeholder="+91 881029988"
            title="Input title"
            name="phone"
            type="text"
            className="input_fieldr"
            id="mobile_field"
            onChange={handleChange}
          />
          {/* Add error handling for mobile if needed */}
        </div>
        <div className="input_containerr">
          <label className="input_labelr" htmlFor="email_field">
            Email
          </label>
          <input
            required
            placeholder="Email"
            title="Input title"
            name="email"
            type="text"
            className="input_fieldr"
            id="email_field"
            onChange={handleChange}
          />
          {/* Add error handling for email if needed */}
        </div>
        <div className="input_containerr">
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
          <input
            required
            placeholder="Password"
            title="Input title"
            name="password"
            type={showPass ? "text" : "password"}
            className="input_fieldr"
            id="password_field"
            onChange={handleChange}
          />
          <div
            className="password-toggler"
            onClick={() => setPassShow(!showPass)}
          >
            {showPass ? <VscEye /> : <VscEyeClosed />}
          </div>
         
        </div>
        {formData.password &&
          !isStrongpassword(formData.password) && (
            <span className="warnig_msg">
              password must contain at least 8 characters, one uppercase letter,
              one lowercase letter, one number, and one special character.
            </span>
          )}
        <button
          title="Register"
          type="submit"
          className="sign-in_btnr"
          onClick={handleSubmit}
        >
          <span>Submit</span>
        </button>
        <div className="separatorr">
          <hr className="liner" />
          <span>Or</span>
          <hr className="liner" />
        </div>
        <button
          title="Sign In"
          type="submit"
          className="sign-in_gglr"
          onClick={() => navigate("/")}
        >
          <span>Already have an account</span>
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
