import chalk from 'chalk';
import cheerio from 'cheerio';
import { getPageContent } from '../helpers/puppeteer.js';
import { saveData } from '../helpers/saveData.js';

export default async function getDetailsData(data) {
  const products = [];
  try {
    for (const initialData of data) {
      console.log(chalk.green(`Getting data from ${initialData.url}`));
      const detailsPageContent = await getPageContent(initialData.url);
      const $ = cheerio.load(detailsPageContent);

      const title = $('.bodyContent h1:first').text();
      const price = $('.priceWrap strong:first').text() + 'руб.';
      let description = '';

      $('.full.pageBody p').each((i, paragraph) => {
        const paragraphText = $(paragraph).text();
        if (!paragraphText.includes('undefined')) description += paragraphText;
      });

      const product = {
        title,
        price,
        description,
        url: initialData.url,
      };

      console.log(product);
      products.push(product);
    }

    console.log(chalk.bgBlue('All products: '));
    console.log(products);

    saveData(products);
  } catch (err) {
    throw err;
  }
}
