import React, { Fragment, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { API, formatDate } from "../../Host";
import decryptData from "../../Decrypt";
import axios from "axios";

const Grivences = () => {
  const [isModal, setIsModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [grievance, setGrievance] = useState([]);
  const token = sessionStorage.getItem('token'); 
  const navigate = useNavigate();
  const handleform = () => {
    navigate("/form");
  };
 

  useEffect(() => {
    axios
      .get(`${API}/new-grievance/get`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((response) => {
        const responseData = decryptData(response.data.data)
        setGrievance(responseData);

        const filteredCenters = responseData.filter((grievances) =>
          Object.values(grievances).some((value) =>
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );

        setTotalPages(Math.ceil(filteredCenters.length / itemsPerPage));
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;

        setCurrentItems(filteredCenters.slice(firstIndex, lastIndex));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchValue, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredCenters = grievance.filter((grievances) =>
    Object.values(grievances).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const currentItemsOnPage = filteredCenters.slice(firstIndex, lastIndex);

  return (
    <Fragment>
      <div className="  bg-blue-100 overflow-y-auto no-scrollbar">
        <div className="h-screen">
          <div className="flex flex-row  gap-3 p-2 mt-3 mx-8 flex-wrap md:justify-end ">
            
              <p className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full">
                <IoMdSearch className="text-xl" />
                <input
                type="search"
                className="outline-none bg-transparent text-base"
                placeholder="Search Grievances"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              </p>
              <a href="#">
                <button className="flex gap-2 items-center border-2 font-lexend border-blue-500 bg-slate-100 text-blue-500 rounded-full px-3 py-1.5 justify-center">
                  {" "}
                  <FaPlus />
                  Bulk Upload
                </button>
              </a>
              <a href="#">
                <button className="flex gap-2 items-center border-2 font-lexend bg-slate-100 text-black rounded-full px-3  py-1.5 w-28 justify-between">
                  {" "}
                  CSV <RiArrowDropDownLine />
                </button>
              </a>
           
          </div>
          <div className="flex flex-row  gap-1 justify-between items-center my-2 mx-8 flex-wrap">
          <h1 className="md:text-xl text-lg font-medium whitespace-nowrap"> New Grievances</h1>
             
                <button
                  className="flex flex-row-2 gap-2 items-center border-2 bg-blue-500 text-white font-lexend rounded-full p-2.5 w-fit justify-between md:text-base text-sm"
                  onClick={handleform}
                >
                  <FaPlus /> Add Grievances
                </button>
           
           
          </div>
          <div className="bg-white mx-4 rounded-lg my-3 py-3 overflow-x-auto h-3/5 no-scrollbar ">
            <table className="w-full  ">
              <thead>
                <tr className="border-b-2 border-gray-300 ">
                  <th className="">
                  <p className=" mx-6 my-2 font-lexend font-semibold whitespace-nowrap">
                      # 
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Name <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                     Phone <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Origin
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Complaint type
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Complaint
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                
                 
                  
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-3  my-2 font-lexend font-semibold whitespace-nowrap">
                      Department
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                 
                  <th>
                    <p className="mx-3 my-3 font-lexend font-semibold whitespace-nowrap">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
              {currentItemsOnPage.map((grievances, index) => (
                <tr className="border-b-2 border-gray-300" key={index}>
                  <td className="">
                    <div className="text-center text-sm mx-3 my-2 font-lexend whitespace-nowrap">
                    {firstIndex + index + 1 < 10
                            ? `0${firstIndex + index + 1}`
                            : firstIndex + index + 1}
                    </div>
                  </td>
                  <td>
                    <div className=" mx-3  my-3 font-lexend whitespace-nowrap text-start text-sm">
                     {grievances.public_user_name}
                    </div>
                  </td>
                  <td>
                    <div className=" mx-3  my-3  font-lexend whitespace-nowrap text-start text-sm">
                    {grievances.phone}
                    </div>
                  </td>
                  <td>
                    <div className=" mx-3  my-3 font-lexend whitespace-nowrap text-start text-sm">
                    {grievances.grievance_mode}
                    </div>
                  </td>
                  <td>
                    <div className=" mx-3  my-3 font-lexend whitespace-nowrap  text-start text-sm">
                    {grievances.complaint}
                    </div>
                  </td>
                  <td>
                    <div className=" mx-3  my-3 font-lexend whitespace-nowrap text-start text-sm">
                    {grievances.complaint_type_title}
                    </div>
                  </td>
                  <td>
                    <div className=" mx-3  my-2 font-lexend whitespace-nowrap text-start text-sm">
                    {grievances.dept_name}
                    </div>
                  </td>
                  {/* <td>
                    <div className="flex gap-2 items-center mx-3  my-2 font-lexend whitespace-nowrap justify-center">
                    {grievances.zone_name}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center mx-3  my-2 font-lexend whitespace-nowrap justify-center">
                    {grievances.ward_name}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center mx-3  my-2 font-lexend whitespace-nowrap justify-center">
                    {grievances.street_name}
                    </div>
                  </td> */}
                 
                  <td>
                    <div className="mx-3 my-3 whitespace-nowrap" onClick={() =>
                      navigate(`/viewreport`, {
                        state: { grievanceId: grievances.grievance_id }
                      })}>
                      <BsThreeDotsVertical />
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" my-3 mb-5 mx-7">
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center pt-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
                Showing{" "}
                <span className="text-gray-700">
                  {firstIndex + 1} to {Math.min(lastIndex, grievance.length)}
                </span>{" "}
                of{" "}
                <span className="text-gray-900">
                  {grievance.length} entries
                </span>
              </span>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya">
                <li>
                  <button
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg hover:bg-paginate-bg hover:text-primary-hover"
                  >
                    &lt;&lt;
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover"
                  >
                    Back
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, currentPage - 2),
                    Math.min(totalPages, currentPage + 1)
                  )
                  .map((number) => (
                    <li key={number}>
                      <button
                        onClick={() => paginate(number)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br hover:text-white hover:bg-primary ${
                          currentPage === number
                            ? "bg-primary text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {number}
                      </button>
                    </li>
                  ))}

                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={lastIndex >= filteredCenters.length}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br hover:bg-paginate-bg hover:text-primary-hover"
                  >
                    Next
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg hover:bg-paginate-bg hover:text-primary-hover"
                  >
                    &gt;&gt;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Grivences;
