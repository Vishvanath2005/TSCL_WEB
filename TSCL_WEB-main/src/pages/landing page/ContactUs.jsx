import React, { useRef, useState } from "react";
import MsclMain1 from "../../assets/images/Msclmain1.png";
import emailjs, { send } from '@emailjs/browser';

const ContactUs = ({ language }) => {
  // const [result, setResult] = useState("");
  
  // const form = useRef();

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm('service_l6lwwmj', 'template_jfc7h4u', form.current, {
  //       publicKey: 'qLaknDPSe6_-9XrqW',
  //     })
  //     .then(
  //       () => {
  //         console.log('SUCCESS!');
  //       },
  //       (error) => {
  //         console.log('FAILED...', error.text);
  //       },
  //     );
  // };


  const translations = {
    en: {
      title: "Enquiry Form",
      name: "Name",
      phonenumber: "Phone number",
      emailid: "Email Id",
      subject: "Subject",
      messages: "Messages",
      submit: "Submit",
    },
    ta: {
      title: "வினவல் படிவம்",
      name: "பெயர்",
      phonenumber: "தொலைபேசி எண்",
      emailid: "மின்னஞ்சல் அடைவு",
      subject: "பொருள்",
      messages: "செய்திகள்",
      submit: "அனுப்பவும்",
    },
  };

//web3form

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   setResult("Sending....");
  //   const formData = new FormData(event.target);

  //   formData.append("access_key", "55310bf5-51b7-4e9e-a138-ed59fa21be1e");

  //   const response = await fetch("https://api.web3forms.com/submit", {
  //     method: "POST",
  //     body: formData
  //   });

  //   const data = await response.json();

  //   if (data.success) {
  //     setResult("Form Submitted Successfully");
  //     event.target.reset();
  //   } else {
  //     console.log("Error", data);
  //     setResult(data.message);
  //   }
  // };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      {/* Image Section */}
      <div className="w-full  lg:w-2/5 md:w-4/5 mb-6 md:mb-0 lg:mx-6 md:mx-2">
        <img src={MsclMain1} alt="Madurai Image" />
      </div>

      {/* Form Section */}
      <div className="w-full  lg:w-1/2 md:w-2/4 lg:mx-6 md:mx-2">
        <div className="my-8 font-roboto">
          <p className="text-lg font-medium my-2">{translations[language].title}</p>
          <hr />
        </div>
        <form className="grid gap-4" 
        // ref={form} onSubmit={sendEmail}
        >
          <input
            type="text"
            name="name"
            placeholder={translations[language].name}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder={translations[language].phonenumber}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder={translations[language].emailid}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="subject"
            placeholder={translations[language].subject}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows={5}
            name="message"
            placeholder={translations[language].messages}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" 
          // value={send}
           className="place-self-end  bg-[#21409A] px-10 py-2 text-white text-sm rounded-md">
            {translations[language].submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;