import React, { useState } from "react";
import Logo from "../../assets/images/logo1.png";
import MsclMain from "../../assets/images/mscl_home.jpg";
import { TbBulb } from "react-icons/tb";
import { GrLogin } from "react-icons/gr";
import { FiFile } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";
import ContactUs from "./ContactUs";
import Terms from "./Terms";
import PrivacyPolicy from "./PrivacyPolicy";
import AboutUs from "./AboutUs";
import { Link, useNavigate } from "react-router-dom";
const LandingPage = () => {
  const [language, setLanguage] = useState("en");
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  const translations = {
    en: {
      title: "Madurai Smart City",
      home: "Home",
      // dashboard: "Dashboard",
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
      rightsReserved: "All rights reserved © Madurai Smart City 2025",
    },
    ta: {
      title: "மதுரை ஸ்மார்ட் சிட்டி",
      home: "முகப்பு",
      // dashboard: "டாஷ்போர்டு",
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

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="mx-auto  px-6 font-roboto no-scrollbar">
        <header className="fixed top-0 left-0 z-10 w-full bg-white bg-opacity-80 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Madurai city" className="size-20 " />
              <h1 className="text-[#21409A] font-bold text-xl my-4">
                {translations[language].title}
              </h1>
            </div>
            <nav className="flex gap-2 font-normal text-lg items-center cursor-pointer">
              <a
                href=""
                onClick={() => handleLinkClick("")}
                className={`px-6 py-2 rounded-md ${
                  activeLink === "" ? "text-white bg-[#21409A]" : "text-black"
                }`}
              >
                {translations[language].home}
              </a>
              {/* <a
                onClick={() => handleLinkClick("/")}
                className={`px-6 py-2 rounded-lg ${
                  activeLink === "/" ? "text-white bg-[#21409A]" : "text-black"
                }`}
              >
                {translations[language].dashboard}
              </a> */}
              <a
                onClick={() => handleLinkClick("/contactus")}
                className={`px-6 py-2 rounded-lg ${
                  activeLink === "/contactus"
                    ? "text-white bg-[#21409A]"
                    : "text-black"
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

        {/* homepage content */}
        {activeLink === "" && (
          <main className="pt-20 space-y-40 ">
            <section className="relative   ">
              <div>
                <img src={MsclMain} alt="Madurai city" className="rounded-md" />
                <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-6 bg-white p-6 w-4/5 rounded-xl shadow-md">
                  <button
                    onClick={login}
                    className="px-8 py-8 flex flex-col items-center justify-center gap-2 bg-[#E6D590] rounded-lg"
                  >
                    <div className="bg-[#21409A] rounded-full px-4 py-4 ">
                      <TbBulb className="size-6 text-[#E6D590]" />
                    </div>
                    <p>{translations[language].grievance}</p>
                  </button>
                  <button
                    onClick={login}
                    className="px-8 py-8 flex flex-col items-center justify-center gap-2 bg-[#E6D590] rounded-lg"
                  >
                    <div className="bg-[#21409A] rounded-full px-4 py-4 ">
                      <GrLogin className="size-6 text-[#E6D590] " />
                    </div>
                    <p>{translations[language].fileGrievance}</p>
                  </button>
                  <a
                    href="https://portal.maduraismartcity.com/"
                    className="px-8 py-8 flex flex-col items-center justify-center gap-2 bg-[#E6D590] rounded-lg"
                  >
                    <button>
                      <div className="bg-[#21409A] items-center rounded-full px-4 mx-5 my-2 w-fit py-4 ">
                        <FiFile className="size-6 text-[#E6D590]" />
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
              <div className="grid grid-cols-5 items-center gap-4 w-4/5 mx-auto ">
                {/* Step 1 */}
                <div className="col-span-2 flex justify-center items-center p-6 bg-[#FFF5CE] rounded-lg">
                  <div className="bg-white shadow-md px-8 py-10 text-center w-full space-y-2">
                    <h3 className="font-bold text-xl text-[#21409A]">
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

                {/* Arrow */}
                <div className="flex items-center ">
                  <div className="border-t-2 border-dashed border-gray-600 flex-grow ml-6"></div>
                  <div className="border-t-[8px] border-b-[8px] border-l-[12px] border-transparent border-l-gray-600"></div>
                </div>

                {/* Step 2 */}
                <div className="col-span-2 flex justify-center items-center p-6 bg-[#FFF5CE] rounded-lg">
                  <div className="bg-white shadow-md px-8 py-10 text-center w-full space-y-2">
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

                {/* Dotted Downward Arrow */}
                <div className="col-span-6  flex flex-col px-52 items-end">
                  <div className="h-16 border-l-2 border-dashed border-gray-600 px-[2.4px]"></div>
                  <div className="w-0 h-0 border-t-[12px] border-l-[6px] border-r-[6px] border-t-gray-600 border-l-transparent border-r-transparent mt-[-1px]"></div>
                </div>

                {/* Step 4 */}
                <div className="col-span-2 flex justify-center items-center p-6 bg-[#FFF5CE] rounded-lg">
                  <div className="bg-white shadow-md px-8 py-10 text-center w-full space-y-2">
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

                {/* Reverse Arrow */}
                <div className="flex items-center rotate-180 ml-6 ">
                  <div className="border-t-2 border-dashed border-gray-600 flex-grow "></div>
                  <div className="border-t-[8px] border-b-[8px] border-l-[12px] border-transparent border-l-gray-600 "></div>
                </div>

                {/* Step 3 */}
                <div className="col-span-2 flex justify-center items-center px-6 py-3 bg-[#FFF5CE] rounded-lg">
                  <div className="bg-white shadow-md px-8 py-10 text-center w-full space-y-2">
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
              </div>
            </section>
          </main>
        )}

        {/* Contact us content */}
        {activeLink === "/contactus" && (
          <main className="pt-20">
            <ContactUs language={language} />
          </main>
        )}
        {/* down navbar contents */}
        {activeLink === "/terms" && (
          <main className="pt-20">
            <Terms language={language} />
          </main>
        )}
        {activeLink === "/privacy" && (
          <main className="pt-20">
            <PrivacyPolicy language={language} />
          </main>
        )}
        {activeLink === "/aboutus" && (
          <main className="pt-20">
            <AboutUs language={language} />
          </main>
        )}
      </div>
      <footer className="mt-12   text-white bg-[#21409A] font-roboto ">
        <div className=" py-6 mx-3  space-y-4">
         
          <div className=" grid grid-cols-2  mx-8 ">
            <div className="col-span-1">
              <p>Phone: 9585912344</p>
              <p>
                E-Mail:{" "}
                <a href="info@maduraismartcity.com">
                  info@maduraismartcity.com
                </a>
              </p>
              <p className="flex flex-col">
                <span>Address: 1255, Madurai Corporation Building,</span>
                <span> Melur Road, Tallakulam, Madurai, Tamil Nadu, 625020.</span>
              </p>
            </div>
            <nav className="items-end col-span-1 flex flex-col justify-end text-end font-normal text-sm text-[#D9D9D9] py-4">
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
          <p className="text-[#8B8B8B] py-3 text-center text-sm font-normal">
            {translations[language].rightsReserved}
          </p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
