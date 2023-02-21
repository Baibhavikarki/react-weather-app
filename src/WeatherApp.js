import React, { Component } from "react";
import "./App.css";

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = { city: "", temp: 0, desc: "", icon: "", loading: true };

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=Metric&APIkey=4536f10cfeee2358f3da2caf581f58b5`
    )
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          temp: responseData.main.temp,
          desc: responseData.weather[0].description,
          icon: responseData.weather[0].icon,
          loading: false,
        });
      })
      .catch((err) => console.error(err));
  }

  handleCityChange(event) {
    console.log(event);
    this.setState({ city: event.target.value });
  }

  renderWeather() {
    const imgSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;

    if (this.state.loading) {
      return <p>Please select a city to get the weather information.</p>;
    }

    return (
      <div>
        <p>Temperature: {this.state.temp} °C</p>
        <p>Description: {this.state.desc}</p>
        <img src={imgSrc} alt="Weather icon" />
      </div>
    );
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            City:
            <select value={this.state.city} onChange={this.handleCityChange}>
                <option value="">Select</option>
              <option value="Toronto">Toronto</option>
              <option value="Montreal">Montreal</option>
              <option value="Vancouver">Vancouver</option>
            </select>
          </label>
          <button type="submit">Get Weather</button>
        </form>
        {this.renderWeather()}
      </div>
    );
  }
}

export default WeatherApp;
