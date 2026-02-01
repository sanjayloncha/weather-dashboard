import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityDetail, fetchCityForecast, toggleUnit } from "../store/weatherSlice";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";


export const CityDetail = () => {
    const { cityName } = useParams();
    const dispatch = useDispatch();
    const { unit } = useSelector(state => state.weather);

    const { data, loading, error } = useSelector(
        (state) => state.weather.cityDetail
    );

    const { data: forecast } = useSelector(
        (state) => state.weather.cityForecast
    );

    const hourlyData = forecast?.list
        ?.slice(0, 8)
        .map((item) => {
            const date = new Date(item.dt * 1000);

            return {
                time: date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                temp: Math.round(item.main.temp),
            };
        });

    const dailyData = forecast?.list?.reduce((acc, item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString([], { weekday: "short" });

        if (!acc[day]) {
            acc[day] = {
                day,
                temp: item.main.temp,
                count: 1,
            };
        } else {
            acc[day].temp += item.main.temp;
            acc[day].count += 1;
        }

        return acc;
    }, {});

    const dailyChartData = Object.values(dailyData || {}).map(
        (d) => ({
            day: d.day,
            temp: Math.round(d.temp / d.count),
        })
    );



    useEffect(() => {
        dispatch(fetchCityDetail(cityName));
        dispatch(fetchCityForecast(cityName));
    }, [cityName, dispatch, unit]);



    return (
        <div className="p-6">
            <div className="sticky top-0 z-10 bg-white py-4">
                <div className="flex items-center justify-between relative">
                    <Link to={`/`}>
                        <h2 className="text-xl flex items-center mb-4 gap-2">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                            </svg>
                            <span className="text-sm">
                                Dashboard
                            </span>
                        </h2>
                    </Link>
                    <button
                        onClick={() => dispatch(toggleUnit())}
                        className="relative border px-3 py-2 rounded whitespace-nowrap group cursor-pointer"
                    >
                        {unit === "C" ? "°C" : "°F"}

                        <span className="absolute -top-7 left-[30%] -translate-x-1/2 
                   bg-black text-white text-xs px-2 py-1 rounded
                   opacity-0 group-hover:opacity-100 transition
                   whitespace-nowrap">
                            Change to {unit === "C" ? "°F" : "°C"}
                        </span>
                    </button>
                </div>
                <h1 className="text-4xl text-center underline">City Detail</h1>
                {/* <h1 className="text-2xl mb-2">{data.name}</h1> */}
            </div>
            {!loading && data &&
                <>
                    <div className="items-center gap-3 mb-2 w-[100%] sm:w-[30%]">
                        <div className="flex items-center gap-4">
                            <img
                                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                alt={data.weather[0].main}
                                className="w-14 h-14"
                            />
                            <h1 className="text-2xl">{data.name}</h1>
                        </div>
                        <div className="pl-6">
                            <p>Temp: {Math.round(data.main.temp)}°{unit}</p>
                            <p>Condition: {data.weather[0].main}</p>
                            <p>Temp: {Math.round(data.main.temp)}°{unit}</p>
                            <p>Condition: {data.weather[0].main}</p>
                            <p>Humidity: {data.main.humidity}%</p>
                            <p>Wind: {data.wind.speed} m/s</p>
                        </div>
                    </div>
                    {/* <pre>{JSON.stringify(forecast?.list?.slice(0, 5), null, 2)}</pre>
             */}
                    <h2 className="text-xl mt-6 mb-2">Next 24 Hours</h2>

                    <div className="w-full h-64">
                        <ResponsiveContainer>
                            <LineChart data={hourlyData}>
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="temp" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <h2 className="text-xl mt-8 mb-2">Next 5 Days</h2>

                    <div className="w-full h-64">
                        <ResponsiveContainer>
                            <LineChart data={dailyChartData}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="temp" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            }


        </div>
    );
};
