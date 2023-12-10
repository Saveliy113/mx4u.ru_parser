import cheerio from 'cheerio';
import chalk from 'chalk';
import { arrayFromLength } from './helpers/common.js';
import { getPageContent } from './helpers/puppeteer.js';
import getDetailsData from './handlers/getDetailsData.js';

const SITE = 'https://shop.mx4u.ru/catalog/shlemi.38/';
const page = 1;

(async function main() {
  try {
    for (const page of arrayFromLength(8)) {
      let url;
      if (page === 1) {
        url = SITE;
      } else {
        return;
        url = `${SITE}?page-${page}.html`;
      }

      const pageContent = await getPageContent(url);
      const $ = cheerio.load(pageContent);
      const products = [];

      $('#products .pad .text .name a').each((i, product) => {
        const productTitle = $(product).attr('title');
        const url = $(product).attr('href');
        products.push({
          url: `https://shop.mx4u.ru${url}`,
          title: productTitle,
        });
      });

      console.log(products);
      console.log(chalk.blue(products.length));

      await getDetailsData(products);
    }
  } catch (err) {
    console.log(chalk.red('An error has occured \n'));
    console.log(err);
  }
})();
