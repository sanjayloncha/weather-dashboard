const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// export const getCurrentWeather = async (city) => {
//     const res = await fetch(
//         `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
//     );
//     if (!res.ok) {
//         throw new Error("City not found");
//     }
//     return res.json();
// };

export const getCurrentWeather = async (city, unit = "C") => {
    const apiUnit = unit === "C" ? "metric" : "imperial";

    const res = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${apiUnit}`
    );

    if (!res.ok) throw new Error("City not found");
    return res.json();
};


export const validateCity = async (city) => {
    const res = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
        throw new Error("City not found");
    }

    return res.json();
};

export const getCityDetail = async (city) => {
    const res = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
        throw new Error("City not found");
    }

    return res.json();
};

// export const getCityForecast = async (city) => {
//     const res = await fetch(
//         `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
//     );

//     if (!res.ok) {
//         throw new Error("Forecast not found");
//     }

//     return res.json();
// };

export const getCityForecast = async (city, unit = "C") => {
    const apiUnit = unit === "C" ? "metric" : "imperial";

    const res = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${apiUnit}`
    );

    if (!res.ok) throw new Error("Forecast not found");
    return res.json();
};

