import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
];



const TimelineSection = () => {


  return(
     <div className="mt-[110px]">
        <div className="flex items-center">

            <div className="flex flex-col lg:w-[45%] gap-4">
               {
                timeline.map ((element,index) => {
                    return (
                        <div className="flex flex-col items-center gap-5" key={index}>
                           <div className="flex gap-6">

                             <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                    <img src={element.Logo} />
                                </div> 

                             <div className="flex flex-col items-start">
                                 <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>   

                           </div>
                        </div>
                    )
                })
               }

            </div>

        

         <div className='relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]'>

            <img  src={timelineImage}
            alt="timelineImage"
            className='shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit'
            />

            <div className='absolute w-[70%] lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] 
            lg:translate-y-[50%] bg-caribbeangreen-700 top-0 lg:top-auto
            flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 items-center mx-auto '>
                <div className='flex px-5 gap-3 items-center lg:border-r border-caribbeangreen-300'>
                    <p className='text-3xl font-bold '>10</p>
                    <p className='text-caribbeangreen-300 text-sm '>Years of Experience</p>
                </div>

                <div className='flex px-5 gap-3 items-center'>
                <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>TYpe of Courses</p>
                </div>

            </div>

        </div>

        
   </div>

      

     </div>
  )
}
export default TimelineSection;