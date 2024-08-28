import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { API } from "../../Host";
import { useLocation } from "react-router-dom";
import decryptData from "../../Decrypt";
import { BsSendFill } from "react-icons/bs";
// import ViewAttachment from "../request/ViewAttachment";
import { AiOutlineGlobal } from "react-icons/ai";

const GrivanceWorksheet = () => {
  const [data, setData] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const grievanceId = location.state?.grievanceId;
  const token = sessionStorage.getItem("token");
  const [isviewModal, setIsviewModal] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/new-grievance/getbyid?grievance_id=NG055`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setData(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const handleFileChange = (e) => {
      const files = e.target.files;
      if (files.length > 5) {
        toast.error("Maximum 5 files allowed");
        e.target.value = null;
      } else {
        setFiles(files);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchDataFile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      toast.error("Maximum 5 files allowed");
      e.target.value = null;
    } else {
      setFiles(files);
    }
  };

  const toggleModal = () => {
    setIsviewModal(!isviewModal);
    setAttachmentFile(null);
  };

  return (
    <Fragment>
      <div className="h-screen overflow-y-auto no-scrollbar">
        <div className="md:mx-6  mx-2  my-5 font-lexend">
          <p>Complaint Details #{data.grievance_id}</p>
          <div className="bg-white mt-2 pb-3">
            <p className="px-5 py-2 text-lg">Request By :</p>
            <div className="flex justify-between gap-3 mx-3 my-3">
              <div className="col-span-4 px-5 pb-3">
                <p>{data.public_user_name}</p>
                <p>+91 {data.phone}</p>{" "}
              </div>
              <div className="flex flex-col">
                <div className="flex  gap-3 mb-3 items-center">
                  <p>Status: </p>
                  <span className="text-sm border-2 border-black px-4 py-0.5 rounded-full">
                    <select className="col-span-2 block px-1 py-1 text-sm text-black border rounded-lg border-none outline-none">
                      <option hidden>New</option>
                      <option value="closed">closed</option>
                      <option value="inprogress">inprogress</option>
                      <option value="waiting">waiting</option>
                    </select>
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <p>Priority: </p>
                  <span className="text-sm text-white bg-orange-400 px-12 py-1.5 rounded-full">
                    High
                  </span>
                </div>
              </div>

              {/* <div className="col-span-3">
              <select className="col-span-2 block px-4 py-3 text-sm text-black border rounded-lg border-none outline-none">
                <option hidden>Assign Emp</option>
                <option value="Ravi">Ravi</option>
                <option value="Kumar">Kumar</option>
              </select>
            </div>
            <div className="col-span-2">
              <button className="bg-primary px-4 py-1.5 text-white rounded-full">
                Submit
              </button>
            </div> */}
            </div>
            <hr />
            <div className="grid grid-cols-12 gap-2 mx-3 my-4">
              <div className="md:col-span-6 col-span-12 border px-2 py-3 rounded">
                <p className="pt-2 text-lg">Grievance Details</p>
                <hr className="my-3" />
                <div className="flex flex-col gap-3 mx-2 text-base">
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Origin </p>
                    <p className="col-span-2">: {data.grievance_mode}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Department </p>
                    <p className="col-span-2">: {data.dept_name}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Complaint Type </p>
                    <p className="col-span-2">: {data.complaint}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Complaint </p>
                    <p className="col-span-2">: {data.complaint_type_title}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Zone </p>
                    <p className="col-span-2">: {data.zone_name}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Ward </p>
                    <p className="col-span-2">: {data.ward_name}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Street </p>
                    <p className="col-span-2">: {data.street_name}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Pincode </p>
                    <p className="col-span-2">: {data.pincode}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Description: </p>
                    <p className="col-start-1 col-span-4 mt-2">
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
                          Date/Time
                        </th>
                        <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                          Complaint No
                        </th>
                        <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      <tr className="border-b-2  border-gray-300">
                        <td className="text-center mx-3 py-2.5 whitespace-nowrap">
                          15-05-2024 / 12:00 AM
                        </td>
                        <td className="text-center  mx-3 py-2.5 whitespace-nowrap">
                          R-0001122
                        </td>
                        <td className="text-center  mx-3 py-2.5 text-green-600 whitespace-nowrap">
                          In Progress
                        </td>
                      </tr>
                      <tr className="border-b-2 border-gray-300">
                        <td className="text-center mx-2 my-2 whitespace-nowrap">
                          15-05-2024 / 12:00 AM
                        </td>
                        <td className="text-center  mx-2 my-2 whitespace-nowrap">
                          R-0001122
                        </td>
                        <td className="text-center  mx-2 my-2 text-green-600 whitespace-nowrap">
                          In Progress
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mx-3 my-3">
              <div className="md:col-span-6 col-span-12 border px-2 py-3 rounded">
                <div className="flex justify-between items-center">
                  <div className="">
                    <p>Replay</p>
                  </div>
                  <div className="">
                    <select className=" block px-4 py-3 text-sm text-black border rounded-lg  outline-none">
                      <option hidden>Tamil / English </option>
                      <option value="Tamil">Tamil</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                </div>
                <hr className="my-3 w-full" />
                <textarea
                  id="worksheet_id"
                  rows="11"
                  className=" w-full col-span-6"
                  placeholder="Type...."
                />

                <div className=" md:col-span-6 font-normal w-full ">
                  <div className="flex justify-between ">
                    <div className="flex">
                      <input
                        type="file"
                        id="file"
                        multiple
                        className=" py-2 px-18 items-start flex  outline-none"
                        onChange={handleFileChange}
                      />

                      {files.length >= 5 && (
                        <p className="text-red-500 text-sm">
                          Maximum 5 files allowed
                        </p>
                      )}
                    </div>
                    <div className=" flex text-center mt-3">
                      <button
                        type="submit"
                        className=" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 "
                      >
                        <BsSendFill />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 col-span-12">
                <p className=" mb-2 mx-1 text-lg">Complaint History</p>
                <div className="bg-gray-100 py-3">
                  <div className="mx-8">
                    <p className="py-3 font-semibold">
                      Complaint No {data.grievance_id}
                    </p>
                    <p className="py-2">
                      {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                    <div className="grid grid-cols-3 divide-x-2 divide-black">
                      <p>
                        {new Date(data.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <p className="pl-5 col-span-2">Logged In</p>
                    </div>
                    <br />
                    <div className="grid grid-cols-3 divide-x-2 divide-black">
                      <p>
                        {new Date(data.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <p className="pl-5 col-span-2">
                        Ticket Raised {data.grievance_id}
                      </p>
                    </div>
                    <br />
                    <div className="grid grid-cols-3 divide-x-2 divide-black">
                      <p>
                        {new Date(data.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <p className="pl-5 col-span-2">
                        Assigned To Particular Department
                      </p>
                    </div>
                    <br />
                    <p className="mb-2">
                      {new Date(data.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="grid grid-cols-3 divide-x-2 divide-black">
                      <p>
                        {new Date(data.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <div className="col-span-2">
                        <p className="pl-5">Status:</p>
                        <p className="pl-5 text-gray-500">{data.statusflow}/</p>
                      </div>
                    </div>
                    <hr className="my-3" />
                    <div className="md:grid md:grid-cols-3 flex border-2 md:mx-20">
                      <p className="text-center px-3 py-1.5">Status</p>
                      <p className="text-center w-full bg-gray-800 md:col-span-2 text-white py-1.5">
                        {data.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isviewModal && (
        <ViewAttachment
          toggleModal={toggleModal}
          attachmentFile={attachmentFile}
        />
      )}
    </Fragment>
  );
};

export default GrivanceWorksheet;
