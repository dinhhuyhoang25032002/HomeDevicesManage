import React,{ Component } from 'react';
import { Chart } from "chart.js/auto"
import { Line ,Bar,Doughnut} from 'react-chartjs-2';


class Layout extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Line data={this.props.data} />
      </div>
    );
  }
}

export default Layout;