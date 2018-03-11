import React, { Component } from 'react';
import classNames from 'classnames';

/**
 * StatsBox is a component to show stats of all the stocks
 */
class StatsTabs extends Component {
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
  };

  render() {
    const stats = [{
      label: 'Day High',
      value: this.props.data.get('high')
    },{
      label: 'Open',
      value: this.props.data.get('open')
    },{
      label: 'Avg Volume',
      value: this.props.data.get('volume')
    },{
      label: '52wk High',
      value: this.props.data.get('high')
    },{
      label: 'Day Low',
      value: this.props.data.get('low')
    },{
      label: 'Today\'s Close',
      value: this.props.data.get('close')
    },{
      label: 'Volume',
      value: this.props.data.get('volume')
    },{
      label: '52wk Low',
      value: this.props.data.get('low')
    }];
    return (
      <div className="stats-box-tabs">
        <div className="tabs-header">
          {(() => {
            return Object.keys(this.state.tabs).map(tab => {
              const thisTab = this.state.tabs[tab];
              const linkClasses = classNames('link', {
                active: tab === this.state.activeTab
              });
              return (
                <div
                  className={linkClasses}
                  onClick={() => this.handleTabsClick(tab)}
                >
                  {thisTab.label}
                </div>
              )
            });
          })()}
        </div>
        <div className="tabs-content">
          <div
            className={classNames('content', {active: this.state.activeTabContent === 'oneDay'})}
          >
            {stats.map(stat => (
              <div className="each-stat">
                <div className="each-stat-label">{stat.label}</div>
                <div className="each-stat-value">${stat.value}</div>
              </div>
            ))}
          </div>
          <div
            className={classNames('content', {active: this.state.activeTabContent === 'oneMonth'})}
          >
            content 2
          </div>
          <div
            className={classNames('content', {active: this.state.activeTabContent === 'threeMonth'})}
          >
            content 3
          </div>
          <div
            className={classNames('content', {active: this.state.activeTabContent === 'oneYear'})}
          >
            content 4
          </div>
        </div>
      </div>
    );
  }
}

export default StatsTabs;
