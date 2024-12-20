
import React from "react";
import { useState, useEffect } from "react";
import { GoVersions } from "react-icons/go";
import { FaPercent } from "react-icons/fa";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
import { CiPercent } from "react-icons/ci";
import axios from "axios";
import { API, formatDate1 } from "../../Host";
import decryptData from "../../Decrypt";
import { useNavigate } from "react-router-dom";

const Dashboard3 = () => {
  const [report, setReport] = useState([]);
  const [department, setDepartment] = useState([]);
  const token = sessionStorage.getItem("token");
  const [filterDept, setFilterDept] = useState([]);
  const [count, setCount] = useState([]);
  const [prioritycounts, setPrioritycounts] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [complaintData, setComplaintData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrievances();
    fetchDepartment();
    fetchGrievanceCounts();
    fetchPriority();
    fetchzones();
    fetchcomplaint();
  }, []);

  const handleNavigate = () => {
    navigate("#");
  };

  
  const fetchGrievances = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setReport(responseData);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${API}/department/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setDepartment(responseData);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchGrievanceCounts = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/grievancecounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data;

      // const mappedCount = Object.keys(responseData).reduce((acc, key) => {
      //   acc[key] = responseData[key][0][Object.keys(responseData[key][0])[0]];
      //   return acc;
      // }, {});

      setCount(responseData);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchPriority = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/prioritycounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrioritycounts(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchzones = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/locationZone`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setZoneData(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchcomplaint = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/complaintcount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaintData(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const filteredDataDept = department.reduce((acc, dept) => {
    const reports = report.filter((r) => r.dept_name === dept.dept_name);
    acc.push({ name: dept.dept_name, value: reports.length });
    return acc;
  }, []);

  useEffect(() => {
    setFilterDept(filteredDataDept);
  }, [department, report, status]);

 
  return (
    <div className="  font-lexend mx-2 my-3 h-screen  ">
      <div>
        {count && (
          <div className="grid grid-cols-12 gap-3 my-3">
            {[
              {
                label: "Performance of Resolution Team",
                value: count.totalGrievances?.[0]?.total ?? 0,
                icon: IoTrendingUpSharp ,
                color: "sky-600",
              },
              {
                label: "Engineer Workload",
                value: count.pendingGrievances?.[0]?.pending ?? 0,
                icon: GoVersions,
                color: "red-800",
              },
              {
                label: "Resolution Rate",
                value: 1,
                icon: FaPercent,
                color: "yellow-600",
              },
              {
                label: "Escalation Rate",
                value: count.escalatedGrievances?.[0]?.escalated ?? 0,
                icon: CiPercent,
                color: "red-700",
              },
              {
                label: "Comparative Analysis",
                value: count.highPriorityGrievances?.[0]?.highPriority ?? 0,
                icon: MdCompareArrows,
                color: "gray-800",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`md:col-span-4 sm:col-span-6 col-span-12 border-2 bg-white p-4 rounded-lg shadow-md ${
                  item.onClick ? "cursor-pointer" : ""
                }`}
                onClick={item.onClick ?? handleNavigate}
              >
                <p className="text-lg text-gray-700 font-medium">
                  {item.label}
                </p>
                <div className="flex mt-1 justify-between items-end">
                  <p className="text-3xl px-3 text-gray-700 font-medium">
                    {item.value}
                  </p>
                  <item.icon className={`text-4xl text-${item.color}`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard3;
