import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { API, formatDate } from "../../Host";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import decryptData from "../../Decrypt";

const Report = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [statusColors, setStatusColors] = useState({});
  const [status, setStatus] = useState([]);
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const token = sessionStorage.getItem("token");
  const code = sessionStorage.getItem("code");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
    fetchActiveStatus();
  }, [searchValue, currentPage, itemsPerPage, selectedStatus]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API}/new-grievance/getbyuserid?public_user_id=${code}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const responseData = decryptData(response.data.data);
      setReport(responseData);

      const filteredReports = responseData.filter((report) => {
        const statusMatch =
          selectedStatus === "All" || report.status === selectedStatus;

        return (
          statusMatch &&
          Object.values(report).some((value) =>
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      });

      setTotalPages(Math.ceil(filteredReports.length / itemsPerPage));
      const lastIndex = currentPage * itemsPerPage;
      const firstIndex = lastIndex - itemsPerPage;

      setCurrentItems(filteredReports.slice(firstIndex, lastIndex));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reports.");
      setIsLoading(false);
    }
  };

  const fetchActiveStatus = async () => {
    try {
      const response = await axios.get(`${API}/status/getactive`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseData = decryptData(response.data.data);
      const colorMapping = responseData.reduce((acc, status) => {
        acc[status.status_name] = status.color;
        return acc;
      }, {});

      setStatus(responseData);
      setStatusColors(colorMapping);
    } catch (err) {
      console.error("Error fetching active statuses:", err);
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
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="font-lexend h-screen">
        <div className="flex justify-between items-center my-2 mx-8 gap-1 flex-wrap">
          <h1 className="md:text-xl text-lg font-bold">Dashboard</h1>
          <div className="flex items-center gap-3 mx-3">
            <label htmlFor="itemsPerPage" className="font-medium text-gray-600">
              Page Entries
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="p-1 outline-none text-sm rounded px-2"
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <button
            className="flex  flex-row-2 gap-2 font-medium font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-2 px-3 justify-between md:text-base text-sm"
            onClick={() =>
              navigate(`/form`, {
                state: { grievanceId: report.grievance_id },
              })
            }
          >
            <FaPlus /> Add Report
          </button>
        </div>

        <div className="bg-white h-4/5 mx-3 rounded-lg p-3">
          <div className="flex justify-between items-center gap-6 mt-2 mx-3">
            <p className="text-lg whitespace-nowrap">View Report</p>
            <select
              className="block w-fit px-1 py-2 text-center text-sm bg-primary text-white border border-none rounded-full hover:border-gray-200 outline-none capitalize"
              onChange={(e) => handleStatusChange(e.target.value)}
              value={selectedStatus || ""}
            >
              <option hidden>Status</option>
              <option value="All">All</option>
              {status.map((option) => (
                <option key={option.status_name} value={option.status_name}>
                  {option.status_name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg py-3 overflow-x-auto no-scrollbar">
            <table className="w-full mt-3">
              <thead className="border-b border-gray-300">
                <tr>
                  {[
                    "Complaint No",
                    "Date and Time",
                    "Raised by",
                    "Department",
                    "Priority",
                    "Status",
                  ].map((header) => (
                    <th key={header} className="text-start font-lexend font-semibold whitespace-nowrap">
                      <p className="mx-1.5 my-2 flex gap-2 items-center">
                        {header} <RiExpandUpDownLine />
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems
                  .slice()
                  .reverse()
                  .map((report, index) => (
                    <tr key={index} className="border-b border-gray-300">
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
                      <td className="text-start mx-1.5 my-2 font-lexend text-sm">{formatDate(report.createdAt)}</td>
                      <td className="text-start mx-1.5 my-2 font-lexend text-sm">{report.public_user_name}</td>
                      <td className="text-start mx-1.5 my-2 font-lexend text-sm">{report.dept_name}</td>
                      <td>
                        <p
                          className={`border-2 w-26 rounded-full text-center py-1.5 mx-2 text-sm font-medium capitalize ${
                            report.priority === "High"
                              ? "text-red-500 border-red-500"
                              : report.priority === "Medium"
                              ? "text-sky-500 border-sky-500"
                              : "text-green-500 border-green-500"
                          }`}
                        >
                          {report.priority}
                        </p>
                      </td>
                      <td>
                        <p
                          className="border-2 w-28 rounded-full text-center py-1 text-sm mx-2 capitalize"
                          style={{
                            borderColor: statusColors[report.status] || "gray",
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

        <div className="mt-4 mb-5 mx-7">
          <nav className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center">
            <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
              Showing {currentPage * itemsPerPage - itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, report.length)} of {report.length} entries
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 font-alegerya">
              <li>
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-s-lg"
                >
                  &lt;&lt;
                </button>
              </li>
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br"
                >
                  Back
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
                .map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border border-paginate-br ${
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
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br"
                >
                  Next
                </button>
              </li>
              <li>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-primary bg-paginate-bg border border-paginate-br rounded-e-lg"
                >
                  &gt;&gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Report;
