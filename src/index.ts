const divClass = 'YMlKec fxKbKc';

async function main() {
  const initT = Date.now();
  const response = await fetch('https://www.google.com/finance/quote/EUR-BRL');

  const respT = Date.now();
  const data = await response.text();
  const dataT = Date.now();

  const divIndex = data.indexOf(divClass);
  const init = data.indexOf('>', divIndex) + 1;
  const end = data.indexOf('<', init);

  const finishT = Date.now();

  console.log('Data len: %s bytes', data.length);
  console.log(Number(data.slice(init, end)));
  console.log('Resonsed in %sms', respT - initT);
  console.log('Finished in: %sms', finishT - initT);
  console.log(dataT - respT);
}