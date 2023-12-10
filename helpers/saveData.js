import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const saveData = async (data) => {
  console.log(chalk.bgBlue('Saving products...'));
  const resultFileExists = fs.existsSync(
    path.join(__dirname, '..', 'data', 'products.json')
  );

  try {
    if (!resultFileExists) {
      await fs.promises.writeFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        JSON.stringify(data)
      );
    } else {
      const productsData = await fs.promises.readFile(
        path.resolve(__dirname, '..', 'data', 'products.json'),
        'utf-8'
      );

      const currentProducts = productsData ? JSON.parse(productsData) : [];
      await fs.promises.writeFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        JSON.stringify([...currentProducts, ...data])
      );
    }
  } catch (err) {
    throw err;
  }
};
