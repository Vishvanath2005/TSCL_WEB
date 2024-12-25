import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Host";
import decryptData from "../../Decrypt";

const GrievanceDetailsModal = ({ grievanceId, closeModal }) => {
  const [grievanceData, setGrievanceData] = useState(null);
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchGrievanceData = async () => {
      try {
        const response = await axios.get(
          `${API}/new-grievance/getbyid?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);

        setGrievanceData(responseData);
      } catch (error) {
        console.error("Error fetching grievance data", error);
      }
    };

    fetchGrievanceData();
  }, [grievanceId]);

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
          <div>
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
                <strong>Department:</strong> {grievanceData.dept_name}
              </div>
              <p>
                <strong>Complaint:</strong> {grievanceData.complaint}
              </p>
              <div>
                <strong>Zone:</strong> {grievanceData.zone_name}
              </div>
              <div>
                <strong>Ward:</strong> {grievanceData.ward_name}
              </div>
              <div>
                <strong>Street:</strong> {grievanceData.street_name}
              </div>
              <div>
                <strong>Pincode:</strong> {grievanceData.pincode}
              </div>
              <p>
                <strong>Complaint Address:</strong>{" "}
                {grievanceData.complaintaddress}
              </p>
              <div>
                <strong>Public User Name:</strong>{" "}
                {grievanceData.public_user_name}
              </div>
              <div>
                <strong>Phone:</strong> {grievanceData.phone}
              </div>
            </div>
          </div>
          <div>
            <div className="mt-2">
              <p>
                <strong>Details:</strong> {grievanceData.complaint_details}
              </p>
            </div>
          </div>

          <div className="my-2 flex justify-between mx-14">
            <p>
              <strong>Assigned JE:</strong>{" "}
              {grievanceData.assign_username
                ? grievanceData.assign_username
                : "Yet to be assigned"}
            </p>
            <div className="flex gap-3 items-center">
              <p className="font-semibold">Status:</p>
              <p className="border-2 w-28 rounded-full text-center py-1 tex-sm font-normal mx-2 capitalize  ">
                {grievanceData.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceDetailsModal;
