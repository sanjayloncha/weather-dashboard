import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadFavorites, toggleUnit } from "../store/weatherSlice";
import {
    fetchCitiesWeather,
    addFavorite,
    removeFavorite,
} from "../store/weatherSlice";

const defaultCities = ["London", "Delhi", "New York"];

export const Dashboard = () => {
    const dispatch = useDispatch();
    const [addingCity, setAddingCity] = useState(false);
    const { cities, favorites, loading, favoritesLoaded, unit, error } = useSelector(
        (state) => state.weather
    );

    const [query, setQuery] = useState("");
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        dispatch(loadFavorites());
    }, [dispatch]);


    useEffect(() => {
        const citiesToFetch =
            favorites.length > 0 ? favorites : defaultCities;
        if (!favoritesLoaded) return;

        dispatch(fetchCitiesWeather(citiesToFetch));

    }, [favoritesLoaded, favorites, dispatch, unit]);


    const handleAddCity = () => {
        const city = query.trim();
        if (!city) return;

        if (favorites.includes(city)) {
            setSearchError("City already added");
            return;
        }

        setAddingCity(true);

        dispatch(fetchCitiesWeather([city]))
            .unwrap()
            .then(() => {
                dispatch(addFavorite(city));
                setQuery("");
                setSearchError("");
            })
            .catch(() => {
                setSearchError("City not found");
            })
            .finally(() => {
                setAddingCity(false);
            });
    };


    return (
        <div className="p-6">
            <div className="sticky top-0 py-4 z-10 bg-white ">
                <h1 className="text-2xl mb-4">Dashboard</h1>

                <div className="flex items-center justify-between mb-4">

                    {/* Left: Search */}
                    <div className="flex gap-2 w-[75%] mr-4">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search city..."
                            className="border p-2 flex-1 rounded"
                        />
                        <button
                            onClick={handleAddCity}
                            disabled={addingCity}
                            className="bg-blue-500 text-white px-2 rounded disabled:opacity-50"
                        >
                            <svg className="w-[25px] h-[25px] me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                        </button>
                    </div>

                    {/* Right: Unit Toggle */}

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


                {searchError && (
                    <p className="text-red-500 mb-4">{searchError}</p>
                )}
            </div>

            {/* Cards */}
            {loading && Object.keys(cities).length === 0 ? <>

                <div role="status" className="flex items-center">
                    <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="ml-4 text-xl">Loading...</span>
                </div>

            </> :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.values(cities).map((city) => {
                        const isFav = favorites.includes(city.name);

                        return (
                            <div key={city.id} className="border p-4 rounded shadow">

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                            alt={city.weather[0].main}
                                            className="w-10 h-10"
                                        />
                                        <Link to={`/city/${city.name}`}>
                                            <h2 className="text-xl">{city.name}</h2>
                                        </Link>
                                    </div>

                                    <button
                                        onClick={() =>
                                            isFav
                                                ? dispatch(removeFavorite(city.name))
                                                : dispatch(addFavorite(city.name))
                                        }
                                    >
                                        {isFav ? "⭐" : "☆"}
                                    </button>
                                </div>

                                <p>{Math.round(city.main.temp)}°{unit}</p>
                                <p>{city.weather[0].main}</p>

                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
};
