import "./App.css";
import { WiMoonAltNew } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { FaSearch } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { useState } from "react";

function App() {
  const ApiKey = "8d4307ecfba535eab8b282754efac7eb";
  const ApiBase = "https://api.openweathermap.org/data/2.5/weather";

  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [country, setCountry] = useState("");

  async function handleSearch() {
    if (input.trim() === "") {
      alert("Preencha o campo");
      return;
    }

    try {
      const response = await fetch(
        `${ApiBase}?q=${input}&units=metric&appid=${ApiKey}`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setCity(data.name);
        setTemperature(data.main.temp);
        setDescription(data.weather[0].description);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setCountry(
          `https://flagcdn.com/w320/${data.sys.country.toLowerCase()}.png`
        );
      } else {
        alert("Cidade não encontrada!");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      alert("Ocorreu um erro ao buscar os dados. Tente novamente.");
    }
  }

  return (
    <>
      <div className="conteiner">
        <div className="form">
          <h3>Confira o clima de uma cidade</h3>
          <div className="form-input-conteiner">
            <input
              type="text"
              placeholder="Digite o nome da cidade"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSearch}>
              <FaSearch size={25} />
            </button>
          </div>
        </div>

        <div id="weather-data">
          <h2>
            <SiGooglemaps size={25} color="orangered" />
            <span id="city">{city || "Cidade"}</span>
            <img src={country} id="country" alt="bandeira do país" />
          </h2>
          <p id="temperature">
            <span>{temperature || "--"}</span>&deg;C
          </p>

          <div id="description-conteiner">
            <p id="description">{description || "Descrição do clima"}</p>
            <WiMoonAltNew color="orangered" id="weather-icon" />
          </div>

          <div className="div">
            <div id="details-conteiner">
              <p id="umidity">
                <WiHumidity size={25} color="#0059ff" />
                <span>{humidity || "--"}%</span>
              </p>
            </div>
            <div id="details-conteiner">
              <p id="wind">
                <WiStrongWind size={25} />
                <span>{wind || "--"} km/h</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
