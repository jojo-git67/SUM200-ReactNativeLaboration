function translateWeather(weather){
    switch(weather){
        case "clear": return "Clear Sky"; 
        case "pcloudy": return  "Partly Cloudy"; 
        case "mcloudy": return  "Mostly Cloudy"; 
        case "cloudy": return "Cloudy";
        case "lightrain": return  "Light Rain";
        case "rain": return "Raining"; 
        case "oshower": return "Occasional Showers"; 
        case "ishower": return "Intermittent Showers";
        case "lightsnow": return "Light Snow";
        case "snow": return "Snow"; 
        case "rainsnow": return "Rain and Snow"; 
        case "ts": return "Thunderstorm"; 
        case "tsrain": return "Thunderstorm and rain";
        case "humid": return "High humidity";
        default: return "Unknown weather";
    }
}
function getWeatherEmoji(weather){
    switch(weather){
        case "clear": return "☀️"; 
        case "pcloudy": return  "🌤️"; 
        case "mcloudy": return  "⛅"; 
        case "cloudy": return "☁️";
        case "lightrain": return  "🌦️";
        case "rain": return "🌧️"; 
        case "oshower": return "🌦️"; 
        case "ishower": return "🌦️";
        case "lightsnow": return "🌨️";
        case "snow": return "❄️"; 
        case "rainsnow": return "🌨️"; 
        case "ts": return "⛈️"; 
        case "tsrain": return "⛈️";
        case "humid": return "🌦️";
        default: return "❌";
    }
}

function translateWind(wind){
    switch(wind){
        case 0: return "Calm";
        case 1: return "Light Air";
        case 2: return "Light Breeze";
        case 3: return "Gentle Breeze";
        case 4: return "Moderate Breeze";
        case 5: return "Fresh Breeze";
        case 6: return "Strong Breeze";
        case 7: return "Near Gale";
        case 8: return "Gale";
        case 9: return "Strong Gale";
        case 10: return "Storm";
        case 11: return "Violent Storm";
        case 12: return "Hurricane Force";
        default: return "Unknown wind conditions";
    }
}

export { translateWeather, getWeatherEmoji, translateWind };