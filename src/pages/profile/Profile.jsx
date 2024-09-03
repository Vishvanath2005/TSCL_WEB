import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import decryptData from "../../Decrypt";
import axios from "axios";
import { API } from "../../Host";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PublicUserInfoSchema = yup.object().shape({
  public_user_name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits"),
  email: yup
    .string()
    .required("Email id is required")
    .email("Invalid email format"),
  address: yup.string().required("Address is required"),
  pincode: yup
  .string()
  .required("Pincode is required")
  .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
});
const passwordSchema = yup.object().shape({
    old_password: yup.string().required("Old password is required"),
    login_password: yup
      .string()
      .required("Confirm password is required")
      .test("passwords-match", "New password and confirm password must match", function(value) {
        const newPassword = this.parent.new_password;
        return newPassword === value;
      }),
  });


const Profile = () => {
  const code = sessionStorage.getItem("code");
  const token = sessionStorage.getItem("token");
  const [autoFillData, setAutoFillData] = useState(null);
  const [data, setData] = useState({});
  const [isPassword, setIsPassword] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(PublicUserInfoSchema),
    mode: "onBlur",
  });

  const {
    register: registerPassword,
    formState: { errors: passwordErrors },
    handleSubmit: handleSubmitPassword,
  } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onBlur",
  });

  useEffect(() => {
 
    const fetchAutoFillData = async() => {
      try {
        const response = await axios.get(
          `${API}/public-user/getbyid?public_user_id=${code}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        const autoFillData = responseData;
        setValue("public_user_name", autoFillData.public_user_name);
        setValue("phone",autoFillData.phone);
        setValue("email", autoFillData.email);
        setValue("address", autoFillData.address);
        setValue("pincode", autoFillData.pincode);
        setAutoFillData(autoFillData);
      } catch (error) {
        setAutoFillData(null);
      }
    }
    fetchAutoFillData();

}, [code]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/user/getbyid?public_user_id=${code}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setData(responseData);
        setValue("user_name", responseData.public_user_name);
        setValue("phone", responseData.phone);
        setIsPassword(responseData.phone)
        setValue("email", responseData.email);
        setValue("address", responseData.address);
        setValue("pincode", responseData.pincode);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [code, setValue]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
    };

    try {
      const response = await axios.post(
        `${API}/user/update?public_user_id=${code}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile Updated Successfully");
        setIsPassword(null)
        navigate("/dashboard");
      } else {
        console.error("Error in posting data", response);
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
    }
  };

  const onChangePassword = async (data) => {
    const formData = {
      ...data,
    };
  
    try {
      const response = await axios.post(
        `${API}/user/userchangepassword?phone=${isPassword}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsPassword(null)
        navigate("/dashboard");
      } else {
        //console.error("Error in posting data", response);
        toast.error(response.data.message); 
      }
    } catch (error) {
       // console.error("Error in posting data", error);
        toast.error("Old Password is wrong");
      }
  };

  return (
    <div className="grid grid-cols-12 gap-3 mx-3 my-4 overflow-y-auto no-scrollbar">
      <div className="md:col-span-6 col-span-12  border w-full px-2 py-3 rounded-lg  bg-white">
        {data && (
          <div className="md:col-span-4 col-span-6 ">
            <div className="flex flex-row justify-center gap-4 items-center my-4">
              <div className="flex mb-3 items-center">
                <p className="text-5xl bg-blue-200 text-gray-600 px-7 py-5 rounded-full">
               
                  {data.public_user_name ? data.public_user_name.slice(0, 1) : "P"}
                </p>
              </div>

              <div className="flex">
                <p className="text-primary font-lexend text-2xl font-medium">
                  {data.public_user_name}
                </p>
              </div>
            </div>
            <div className="md:flex md:justify-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-span-4 my-4 pr-3">
                  <input
                    type="text"
                    id="phone"
                    className="w-full md:w-80 text-start border-2 bg-gray-200 rounded-lg mx-2  px-2 py-2 outline-none text-gray-600"
                    placeholder="Phone Number"
                    {...register("phone")}
                    defaultValue={
                      autoFillData ? autoFillData.public_user_name : ""
                    }
                    readOnly
                  />
                </div>
                <div className="col-span-4 my-4  pr-3 ">
                  <input
                    type="email"
                    id="email"
                    className="w-full md:w-80 text-start border-2 bg-gray-200  rounded-lg mx-2  px-2 py-2 outline-none text-gray-600"
                    placeholder="abc@gmail.com"
                    {...register("email")}
                    readOnly
                  />
                </div>

                <div className="col-span-4  my-4  pr-3">
                  <input
                    type="text"
                    id="user_name"
                    className="w-full md:w-80 text-start border-2 overflow-hidden rounded-lg mx-2  px-2 py-2 outline-none text-gray-700"
                    placeholder="User Name"
                    {...register("user_name")}
                  />
                  {errors.public_user_name && (
                    <p className="text-red-500 text-xs text-start px-2 pt-2">
                      {errors.public_user_name.message}
                    </p>
                  )}
                </div>

                <div className="col-span-4 my-4 pr-3">
                  <input
                    type="text"
                    id="address"
                    className="w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none text-gray-700"
                    placeholder="Address"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs text-start px-2  pt-2">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="col-span-4 my-4 pr-3">
                  <input
                    type="text"
                    id="pincode"
                    className="w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none text-gray-700"
                    placeholder="Pincode"
                    {...register("pincode")}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs text-start px-2  pt-2">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>

                <div className=" text-center my-5">
                  <button
                    type="submit"
                    className=" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 "
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="md:col-span-6 col-span-12 border px-2 py-3  rounded bg-white">
        <div className="md:col-span-4 col-span-12 md:px-12 px-4 pt-6 ">
          <div className=" flex flex-col">
            <div>
              <p className="text-xl font-medium text-primary font-lexend">
                Update Password
              </p>
            </div>
            <div>
              <p className="text-base font-medium text-red-600 mt-4 mb-1">
                Important Note:
              </p>
            </div>
            <div>
              <p className="text-sm font-normal text-gray-400">
                Password must contain 1 Capital Letter, 1 Number,1 special
                Character and it should contain 9 letter
              </p>
            </div>
            <div>
              <p className="text-xs font-normal text-gray-400 mt-2">
                Example: Pass@1234
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex md:justify-center mt-8">
        <form onSubmit={handleSubmitPassword(onChangePassword)}>
       
          <div className="col-span-4 my-4  px-3">
            <input
              type="password"
              id="old_password"
              className="w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none"
              placeholder="Old Password"
              {...registerPassword("old_password")}
            />
            {passwordErrors.old_password && (
                <p className="text-red-500 text-xs text-start px-2 pt-2">
                  {passwordErrors.old_password.message}
                </p>
              )}
          </div>

          <div className="col-span-4 my-4  px-3">
            <input
              type="password"
              id="new_password"
              className="w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none"
              placeholder="New Password"
              {...registerPassword("new_password")}
            />
          </div>

          <div className="col-span-4 my-4  px-3">
            <input
              type="password"
              id="login_password"
              className="w-full md:w-80 text-start border-2  rounded-lg mx-2  px-2 py-2 outline-none"
              placeholder="Confirm Password"
              {...registerPassword("login_password")}
            />
            {passwordErrors.login_password && (
                <p className="text-red-500 text-xs text-start px-2 pt-2">
                  {passwordErrors.login_password.message}
                </p>
              )}
          </div>

          <div className=" text-center my-6 sm:py-5">
            <button
              type="submit"
              className=" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 "
            >
              Change Password
            </button>
          </div>
      
        </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;