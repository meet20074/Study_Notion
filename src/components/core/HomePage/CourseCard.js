
const CourseCard = ({cardData , setCurrentCard , currentCard}) => {
    return (
        <div className={`flex flex-col hover:scale-95 items-start h-[250px] cursor-pointer w-[300px] transition-all duration-200 px-3 text-richblack-400
        ${cardData.heading===currentCard ?  " bg-white "  : "bg-richblack-800"}
        `}
        onClick={()=> setCurrentCard(cardData.heading)}
        >
          
          <p className={`
            mt-[17px] font-bold 
            ${currentCard===cardData.heading ? "text-black" : "text-white"}
            `}>{cardData.heading}</p>
          <p className="mt-[17px]">{cardData.description}</p>
          <div className="flex justify-between  w-full mt-[65px]">
            <p className="font-semibold">{cardData.level}</p>
            <p className="font-semibold">{cardData.lessionNumber} Lessons</p>
          </div>

        </div>
    )
}
export default CourseCard;