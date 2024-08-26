import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Login from './pages/auth/Login'
import OTP from './pages/auth/OTP'
import SignUp from './pages/auth/SignUp'
import Layout from './pages/layout/Layout'
import GrievancesForm from './pages/grievances/GrievancesForm'
import Report from './pages/grievances/Report'
import Viewreport from './pages/report/Viewreport'
import ViewRequest from './pages/grievances/ViewRequest'
import Closed from './pages/closed/Closed'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='' element={<Login/>} />
    <Route path='/auth' element={<OTP/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path="/" element={<Layout />}>
    <Route path='/closed' element={<Closed/>}/>
    <Route path='/form' element={<GrievancesForm />} />
    <Route path='/report' element={<Report/>}/>
    <Route path='/viewreport' element={<Viewreport/>}/>
    <Route path='/view' element={<ViewRequest/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
   </>
  )
}

export default App
