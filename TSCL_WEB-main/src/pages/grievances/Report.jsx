import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { API, formatDate } from "../../Host";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import decryptData from "../../Decrypt";
import DateRangeComp from "../../components/DateRangeComp";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { addDays } from "date-fns";
import { toast } from "react-toastify";

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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [grievanceImages, setGrievanceImages] = useState({});
  const [filteredGrievances, setFilteredGrievances] = useState([]);

  const token = sessionStorage.getItem("token");
  const code = sessionStorage.getItem("code");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
    fetchActiveStatus();
  }, [
    searchValue,
    currentPage,
    itemsPerPage,
    selectedStatus,
    fromDate,
    toDate,
  ]);

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

      // Filter reports based on search, selected status, and date range
      const filteredReports = responseData.filter((report) => {
        const statusMatch =
          selectedStatus === "All" || report.status === selectedStatus;

        const searchMatch = Object.values(report).some((value) =>
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
        );

        const reportDate = new Date(report.createdAt);
        const fromDateMatch = fromDate
          ? reportDate >= new Date(fromDate)
          : true;
        const toDateMatch = toDate
          ? reportDate <= addDays(new Date(toDate), 1)
          : true;

        return statusMatch && searchMatch && fromDateMatch && toDateMatch;
      });

      // Sort and paginate the reports
      const sortedReports = filteredReports.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTotalPages(Math.ceil(sortedReports.length / itemsPerPage));
      const lastIndex = currentPage * itemsPerPage;
      const firstIndex = lastIndex - itemsPerPage;
      setCurrentItems(sortedReports.slice(firstIndex, lastIndex));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reports.");
      setIsLoading(false);
    }
  };

  const Origin = useSelector((state) => state.origin);

  useEffect(() => {
    if (Origin && Origin?.data) {
      const imageMapping = Origin?.data?.reduce((acc, resource) => {
        acc[resource.res_name] = resource.image;
        return acc;
      }, {});
      setGrievanceImages(imageMapping);
    }
  }, [Origin]);

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

  const handleDateRangeChange = (range) => {
    const { startDate, endDate } = range[0];
    setFromDate(startDate);
    setToDate(endDate);
    toast.success("Grievance filtered");
  };

  return (
    <div className="overflow-y-auto  no-scrollbar">
      <div className="font-lexend h-screen ">
        <div className="flex justify-between items-center my-2 mx-8 gap-1 flex-wrap">
          <h1 className="md:text-xl text-lg font-bold">Dashboard</h1>

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
            <div className="flex items-center gap-3 mx-3">
              <div className=" flex items-center gap-10">
                <p className="text-lg whitespace-nowrap">View Report</p>

                <div className="flex items-center gap-3  border-2 w-fit py-1.5 rounded-lg border-primary pr-3 mx-3">
                  <DateRangeComp onChange={handleDateRangeChange} />
                </div>
                <div className="border-2 border-blue-700 px-2 py-1 flex gap-3 rounded-lg">
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
                    className="p-1 outline-none border bg-blue-500 text-white text-sm rounded-lg px-2"
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
            <select
              className="block items-center w-fit px-1 py-2 text-center text-sm bg-primary text-white border border-none rounded-full hover:border-gray-200 outline-none capitalize"
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

          <div className="rounded-lg w-full overflow-x-auto no-scrollbar flex justify-center">
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
                      <td className="text-start flex justify-start  font-lexend text-sm">
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
                        {" "}
                        <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                          {report.assign_username
                            ? report.assign_username
                            : "Yet to be assigned"}
                        </p>
                      </td>
                      <td className="text-center">
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
        </div>

        <div className="mt-4 mb-5 mx-7">
          <nav className="flex items-center flex-column flex-wrap md:flex-row md:justify-between justify-center">
            <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0 block w-full md:inline md:w-auto text-center font-alegerya">
              Showing {currentPage * itemsPerPage - itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, report.length)} of{" "}
              {report.length} entries
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
                .slice(
                  Math.max(0, currentPage - 2),
                  Math.min(totalPages, currentPage + 1)
                )
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
