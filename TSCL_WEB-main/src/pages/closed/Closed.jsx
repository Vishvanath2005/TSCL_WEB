import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { API, formatDate } from "../../Host";
import axios from "axios";
import logo from "../../assets/images/logo1.png";
import { FaPlus } from "react-icons/fa6";
import decryptData from "../../Decrypt";
import DateRangeComp from "../../components/DateRangeComp";
import { toast } from "react-toastify";

const Closed = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [status, setStatus] = useState([]);
  const [statusColors, setStatusColors] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [report, setReport] = useState([]);
  const [grievanceImages, setGrievanceImages] = useState({});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const token = sessionStorage.getItem("token");
  const code = sessionStorage.getItem("code");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/new-grievance/getbyidstatus?public_user_id=${code}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);

        const sortedData = responseData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const filteredByDate = sortedData.filter((report) => {
          const reportDate = new Date(report.createdAt);
          if (fromDate && reportDate < new Date(fromDate)) return false;
          if (toDate && reportDate > new Date(toDate)) return false;
          return true;
        });

        const filteredCenters = filteredByDate.filter((report) =>
          Object.values(report).some((value) =>
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );

        setReport(filteredByDate);
        setTotalPages(Math.ceil(filteredCenters.length / itemsPerPage));
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;

        setCurrentItems(filteredCenters.slice(firstIndex, lastIndex));
      })
      .catch((error) => {
        console.error(error);
      });
    fetchActiveStatus();
  }, [searchValue, currentPage, itemsPerPage, fromDate, toDate]);

  const fetchActiveStatus = async () => {
    try {
      const response = await axios.get(`${API}/status/getactive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      const colorMapping = responseData.reduce((acc, status) => {
        acc[status.status_name] = status.color;
        return acc;
      }, {});

      setStatus(responseData);
      setStatusColors(colorMapping);
    } catch (err) {
      console.error("Error fetching existing ActiveStatus:", err);
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); 
  }

  const handleDateRangeChange = (range) => {
    const { startDate, endDate } = range[0];
    setFromDate(startDate);
    setToDate(endDate);
    toast.success("Date filtered applied!");
  };

  return (
    <div className="overflow-y-auto z-10 no-scrollbar">
      <div className="font-lexend h-screen">
        <div className="bg-white h-4/5 mx-3 rounded-lg mt-5 p-3">
          <div className="flex justify-between gap-6 mt-1.5 mx-3">
            <div className="flex items-center flex-wrap gap-3">
              <p className="text-lg font-semibold whitespace-nowrap">
                View Closed
              </p>
              <div className="flex items-center gap-3 border-2 w-fit py-1.5 rounded-lg border-primary pr-3 mx-3">
                <DateRangeComp onChange={handleDateRangeChange} />
              </div>
              <div className="border-2 h-fit border-blue-700 px-2 py-1 flex gap-3 rounded-lg">
                <label
                  htmlFor="itemsPerPage"
                  className="font-medium text-gray-600"
                >
                  Page Entries:
                </label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="p-1 outline-none h-fit w-fit border bg-blue-500 text-white text-sm rounded-lg px-2"
                >
                  {[5, 10, 20, 50].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-x-auto no-scrollbar flex justify-center">
            <div className="w-full overflow-y-auto max-h-[540px]">
              <table className="w-full mt-3 ">
                <thead className="border-b border-gray-300">
                  <tr>
                    {[
                      "Complaint No",
                      "Date and Time",
                      "Origin",
                      "Raised by",
                      "Department",
                      "Assigned JE",
                    ].map((header) => (
                      <th
                        key={header}
                        className="items-center font-lexend font-semibold whitespace-nowrap"
                      >
                        <p className="mx-1.5 my-2 flex gap-2 items-center">
                          {header} <RiExpandUpDownLine />
                        </p>
                      </th>
                    ))}
                    <th className="text-center font-semibold py-2">
                      <p className="mx-7 my-2 flex gap-2 items-center">
                        Status <RiExpandUpDownLine />
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((report, index) => (
                    <tr
                      key={index}
                      className="border-b overflow-y-auto border-gray-300"
                    >
                      <td>
                        <p
                          className="border-2 w-28 border-black rounded-lg text-center py-1 my-1"
                          onClick={() =>
                            navigate(`/view`, {
                              state: { grievanceId: report.grievance_id },
                            })
                          }
                        >
                          {report.grievance_id}
                        </p>
                      </td>
                      <td className="text-start mx-1.5 my-2 font-lexend text-sm">
                        {formatDate(report.createdAt)}
                      </td>
                      <td className="text-start flex justify-start font-lexend text-sm">
                        <img
                          src={grievanceImages[report.grievance_mode] || logo}
                          alt={report.grievance_mode}
                          className="w-14 h-5 mx-1.5 my-2 rounded-full"
                        />
                      </td>
                      <td className="text-start mx-1.5 my-2 font-lexend text-sm">
                        {report.public_user_name}
                      </td>
                      <td className="text-start mx-1.5 my-2 font-lexend text-sm">
                        {report.dept_name}
                      </td>
                      <td>
                        <p className="text-start mx-1.5 my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {report.assign_username
                            ? report.assign_username
                            : "Yet to be assigned"}
                        </p>
                      </td>
                      <td className="text-center">
                        <p
                          className="border-2 w-28 rounded-full text-center py-1 text-sm mx-2 capitalize"
                          style={{
                            borderColor:
                              statusColors[report.status] || "gray",
                            color: statusColors[report.status] || "black",
                          }}
                        >
                          {report.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-5 mx-7">
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
              Showing{" "}
              <span className="text-gray-700">
                {Math.min((currentPage - 1) * itemsPerPage + 1, report.length)}{" "}
                to{" "}
                {Math.min(currentPage * itemsPerPage, report.length)}{" "}
                of {report.length} entries
              </span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`block px-3 py-2 leading-tight ${
                      currentPage === index + 1
                        ? "text-blue-600 bg-blue-50 border border-blue-300"
                        : "text-gray-500 bg-white border border-gray-300"
                    } hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Closed;
