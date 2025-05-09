import React from 'react'

const FlightDetails = ({ flights }) => {

    return (
        <div className="max-w-xl mx-auto p-2 rounded flex flex-col gap-2">
            {
                flights?.searchAirplane.length > 0 ?
                    <>
                        {flights?.searchAirplane?.map((ele, i) => (
                            <div key={i} className='flex gap-3 justify-between rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer py-2  px-3 shadow-xl shadow-gray-600'>
                                <div className='flex justify-start items-start flex-col'>
                                    <h2 className=' font-bold text-[20px] sm:text-[23px] text-slate-800'>{flights.from} - {ele?.content?.location?.skyCode}</h2>
                                    <h2 className=' font-bold text-[16px] sm:text-[18px] text-slate-500'>{ele?.content?.location?.name}</h2>
                                    <h4 className='font-bold text-[15px] sm:text-[18px] text-slate-800'><span className='font-semibold text-[14px] text-slate-600'>Price:</span> {ele?.content?.flightQuotes?.cheapest?.price}{ele?.content?.flightQuotes?.direct && `- ${ele?.content?.flightQuotes?.direct?.price}`}</h4>
                                    {ele?.content?.flightRoutes?.directFlightsAvailable &&
                                        <p className='font-bold text-[13px] sm:text-[15px] text-slate-500 '>Direct Flight Available</p>
                                    }
                                </div>
                                <div>
                                    <img className='w-[130px] h-[100px] sm:w-[150px] sm:h-[120px] rounded-lg' src={ele?.content?.image?.url} alt='plane...' />
                                </div>
                            </div>
                        ))}
                    </>
                    :
                    <>
                        <div className='flex gap-3 justify-between rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer py-2  px-3 shadow-xl shadow-gray-600'>
                            <div className='flex justify-start items-start flex-col'>
                                <h2 className=' font-bold text-[20px] sm:text-[23px] text-slate-800'> NO Flights Found</h2>

                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default FlightDetails
