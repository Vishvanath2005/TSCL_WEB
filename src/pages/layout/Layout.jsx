import React, { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { SiAwsorganizations } from "react-icons/si";
import { RxHome } from "react-icons/rx";
import { FaMapLocationDot } from "react-icons/fa6";
import { TiLockClosed } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { GoOrganization } from "react-icons/go";
import { MdOutlineContactSupport } from "react-icons/md";
import { BsShieldExclamation } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuUserCircle2 } from "react-icons/lu";
import { TbFileReport } from "react-icons/tb";
import Header from "../layout/Header";
import logo from "../../assets/images/logo1.png";

const Layout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [submenuopen, Setsubmenuopen] = useState(false);
 
  const Menus = [
    // { title: "Dashboard", icon: <RxHome />, to:"/dashboard"},
    // { title: "Organization", icon: <GoOrganization />, to: "/organization" },
    // { title: "Department", icon: <SiAwsorganizations />, to: "/department" },
    // {
    //   title: "Locality",
    //   icon: <FaMapLocationDot />,
    //   submenu: true,
     
    //   submenuItems: [
    //     { title: "Zone", to: "/zone" },
    //     { title: "Ward", to: "/ward" },
    //     { title: "Street", to: "/street"},
    //   ],
    // },
    // { title: "Complaint", icon: <MdOutlineContactSupport />, to: "/complaint" },
    // { title: "Complaint Type", icon: <LuUserCircle2 />, to: "/complainttype" },
    // { title: "Grievances", icon: <BsShieldExclamation />, to: "/grievances" },
    { title: "My Report", icon: <TbFileReport />, to: "/report" },
    { title: "Closed", icon: <TiLockClosed />, to: "/closed" },
    // { title: "Public User", icon: <LuUserCircle2 />, to: "/user" },
    // { title: "Setting", icon: <IoMdSettings />, to: "/setting" },
   
  ];
  


  return (
    <div className="w-full h-screen relative z-0 md:flex">
    
      <div
        className={` md:relative md:grid md:grid-rows-12 absolute   transition-all duration-100 ${
          open ? "md:w-1/6 w-3/6 h-screen bg-primary" : "md:w-1/12 md:bg-primary"
        }`}
      >
        <TiThMenu
          className={`absolute top-4 right-2 cursor-pointer transition-transform text-2xl ${open ? "text-white " : "md:text-white text-black "}  `}
          onClick={() => setOpen(!open)}
          fontSize="small"
        />

        <span className="row-span-2 flex flex-col items-center gap-6 mt-3 mb-2">
          <img
            src={logo}
            alt="Image"
            className={`transition-all duration-500 ${
              open ? "w-20 h-20 mt-1" : "md:w-14 md:h-14 md:mt-12 md:mr-5 w-9 h-9 mr-10"
            }`}
          />
          <h1
            className={`text-xl text-white font-alegerya transition-opacity duration-500 ${
              !open && "opacity-0"
            }`}
          >
            Admin Panel
          </h1>
        </span>

        <div className="row-span-10 mt-4 ">
          <ul className="pt-2">
            {Menus.map((menu, index) => (
              <React.Fragment key={index} >
                <NavLink to={menu.to}> 
                  <li
                    className={` cursor-pointer text-md flex items-center gap-x-3 p-2 mt-1 pl-3 transition-all duration-700 hover:bg-gray-200 hover:text-primary  ${
                      location.pathname === menu.to 
                        ? `${ open ?  "bg-gray-200 text-primary transition-all duration-500" : "md:bg-gray-200 md:text-primary md:transition-all md:duration-500 duration-75"}`
                        : "text-white  "
                    }`}
                  
                  >
                    <div className="flex items-center gap-x-2">
                      <span
                        className={`md:block md:float-left ${
                          open ? "md:text-2xl" : "md:text-3xl md:ml-3 md:opacity-100 opacity-0"
                        }`}
                      >
                        <div className="">{menu.icon}</div>
                      </span>
                      <span
                        className={`font-alegerya text-base flex-1 duration-300 ${
                          !open && "hidden"
                        }`}
                      >
                        {menu.title}
                      </span>
                    </div>

                    {menu.submenu && open && (
                      <BsChevronDown
                        className={`cursor-pointer transition-transform delay-100  ${
                          submenuopen && "rotate-180"
                        }`}
                        onClick={() => Setsubmenuopen(!submenuopen)}
                      />
                    )}
                  </li>
                </NavLink>
                {menu.submenu && submenuopen && open && (
                  <ul>
                    {menu.submenuItems.map((submenuitem, subIndex) => (
                      <NavLink to={submenuitem.to} key={subIndex}>
                        <li
                          className={` cursor-pointer font-alegerya text-sm flex items-center gap-x-2 p-2 pl-20 hover:bg-gray-200 hover:text-primary ${
                            location.pathname === submenuitem.to
                              ? "bg-gray-200 text-primary "
                              : "text-white"
                          }`}
                        >
                          {submenuitem.title}
                        </li>
                      </NavLink>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`flex flex-col bg-blue-100  no-scrollbar h-screen transition-all duration-300 overflow-hidden ${
          open ? "md:w-5/6 sm:w-full" : "md:w-11/12 sm:w-full"
        }`}
      >
        <Header />
        <Suspense >
          <Outlet />
        </Suspense>
      </div>

    </div>
  );
};

export default Layout;
