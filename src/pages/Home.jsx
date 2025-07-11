import { Link } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
    return(
        <div className="bg-richblack-900">
            {/* Section 1 */}
              <div className="realtive mx-auto flex flex-col text-white items-center w-11/12 justify-between max-w-maxContent">
                  <Link to={"/signup"}>
                   <div className="mt-16 group rounded-full bg-richblack-800 flex flex-col px-[10px] py-[9px]
                                    transition-all duration-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:scale-95 
                                     w-fit hover:drop-shadow-none hover:bg-richblack-700">
                    <div className="flex gap-2 items-center">
                        <p>Become an Instructor</p>
                        <BiRightArrowAlt/>
                    </div>
                   </div>
                  </Link>    


                  {/* Heading */}
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"} />
            </div>   

            {/* intro */}
            <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            {/* Buttons */}

            <div className="flex gap-5 justify-between mt-5">

                <CTAButton active={true} linkto={"/signup"}> Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"}> Book a Demo</CTAButton>
                
            </div>      

              {/* video */}
            <div className='mx-3 my-14 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video className='shadow-[20px_20px_rgba(255,255,255)]'
                muted
                loop
                autoPlay
                >
                <source  src={Banner} type="video/mp4" />
                </video>
            </div>

                        {/* codeblocks1 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={"coding potential "}/>
                            with our online courses.
                        </div>
                    }
                    subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
                    codeColor={"text-yellow-25"}
                />
            </div>

            {/* codeblocks2 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
                            Start 
                            <HighlightText text={`coding in seconds`}/>
                        </div>
                    }
                    subheading = {
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    codeColor={"text-blue-25"}
                />
            

 
 
             </div>

             {/* code section 1 */}
             <div>
                <ExploreMore/>
             </div>

              </div>

            {/* Section 2 */}
              <div className="bg-pure-greys-5 text-richblack-700">
                 <div className="homepage_bg h-[310px]">

                    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center gap-5 ">
                             <div className="flex items-center gap-7 mt-[190px]">

                                <CTAButton active={true} linkto={"/signup"}>
                                       <div className="flex items-center gap-2">
                                   
                                        Explore full catalog
                                        <BiRightArrowAlt/>
                                  
                                       </div>
                                </CTAButton>

                                 <CTAButton active={false} linkto={"/signup"}>
                                       <div className="flex items-center gap-2 text-white">
                                        Learn more
                                       </div>
                                </CTAButton>
                                
                             </div>
                    </div>

                 </div>

                 <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                  <div className="flex flex-row ml-[60px] gap-2 mt-[95px] mb-[10px]">

                    <div className="text-4xl font-semibold w-[45%]">
                         Get the Skills you need for a
                         <HighlightText text={"Job that is in demand"}/>
                    </div>


                    <div className="flex flex-col items-start gap-5 w-[40%]">
                        <p>The modern StudyNotion is the dictates its own terms.
                             Today, to be a competitive specialist requires more than professional skills.</p>
                        <CTAButton active={true} linkto={"/signup"}>
                           Learn More
                        </CTAButton>   

                    </div>
                  </div>

                   {/* Timeline section */}
                <TimelineSection />

                <LearningLanguageSection />
                <InstructorSection />
                   
                 </div>
              </div>

            {/* Section 3 */}

             <ReviewSlider />
            {/* Footer */}
           <div>
             <Footer/>
           </div>
        </div>
    );
}
export default Home;