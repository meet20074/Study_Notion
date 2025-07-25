import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import OpenRoute from "./components/core/Auth/OpenRoute";
import toast from "react-hot-toast";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ErrorPage from "./pages/ErrorPage";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import AddCourse from "./components/core/Dashboard/Add Course/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import Instructor from "./components/core/Dashboard/Instructor"
import ViewCourse from "./pages/ViewCourse ";
import VideoDetails from "./components/core/ViewCourse/VideoDetails ";

import { useState  } from "react";
import { useDispatch  , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";


function App() {
      const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const { user } = useSelector((state) => state.profile)
  const [toastStatus, settoastStatus] = useState(true)

  return (
    <div className=" bg-richblack-900 min-w-screen">
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>} />
         <Route path="catalog/:catalogName" element={<Catalog/>} />
         <Route path="courses/:courseId" element={<CourseDetails/>} />

        <Route path = "/login" element = {
          <OpenRoute>
             <Login/>
          </OpenRoute>
         } />
        <Route path="/signup" element = {  <OpenRoute>
             <Signup/>
          </OpenRoute>}/>
        <Route path="/verify-email" element= {  <OpenRoute>
             <VerifyEmail/>
          </OpenRoute>}/>

           <Route path="forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
           <Route path="update-password/:id" element = {<OpenRoute><UpdatePassword/></OpenRoute>}/>

          <Route
                path="/about"
                element={
                  
                    <About />
                  
                }
          />  
          <Route
            path="/contact"
            element={
              
                <ContactPage />
              
            }
          /> 

          <Route 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/Settings" element={<Settings />} />
            

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                </>
              )
            }

            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                </>
              )
            }

          </Route>

          <Route element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }>

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route
                    path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                    element={<VideoDetails/>}
                  />
                </>
              )
            }
          </Route>
          <Route path="*" element={<ErrorPage/>}  />
      </Routes>

    </div>
  );
}

export default App;
