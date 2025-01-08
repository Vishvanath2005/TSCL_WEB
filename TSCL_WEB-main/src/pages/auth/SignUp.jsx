import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import { API } from "../../Host";

const AddUserSchema = yup.object().shape({
  public_user_name: yup.string().required("User Name is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup.string().required("Email Id  is required"),
  login_password: yup.string().required("password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePhoneChange = (value, data) => {
    setPhone(value);
    setCountryCode(data.dialCode);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(AddUserSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    setProcessing(true);
    const localPhone = phone.slice(countryCode.length);
    const formData = {
      ...data,
      phone: localPhone,
    };
    console.log(formData);
    
    try {
      const response = await axios.post(`${API}/api/getbyuserid`, formData);
      if (response.status === 200) {
        toast.success("Account Created Successfully");
        setProcessing(false);
        navigate("/");
      } else {
        toast.error("Failed To Upload");
        setProcessing(false);
        console.log("Error in posting Data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
const handleotp =()=>{
  navigate("/auth")
}

  return (
    <div className="h-screen  bg-primary py-6 flex flex-col md:items-center gap-8 justify-center ">
      <div className="flex items-center justify-center gap-3">
        <img src={logo} alt="Image" className="w-24 h-24" />
        <p className="text-6xl text-secondary">MSCL</p>
      </div>
      <div className="mx-3">
        <div className="p-6  md:max-w-[600px] w-full   md:bg-white  relative rounded-lg ">
          <div className="font-lexend text-start mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-xl md:text-black text-gray-200   md:mx-3 my-3">
                Sign Up
              </p>

              <div className="grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5">
                <label
                  className=" md:text-black text-slate-800 flex text-lg font-medium mb-2 col-span-1"
                  htmlFor="public_user_name"
                >
                  Name
                  <span className="md:text-red-700 text-red-900 px-2">*</span>
                </label>
                <input
                  type="text"
                  id="public_user_name"
                  className="md:col-span-2 col-span-1 border outline-none rounded-lg   px-5  py-1.5 bg-gray-200 md:bg-gray-50"
                  placeholder="Enter your Name"
                  {...register("public_user_name")}
                />
                {errors.public_user_name && (
                  <p className="md:text-red-500  text-red-700 md:text-xs text-sm text-end mt-1 md:col-span-3">
                    {errors.public_user_name.message}
                  </p>
                )}
              </div>
              <div className=" grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5">
                <label
                  className="col-span-1 md:text-black text-slate-800 text-lg font-medium mb-2 "
                  htmlFor="email"
                >
                  Email Id
                  <span className="md:text-red-700 text-red-900 px-2">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="md:col-span-2 col-span-1  border outline-none  rounded-lg py-1.5 px-5 bg-gray-200 md:bg-gray-50"
                  placeholder="tscl123@gmail.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="md:text-red-500  text-red-700 md:text-xs text-sm text-end mt-1 md:col-span-3">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className=" grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5">
                <label htmlFor="phone">
                  Phone <span className="text-red-600">*</span>
                </label>
                {/* <input
              type="text"
              placeholder="9999999999"
              {...register("phone")}
              className="py-2 px-2  rounded-md text-center  text-black shadow-md outline-none"
            /> */}

                <PhoneInput
                  // country={"in"}
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-[348px] py-1 border text-black font-poppins font-extralight rounded-md shadow-md outline-none bg-white "
                  inputStyle={{
                    border: "none",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  placeholder="9999999999"
                  buttonStyle={{
                    // background: "linear-gradient(to right, #3D03FA, #A71CD2)",
                    width: "70px",
                    borderRadius: "8px",
                    marginLeft: "10px",
                    border: "none",
                    background: "white",
                  }}
                />
              </div>

              <div className="grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5">
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
                  className="md:col-span-2 col-span-1  border outline-none  rounded-lg py-1.5 px-5 bg-gray-200 md:bg-gray-50"
                  placeholder="* * * * * * * * * * "
                  {...register("login_password")}
                />
                {errors.login_password && (
                  <p className="md:text-red-500  text-red-700 md:text-xs text-sm text-end mt-1 md:col-span-3">
                    {errors.login_password.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-3">
                <button
                  className=" text-lg bg-primary text-white rounded-md w-1/2 py-2.5 "
                  type="submit"
                  onClick={handleotp}
                >
                  {processing ? (
                    <span className="flex justify-center gap-3">
                      {" "}
                      <AiOutlineLoading className="h-6 w-6 animate-spin" />{" "}
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
    </div>
  );
};

export default SignUp;
