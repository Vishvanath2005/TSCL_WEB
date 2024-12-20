import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import logo from "../../assets/images/logo1.png"
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../Host";

const OTP = () => {
  const [formData, setFormData] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (value, event) => {
    setFormData({ ...formData, [value]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const otpValue = Object.values(formData).join("");
      if (otpValue.length !== 4) {
        toast.error("Please fill in the complete OTP");
        return;
      }
      console.log("OTP Value:", otpValue);
      
      // const otpVerification = {
      //   otp: otpValue,
      // };
  
      //const response1 = await axios.post(`${API}/public-user/verify-otp`, otpVerification);

      const finalvalue = "1234"
  
      if (otpValue === finalvalue) {
        toast.success("OTP verified"); 
        
      const DataForm = { ...location.state?.DataForm };
      DataForm.verification_status = "verified";
      DataForm.user_status = "active";
      DataForm.role = "user";
      // console.log(DataForm);
        
      const responseUser = await axios.post(`${API}/public-user/post`, DataForm);
  
        if (responseUser.status === 200) {
          toast.success(responseUser.data.message);
          navigate("/");
          
       } else { 
          console.error(response.data.message);
         toast.error("Error posting form data");
        }
      } else {
        
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 4) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const handlelogin = () => {
    navigate("/");
  };

  return (
    <div className="h-screen  bg-primary py-6 flex flex-col items-center gap-8 justify-center ">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Image" className="w-24 h-24" />
        <p className="text-6xl text-secondary ">TSCL</p>
      </div>
      <div className="p-6 md:w-[550px]   md:bg-white  rounded-lg mx-5">
        <div className="font-lexend text-start mt-2">
          <p className="text-xl py-2 md:text-black text-gray-200 text-center">One Time Password</p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3  pt-5">
              <input
                name="otp1"
                type="text"
                autoComplete="off"
                className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                value={formData.otp1}
                onChange={(e) => handleChange("otp1", e)}
                tabIndex="1"
                maxLength="1"
                onKeyUp={(e) => inputfocus(e)}
              />
              <input
                name="otp2"
                type="text"
                autoComplete="off"
                className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                value={formData.otp2}
                onChange={(e) => handleChange("otp2", e)}
                tabIndex="2"
                maxLength="1"
                onKeyUp={(e) => inputfocus(e)}
              />
              <input
                name="otp3"
                type="text"
                autoComplete="off"
                className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                value={formData.otp3}
                onChange={(e) => handleChange("otp3", e)}
                tabIndex="3"
                maxLength="1"
                onKeyUp={(e) => inputfocus(e)}
              />
              <input
                name="otp4"
                type="text"
                autoComplete="off"
                className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                value={formData.otp4}
                onChange={(e) => handleChange("otp4", e)}
                tabIndex="4"
                maxLength="1"
                onKeyUp={(e) => inputfocus(e)}
              />
            </div>
            <p className="text-center text-xs md:text-primary text-white ml-36 mt-2">Resend 3s</p>
            <div className="text-center my-5">
              <button
                className="px-5 py-2 md:bg-primary md:text-white text-primary bg-gray-100 rounded-full"
                type="submit"
                // onClick={handlelogin}

              >
                Verify OTP
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default OTP;
