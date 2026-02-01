import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCityForecast, getCurrentWeather } from "../services/weatherApi";


export const fetchCitiesWeather = createAsyncThunk(
    "weather/fetchCitiesWeather",
    async (cities, { getState }) => {
        const unit = getState().weather.unit;
        const data = await Promise.all(
            cities.map(city => getCurrentWeather(city, unit))
        );
        return data;
    }
);


export const fetchCityDetail = createAsyncThunk(
    "weather/fetchCityDetail",
    async (city, { getState }) => {
        const unit = getState().weather.unit;
        const res = await getCurrentWeather(city, unit);
        return res;
    }
);

export const fetchCityForecast = createAsyncThunk(
    "weather/fetchCityForecast",
    async (city, { getState }) => {
        const unit = getState().weather.unit;
        const res = await getCityForecast(city, unit);
        return res;
    }
);




const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        cities: {},
        favorites: [],
        favoritesLoaded: false,
        unit: localStorage.getItem("unit") || "C",
        loading: false,
        error: null,
        cityDetail: {
            data: null,
            loading: false,
            error: null,
        },
        cityForecast: {
            data: null,
            loading: false,
            error: null,
        }
    },

    reducers: {
        addFavorite: (state, action) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(
                city => city !== action.payload
            );
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        loadFavorites: (state) => {
            const saved = JSON.parse(localStorage.getItem("favorites")) || [];
            state.favorites = saved;
            state.favoritesLoaded = true;
        },
        toggleUnit: (state) => {
            state.unit = state.unit === "C" ? "F" : "C";
            localStorage.setItem("unit", state.unit);
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCitiesWeather.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCitiesWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = {};
                action.payload.forEach(city => {
                    state.cities[city.name] = city;
                });
            })
            .addCase(fetchCitiesWeather.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch weather";
            })
            .addCase(fetchCityDetail.pending, (state) => {
                state.cityDetail.loading = true;
                state.cityDetail.error = null;
            })
            .addCase(fetchCityDetail.fulfilled, (state, action) => {
                state.cityDetail.loading = false;
                state.cityDetail.data = action.payload;
            })
            .addCase(fetchCityDetail.rejected, (state) => {
                state.cityDetail.loading = false;
                state.cityDetail.error = "Failed to load city detail";
            })
            .addCase(fetchCityForecast.pending, (state) => {
                state.cityForecast.loading = true;
            })
            .addCase(fetchCityForecast.fulfilled, (state, action) => {
                state.cityForecast.loading = false;
                state.cityForecast.data = action.payload;
            })
            .addCase(fetchCityForecast.rejected, (state) => {
                state.cityForecast.loading = false;
                state.cityForecast.error = "Failed to load forecast";
            })


    },
});

export const { addFavorite, removeFavorite, loadFavorites, toggleUnit } =
    weatherSlice.actions;

export default weatherSlice.reducer;
