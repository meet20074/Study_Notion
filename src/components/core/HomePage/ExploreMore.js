 import { useState } from "react";
 import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";
 
 const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills path",
    "Career paths"
 ]


const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
       setCurrentTab(value);
       const result = HomePageExplore.filter ( (element) => element.tag === value);
       setCourses(result[0].courses);
       setCurrentCard(result[0].courses[0].heading);
    }
    return (
        <div className="flex flex-col items-center gap-2">
            <div>
               <p className="text-4xl font-semibold text-center">
                 Unlock the
                <HighlightText text={"Power of code"}/>
               </p>
            </div>

            <p className="text-sm text-center text-richblack-200">Learn to build anything you imagine</p>

            <div className="mt-5 mb-5 border-richblack-200 flex bg-richblack-800 px-2 py-1 gap-4 rounded-full">
                {
                    tabsName.map((element , index) => {
                        return (
                            <div className={
                                `text-[16px] px-2 py-1 flex gap-7 items-center transition-all duration-200 cursor-pointer rounded-full
                                ${element === currentTab ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"}
                                hover:bg-richblack-900 hover:text-richblack-5
                                `
                            }
                            key={index}
                            onClick={() => setMyCards(element)}
                            >
                                {element}
                            </div>
                        )
                    })
                }
            </div>

            <div className="h-[150px]">

            </div>

            <div className="mt-[50px] flex gap-10 w-full absolute translate-y-[50%] translate-x-[20%]">
               {
                courses.map ((course , index) => {
                    return (
                       <CourseCard 
                       cardData = {course}
                       key = {index}
                       setCurrentCard = {setCurrentCard}
                       currentCard = {currentCard}
                       />
                    )
                })
               }
            </div>

        </div>
    )
}
export default ExploreMore;