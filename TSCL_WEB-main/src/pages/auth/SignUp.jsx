import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiOutlineLoading } from "react-icons/ai";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    public_user_name: "",
    email: "",
    login_password: "",
  });

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        delete window.recaptchaVerifier;
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value, data) => {
    setPhone(value);
    setCountryCode(data.dialCode);
  };

  const setUpRecaptcha = () => {
    if (window.recaptchaVerifier) {
      return;
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA verified");
        },
      }
    );
  };

  const validateForm = () => {
    if (!formData.public_user_name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.login_password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setProcessing(true);
    const localPhone = phone.slice(countryCode.length);

    try {
      setUpRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = phone.startsWith("+") ? phone : "+" + phone;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );
      window.confirmationResult = confirmationResult;

      toast.success("OTP sent successfully!");
      setProcessing(false);

      navigate("/auth", {
        state: {
          ...formData,
          phone: localPhone,
        },
      });
    } catch (error) {
      console.error("Invalid sign-in process", error);

      if (error.code === "auth/invalid-phone-number") {
        toast.error(
          "Invalid phone number format. Please enter a valid number."
        );
      } else if (error.code === "auth/quota-exceeded") {
        toast.error("SMS quota exceeded. Try again later.");
      } else if (error.code === "auth/billing-not-enabled") {
        toast.error(
          "Billing is not enabled in your Firebase project. Please enable it."
        );
      } else {
        toast.error("Invalid sign-in process");
      }

      setProcessing(false);
    }
  };

  return (
    <div className="h-screen bg-primary py-6 flex flex-col md:items-center gap-8 justify-center">
        <div className="flex flex-col items-center justify-center gap-3 ">
              <img src={logo} alt="Image" className="w-24 h-24" />
              <p className="text-4xl text-secondary font-semibold drop-shadow-2xl ">Madurai Smart City </p>
            </div>
      <div className="mx-3">
        <div className="p-6 md:max-w-[600px] w-full md:bg-white relative rounded-lg">
          <div className="font-lexend text-start mt-2">
            <form onSubmit={handleSendOtp}>
              <p className="text-xl md:text-black text-gray-200 md:mx-3 my-3">
                Sign Up
              </p>

              <div className="grid md:grid-cols-3 grid-col-2 font-normal md:mx-4 py-1.5">
                <label
                  className="md:text-black text-slate-800 flex text-lg font-medium mb-2 col-span-1"
                  htmlFor="public_user_name"
                >
                  Name
                  <span className="md:text-red-700 text-red-900 px-2">*</span>
                </label>
                <input
                  type="text"
                  id="public_user_name"
                  name="public_user_name"
                  className="md:col-span-2 col-span-1 border outline-none rounded-lg px-5 py-1.5 bg-white md:bg-white"
                  placeholder="Enter your Name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-3 grid-col-2 font-normal md:mx-4 py-1.5">
                <label
                  className="col-span-1 md:text-black text-slate-800 text-lg font-medium mb-2"
                  htmlFor="email"
                >
                  Email Id
                  <span className="md:text-red-700 text-red-900 px-2">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="md:col-span-2 col-span-1 border outline-none rounded-lg py-1.5 px-5 bg-white md:bg-white"
                  placeholder="tscl123@gmail.com"
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-3 grid-col-2 font-normal md:mx-4 py-1.5">
                <label htmlFor="phone">
                  Phone <span className="text-red-600">*</span>
                </label>
                <PhoneInput
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-[348px] py-1 border text-black font-poppins font-extralight rounded-md  outline-none "
                  inputStyle={{
                    border: "none",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  placeholder="9999999999"
                  buttonStyle={{
                    width: "70px",
                    borderRadius: "8px",
                    marginLeft: "10px",
                    border: "none",
                    background: "white",
                  }}
                />
              </div>

              <div className="grid md:grid-cols-3 grid-col-2 font-normal md:mx-4 py-1.5">
                <label
                  className="flex md:text-black text-slate-800 text-lg font-medium mb-2 col-span-1"
                  htmlFor="login_password"
                >
                  Password
                  <span className="md:text-red-700 text-red-900 px-2">*</span>
                </label>
                <input
                  type="password"
                  id="login_password"
                  name="login_password"
                  className="md:col-span-2 col-span-1 border outline-none rounded-lg py-1.5 px-5 bg-gray-200 md:bg-gray-50"
                  placeholder="* * * * * * * * * *"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-center mt-3">
                <button
                  className="text-lg bg-primary text-white rounded-md w-1/2 py-2.5"
                  type="submit"
                >
                  {processing ? (
                    <span className="flex justify-center gap-3">
                      <AiOutlineLoading className="h-6 w-6 animate-spin" />
                      <p>Send OTP</p>
                    </span>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
            <p className="text-sm text-center mt-3">
              Already have an account?{" "}
              <span className="text-base md:text-primary text-white">
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignUp;
