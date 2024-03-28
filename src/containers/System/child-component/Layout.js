import React, { Component } from 'react';
import { Chart } from "chart.js/auto"
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import _ from 'lodash'

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDate: [],
      arrEnergy: [],
      arrHumidy: [],
      arrTemp: [],
    }
  }

  async componentDidMount() {
    this.buildDate();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataDate !== this.props.dataDate) {
      this.buildDate();
    }
  }

  buildDate = () => {
    let arrDate = this.props.dataDate;
    let buildArrDate = [];
    if (!_.isEmpty(arrDate)) {
      arrDate.map((item, index) => {
        buildArrDate.push(moment(moment.unix(item / 1000).startOf('day').valueOf()).format('DD/MM'));
      })
    }
    if (buildArrDate.length > 0) {
      this.setState({
        ...this.state.arrDate = buildArrDate
      })
    }
  }

  buildData = () => {
    let data = {};
    data.labels = this.state.arrDate;
    let item1 = {
      label: "(kWh) Energy",
      data: this.props.dataEnergy,
      borderColor: "rgba(80, 142, 84, 1)",
      backgroundColor: "rgb(80, 142, 84,0.3)",
    }
    let item2 = {
      label: `(°C) Temperature`,
      data: this.props.dataTemp,
      borderColor: "rgba(218, 181, 88, 1)",
      backgroundColor: "rgb(218, 181, 88,0.3)",
    }
    let item3 = {
      label: `(%) Humidy`,
      data: this.props.dataHumidy,
      borderColor: "rgba(164, 72, 72, 1)",
      backgroundColor: "rgb(164, 72, 72,0.3)",
    }

    data.datasets = [];
    data.datasets[0] = item1;
    data.datasets[1] = item2;
    data.datasets[2] = item3;
    return data;
  }
  render() {
    let data = this.buildData();
    return (
      <div>
        <Line data={data} />
      </div>
    );
  }
}

export default Layout;