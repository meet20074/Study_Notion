import HighlightText from "./HighlightText";
import image1 from "../../../assets/Images/Compare_with_others.svg";
import image2 from "../../../assets/Images/Know_your_progress.svg";
import image3 from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return(
     <div className="mt-[150px] flex flex-col gap-2 items-center">

      <div className="text-3xl text-center font-semibold w-full">
        Your Swiss knife for 
        <HighlightText text={"learning any language"}/>
       
      </div>

      <div className="text-sm text-center w-[70%]">
        <p>  Using spin making learning multiple languages
           easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
      </div>
      <div className="h-[600px]">
      </div>

      <div className="flex absolute mt-[60px] ">
             <img src={image2} className="relative left-[100px] "/>
       <img src={image1}  className="relative top-[20px] "/>
        <img src={image3}  className="relative right-[150px]"/>
      </div>
     


     </div>
  )
}
export default LearningLanguageSection;