import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

const WhetherContext=createContext();

function WhetherProvider({children}){
    const [cities,setCities]=useState([]);
    const [citiesName,setCitiesName]=useState([]);
    const [weatherData,setWeatherData]=useState([]);

    const date = new Date();

    const startDate = getDate(date);

    let endDate=date.setDate(date.getDate()+7);

    endDate=new Date(endDate);
    
    endDate=getDate(endDate);

    const fetchCities = async () =>{
    const response= await axios.get('https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json')
                .then((res)=>res.data);
    setCities(response)
    }

    useEffect(()=>{
        const addCity=cities.map((city)=>{
            return {...citiesName,
                name:city.name}
        },)

        setCitiesName(addCity);
    },[cities])

    const selectedCityName=async (name)=>{
        await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name}/${startDate}/${endDate}?unitGroup=metric&include=days%2Ccurrent&key=8JQ5S7BGMG3Z7469MWJ2QRJ2G&contentType=json`)
        .then((res)=>setWeatherData(res.data)).catch(()=>setWeatherData(''));
    }

    const values={
        fetchCities,
        citiesName,
        selectedCityName,
        weatherData
    }
    return (<WhetherContext.Provider value={values}>
        {children}
    </WhetherContext.Provider>);
}

function getDate(date){
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const resultDate = [year, month, day].join('-');

    return resultDate;
}

export {WhetherProvider};
export default WhetherContext;