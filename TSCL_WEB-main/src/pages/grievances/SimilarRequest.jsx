import React, { useState, useEffect } from "react";
import { API, formatDate1 } from "../../Host";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const SimilarReqest = (props) => {
  const { matchData, togglReModal } = props;

  const [accordionOpen, setAccordionOpen] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach((accordion) => {
      const header = accordion.querySelector(".accordion-header");
      const body = accordion.querySelector(".accordion-body");

      header.addEventListener("click", () => {
        setAccordionOpen((prevAccordionOpen) => ({
          ...prevAccordionOpen,
          [accordion.dataset.index]:
            !prevAccordionOpen[accordion.dataset.index],
        }));
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center">
      <div className="bg-white w-full h-3/5 font-lexend m-2 mx-5 overflow-auto">
        <div className="flex justify-between mx-3 mt-2 items-center">
          <p className="pt-2 text-lg text-slate-900 pl-5">Similar Request</p>
          <p className="text-3xl pr-5" onClick={() => togglReModal()}>
            x
          </p>
        </div>
        <hr className="my-3 w-full" />
        {matchData && matchData.length > 0 ? (
          matchData.map((data, index) => (
            <div key={index} className="accordion mb-4" data-index={index}>
              <div className="accordion-header flex items-center justify-between p-4 bg-slate-500 rounded-t cursor-pointer mx-3">
                <div className="flex flex-wrap gap-3">
                  <p className="text-white">
                    <span className="text-lg  font-medium">
                      {data.grievance_id} :
                    </span>{" "}
                    {data.dept_name} - {data.complaint}
                  </p>
                </div>

                <span className="text-2xl font-bold text-white">
                  <BsChevronDown
                    className={accordionOpen[index] ? " rotate-180 " : ""}
                  />
                </span>
              </div>
              <div
                className={`accordion-body p-4 bg-gray-50 rounded-b ${
                  accordionOpen[index] ? "block" : "hidden"
                }`}
              >
                <table className="w-full bg-gray-100 rounded">
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="text-start px-3 mx-3 py-2.5 whitespace-nowrap">
                        Department : {data.dept_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start px-3 mx-3 py-2.5 ">
                        Description : {data.complaint_details}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start px-3 mx-3 py-2.5 whitespace-nowrap">
                        Date : {formatDate1(data.createdAt)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p className=" text-center font-semibold text-2xl mt-28">
            No matching data found !!!
          </p>
        )}
      </div>
    </div>
  );
};

export default SimilarReqest;
