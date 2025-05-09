import React, { useState } from "react";

import HomeController from "./HomeController";
import fly from './plane-flying.gif'
import FlightDetails from "./FlightDetails";

const Home = () => {
  const { handleSelectItem, flight, handleBack, handleInput, searchFlights } = HomeController()
  return (

    <div className="min-h-screen bg-blue-100 p-4 relative">
      {!flight.searchPage &&
        <div>
          <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-xl font-bold mb-4">Flight Search</h1>
            <div className="relative">
              <input type="text" placeholder="From (Ex:- NEPAL)" className="input" name="from" value={flight.from} onChange={(e) => handleInput(e)} />
              {flight.fromSugg.length > 0 &&
                <div className="absolute top-[40px]  w-full  shadow-lg shadow-gray-400 rounded-md z-10 bg-white flex gap-1 flex-col px-3 py-2">
                  {
                    flight.fromSugg?.map((ele, i) => (
                      <div key={i} onClick={() => handleSelectItem('from', ele)} className="flex justify-between items-center px-5 py-1 bg-slate-100 rounded hover:bg-slate-200 cursor-pointer">
                        <div className="flex flex-col justify-center items-start">
                          <h2 className="text-[14px] sm:text-[16px] text-slate-800 font-bold ">{ele?.navigation?.localizedName}</h2>
                          <p className="text-[13px] text-slate-400 font-bold ">{ele?.entityId}</p>
                        </div>
                        <div>
                          <h1 className="text-[18px] sm:text-[20px] text-slate-800 font-bold ">{ele?.skyId}</h1>
                        </div>
                      </div>
                    ))}

                </div>}
              {flight.loadingSugg &&
                <div className="absolute top-[100px] bg-white z-10 left-0 w-full h-[200px] flex justify-center shadow-xl shadow-slate-600 drop-shadow-2xl rounded-2xl ">
                  <div className="flex w-full h-full justify-center items-center ">
                    <img src={fly} alt="fly airplane..." className="rounded   " />
                  </div>
                </div>
              }
            </div>
            <div className="relative">
              <input type="text" placeholder="To (EX:- US)" className="input" name="to" value={flight.to} onChange={(e) => handleInput(e)} />
              {flight.toSugg.length > 0 &&
                <div className="absolute top-[40px]  w-full  shadow-lg shadow-gray-400 rounded-md z-10 bg-white flex gap-1 flex-col px-3 py-2">
                  {
                    flight.toSugg?.map((ele, i) => (
                      <div key={i} onClick={() => handleSelectItem('to', ele)} className="flex justify-between items-center px-5 py-1 bg-slate-100 rounded hover:bg-slate-200 cursor-pointer">
                        <div className="flex flex-col justify-center items-start">
                          <h2 className="text-[16px] text-slate-800 font-bold ">{ele?.navigation?.localizedName}</h2>
                          <p className="text-[13px] text-slate-400 font-bold ">{ele?.entityId}</p>
                        </div>
                        <div>
                          <h1 className="text-[20px] text-slate-800 font-bold ">{ele?.skyId}</h1>
                        </div>
                      </div>
                    ))}
                </div>}
            </div>
            <input type="date" className="input" value={flight.departDate} name="departDate" onChange={(e) => handleInput(e)} />
            <button onClick={searchFlights} className="bg-blue-500 text-white px-4 py-2 mt-2 w-full rounded-full hover:bg-blue-600">
              {flight.loading ? "Searching..." : "Search Flights"}
            </button>
          </div>

          <div className="mt-8 max-w-3xl mx-auto">
            {flight.flights.map((flight, i) => (
              <div key={i} className="bg-white shadow p-4 mb-4 rounded">
                <p className="font-bold">{flight.airline}</p>
                <p>From: {flight.from} → To: {flight.to}</p>
                <p>Departure: {flight.departureTime} | Duration: {flight.duration}</p>
                <p className="text-green-600  font-semibold">Price: ${flight.price}</p>
              </div>
            ))}
          </div>
        </div>
      }
      {flight.loading &&
        <div className="absolute top-0 right-0 w-full h-full bg-[rgba(0,123,255,0.57)] flex justify-center items-center">
          <div className="bg-slate-400 ">
            <img src={fly} alt="fly airplane..." className="rounded" />
          </div>
        </div>
      }
      {flight.searchPage &&
        (<>
          <div className="max-w-xl mx-auto p-2  flex flex-col gap-2 rounded-lg bg-blue-50   shadow-xl shadow-gray-600" >

            <button onClick={handleBack} className="bg-slate-300 w-[100px] font-semibold cursor-pointer rounded-full">back</button>
          </div>

          <FlightDetails flights={flight} />
        </>
        )
      }
    </div>
  )
}

export default Home
