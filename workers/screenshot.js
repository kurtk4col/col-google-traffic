const dotenv = require ('dotenv').config();
const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary').v2; // Make sure to use v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log(cloudinary.config());

async function getPic() {
  console.log("Begin getPic");
  const timestamp = await (new Date()).toISOString()
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/maps/@39.9719159,-105.1399829,14z/data=!5m1!1e1');
  //await page.goto('https://www.google.com/maps/dir/749+Main+St,+Louisville,+CO+80027,+USA/3337+East+138th+Avenue,+Thornton,+CO+80602-8793,+USA/@39.9637158,-105.1050102,12z/am=t/data=!4m14!4m13!1m5!1m1!1s0x876bf35c31d85929:0x71500249c45ebd3f!2m2!1d-105.1325197!2d39.9775414!1m5!1m1!1s0x876c7487ad12c7b5:0x6bdc68920f29d212!2m2!1d-104.9483083!2d39.9469673!3e0!5m1!1e1');
  // await page.screenshot({path: 'screengrabs/map-' + timestamp + '.png'});
  const screenshotBuffer = await page.screenshot({
    encoding: 'binary'
  });

  await browser.close();

  const uploadOptions = {};
  cloudinary.uploader.upload_stream(
    uploadOptions, 
    (error, result) => { console.log(result) }
  ).end(screenshotBuffer);
}

console.log("1st getPic");
getPic();
console.log("repeating interval getPic");
var interval = setInterval(getPic, 1000 * 60 * 15);

// function consoleTest() {
//   console.log("Test");
// }
// consoleTest();
// var interval = setInterval(consoleTest, 5000);





