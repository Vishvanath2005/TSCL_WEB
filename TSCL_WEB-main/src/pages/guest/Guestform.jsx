import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "../../Host";
import axios from "axios";
import { auth } from "../../firebase.config";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import decryptData from "../../Decrypt";
import { useSelector } from "react-redux";
import OtpInput from "otp-input-react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";

const UserInfoSchema = yup.object().shape({
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
});

const GrievanceDetailsSchema = yup.object().shape({
  complaint_type_title: yup.string().required("Complaint  is required"),
  dept_name: yup.string().required("Department is required"),
  zone_name: yup.string().required("Zone is required"),
  ward_name: yup.string().required("Ward is required"),
  street_name: yup.string().required("Street is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  complaint: yup.string().required("Complaint Type is required"),
  complaint_details: yup.string().required("Description is required"),
});

const CombinedSchema = yup
  .object()
  .shape({
    ...UserInfoSchema.fields,
    ...GrievanceDetailsSchema.fields,
  })
  .required();

const Guestform = ({ language }) => {
  const navigate = useNavigate();
  const [autoFillData, setAutoFillData] = useState(null);
  const [files, setFiles] = useState([]);
  const [zone, setZone] = useState([]);
  const [Ward, setWard] = useState([]);
  const [street, setStreet] = useState([]);
  const [department, setDepartment] = useState([]);
  const [complaint, setComplaint] = useState([]);
  const token = sessionStorage.getItem("token");
  const code = sessionStorage.getItem("code");
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSaving, setisSaving] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(CombinedSchema),
    mode: "onBlur",
  });

  const deptName = watch("dept_name");
  const wardName = watch("ward_name");
  const zoneName = watch("zone_name");
  const PhoneNo = watch("phone");

  const Complaint = useSelector((state) => state.complaint);

  useEffect(() => {
    fetchDepartment();
    fetchZone();
  }, []);

  useEffect(() => {
    const fetchAutoFillData = async () => {
      try {
        const response = await axios.get(
          `${API}/public-user/getbyphoneguest?phone=${PhoneNo}`
        );
        const responseData = decryptData(response.data.data);
        const autoFillData = responseData;
        setValue("public_user_name", autoFillData.public_user_name);
        setValue("phone", autoFillData.phone);
        setValue("email", autoFillData.email);
        setValue("address", autoFillData.address);
        setValue("pincode", autoFillData.pincode);
        setAutoFillData(autoFillData);
      } catch (error) {
        setAutoFillData(null);
      }
    };
    fetchAutoFillData();
  }, [PhoneNo]);
  useEffect(() => {
    if (deptName) {
      axios
        .get(`${API}/complaint/getdeptguest?dept_name=${deptName}`)
        .then((response) => {
          try {
            const responseData = decryptData(response.data.data);
            setComplaint(responseData);
          } catch (error) {
            console.error("Error decrypting data:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setComplaint([]);
    }
  }, [deptName]);

  useEffect(() => {
    if (zoneName) {
      axios
        .get(`${API}/ward/getzoneGuest?zone_name=${zoneName}`)
        .then((response) => {
          try {
            const responseData = decryptData(response.data.data);
            setWard(responseData);
          } catch (error) {
            console.error("Error decrypting data:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setWard([]);
    }
  }, [zoneName]);

  useEffect(() => {
    if (wardName) {
      axios
        .get(`${API}/street/getwardguest?ward_name=${wardName}`)
        .then((response) => {
          try {
            const responseData = decryptData(response.data.data);

            setStreet(responseData);
          } catch (error) {
            console.error("Error decrypting data:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setStreet([]);
    }
  }, [wardName]);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${API}/department/getactiveguest`);

      const responseData = decryptData(response.data.data);
      setDepartment(responseData);
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  };

  const fetchZone = async () => {
    try {
      const response = await axios.get(`${API}/zone/getactiveguest`);
      const responseData = decryptData(response.data.data);
      setZone(responseData);
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  };

  const onSubmit = async (data) => {
    const userInfo = {
      public_user_name: data.public_user_name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      pincode: data.pincode,
      login_password: "tscl@123",
      verification_status: "active",
      user_status: "active",
    };

    // const getPriorityFromComplaintType = (complaintTypeTitle) => {
    //   const Complaint = Complaint.data.find(
    //     (complaint) => complaint.complaint_type_title === complaintTypeTitle
    //   );
    //   return complaint ? complaint.priority : null;
    // };

    let public_user_id;
    if (autoFillData) {
      const response = await axios.post(`${API}/public-user/post`, userInfo);
      public_user_id = autoFillData.public_user_id;
    }

    const grievanceDetails = {
      grievance_mode: `website`,
      complaint_type_title: data.complaint,
      dept_name: data.dept_name,
      zone_name: data.zone_name,
      ward_name: data.ward_name,
      street_name: data.street_name,
      pincode: data.pincode,
      complaint: data.complaint_type_title,
      complaint_details: data.complaint_details,
      public_user_id: public_user_id,
      public_user_name: data.public_user_name,
      phone: data.phone,
      status: "new",
      statusflow: "new",
    };
    console.log(data);

    try {
      console.log(data);

      const response1 = await axios.post(
        `${API}/new-grievance/postguest`,
        grievanceDetails
      );
      console.log(response1);

      const grievanceId = await response1.data.data;

      if (response1.status === 200) {
        toast.success("Grievance created Successfully");
        onSignup();
      }
      if (files.length > 0) {
        if (files.length > 5) {
          toast.error("File limit exceeded. Maximum 5 files allowed.");
        } else {
          try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
              formData.append("files", files[i]);
            }
            formData.append("grievance_id", grievanceId);
            formData.append("created_by_user", "admin");
            const response3 = await axios.post(
              `${API}/new-grievance-attachment/post`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (response3.status === 200) {
              setFiles([]);
              toast.success("Attachment created Successfully");
            }
          } catch (error) {
            console.error(error);
            toast.error("Error creating attachment");
          }
        }
      }
      setPhone(data.phone);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during submission. Please try again.");
    }
  };

  const translations = {
    en: {
      grievance_form: "Complaint Form",

      contact_number: "Contact Number:",
      name: "Name:",
      email_id: "Email ID:",
      address: "Address:",
      grievance_details: "2. Grievance Details",
      complaint_type: "Complaint Type:",
      zone: "Zone:",
      department: "Department:",
      ward: "Ward:",
      complaint: "Complaint:",
      street: "Street:",
      pincode: "Pincode:",
      attachment: "Attachment:",
      attachment_note: "(optional / upto 5 files allowed)",
      description: "Description:",
      submit: "Submit",
    },
    ta: {
      grievance_form: "குறை தொடர்பு படிவம்",
      grievance_by: "1. குறையை பதிவு செய்பவர்",
      contact_number: "தொடர்பு எண்:",
      name: "பெயர்:",
      email_id: "மின்னஞ்சல் முகவரி:",
      address: "முகவரி:",
      grievance_details: "2. குறை விவரங்கள்",
      complaint_type: "குறை வகை:",
      zone: "மண்டலம்:",
      department: "துறை:",
      ward: "வார்டு:",
      complaint: "குறை:",
      street: "தெரு:",
      pincode: "அஞ்சல் குறியீடு:",
      attachment: "இணைப்பு:",
      attachment_note: "(விருப்பம் / 5 கோப்புகள் வரை அனுமதிக்கப்படும்)",
      description: "விளக்கம்:",
      submit: "சமர்ப்பிக்கவும்",
    },
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup;
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
  }

  const onSignup = () => {
    // Trim the phone number and check if it's valid

    if (!/^\d{10}$/.test(PhoneNo)) {
      toast.error(
        "Invalid phone number. Please enter a valid 10-digit number."
      );
      return;
    }

    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formattedPh = `+91${PhoneNo}`; // Ensure E.164 format

    console.log("Formatted Phone Number:", formattedPh);

    signInWithPhoneNumber(auth, formattedPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult; // Save confirmation result
        console.log("OTP sent to:", formattedPh);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error during signInWithPhoneNumber:", error);
        toast.error("Failed to send OTP. Please try again.");
      });
  };

  function onVerifyOTP() {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setShowOTP(res.user);
        console.log(res);
        toast.success("Otp verified");
        back();
        setShowOTP(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const back = () => {
    navigate("/");
  };

  return (
    <div className="bg-blue-600 h-full overflow-auto">
      <div className="m-6 overflow-auto no-scrollbar space-y-8">
        <div className="py-2">
          <p className="font-semibold flex justify-between items-center py-2 text-white text-2xl font-roboto">
            <span> {translations.en.grievance_form} </span>
            {/* <div className="flex gap-3 border  items-center px-2.5 rounded-lg"
            onClick={back}>
              <IoArrowBackOutline />
              <p>Back</p>
            </div> */}
          </p>
          <div className="bg-white mt-3 rounded-lg pb-2">
            <div className="border-2 rounded-lg">
              <p className="font-lexend text-xl p-4">Complaint Details</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 mx-10">
                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="phone"
                  >
                    {translations.en.contact_number}
                  </label>
                  <input
                    type="text"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)} // Ensure to set the phone correctly
                    className="w-full text-start border-2 rounded-lg px-2 py-2 outline-none"
                    placeholder="Enter the Contact number"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.phone.message ||
                        "Please enter a valid phone number"}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="public_user_name"
                  >
                    {translations.en.name}
                  </label>
                  <input
                    type="text"
                    id="public_user_name"
                    className="w-full text-start border-2 rounded-lg px-2 py-2 outline-none"
                    placeholder="Enter your Name"
                    {...register("public_user_name")}
                    defaultValue={
                      autoFillData ? autoFillData.public_user_name : ""
                    }
                  />
                  {errors.public_user_name && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.public_user_name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="email"
                  >
                    {translations.en.email_id}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full text-start border-2 rounded-lg px-2 py-2 outline-none"
                    placeholder="abc@gmail.com"
                    {...register("email")}
                    defaultValue={autoFillData ? autoFillData.email : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="address"
                  >
                    {translations.en.address}
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full text-start border-2 rounded-lg px-2 py-2 outline-none"
                    placeholder="Enter your Address"
                    {...register("address")}
                    defaultValue={autoFillData ? autoFillData.address : ""}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 mx-10">
                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="complaint_type_title"
                  >
                    Complaint Type:
                  </label>
                  <input
                    className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-200 outline-none"
                    defaultValue="Individual"
                    placeholder="Individual"
                    {...register("complaint_type_title")}
                  />
                  {errors.complaint_type_title && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.complaint_type_title.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="zone_name"
                  >
                    Zone:
                  </label>
                  <select
                    className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-200 outline-none"
                    defaultValue=""
                    {...register("zone_name")}
                  >
                    <option value="" disabled>
                      Select a Zone
                    </option>
                    {zone &&
                      zone.map((option) => (
                        <option key={option.zone_id} value={option.zone_name}>
                          {option.zone_name}
                        </option>
                      ))}
                  </select>
                  {errors.zone_name && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.zone_name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="dept_name"
                  >
                    Department:
                  </label>
                  <select
                    className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-200 outline-none"
                    defaultValue=""
                    {...register("dept_name")}
                  >
                    <option value="" disabled>
                      Select a Department
                    </option>
                    {department &&
                      department.map((option) => (
                        <option key={option.dept_id} value={option.dept_name}>
                          {option.dept_name}
                        </option>
                      ))}
                  </select>
                  {errors.dept_name && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.dept_name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="ward_name"
                  >
                    Ward:
                  </label>
                  <select
                    className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-200 outline-none"
                    defaultValue=""
                    {...register("ward_name")}
                  >
                    <option value="" disabled>
                      Select a Ward
                    </option>
                    {Ward &&
                      Ward.map((option) => (
                        <option key={option.ward_id} value={option.ward_name}>
                          {option.ward_name}
                        </option>
                      ))}
                  </select>
                  {errors.ward_name && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.ward_name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="complaint"
                  >
                    Complaint:
                  </label>
                  <select
                    className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-200 outline-none"
                    defaultValue=""
                    {...register("complaint")}
                  >
                    <option value="" disabled>
                      Select a Complaint
                    </option>
                    {complaint &&
                      complaint.map((option) => (
                        <option
                          key={option.complaint_id}
                          value={option.complaint_type_title}
                        >
                          {option.complaint_type_title}
                        </option>
                      ))}
                  </select>
                  {errors.complaint && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.complaint.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="street_name"
                  >
                    Street:
                  </label>
                  <select
                    className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-200 outline-none"
                    defaultValue=""
                    {...register("street_name")}
                  >
                    <option value="" disabled>
                      Select a Street
                    </option>
                    {street &&
                      street.map((option) => (
                        <option
                          key={option.street_id}
                          value={option.street_name}
                        >
                          {option.street_name}
                        </option>
                      ))}
                  </select>
                  {errors.street_name && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.street_name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="pincode"
                  >
                    Pincode:
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    className="w-full text-start border-2 rounded-lg px-2 py-2 outline-none"
                    placeholder="Pincode"
                    {...register("pincode")}
                    defaultValue={autoFillData ? autoFillData.pincode : ""}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs text-start pt-2">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 mx-10">
                  <div className="flex flex-col">
                    <label
                      className="block text-black text-lg font-medium mb-2"
                      htmlFor="file"
                    >
                      Attachment:{" "}
                      <p className="text-xs ">
                        (optional / <br /> up to 5 files allowed)
                      </p>
                    </label>
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="file"
                      id="file"
                      multiple
                      className="w-full py-2 px-2 rounded-lg outline-none"
                      // onChange={handleFileChange}
                    />
                    {files.length >= 5 && (
                      <p className="text-red-500 text-sm">
                        Maximum 5 files allowed
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    className="block text-black text-lg font-medium mb-2"
                    htmlFor="complaint_details"
                  >
                    Description:
                  </label>
                  <textarea
                    id="complaint_details"
                    rows="5"
                    className="block py-2.5 pl-3 w-full text-sm text-gray-900 rounded border border-gray-300 focus:outline-none focus:shadow-outline mb-2"
                    placeholder="Description here..."
                    {...register("complaint_details")}
                  ></textarea>
                  {errors.complaint_details && (
                    <p className="text-red-500 text-xs text-start px-2 ">
                      {errors.complaint_details.message}
                    </p>
                  )}
                </div>
              </div>
              <div className=" text-center my-3">
                <button
                  type="submit"
                  className={`my-6 text-white bg-blue-500 rounded-lg px-14 py-2 ${
                    isSaving ? "opacity-50 cursor-not-allowed" : ""
                  } `}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex  text-xl gap-2">
                      <AiOutlineLoading className="h-6 w-6 animate-spin" />
                      <p>Saving....</p>
                    </div>
                  ) : (
                    "Save"
                  )}
                         
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showOTP && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center">
          <div className="bg-white w-fit h-64  font-lexend m-2 mx-5 overflow-auto">
            <div className="flex justify-between mx-3 mt-2 items-center">
              <p className="pt-2 text-lg text-slate-900 pl-5">Verify Otp</p>
              <p className="text-3xl pr-5" onClick={() => setShowOTP(!showOTP)}>
                x
              </p>
            </div>
            <hr className="my-3 w-full" />
            <div className="flex justify-center items-center flex-col">
              <div className=" flex m-10 justify-center items-center gap-4">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disable={false}
                  autoFocus
                  className="otp-input-container"
                />
              </div>
              <button
                onClick={onVerifyOTP}
                className="border w-fit flex justify-center rounded-lg bg-white text-blue-500 font-semibold items-center px-2"
              >
                Verify Otp
              </button>
            </div>
          </div>
        </div>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Guestform;
