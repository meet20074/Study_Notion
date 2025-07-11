import { Link } from "react-router-dom";

const CTAButton = ({children , active , linkto}) => {
    return (
          
        <Link to={linkto}>
             <div className={`rounded-md text-bold font-bold
           ${ active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
           px-5 py-2 hover:scale-95 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
           hover:shadow-none
           `}>

            {children}

           </div>
        </Link>
    );
}
export default CTAButton;