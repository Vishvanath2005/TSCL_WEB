import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { API, formatDate } from "../../Host";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import decryptData from "../../Decrypt";
import DateRangeComp from "../../components/DateRangeComp";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logo1.png";
import { addDays } from "date-fns";
import { toast } from "react-toastify";
import { GrCompliance } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";

const Dashboard = () => {
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
  const [totalReports, setTotalReports] = useState(0);
  const [closedReports, setClosedReports] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);

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
        `${API}/new-grievance/getbyuseridfull?public_user_id=${code}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const responseData = decryptData(response.data.data);
      setReport(responseData);

      const totalReports = responseData.length;
      const closedReports = responseData.filter(
        (report) => report.status === "closed"
      ).length;
      const pendingReports = responseData.filter(
        (report) => report.status != "closed"
      ).length;

      console.log("Total Reports:", totalReports);
      console.log("Closed Reports:", closedReports);
      console.log("Pending Reports:", pendingReports);

      setTotalReports(totalReports);
      setClosedReports(closedReports);
      setPendingReports(pendingReports);

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
        </div>
        <div className="grid grid-cols-3 gap-4 px-4 my-3">
          <div className="col-span-3 sm:col-span-1 py-3 rounded-md bg-white">
            <div className=" space-y-3 px-10">
              <p className="text-xl font-semibold ">Total Complaints </p>
              <p className="flex justify-between gap-2 items-center">
                <span className="text-3xl">{totalReports}</span>{" "}
                <TbReport className="text-3xl text-green-800" />
              </p>
            </div>
          </div>
          <div className="col-span-3 sm:col-span-1 py-3 rounded-md bg-white">
            {" "}
            <div className="space-y-3 px-10">
              <p className="text-xl font-semibold"> Resolved Complaints</p>
              <p className=" flex gap-2 justify-between items-center">
                <span className="text-3xl">{closedReports} </span>{" "}
                <GrCompliance className="text-3xl text-yellow-500" />
              </p>
            </div>
          </div>
          <div className="col-span-3 sm:col-span-1 py-3 rounded-md bg-white">
            {" "}
            <div className="space-y-3 px-10">
              <p className="text-xl font-semibold "> Pending Complaints</p>
              <p className="flex gap-2 justify-between items-center ">
                <span className="text-3xl">{pendingReports}</span>{" "}
                <MdPendingActions className="text-3xl text-red-700" />
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white h-fit mx-3 rounded-lg p-3">
          <div className="rounded-lg w-full overflow-x-auto no-scrollbar flex justify-center">
            <div className="w-full border rounded-md overflow-y-auto max-h-[540px]">
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
                          className="w-7 h-7 mx-1.5 my-2 rounded-full"
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
      </div>
    </div>
  );
};

export default Dashboard;
