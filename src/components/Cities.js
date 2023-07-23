import React, { useContext, useEffect, useState } from 'react'
import WhetherContext from '../context/context';
import clear from '../img/clear.png'
import overcast from '../img/overcast.png'
import partly from '../img/partly-cloudly.png'
import rainPartly from '../img/rain-partly-cloudly.png'
import rain from '../img/rain.png'
import snow from '../img/snow.png'

function Cities() {
    const {citiesName,selectedCityName,weatherData}=useContext(WhetherContext);

    const [name,setName]=useState("Adana");
    
    const setIcon=(condition)=>{
      switch (condition) {
        case "Rain, Partially cloudy":
          return rainPartly;
        case "Rain":
          return rain;
        case "Partially cloudy":
          return  partly;
        case "Clear":
          return clear;
        case "Overcast":
          return overcast;
        case "Snow":
          return snow;
        default:
          break;
      }
    }

    
    const renderedList=citiesName.map((city,i)=>{
      return (
        <option key={i} value={city.name}>{city.name}</option>
      )
    })


    useEffect(()=>{
      selectedCityName(name);
    },[])

    const handleChange=(e)=>{
      setName(e.target.value)
      selectedCityName(e.target.value);
    }

    const renderedWeather=weatherData.length!==0 && weatherData.days.map((condition, i)=>{
      return (
        <div key={i} className='day'>
          <p className='dayName'>{new Date(condition.datetime).toLocaleDateString('en-US', {weekday: 'short'})}</p>
          
          <img src={setIcon(condition.conditions)} style={{width:"32px",height:"32px"}} alt={condition.conditions}/>
          
          <div className='temp'>
            <span>{`${condition.tempmax }\u00b0`}</span>&nbsp;&nbsp;
            <span>{`${condition.tempmin}\u00b0`}</span>
          </div>
        </div>
      )
    })

  return (
    <div className='container'>
       <div className='dropdown'>
        <select value={name} onChange={handleChange}>
            {renderedList}
          </select>
       </div>
        <div className='days'>
          {renderedWeather}
        </div>
    </div>
  )
}

export default Cities