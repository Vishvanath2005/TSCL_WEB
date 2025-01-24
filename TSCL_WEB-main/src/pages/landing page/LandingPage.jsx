import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo1.png";
import MsclMain from "../../assets/images/Msclmain.png";
import { TbBulb } from "react-icons/tb";
import { GrLogin } from "react-icons/gr";
import { FiFile } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";
import ContactUs from "./ContactUs";
import Terms from "./Terms";
import PrivacyPolicy from "./PrivacyPolicy";
import { Link, useNavigate } from "react-router-dom";
import GrievancesForm from "../grievances/GrievancesForm";
import Guestform from "../guest/Guestform";

const LandingPage = () => {
  const [language, setLanguage] = useState("en");
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  const translations = {
    en: {
      title: "Madurai Municipal Corporation",
      home: "Home",
      dashboard: "Dashboard",
      contactUs: "Contact Us",
      grievance: "Track Grievance",
      fileGrievance: "File a Grievance",
      officerLogin: "Officer Login",
      stepsTitle: "Simple steps to register your complaint",
      step1: {
        title: "Step 1",
        heading: "Login into Helpline portal",
        description:
          "Login into helpline portal using phone number. Enter the OTP to Login.",
      },
      step2: {
        title: "Step 2",
        heading: "Enter your Grievance",
        description:
          "Click on 'File a Grievance' and describe your grievance in the form.",
      },
      step3: {
        title: "Step 3",
        heading: "Submit the form",
        description:
          "Submit the form. You would receive an acknowledgement message with your unique grievance ID.",
      },
      step4: {
        title: "Step 4",
        heading: "Track your Grievance",
        description:
          "You will be send key updates. You may track your grievance yourself from the cm helpline portal",
      },
      quickLinks: "Quick Links",
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
      contactUs: "Contact us",
      aboutUs: "About us",
      rightsReserved: "All rights reserved © Madurai Municipal Corporation 2025",
    },
    ta: {
      title: "மதுரை ஸ்மார்ட் சிட்டி",
      home: "முகப்பு",
      dashboard: "டாஷ்போர்டு",
      contactUs: "தொடர்பு கொள்ளவும்",
      grievance: "புகார் நிலையை பின்தொடர்க",
      fileGrievance: "புகார் பதிவு செய்யவும்",
      officerLogin: "அதிகாரி உள்நுழைவு",
      stepsTitle: "உங்கள் புகாரை பதிவு செய்ய எளிய வழிமுறைகள்",
      step1: {
        title: "நடைமுறை 1",
        heading: "உதவி மைய தளத்தில் உள்நுழையவும்",
        description:
          "உதவி மைய தளத்தில் உங்கள் தொலைபேசி எண்ணை பயன்படுத்தி உள்நுழையவும். OTPஐ உள்ளிடவும்.",
      },
      step2: {
        title: "நடைமுறை 2",
        heading: "உங்கள் புகாரை உள்ளிடவும்",
        description:
          "'புகார் பதிவு செய்யவும்' கிளிக் செய்து உங்கள் புகாரை விவரிக்கவும்.",
      },
      step3: {
        title: "நடைமுறை 3",
        heading: "படிவத்தை சமர்ப்பிக்கவும்",
        description:
          "படிவத்தை சமர்ப்பிக்கவும். உங்கள் தனிப்பட்ட புகார் ஐடியுடன் உறுதிப்படுத்தல் செய்தி கிடைக்கும்.",
      },
      step4: {
        title: "நடைமுறை 4",
        heading: "உங்கள் புகாரை பின்தொடர்க",
        description:
          "அறிக்கைகள் கிடைக்கும். உங்களுக்கு தானாகவே புகாரை பின்தொடர முடியும்.",
      },

      quickLinks: "விரைவான இணைப்புகள்",
      terms: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
      privacy: "தனியுரிமைக் கொள்கை",
      contactUs: "தொடர்பு கொள்ளவும்",
      aboutUs: "எங்களை பற்றி",
      rightsReserved:
        "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை © மதுரை ஸ்மார்ட் சிட்டி 2025",
    },
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const login = () => {
    navigate(`/login`);
  };

  return (
    <>
      <div className="px-6 font-roboto">
        <header className="fixed top-0 left-0 z-10 w-full bg-white bg-opacity-80 px-4">
          <div className="lg:flex md:flex flex lg:justify-between md:justify-between justify-center items-center lg:flex-nowrap md:flex-nowrap flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt="Madurai city"
                className="lg:size-20 md:size-16 size-12 my-3"
              />
              <h1 className="text-[#21409A] font-bold text-xl">
                {translations[language].title}
              </h1>
            </div>
            <nav className="flex gap-3 font-normal text-lg items-center cursor-pointer">
              <a
                href=""
                onClick={() => handleLinkClick("")}
                className={`lg:px-6 md:px-6 px-2 py-2 rounded-md ${
                  activeLink === "" ? "text-white bg-[#21409A]" : "text-black border"
                }`}
              >
                {translations[language].home}
              </a>
              {/* <a
              
                
                className={`lg:px-6 md:px-6 px-2 py-2 rounded-md ${
                  activeLink === "/gform"
                    ? "text-white bg-[#21409A]"
                    : "text-black border"
                }`}
              >
                <p>File a Grievance</p>
              </a> */}
              <a
                onClick={() => handleLinkClick("/contactus")}
                className={`md:px-6 px-2 text-wrap py-2 rounded-lg ${
                  activeLink === "/contactus"
                    ? "text-white bg-[#21409A]"
                    : "text-black border"
                }`}
              >
                {translations[language].contactUs}
              </a>
              <div className="flex items-center gap-2">
                <BsGlobe />
                <select
                  onChange={handleLanguageChange}
                  value={language}
                  className="px-2 py-1 rounded-lg font-medium border-none bg-transparent"
                >
                  <option value="en">ENG</option>
                  <option value="ta">தமிழ்</option>
                </select>
              </div>
            </nav>
          </div>
        </header>
        {activeLink === "" && (
          <main className="lg:pt-28 md:pt-28 pt-40 lg:space-y-40 md:space-y-48 space-y-28 ">
            <section className="">
              <div className="relative ">
                <img
                  src={MsclMain}
                  alt="Madurai city"
                  className="rounded-[40px]"
                />
                <div className="absolute -translate-y-1/3 left-1/2 transform -translate-x-1/2 lg:grid md:grid flex lg:grid-cols-3 md:grid-cols-3  lg:gap-6 md:gap-6 gap-3 bg-white lg:p-6 md:p-6 p-3 lg:w-4/5 md:w-4/5 w-6/6 justify-center items-center  rounded-xl shadow-md px-2">
                  <button
                    onClick={login}
                    className="lg:px-8 md:px-8 px-1.5 lg:py-8 md:py-8 py-1.5 flex flex-col items-center justify-center gap-1 bg-[#E6D590] rounded-lg lg:h-full md:h-full h-28"
                  >
                    <div className="bg-[#21409A] rounded-full lg:px-4 md:px-4 px-2 lg:py-4 md:py-4 py-2 ">
                      <TbBulb className="lg:size-6 md:size-6 size-4 text-[#E6D590]" />
                    </div>
                    <p>{translations[language].grievance}</p>
                  </button>
                  <button
                    onClick={() => navigate("/whatsappcomplaints")}
                    className="lg:px-8 md:px-8 px-1.5 lg:py-8 md:py-8 py-1.5 flex flex-col items-center justify-center gap-1 bg-[#E6D590] rounded-lg lg:h-full md:h-full  h-28"
                  >
                    <div  className="bg-[#21409A] rounded-full lg:px-4 md:px-4 px-2 lg:py-4 md:py-4 py-2 ">
                      <GrLogin className="lg:size-6 md:size-6 size-4 text-[#E6D590] " />
                    </div>
                    <p>{translations[language].fileGrievance}</p>
                  </button>
                  <a
                    href="https://portal.maduraismartcity.com/"
                    className="lg:px-8 md:px-8 px-1.5 lg:py-8 md:py-8 py-1.5 flex flex-col items-center justify-center gap-1 bg-[#E6D590] rounded-lg lg:h-full md:h-full  h-28"
                  >
                    <button className=" flex-col flex justify-center items-center space-y-1">
                      <div className="bg-[#21409A] rounded-full w-fit lg:px-4 md:px-4 px-2 lg:py-4 md:py-4 py-2 ">
                        <FiFile className="lg:size-6 md:size-6 size-4  text-[#E6D590]" />
                      </div>
                      <p>{translations[language].officerLogin}</p>
                    </button>
                  </a>
                </div>
              </div>
            </section>

            <section className="text-center">
              <h2 className="font-bold text-2xl mb-8">
                {translations[language].stepsTitle}
              </h2>
              <div className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 items-center gap-4 lg:w-4/5 md:w-4/5 mx-auto ">
                <div className=" col-span-2 flex justify-center items-center p-6 bg-[#FFF5CE] rounded-lg">
                  <div className="bg-white shadow-md lg:px-8 md:px-2 px-6 lg:py-10 md:py-10 py-10 text-center w-full space-y-2">
                    <h3 className="font-bold text-xl text-[#21409A] ">
                      {translations[language].step1.title}
                    </h3>
                    <h1 className="font-semibold text-lg">
                      {translations[language].step1.heading}
                    </h1>
                    <p className="text-[#575757] font-normal text-sm">
                      {translations[language].step1.description}
                    </p>
                  </div>
                </div>
                <div className="hidden lg:flex md:flex items-center">
                  <div className="border-t-2 border-dashed border-gray-600 flex-grow "></div>
                  <div className="border-t-[8px] border-b-[8px] border-l-[12px] border-transparent border-l-gray-600"></div>
                </div>
                {/* Vertical Arrow for small screens */}
                <div className="lg:hidden md:hidden flex items-center justify-center lg:w-full md:w-full w-full ">
                  <div className=" flex flex-col items-center">
                    <div className="h-12 border-l-2 border-dashed border-gray-600"></div>
                    <div className="w-0 h-0 border-t-[12px] border-l-[6px] border-r-[6px] border-t-gray-600 border-l-transparent border-r-transparent mt-[-1px]"></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="col-span-2 flex justify-center items-center p-6 bg-[#FFF5CE] rounded-lg">
                  <div className="bg-white shadow-md lg:px-8 md:px-2  px-6 lg:py-10 md:py-10 py-10  text-center w-full space-y-2">
                    <h3 className="font-bold text-xl text-[#21409A]">
                      {translations[language].step2.title}
                    </h3>
                    <h1 className="font-semibold text-lg">
                      {translations[language].step2.heading}
                    </h1>
                    <p className="text-[#575757] font-normal text-sm">
                      {translations[language].step2.description}
                    </p>
                  </div>
                </div>
                <div className="lg:hidden md:hidden flex items-center justify-center lg:w-full md:w-full w-full ">
                  <div className=" flex flex-col items-center">
                    <div className="h-12 border-l-2 border-dashed border-gray-600"></div>
                    <div className="w-0 h-0 border-t-[12px] border-l-[6px] border-r-[6px] border-t-gray-600 border-l-transparent border-r-transparent mt-[-1px]"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="col-span-2 flex justify-center items-center p-6 bg-[#FFF5CE] rounded-lg">
                  <div className="bg-white shadow-md lg:px-8 md:px-2 px-6 lg:py-10 md:py-10 py-10  text-center w-full space-y-2">
                    <h3 className="font-bold text-xl text-[#21409A]">
                      {translations[language].step3.title}
                    </h3>
                    <h1 className="font-semibold text-lg">
                      {translations[language].step3.heading}
                    </h1>
                    <p className="text-[#575757] font-normal text-sm">
                      {translations[language].step3.description}
                    </p>
                  </div>
                </div>

                {/* Vertical or Horizontal Arrow */}

                {/* Horizontal Arrow for large and medium screens */}
                <div className="hidden lg:flex md:flex items-center">
                  <div className="border-t-2 border-dashed border-gray-600 flex-grow"></div>
                  <div className="border-t-[8px] border-b-[8px] border-l-[12px] border-transparent border-l-gray-600"></div>
                </div>
                {/* Vertical Arrow for small screens */}
                <div className=" lg:hidden md:hidden flex items-center justify-center lg:w-full md:w-full w-full">
                  <div className=" flex flex-col items-center">
                    <div className="h-12 border-l-2 border-dashed border-gray-600"></div>
                    <div className="w-0 h-0 border-t-[12px] border-l-[6px] border-r-[6px] border-t-gray-600 border-l-transparent border-r-transparent mt-[-1px]"></div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="col-span-2 flex justify-center items-center p-6 bg-[#FFF5CE] rounded-lg">
                  <div className="bg-white shadow-md lg:px-8 md:px-2 px-6 lg:py-10 md:py-10 py-10  text-center w-full space-y-2">
                    <h3 className="font-bold text-xl text-[#21409A]">
                      {translations[language].step4.title}
                    </h3>
                    <h1 className="font-semibold text-lg">
                      {translations[language].step4.heading}
                    </h1>
                    <p className="text-[#575757] font-normal text-sm">
                      {translations[language].step4.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
        {/* Contact us content */}
        {activeLink === "/contactus" && (
          <main className="lg:pt-28 md:pt-28 pt-44">
            <ContactUs language={language} />
          </main>
        )}
        {/* down navbar contents */}
        {activeLink === "/terms" && (
          <main className="lg:pt-28 md:pt-28 pt-44">
            <Terms language={language} />
          </main>
        )}{" "}
        {activeLink === "/privacy" && (
          <main className="lg:pt-28 md:pt-28 pt-44">
            <PrivacyPolicy language={language} />
          </main>
        )}
      </div>
      <footer className="mt-12   text-white bg-[#21409A] font-roboto ">
        <div className=" py-6 mx-3  space-y-4">
          <div className=" grid grid-cols-2  mx-8 ">
            <div className="sm:col-span-1 col-span-2">
              <p>Phone: 9585912344</p>
              <p>
                E-Mail:{" "}
                <a href="info@maduraismartcity.com">
                  info@maduraismartcity.com
                </a>
              </p>
              <p className="flex flex-col">
                <span>Address: 1255, Madurai Corporation Building,</span>
                <span>
                  {" "}
                  Melur Road, Tallakulam, Madurai, Tamil Nadu, 625020.
                </span>
              </p>
            </div>
            <nav className="sm:items-end items-start sm:col-span-1 col-span-2 flex flex-col  justify-end text-end font-normal text-sm text-[#D9D9D9] py-4 gap-2">
              <button
                onClick={() => handleLinkClick("/terms")}
                className="text-left hover:underline"
              >
                {translations[language]?.terms || "Terms and Conditions"}
              </button>
              <button
                onClick={() => handleLinkClick("/privacy")}
                className="text-left hover:underline"
              >
                {translations[language].privacy}
              </button>
              <button
                onClick={() => handleLinkClick("/contactus")}
                className="text-left hover:underline"
              >
                {translations[language].contactUs}
              </button>
            </nav>
          </div>
          <hr className="border-[#8C8C8C] border-0.5 mr-2" />
          <p className="text-white py-3 text-center text-sm font-normal">
            {translations[language].rightsReserved}
          </p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
