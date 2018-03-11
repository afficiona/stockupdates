import React, { Component } from 'react';
import classNames from 'classnames';
import { TypeChooser } from "react-stockcharts/lib/helper";
import Loader from './../components/Loader';
import Chart from './Chart';
import StatsTabs from './Tabs';
import { getData } from "./../utils/normalizer";

/**
 * StatsBox is a component to show stats of all the stocks
 */
class StatsBox extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'oneDay',
      activeTabContent: 'oneDay',
      tabs: {
        oneDay: {
          label: '1D'
        },
        oneMonth: {
          label: '1M'
        },
        threeMonth: {
          label: '3M'
        },
        oneYear: {
          label: '1Y'
        }
      }
    };

    this.handleTabsClick = id => {
      this.setState({
        activeTab: id,
        activeTabContent: id
      });
    };

    this.componentDidMount = () => {
      getData().then(data => {
        this.setState({ data });
      });
    };
  };

  render() {
    const stocksData = this.props.Ticker.get('data');
    return (
      <div className="stats-box">
        {(() => {
          if (this.props.Ticker.get('isFetching')) {
            return <Loader />;
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
                      {type => <Chart width="320" type={type} data={this.state.data} />}
                    </TypeChooser>
                  );
                }
              })()}
            </div>,

            <StatsTabs data={stocksData} />,

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
