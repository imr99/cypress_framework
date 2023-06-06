// @ts-check
const { test, expect } = require('@playwright/test');
require('dotenv').config()


const baseUrl = 'https://oauth.cto.tv.telus.net/as/authorization.oauth2?response_type=code&scope=opuscisso&client_id=opus&state=fb1b6c54-1933-4ed5-995d-935e18518f73&redirect_uri=http://localhost'
test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
  // await page.waitForTimeout(5000);
});
const loginCreds = {
  email: process.env.TELUS_EMAIL,
  password: process.env.TELUS_PASS
}
let code = null;

console.log('login creds : ', JSON.stringify(loginCreds))
test.describe('Login and run subsequent requests', () => {
  test('Login to telus and extract the code', async ({ page }) => {
    // create a new todo locator
    await page.getByPlaceholder('Username or email').click();
    await page.getByPlaceholder('Username or email').fill(loginCreds.email);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(loginCreds.password);
    // await page.waitForTimeout(2000);
    let requestUrls = []
    page.on('request', request => {
      requestUrls.push(request.url())
    });
    await page.getByRole('button', { name: 'Log in' }).click();
    // await page.waitForTimeout(6000);
    const url = await page.url()
    console.log(requestUrls)
    requestUrls.forEach(url => {
      code = extractCodeFromURL(url);
      if (code !== null) {
      }
    });
    console.log('code', code);
  });
});

function extractCodeFromURL(url) {
  const regex = /code=([^&]+)/;
  const match = regex.exec(url);
  return match ? match[1] : null;
}

