import React, { useEffect, useState } from "react";
import decryptData from "../../Decrypt";
import axios from "axios";
import { API } from "../../Host";

const GrievanceDetailsModal = ({ grievanceId, closeModal }) => {
  const [grievanceData, setGrievanceData] = useState({});
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchGrievanceData = async () => {
      try {
        console.log("Fetching grievance data for ID:", grievanceId);

        const response = await axios.get(
          `${API}/new-grievance/getbyid?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response:", response);
        const responseData = decryptData(response.data.data);
        console.log(responseData);

        setGrievanceData(responseData);
      } catch (error) {
        console.error(
          "Error fetching grievance data",
          error.response ? error.response.data : error.message
        );
      }
    };

    if (grievanceId) {
      fetchGrievanceData();
    } else {
      console.warn("Grievance ID is not defined");
    }
  }, [grievanceId, token]);

  if (!grievanceData) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <h2 className="text-xl font-semibold">Grievance Details</h2>
          <button
            onClick={closeModal}
            className="text-2xl font-bold text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <strong>Grievance ID:</strong> {grievanceData.grievance_id}
            </div>
            <div>
              <strong>Mode:</strong> {grievanceData.grievance_mode}
            </div>
            <div>
              <strong>Complaint Type:</strong>{" "}
              {grievanceData.complaint_type_title}
            </div>
            <div>
              <strong>Assigned To:</strong> {grievanceData.assigned_to}
            </div>
          </div>
          <div>
            <strong>Description:</strong>
            <p>{grievanceData.description}</p>
          </div>
          <div>
            <strong>Status:</strong> {grievanceData.status}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(grievanceData.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceDetailsModal;
