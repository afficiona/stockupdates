import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

/**
 * Ticker data normalizer. We normalize the data from the original form of csv format
 * to a hashMap of all the stock properties, viz. timestamp, OHLC, volume.
 * Also, `categorized` is added to the map which contains grouping of all the properties
 * with their respective values
 * @param data
 * @returns {{}}
 */
export const normalizeTickerData = data => {
  const columnData = data.split(',');
  return {
    timestamp: columnData[0],
    open: columnData[1],
    high: columnData[2],
    low: columnData[3],
    close: columnData[4],
    volume: columnData[5],
    categorized: []
  };
};

/**
 * Stocks tabs normalizer. We group all the stock properties(volumes, OHLC, etc) with an
 * appropriate label and values.
 * @param data
 * @returns {[]}
 */
export const normalizeTabsData = data => {
  return [{
    label: 'Day High',
    value: data.get('high')
  },{
    label: 'Open',
    value: data.get('open')
  },{
    label: 'Avg Volume',
    value: data.get('volume')
  },{
    label: '52wk High',
    value: data.get('high')
  },{
    label: 'Day Low',
    value: data.get('low')
  },{
    label: 'Today\'s Close',
    value: data.get('close')
  },{
    label: 'Volume',
    value: data.get('volume')
  },{
    label: '52wk Low',
    value: data.get('low')
  }];
};

function parseData(parse) {
  return function(d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

const parseDate = timeParse("%Y-%m-%d");

export function getHistoricalData() {
  const promiseMSFT = fetch("//rrag.github.io/react-stockcharts/data/MSFT.tsv")
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(parseDate)));
  return promiseMSFT;
}
