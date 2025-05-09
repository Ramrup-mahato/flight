 import axios from "axios";
 const apiKey = process.env.REACT_APP_API_KEY;
 
 export const getApiResult = async (url,) => {
        // setLoading(true);
        const options = {
          method: 'GET',
          url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=ne&locale=en-US',
          // params: {
          //   query:'nepal',
          //   locale:"en-US"
          //   // from,
          //   // to,
          //   // legs:[{"destination":"LOND","origin":"LAXA","date":"2025-05-20"}],
          //   // date: departDate,
          //   // adults: '1',
          //   // sessionId:'ClQIARJQCk4KJGVkMmQzNmM4LTBmZTMtNDMyMC05MDQ4LTEzNjkyZWU4ZGViZRACGiQxNDMwMzY4Yy1lZjJkLTQwY2UtYjUyZS1iYjQ5YzQ4Y2JiNDc='
          // },
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
          }
        };
        try {
            const response = await axios.request(options);
            // setFlights(response.data.data || []);
          } catch (error) {
            console.error(error);
            alert("Failed to fetch flights");
          }
        //   setLoading(false);
        };
