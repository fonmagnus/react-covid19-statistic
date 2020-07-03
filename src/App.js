import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

class App extends React.Component {
  state = {
    data: {},
    selectedCountry: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData(this.state.selectedCountry);
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    this.setState({
      data: fetchedData,
      selectedCountry: country,
    });
  };

  render() {
    const { data, selectedCountry } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={selectedCountry} />
      </div>
    );
  }
}

export default App;
