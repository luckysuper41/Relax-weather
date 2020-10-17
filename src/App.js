import React, {useState} from 'react';
import './App.css';

const api={
  key: "d9d44530b5db2c0a14c3abc0a41f0707",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const dataBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    let today = day + " " + date + " " + month + " " + year;

    return today;
  }

  const URL = api.base + "weather?q=" + query + "&units=metric&APPID=" + api.key;

  const search = event => {
    if (event.key === "Enter") {
      fetch(URL)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const output_weather = () => {
    return(
      <>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dataBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}℃
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
      </>
    )
  }


  return (

    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className ="search-bar"
            placeholder = "Search..." 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? output_weather() : null}
      </main>
    </div>
  );
}

export default App;
