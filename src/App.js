import React from "react";

import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

import PuffLoader from "react-spinners/PuffLoader";

const API_KEY = '312e0990f0395e6c2757f4650be78929';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  };

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      let data = await api_url.json();

      if(data.cod == '404') {
        this.setState ({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          sunrise: undefined,
          sunset: undefined,
          error: 'Введите корректное название города.',
          sky: undefined
        });
      }

      let sky = data.weather[0].main;
      let img = document.querySelector('.form');
      let p = document.querySelectorAll('.p');
      let weatherBox = document.querySelector('.weather_box')

      if (sky == 'Clear') {
        weatherBox.style.backgroundColor = 'transparent';
        p.forEach(element => {
          element.style.color = 'rgb(192, 192, 192)';
        });
        img.style.backgroundImage = "url('https://free4kwallpapers.com/uploads/originals/2015/10/07/clear-sky-hd-wallpaper.jpg')";
      }
      else if (sky == 'Clouds') {
        weatherBox.style.backgroundColor = 'rgba(136, 136, 135, 0.3)';
        p.forEach(element => {
          element.style.color = 'rgb(59, 59, 59)';
        });
        img.style.backgroundImage = "url('https://www.thoughtco.com/thmb/2QXXNzOu2Cab17aWCxkkd9ln9D8=/1257x835/filters:fill(auto,1)/521928855-56a9e2925f9b58b7d0ffac0a.jpg')";
      }
      else if (sky == 'Mist' || sky == 'Fog') {
        weatherBox.style.backgroundColor = 'transparent';
        p.forEach(element => {
          element.style.color = 'rgb(192, 192, 192)';
        });
        img.style.backgroundImage = "url('https://www.wallpaperflare.com/static/298/602/525/mountains-nature-forest-mist-wallpaper.jpg')";
      }
      else if (sky == 'Rain') {
        weatherBox.style.backgroundColor = 'rgba(136, 136, 135, 0.5)';
        p.forEach(element => {
          element.style.color = 'rgb(192, 192, 192)';
        });
        img.style.backgroundImage = "url('https://th.bing.com/th/id/R3c704a2413a26ca696741732df365085?rik=r4ll5YVSHmeQFg&pid=ImgRaw')";
      }


      console.log(data);

      // Переводим данные времени заката в нормальный вид
      let sunsetInSec = data.sys.sunset
      let date = new Date(sunsetInSec * 1000)
      let timeSunset = date.toLocaleTimeString()

      // Переводим данные времени рассвета в нормальный вид
      let sunriseInSec = data.sys.sunrise
      date = new Date(sunriseInSec * 1000)
      let timeSunrise = date.toLocaleTimeString()

      // Переводим из Кельвина в Цельсия
      let tempK = data.main.temp;
      let tempC = Math.round(tempK - 273.15);

      // Переводим из hpa в мм рт. ст.
      let pressure = data.main.pressure;
      let pressureInMmHg = Math.floor(pressure * 0.75006);

      this.setState ({
        temp: tempC,
        city: data.name,
        country: data.sys.country,
        pressure: pressureInMmHg,
        sunrise: timeSunrise,
        sunset: timeSunset,
        error: undefined,
        sky: data.weather[0].main
      });

    } else {
      this.setState ({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Введите название города",
        sky: undefined
      });
    }
  }

  componentDidMount(){
    setTimeout(() => { 
      this.setState({loading: false})
    },2000)
  }

  render() {
    let content = this.state.loading ? 
    <div className='loader'>
      <PuffLoader 
      color={'#36D7B7'} 
      isLoading={this.state.loading}
      cssOverride={{
          display: "block",
          margin: "0 auto",
          borderColor: "red"
      }}
      size={500} />
    </div> 
    : 
    <div className="main">
    <div className="container">
      <div className="col-sm-5 info">
        <Info />
      </div>
      <div className="col-sm-7 form">
        <Form weatherMethod={this.gettingWeather}/>
        <Weather 
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          pressure={this.state.pressure}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          error={this.state.error}
          sky={this.state.sky}
        />
      </div>
    </div>
  </div>
    return (
      <div>{content}</div>
    );
  }
}


export default App;
