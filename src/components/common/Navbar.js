import { Link,NavLink } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { useEffect, useState } from "react";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import {IoIosArrowDown} from "react-icons/io"
import { matchPath , useLocation } from "react-router-dom";

const Navbar = () => {

    const {token} = useSelector((state) => state.auth );
    const {user} = useSelector ((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const [subLinks , setSubLinks] = useState([]);
    const location = useLocation();

    async function getAllSublinks () {
        const result = await apiConnector("GET" , categories.CATEGORIES_API);
        console.log("Printing all subLinks",result.data.allCategory);
        setSubLinks(result.data.allCategory);
    }
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    useEffect ( ()=> {
    getAllSublinks();
    },[])

    return (
        <div className="flex items-center w-full border-b-[1px] border-b-richblack-700 h-14 relative">

            <div className="flex items-center w-11/12 max-w-maxContent gap-72 mx-auto justify-between">
                 <Link to={"/"}>
                   <img src={Logo} height={42} width={162}/>
                 </Link>

                 {/* Nav Links */}
      <nav>
        <ul className=' hidden md:flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group'>
                                <p>{link.title}</p>
                                <IoIosArrowDown/>

                                <div className={`invisible absolute left-[50%] 
                                    translate-x-[-49%] ${subLinks.length ? "translate-y-[15%]" : "translate-y-[40%]"}
                                 top-[50%] z-50 
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]`}>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' to={`catalog/${subLink.name}`} key={index}>
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<span className="loader"></span>)
                                }

                                </div>


                            </div>

                        ) : (
                            <Link to={link?.path}>
                                <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                    {link.title}
                                </p>
                                
                            </Link>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>

                {/* Login signup dashboard */}

                <div className="flex gap-4 items-center">
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to={"/dashboard/cart"} className="relative">
                                   <AiOutlineShoppingCart className="text-white text-[30px]"/>
                                   {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                   }
                            </Link>
                        )
                    }

                    {
                        token === null && (
                           
                               <Link to={"/login"}>
                                  <button className="text-richblack-100 rounded-md bg-richblack-800 border-richblack-700
                                  px-[12px] py-[8px]">
                                Login
                            </button>
                               </Link>
                        )

                   }
                 {
                        
                        token ===null && (
                        
                        <Link to={"/signup"}>
                                   <button className="text-richblack-100 rounded-md bg-richblack-800 border-richblack-700
                                  px-[12px] py-[8px]">
                                Signup
                            </button>
                               </Link>   )
                     
                     
                    }
                    {
                        token!=null && <ProfileDropdown/>
                    }

                </div>

            </div>
        </div>
    )
}
export default Navbar;