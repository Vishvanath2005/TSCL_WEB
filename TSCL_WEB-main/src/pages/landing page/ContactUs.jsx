import React, { useState } from "react";
import MsclMain1 from "../../assets/images/Msclmain1.png";

const ContactUs = ({ language }) => {
  const translations = {
    en: {
      name: "Name",
      phonenumber: "Phone number",
      emailid: "Email Id",
      subject: "Subject",
      messages: "Messages",
      submit: "Submit",
    },
    ta: {
      name: "பெயர்",
      phonenumber: "  தொலைபேசி எண்",
      emailid: "மின்னஞ்சல் அடைவு ",
      subject: "பொருள்",
      messages: "செய்திகள் ",
      submit: "அனுப்பவும் ",
    },
  };

  return (
    <div className="flex justify-between items-center">
      <div className="w-2/5 mx-6">
        <img src={MsclMain1} alt="Madurai Image"/>
      </div>
      <div className="w-1/2 mx-6">
      <p className="text-center font-semibold text-blue-600 text-xl">Contact Us</p>
      <p className=" my-3 font-semibold">Enquries Form</p>
        <form className="grid gap-5">
          <input
            type="text"
            placeholder={translations[language].name}
            className="border border-[#B5ADAD] px-6 py-3 rounded-lg"
          />
          <input
            type="text"
            placeholder={translations[language].phonenumber}
            className="border border-[#B5ADAD] px-6 py-3 rounded-lg"
          />
          <input
            type="email"
            placeholder={translations[language].emailid}
            className="border border-[#B5ADAD] px-6 py-3 rounded-lg"
          />
          <input
            type="text"
            placeholder={translations[language].subject}
            className="border border-[#B5ADAD] px-6 py-3 rounded-lg"
          />
          <textarea
            rows={5}
            placeholder={translations[language].messages}
            className="border border-[#B5ADAD] px-6 py-3 rounded-lg"
          />
          <button className="place-self-end  bg-[#21409A] px-10 py-2 text-white text-sm rounded-md">
            {translations[language].submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
