//Variables de entorno automaticas en archivo JavaScript

const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config()

//console.log(process.env)

const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environment = {
  mapbox_key: "${process.env['MAPBOX_KEY']}",
};
`;

mkdirSync('./src/environments', { recursive: true }); //Recursivo porque si existe, sobreeescribe

writeFileSync(targetPath, envFileContent);
