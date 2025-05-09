import React, { useEffect, useState } from 'react';
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

const HomeController = () => {
    const [inputValue, setInputValue] = useState({ name: '', val: '' });
    const [flight, setFlight] = useState({
        searchPage: false,
        searchAirplane: [],
        loading: false,
        loadingSugg: false,
        from: '',
        to: '',
        fromEle: '',
        toEle: '',
        departDate: '',
        flights: [],
        fromSugg: [],
        toSugg: [],
    })

    const handleInput = (e) => {
        let name = e.target.name
        let val = e.target.value

        setFlight((ele) => ({
            ...ele,
            [name]: val,
            fromSugg: name == 'from' && val.length === 0 && [],
            toSugg: name == 'to' && val.length === 0 && [],
        }))
        setInputValue({ name, val });

    }
    const handleSelectItem = (type, item) => {
        if (type === 'from') {

            setFlight((ele) => ({
                ...ele,
                from: item?.skyId,
                fromSugg: [],
                fromEle: item,
            }))
        } else {
            setFlight((ele) => ({
                ...ele,
                to: item?.skyId,
                toSugg: [],
                toEle: item,
            }))
        }
    }

    const searchFlightsSuggestion = async (name, val) => {


        const options = {
            method: 'GET',
            url: `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${val}&locale=en-US`,
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
            }
        };
        try {
            if (name === 'from') {
                setFlight((ele) => ({
                    ...ele,
                    loadingSugg: true
                }))
                const response = await axios.request(options);
                if (response?.data?.status) {

                    setFlight((ele) => ({
                        ...ele,
                        fromSugg: response?.data?.data,
                        loadingSugg: false
                    }))
                }
            } else if (name === 'to') {
                setFlight((ele) => ({
                    ...ele,
                    loadingSugg: true
                }))
                const response = await axios.request(options);
                if (response?.data?.status) {
                    setFlight((ele) => ({
                        ...ele,
                        toSugg: response?.data?.data,
                        loadingSugg: false
                    }))
                }
            }

        } catch (error) {
            console.error(error);
            alert("Failed to fetch flights");
        }
    };

    const searchFlights = async () => {

        setFlight((ele) => ({
            ...ele,
            loading: true
        }))
        const options = {
            method: 'GET',
            url: `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightEverywhere`,
            params: {
                originEntityId: flight.fromEle?.entityId,
                cabinClass: "economy",
                journeyType: "one_way",
                currency: 'USD',
                destinationEntityId: flight.toEle?.entityId,

                date: flight.departDate,
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
            }
        };
        try {

            const response = await axios.request(options);
            if (response?.data?.status) {
                setFlight((ele) => ({
                    ...ele,
                    searchAirplane: response?.data?.data?.results,
                    loading: false,
                    searchPage: true
                }))
            }


        } catch (error) {
            console.error(error);
            alert("Failed to fetch flights");
        }
    }
    const handleBack = () => {
        setFlight((ele) => ({
            ...ele,
            searchPage: false,
            searchAirplane: []
        }))
    }
    useEffect(() => {
        if (!inputValue.val) return;

        const delay = setTimeout(() => {
            searchFlightsSuggestion(inputValue.name, inputValue.val);
        }, 300);

        return () => clearTimeout(delay);
    }, [inputValue]);
    return { flight, handleBack, handleInput, searchFlights, handleSelectItem }
}

export default HomeController
