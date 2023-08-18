import { generateRandomNumber } from '../functions';
import axios from 'axios';

export const fluentdCase = () => {
  console.log('----- fluentdCase -----');
  setInterval(() => {
    const sites = ['daejeon-600', 'daejeon-smart-city', 'mk', 'global-demo'];
    const pages = ['overview', 'chart', 'table'];
    const overviewTitles = ['site-list', 'map', 'overall-statistics'];
    const chartTitles = ['traffic-count', 'detail', 'comparison'];
    const tableTitles = ['traffic-count', 'data-validation', 'turning-count'];

    const site = sites[generateRandomNumber(0, sites.length - 1, true)];
    const page = pages[generateRandomNumber(0, pages.length - 1, true)];
    const title =
      page === 'overview'
        ? overviewTitles[
            generateRandomNumber(0, overviewTitles.length - 1, true)
          ]
        : page === 'chart'
        ? chartTitles[generateRandomNumber(0, chartTitles.length - 1, true)]
        : tableTitles[generateRandomNumber(0, tableTitles.length - 1, true)];

    axios.post(
      `http://localhost:8888/traffic_commander.${site}.${page}.${title}`,
      `json=${JSON.stringify({
        site,
        page,
        title,
      })}`,
    );

    console.log('test');
  }, 1000);
};
