import axios from "axios";
export const fetchData = async (country) => {
  const BASE_URL = "https://api.covid19api.com";

  let url = `${BASE_URL}/summary`;

  if (country && country !== "global") {
    const TODAY = Date.now();
    const YESTERDAY = TODAY - 24 * 60 * 60 * 1000;
    url = `${BASE_URL}/country/${country}?from=${YESTERDAY}&to=${TODAY}`;
    try {
      const { data } = await axios.get(url);
      const result = {
        confirmed: data[data.length - 1].Confirmed,
        recovered: data[data.length - 1].Deaths,
        deaths: data[data.length - 1].Recovered,
        lastUpdate: data[data.length - 1].Date,
      };
      return result;
    } catch (error) {
      return {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        lastUpdate: 0,
      };
    }
  } else {
    try {
      const { data } = await axios.get(url);
      const result = {
        confirmed: data.Global.TotalConfirmed,
        recovered: data.Global.TotalRecovered,
        deaths: data.Global.TotalDeaths,
        lastUpdate: data.Date,
      };
      return result;
    } catch (error) {}
  }
};

export const fetchDailyData = async (country) => {
  console.log(country);
  if (country && country !== "global") {
    console.log("country", country);
    const BASE_URL = "https://api.covid19api.com";
    const url = `${BASE_URL}/total/dayone/country/${country}`;
    try {
      const { data } = await axios.get(url);
      const result = data.map((dailyData) => ({
        confirmed: dailyData.Confirmed,
        deaths: dailyData.Deaths,
        date: dailyData.Date,
      }));

      return result;
    } catch (error) {}
  } else {
    const BASE_URL = "https://covid19.mathdro.id/api";
    const url = `${BASE_URL}/daily`;
    try {
      const { data } = await axios.get(url);
      const result = data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      }));

      return result;
    } catch (error) {}
  }
};

export const countries = async () => {
  const BASE_URL = "https://api.covid19api.com";
  try {
    const { data } = await axios.get(`${BASE_URL}/countries`);
    return data.map((country) => ({
      name: country.Country,
      slug: country.Slug,
    }));
  } catch (error) {}
};
