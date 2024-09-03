import React from "react";
import { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Line,
  Legend,
  Cell,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { FaPlus } from "react-icons/fa6";
import { BsCalendar2Week } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

const Dashboard = () => {
  const data01 = [
    { name: "PWD", value: 30 },
    { name: "Department", value: 10 },
    { name: "Police", value: 25 },
    { name: "Electricity", value: 15 },
  ];

  const COLORS_1 = ["#5D72B8", "#9BE6C1", "#5991D3", "#D8B449"];

  const data02 = [
    { name: "New", value: 30 },
    { name: "Inprogress", value: 10 },
    { name: "Onhold", value: 25 },
    { name: "Closed", value: 15 },
    { name: "Resolved", value: 15 },
  ];

  const COLORS_2 = ["#5D72B8", "#9BE6C1", "#5991D3", "#D8B449", "#F64A3F"];

  const data = [
    {
      
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
     
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
    
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
    
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="  font-lexend h-screen mx-2 ">
        <div className="flex justify-between items-center my-2 mx-8 gap-1 flex-wrap">
          <h1 className="md:text-xl text-lg font-bold">Dashboard</h1>

          <button
            className="flex flex-row-2 gap-2 font-medium font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-2 px-3 justify-between md:text-base text-sm"
            onClick={() =>
              navigate(`/form`, {
                state: { grievanceId: report.grievance_id },
              })
            }
          >
            <FaPlus /> Add New Request
          </button>
        </div>

        <div className="grid grid-cols-12 gap-4  my-3 ">
          <div className="md:col-span-4 sm:col-span-6 px-4 col-span-12 bg-white p-4 rounded-lg">
            <p className="text-2xl font-medium">Request By Today</p>
            <div className="flex mt-4 justify-between items-end">
              <p className="text-5xl font-medium">10</p>
              <VscGitPullRequestNewChanges className="text-5xl" />
            </div>
          </div>
          <div className="md:col-span-4 sm:col-span-6 col-span-12 bg-white p-4 rounded-lg">
            {" "}
            <p className="text-2xl font-medium">Request By Week</p>
            <div className="flex mt-4 justify-between items-end">
              <p className="text-5xl font-medium">5</p>
              <BsCalendar2Week className="text-5xl" />
            </div>
          </div>
          <div className="md:col-span-4 sm:col-span-12 col-span-12 bg-white p-4 rounded-lg">
            {" "}
            <p className="text-2xl font-medium">Request By Month</p>
            <div className="flex mt-4 justify-between items-end">
              <p className="text-5xl font-medium">7</p>
              <FaCalendarAlt className="text-5xl" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 m-2 ">
          <div className="md:col-span-6 col-span-12 p-3  bg-white rounded-lg">
            <p className="text-xl font-semibold">
              Last 14 days request of Department
            </p>
              <div className="flex flex-col md:flex-row items-center py-4">
                <PieChart width={400} height={225} className="flex md:flex-col items-center flex-row">
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx={120}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    fill="#8884d8"
                    label
                  >
                    {data01.map((entry, index) => (
                      <Cell className="flex flex-col md:flex-row"
                        key={`cell-${index}`}
                        fill={COLORS_1[index % COLORS_1.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <div className="flex md:flex-col flex-row gap-5 ">
                  {data01.map((entry, index) => (
                    <div
                      key={entry.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: COLORS_1[index % COLORS_1.length],
                        }}
                      />
                      <span style={{ marginLeft: 10 }}>{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            
          </div>
          <div className="md:col-span-6 col-span-12 p-3  bg-white rounded-lg">
            <p className="text-xl font-semibold">Controle Request By Status</p>
            <div className="flex flex-col md:flex-row items-center py-4">
                <PieChart width={400} height={225}  className="flex md:flex-col items-center flex-row">
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx={120}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    fill="#8884d8"
                    label
                  >
                    {data02.map((entry, index) => (
                      <Cell className="flex flex-col md:flex-row"
                        key={`cell-${index}`}
                        fill={COLORS_2[index % COLORS_2.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <div className="flex md:flex-col flex-row gap-5 ">
                  {data02.map((entry, index) => (
                    <div
                      key={entry.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: COLORS_2[index % COLORS_2.length],
                        }}
                      />
                      <span style={{ marginLeft: 10 }}>{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-12 m-1">
          <div className=" px-4 col-span-12 bg-white p-4 m-2 rounded-lg">
            <ResponsiveContainer width="100%" height={200} className="my-5">
          <LineChart
          className="z-10"
      width={900}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip Line="none"/>
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="pv" stroke="#ff7300" activeDot={{ r: 8 }} />
    </LineChart>
    </ResponsiveContainer>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
