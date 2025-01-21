import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { API, formatDate1, formatDate2 } from "../../Host";
import { useLocation, useNavigate } from "react-router-dom";
import decryptData from "../../Decrypt";
import ViewAttachment from "./ViewAttachment";
import { BsThreeDotsVertical } from "react-icons/bs";
import SimilarRequest from "../grievances/SimilarRequest";
import { IoIosEye } from "react-icons/io";
import GrievanceDetailsModal from "./GrievanceDetailsModal";
import { toast } from "react-toastify";

const ViewRequest = () => {
  const [data, setData] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [workDataFile, setWorkDataFile] = useState(null);
  const [endpoint, setEndpoint] = useState(null);
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const grievanceId = location.state?.grievanceId;
  const token = sessionStorage.getItem("token");
  const [isviewModal, setIsviewModal] = useState(false);
  const [isSimilarReq, setIsSimilarReq] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [logData, setLogData] = useState([]);
  const navigate = useNavigate();
  const [selectedGrievanceId, setSelectedGrievanceId] = useState(null);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);

  useEffect(() => {
    if (!grievanceId) {
      setError(new Error("Grievance ID is not available"));
      setLoading(false);
      return;
    }
    const fetchData = async () => {
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
        setData(responseData);
        const responsefilter = await axios.get(
          `${API}/new-grievance/filter?zone_name=${responseData.zone_name}&ward_name=${responseData.ward_name}&street_name=${responseData.street_name}&dept_name=${responseData.dept_name}&complaint=${responseData.complaint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = decryptData(responsefilter.data.data);
        const filteredData = data.filter(
          (item) => item.grievance_id !== grievanceId
        );
        setMatchData(filteredData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  

    const fetchDataFile = async () => {
      try {
        const response = await axios.get(
          `${API}/new-grievance-attachment/getattachments?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setDataFile(responseData);
      } catch (err) {
        setError(err);
      }
    };


    
    const fetchLog = async () => {
      try {
        const response = await axios.get(
          `${API}/grievance-log/getbyid?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setLogData(responseData);
      } catch (err) {
        setError(err);
      }
    };

    const fetchDataFileWorksheet = async () => {
      try {
        const response = await axios.get(
          `${API}/grievance-worksheet-attachment/getattachments?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setWorkDataFile(responseData);
      } catch (err) {
        setError(err);
      }
    };

    setLoading(true);
    Promise.all([fetchData(), fetchDataFile(), fetchLog(), fetchDataFileWorksheet()])
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [grievanceId, token]);

  const fetchLog = async () => {
    try {
      const response = await axios.get(
        `${API}/grievance-log/getbyid?grievance_id=${grievanceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = decryptData(response.data.data);
      setLogData(responseData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

 
  const handleReOpen = async () => {
    try {
      const reopenResponse = await axios.post(
        `${API}/new-grievance/reopen?grievance_id=${grievanceId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (reopenResponse.status === 200) {
        toast.success("Ticket Re-Opened Successfully");
        await axios.post(
          `${API}/grievance-log/post`,
          {
            grievance_id: grievanceId,
            log_details: `Ticket No ${grievanceId} is Re-Opened by ${localStorage.getItem(
              "name"
            )}`,
            created_by_user: localStorage.getItem("name"),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate("/closed");
      } else {
        toast.error("Failed to Re-open Ticket");
      }
    } catch (error) {
      console.error("Error reopening ticket:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "An error occurred while reopening the ticket."
      );
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  const toggleModal = () => {
    setIsviewModal(!isviewModal);
    setAttachmentFile(null);
  };

  const togglReModal = () => {
    setIsSimilarReq(!setIsSimilarReq);
  };

  const 
  handleGrievanceClick = (grievanceId) => {
    setSelectedGrievanceId(grievanceId);
    setIsGrievanceModalOpen(true);
  };

  return (
    <Fragment>
      <div className="h-screen overflow-y-auto no-scrollbar">
        <div className="md:mx-6 mx-2  my-5 font-lexend">
         <div className="flex justify-between items-center">
         <p>Complaint Details #{data.grievance_id}</p>
         {data.status === "closed" &&
              (() => {
                const updatedAt = new Date(data.ticketclosedtime);

                const today = new Date();

                const timeDifference = today - updatedAt;

                const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

                return daysDifference <= 7 ? (
                  <button
                    className="bg-green-600 px-3 py-1.5 rounded-md shadow-md text-white text-sm"
                    onClick={() => {
                      const userConfirmed = window.confirm(
                        "Are you sure you want to Re-open the ticket?"
                      );
                      if (userConfirmed) {
                        handleReOpen();
                      }
                    }}
                  >
                    Re-open Ticket
                  </button>
                ) : null;
              })()}
         </div>
          <div className="bg-white mt-2 pb-3">
            <p className="px-5 py-2 text-lg">Request By :</p>
            <div className="flex justify-between gap-3 mx-3 my-3 items-center flex-wrap">
              <div className="col-span-4 px-5 pb-3">
                <p className="capitalize">{data.public_user_name}</p>
                <p>+91 {data.phone}</p>{" "}
              </div>
              <div className="flex flex-row gap-2 items-center flex-wrap">
                <div className="flex  gap-3  items-center">
                  <p>Status: </p>
                  <span className="text-sm border border-gray-500 w-24 text-center py-1.5 rounded-full capitalize">
                    {data.status}
                  </span>
                </div>

                <div className="flex gap-3 items-center ">
                  <p className="">Priority: </p>
                  <span className={`border w-28 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize text-white  ${
                        data.priority === "High"
                          ? "bg-red-500"
                          : data.priority === "Medium"
                          ? "bg-sky-500"
                          : data.priority === "Low"
                          ? "bg-green-500"
                          : ""
                      }`}>
                    {data.priority}
                  </span>
                </div>
              </div>
              {data.assign_username ? (
                <div className="flex flex-col mx-3">
                  <div className="flex   gap-3 items-center">
                    <p>Assigned to </p>
                    <span className="text-sm border border-gray-500 px-3 text-center py-1.5 rounded-full capitalize whitespace-nowrap">
                      {data.assign_username}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <hr />
            <div className="grid grid-cols-12 gap-2 mx-3 my-4">
              <div className="md:col-span-6 col-span-12 border px-2 py-3 rounded">
                <p className="pt-2 text-lg">Grievance Details</p>
                <hr className="my-3" />
                <div className="flex flex-col gap-3 mx-2 text-base">
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Origin </p>
                    <p className="col-span-2 capitalize">
                      : {data.grievance_mode}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Complaint Type </p>
                    <p className="col-span-2 capitalize">
                      : {data.complaint_type_title}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Department </p>
                    <p className="col-span-2 capitalize">: {data.dept_name}</p>
                  </div>

                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Complaint </p>
                    <p className="col-span-2 capitalize">: {data.complaint}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Zone </p>
                    <p className="col-span-2 capitalize">: {data.zone_name}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Ward </p>
                    <p className="col-span-2 capitalize">: {data.ward_name}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Street </p>
                    <p className="col-span-2 capitalize">
                      : {data.street_name}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Pincode </p>
                    <p className="col-span-2 capitalize">: {data.pincode}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Description: </p>
                    <p className="col-start-1 col-span-4 mt-2 capitalize">
                      {data.complaint_details}
                    </p>
                  </div>

                  {dataFile && dataFile.length > 0 && (
                    <div className="grid grid-cols-4">
                      <p className="col-span-2">Attachment Files </p>
                      <div className="col-start-1 col-span-4 mt-2 text-xs  ">
                        {dataFile.map((file, index) => (
                          <button
                            className=" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white"
                            key={index}
                            onClick={() => {
                              setIsviewModal(true);
                              setAttachmentFile(file.attachment);
                              setEndpoint("new-grievance-attachment")
                            }}
                          >
                            {`Attachment ${index + 1}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-6 col-span-12 border px-2 py-3 rounded ">
                <p className="pt-2 text-lg ">Similar Request</p>
                <hr className="my-3 w-full" />
                <div className="overflow-auto no-scrollbar">
                  <table className="w-full bg-gray-200 rounded ">
                    <thead>
                      <tr>
                        <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                          Grievance
                        </th>
                        <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                          Department
                        </th>
                        <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                          Origin
                        </th>
                        <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                          Date
                        </th>
                        <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {matchData && matchData.length > 0 ? (
                        matchData.map((data, index) => (
                          <tr
                            className="border-b-2 border-gray-300"
                            key={index}
                          >
                            <td
                              className="text-center mx-3 py-2.5 whitespace-nowrap"
                              onClick={() =>
                                handleGrievanceClick(data.grievance_id)
                              }
                            >
                              {data.grievance_id}
                            </td>
                            <td className="text-center mx-3 py-2.5 whitespace-nowrap text-gray-600 capitalize">
                              {data.dept_name}
                            </td>
                            <td className="text-center mx-3 py-2.5 whitespace-nowrap text-gray-600 capitalize">
                              {data.grievance_mode}
                            </td>
                            <td className="text-center mx-3 py-2.5 whitespace-nowrap text-gray-600 ">
                              {formatDate2(data.createdAt)}
                            </td>
                            <td className="flex justify-center mt-3">
                              <IoIosEye
                                className="text-xl"
                                onClick={() =>
                                  handleGrievanceClick(data.grievance_id)
                                }
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-center py-2.5" colSpan="3">
                            No matching data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      {isGrievanceModalOpen && (
        <GrievanceDetailsModal
          grievanceId={selectedGrievanceId}
          closeModal={() => setIsGrievanceModalOpen(false)}
        />
      )}
      {isviewModal && (
        <ViewAttachment
          endpoint={endpoint}
          toggleModal={toggleModal}
          attachmentFile={attachmentFile}
        />
      )}
      {isSimilarReq && (
        <SimilarRequest matchData={matchData} togglReModal={togglReModal} />
      )}
    </Fragment>
  );
};

export default ViewRequest;