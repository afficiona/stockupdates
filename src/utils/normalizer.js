import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

/**
 * Ticker data normalizer. We normalize the data from the original form of [[name, value]...]
 * to a hashMap of all the stock names with their corresponding data values.
 * @param data
 * @returns {{}}
 */
export const normalizeTickerData = function(data) {
  const columnData = data.split(',');
  return {
    timestamp: columnData[0],
    open: columnData[1],
    high: columnData[2],
    low: columnData[3],
    close: columnData[4],
    volume: columnData[5]
  };
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

export function getData() {
  const promiseMSFT = fetch("//rrag.github.io/react-stockcharts/data/MSFT.tsv")
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(parseDate)));
  return promiseMSFT;
}
