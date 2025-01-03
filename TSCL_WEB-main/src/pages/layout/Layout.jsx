import React, { useState, Suspense } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { TiLockClosed } from "react-icons/ti";
import { TbFileReport } from "react-icons/tb";
import Header from "../layout/Header";
import logo from "../../assets/images/logo1.png";

const Layout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [submenuopen, Setsubmenuopen] = useState(false);
 
  const Menus = [
   
    { title: "My Report", icon: <TbFileReport />, to: "/report" },
    { title: "Closed", icon: <TiLockClosed />, to: "/closed" },
   
  ];
  


  return (
    <div className="w-full h-screen relative  md:flex">
    
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
            Public-User Panel
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
