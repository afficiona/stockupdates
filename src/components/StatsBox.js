import React, { Component } from 'react';
import { TypeChooser } from "react-stockcharts/lib/helper";
import Loader from './../components/Loader';
import Chart from './Chart';
import StatsTabs from './Tabs';
import { getHistoricalData } from "./../utils/normalizer";
import { DEFAULT_ERROR_MESSAGE } from "./../utils/constants";

/**
 * StatsBox is a component to show stats of all the stocks
 */
class StatsBox extends Component {
  constructor() {
    super();
    this.state = {};

    this.componentDidMount = () => {
      //fetch historical data
      getHistoricalData().then(data => {
        this.setState({ data });
      });
    };
  };

  render() {
    const stocksData = this.props.Ticker.get('data');
    const stockCategories = this.props.StockCategories;
    return (
      <div className="stats-box">
        {(() => {
          // Show loader while fetching the stocks
          if (this.props.Ticker.get('isFetching')) {
            return <Loader />;
          } if (this.props.Ticker.get('isFetchingError')) {
            return <p className="text-danger">
              {this.props.Ticker.getIn(['error', 'message'], DEFAULT_ERROR_MESSAGE)}
            </p>
          }

          return [
            <div className="stats-box-header">
              <div>Hifinage</div>
              <div>$ {stocksData.get('close')}</div>
            </div>,

            <div className="stats-box-chart">
              {(() => {
                if (this.state.data) {
                  return (
                    <TypeChooser>
                      {type => <Chart type={type} data={this.state.data} />}
                    </TypeChooser>
                  );
                }
              })()}
            </div>,

            <StatsTabs data={stockCategories} />,

            <div className="stats-box-footer">
              <button className="btn btn-sm btn-primary">Buy</button>
              <button className="btn btn-sm btn-primary">Sell</button>
            </div>
          ]

        })()}
      </div>
    );
  }
}

export default StatsBox;
