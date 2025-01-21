import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../Host";
import { auth } from "../../firebase.config";
import { AiOutlineLoading } from "react-icons/ai";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const OTP = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  const location = useLocation();
  const dataTosend = location?.state;

  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);
  const handleChange = (value, event) => {
    setFormData({ ...formData, [value]: event.target.value });
  };
  console.log(formData);
  

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const setUpRecaptcha = () => {
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

  const handleResendOtp = async () => {
    if (!canResend) {
      toast.error("Please wait before resending the OTP.");
      return;
    }

    const phone = localStorage.getItem("phone");
    const countryCode = localStorage.getItem("countryCode");

    if (!phone || !countryCode) {
      toast.error("Unable to send OTP. Please try again later.");
      return;
    }

    try {
      setUpRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+${countryCode}${phone}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      toast.success("OTP sent successfully!");
      setCanResend(false);
      setTimer(90);
    } catch (error) {
      toast.error("Error sending OTP.");
      //navigate('/')
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return minutes > 0 ? `${minutes} min ${seconds} secs` : `${seconds} secs`;
  };

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const onOTPVerify = async (e) => {
    setProcessing(true);
    e.preventDefault();
    const otp =
      formData.otp1 +
      formData.otp2 +
      formData.otp3 +
      formData.otp4 +
      formData.otp5 +
      formData.otp6;
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        toast.error("Please request a new OTP.");
        return;
      }
      await confirmationResult.confirm(otp);

      localStorage.setItem("isLoggedIn", true);

      const response = await axios.post(`${API}/public-user/post`, dataTosend);

      if (response.status === 200) {
        toast.success("Account Created Successfully");
        const DataForm = { ...location.state?.DataForm };
        DataForm.verification_status = "verified";
        DataForm.user_status = "active";
        console.log(formData);
        
        navigate("/");
      } else {
        toast.error("Failed To Upload");
        setProcessing(false);
        console.log("Error in posting Data");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error("Invalid OTP. Please try again.");
      navigate("/");
      localStorage.clear();
      setProcessing(false);
    }
  };

  return (
    <div className="h-screen  bg-primary py-6 flex flex-col items-center gap-8 justify-center ">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Image" className="w-24 h-24" />
        <p className="text-6xl text-secondary ">MSCL</p>
      </div>
      <div className="p-6 md:w-[550px]   md:bg-white  rounded-lg mx-5">
        <div className="font-lexend text-start mt-2">
          <p className="text-xl py-2 md:text-black text-gray-200 text-center">
            One Time Password
          </p>
          <form className="z-0" onSubmit={onOTPVerify}>
            <p className="text-center text-lg my-4 font-extralight">
              Phone Number Verification
            </p>
            <div className="flex justify-center gap-3 my-6">
              {Object.keys(formData).map((key, index) => (
                <input
                  key={key}
                  name={key}
                  type="text"
                  autoComplete="off"
                  className="w-12 h-14 text-center border-2 bg-transparent outline-none"
                  value={formData[key]}
                  onChange={(e) => handleChange(key, e)}
                  tabIndex={index + 1}
                  maxLength="1"
                  onKeyUp={(e) => inputfocus(e)}
                />
              ))}
            </div>
            <p className="text-center font-extralight mx-2 my-3">
              We have sent you an OTP (one-time password) to your phone number
            </p>
            <div className="flex justify-around my-12">
              <p
                className={`text-lg font-extralight ${
                  canResend ? "cursor-pointer" : "text-gray-400"
                }`}
                onClick={() => canResend && handleResendOtp()}
              >
                Resend OTP
              </p>
              <p className="text-lg font-extralight ">{formatTime(timer)}</p>
            </div>
            <div className="flex justify-center my-12">
              <button
                className="text-lg bg-primary rounded-md text-white w-1/2 py-2.5"
                type="submit"
              >
                {processing ? (
                  <span className="flex justify-center gap-3">
                    {" "}
                    <AiOutlineLoading className="h-6 w-6 animate-spin" />{" "}
                    <p>Verifying....</p>
                  </span>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
            {/* <p className="text-sm mt-3 text-center font-extralight">
            &#169; PickMyCourse Developed with{" "}
            <span className="text-red-700">&#x2764;</span> by SeenIT Pty Ltd
          </p> */}
          </form>
          <div id="recaptcha-container"></div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
