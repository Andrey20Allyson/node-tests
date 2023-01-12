import { writeFile, readFile, mkdir } from 'fs/promises';
import { request } from 'http';
import { createConnection } from 'net'

const divClass = 'YMlKec fxKbKc';

const cRequest = request({
  hostname: 'www.google.com',
  port: 80,
  method: 'GET',
  pathname: '/finance/quote/EUR-BRL/',
}, (res) => {
  res.setEncoding('utf-8');

  res.on('readable', () => {
    let data: string;
    while((data = res.read()) !== null) {
      console.log(data);
    }
  });
});

cRequest.end();

// async function main() {
//   const initT = Date.now();
//   const response = await fetch('https://www.google.com/finance/quote/EUR-BRL');

//   const respT = Date.now();
//   const data = await response.text();
//   const dataT = Date.now();

//   const divIndex = data.indexOf(divClass);
//   const init = data.indexOf('>', divIndex) + 1;
//   const end = data.indexOf('<', init);

//   const finishT = Date.now();

//   console.log('Data len: %s bytes', data.length);
//   console.log(Number(data.slice(init, end)));
//   console.log('Resonsed in %sms', respT - initT);
//   console.log('Finished in: %sms', finishT - initT);
//   console.log(dataT - respT);
// }