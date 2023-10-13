import React,{useState,useEffect} from 'react'
import image from '../Images/rec.png'
import icons from '../Images/icons8-search.svg'
import styled from 'styled-components'
import Back from '../Images/pexels-josh-sorenson-391522.jpg'
import axios from 'axios'

const Maincomponent = () => {
    
    const [city, setCity] = useState('');  // State for input
    const [weatherData, setWeatherData] = useState(null);  // State for weather data
    const [error, setError] = useState(null);  // State for errors
    const [isCelsius, setIsCelsius] = useState(true);  // State to check if temp is in Celsius

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://weatherbackend-5k9z.onrender.com/api/products/london`);
                setWeatherData(response.data);
            } catch (err) {
                console.error("Error fetching initial data:", err);
            }
        };
        
        fetchData();
    }, []);
    
    
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };
    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://weatherbackend-5k9z.onrender.com/api/products/${city}`);
            if (response.data.cod !== 200) {
                setError(response.data.message);
                setWeatherData(null);
                return;
            }
            setWeatherData(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch weather data.");
            setWeatherData(null);
        }
    };

        const toggleTemperature = () => {
            setIsCelsius(!isCelsius);
        };
        const getDisplayedTemperature = () => {
            if (!weatherData || !weatherData.main) return 'N/A';
        
            const temperature = isCelsius
                ? `${weatherData.main.temp}°C`
                : `${((weatherData.main.temp * 9/5) + 32).toFixed(1)}°F`;
        
            return temperature;
        };
        

        const weatherDetails = weatherData ? [
            { label: "Humidity", value: `${weatherData.main.humidity}%` },
            { label: "Wind Speed", value: `${weatherData.wind.speed} m/s` },
            { label: "Visibility", value: `${weatherData.visibility/1000} km` }
        ] : [];
  return (
    <Cover>
     <Container>
        <Firstcomp>
            <div className='firstinner'>
                <div className='Temp'>
                <h1>{getDisplayedTemperature()}</h1>        
                    <button onClick={toggleTemperature}> Change to {isCelsius ? "Fahrenheit" : "Celsius"}</button>
                </div>
                 <h3>{weatherData ? weatherData.name : 'N/A'}</h3>
                <div className='Wheatherinfo'>
                    <img src={weatherData ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` : image} alt="Weather Icon" />
                    <p>{weatherData ? weatherData.weather[0].description : 'N/A'}</p>
                </div>
            </div>
        </Firstcomp>
        <Secondcomp>
            <Inputdiv>
                <input 
                    placeholder='Add City' 
                    type="text" 
                    value={city}
                    onChange={handleInputChange}
                />
                <div className='Button' onClick={handleSearch}>
                    <img src={icons} alt="Search" />
                </div>
            </Inputdiv>
            <Subcomp>
            {weatherDetails.map((detail, index) => (
                <Components key={index}>
                    <p>{detail.label}</p>
                    <p>{detail.value}</p>
                </Components>
            ))}
            </Subcomp>
            </Secondcomp>
        {error && <p>{error}</p>}
    </Container>
</Cover>
  )
}

export default Maincomponent


const Cover = styled.div`
    min-width: max(100vw, 52rem);
    max-height: 100vh;
    height: 100vh;
    position: relative;
    color: white;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url(${Back});
        background-size: cover;
        background-position: center;
        z-index: 0;
    }
`

const Container = styled.div`
    display: flex;
    height: 100%;
    @media  (max-width: 768px) {
        flex-direction: column;
    }
 `
const Firstcomp = styled.div`
 display: flex;
   width: 70%;
   height: 100%;
   align-items: flex-end;
   position: relative;
    z-index: 1;
    @media  (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        width: 100%;

    }
.firstinner{
    margin-left:5rem;
    gap:1rem;
    height: 20rem;
    display: flex;
    align-items: center;
    .Temp{
         display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        button{
            padding-inline: 1rem;
            padding-block: .5rem;
            background-color: #ffffdb ;
            border: none;
            border-radius: .3rem;
         }
    }
    h3{
        font-size: clamp(1rem, 0.6923rem + 1.5385vw, 2rem);
        }
    h1{
        font-size: clamp(2rem, 1.0769rem + 4.6154vw, 5rem);;
        margin: 0;
    }
    p{
        margin: 0;

    }
    .Wheatherinfo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:.5rem;
         img{
            width: 3rem;
        }
    }
   }
 `
 const Secondcomp = styled.div`
    width: 30%;
    padding: 2rem;
    background-color: rgba(4, 4, 4, 0.1); 
    backdrop-filter: blur(10px);  
    border-radius: 10px;  
    box-shadow: 0 4px 6px rgba(182, 182, 182, 0.13);  
    position: relative;
    z-index: 1;
    border: 1px solid rgba(255, 255, 255, 0.2);  /* subtle border for the glass effect */

    @media  (max-width: 768px) {
        width: 100%;
        padding: 1rem;
    }
`;

 const Inputdiv = styled.div`
 display: flex;
 justify-content: space-evenly;
 align-items: center;
 position: relative;
    z-index: 2;
 input{
    width: 70%;
    padding:1rem;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    color: white;
 }
 .Button{
    padding:1rem;
    background-color: orange;
    border-radius: 0.5rem;
    
 }
  `
  const Subcomp = styled.div`
    padding:1rem;
     margin-top: 2rem;
     position: relative;
    z-index: 2;
   `
  const Components = styled.div`
  display: flex;
  justify-content: space-between;
  margin-inline: 1rem;
  border-bottom: 1px solid rgba(213, 213, 213, 0.252);;
  margin-bottom: .5rem;
  `