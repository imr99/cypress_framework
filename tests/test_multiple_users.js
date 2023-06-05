const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { create } = require('domain');
const { httpsAgentPreProd } = require('../utils/config.js');
const dataJson = require('../data/testData.json');
const apiConfigJson = require('../data/apiConfig.json');
const expect = require('chai').expect;

const flash = require('express-flash')
    const session = require('express-session')
    const passport = require('passport');
const { cleansCode } = require('../utils/cleanData.js');

var url = null;
var uri = null;
var environementUrl = null;
var updatedRequestBody = null;
var response = null;
var randomUser = null;
var statusCode = null;
var statusText = null;
var randomNumber = Math.floor((Math.random() * 10000) + 1);
let headersConfig = null;


describe('BSS Sanity Suite', () => {

    it('Create User - CRM Account List', async function () {
        try {
            url = apiConfigJson.preprod.url;
            uri = apiConfigJson.preprod.USER_LOGIN_URI;
            environementUrl = url + "/" + uri;
            console.log('URL', environementUrl);
            updatedRequestBody = dataJson.testData.USER_LOGIN_Copy;

            const config = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }

            headersConfig = await axios(config).then((response) => {
            statusCode = response.status;
            console.log('Response Body :===>>> ', response.data);
           
            const headers = cleansCode(String(response.headers['set-cookie']))
            console.log("COOKIE  HEADERS- ", headers);
            // const headerConfig = {
            //     telus_access_cookie : response.headers['set-cookie']['telus_access_cookie'],
            //     telus_refresh_cookie: response.headers['set-cookie']['telus_refresh_cookie']
            // }

            return String(response.headers['set-cookie']);
            })  

            uri = apiConfigJson.preprod.USER_PROFILE_URI;
            environementUrl = url + "/" + uri;
            console.log('URL', environementUrl);
            updatedRequestBody = dataJson.testData.USER_PROFILE_Copy;


            const config2 = {
                'method': 'POST',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                    // 'avs_cookie': headersConfig.avs_cookie,
                    // 'sessionId': headersConfig.sessionId,
                    // 'telus_access_cookie': headersConfig.telus_access_cookie,
                    // 'telus_refresh_cookie': headersConfig.telus_refresh_cookie,
                    // 'telus_user_profile': headersConfig.telus_user_profile

                },
                'Cookie': headersConfig,
                'data': JSON.stringify(updatedRequestBody),
                'httpsAgent': httpsAgentPreProd
            }

            response = await axios(config2).then((response) => {
                statusCode = response.status;
                console.log('Response Body for 2 :===>>> ', response.data);
                return response;
                })

        } catch (err) {
            console.log(err);
        }
    });

})


