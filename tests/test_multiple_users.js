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
          //  console.log("COOKIE  HEADERS- ", headers);
            // const headerConfig = {
            //     telus_access_cookie : response.headers['set-cookie']['telus_access_cookie'],
            //     telus_refresh_cookie: response.headers['set-cookie']['telus_refresh_cookie']
            // }

            return headers;
            })  

            uri = apiConfigJson.preprod.USER_PROFILE_URI;
            environementUrl = url + "/" + uri;
            // const postmanToken = '_cfuvid=Jg.sizRTqUGab_3DC9sEaL84K3ZTgX_HJaA_l8NyTC8-1685382328448-0-604800000; Path=/; Domain=postman.com; Secure; HttpOnly;'
            // const pfData = 'PF=ZkKwiVvVsVjMKBkBvrEM89; Path=/; Secure; HttpOnly;'
            // const cookieData = headersConfig + postmanToken + pfData
            // console.log('MY COOKIE DATA - '+cookieData);
            const cookieData = 'avs_cookie=' + headersConfig.avs_cookie + ';up=' + headersConfig.up + ';telus_user_profile=' + headersConfig.telus_user_profile 
            +';sessionId=' + headersConfig.sessionId
            + ';telus_refresh_cookie=' +  headersConfig.telus_refresh_cookie + ';telus_access_cookie=' + headersConfig.telus_access_cookie
            console.log("cookieData : - ", cookieData);
            console.log('ENV URL ', environementUrl)

            const config2 = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'Cache-Control': 'no-cache',
                'headers': {
                    'restful':'yes',
                    'Content-Type': 'application/json',
                    'User-Agent': 'PostmanRuntime/7.32.2',
                    'Accept': '*/*',
                    'Host': 'telus.preprod.n.svc.tv.telus.net',
                   // 'Postman-Token': 'c73b4226-17b3-414e-a0e0-f2067df7752d',
                    'Cookie':cookieData,
                    'Cache-Control': 'no-cache',
                    // 'avs_cookie': headersConfig.avs_cookie,
                    // 'sessionId': headersConfig.sessionId,
                    // 'telus_access_cookie': headersConfig.telus_access_cookie,
                    // 'telus_refresh_cookie': headersConfig.telus_refresh_cookie,
                    // 'telus_user_profile': headersConfig.telus_user_profile

                },
                'httpsAgent': httpsAgentPreProd
            }

            response = await axios(config2).then((response) => {
                statusCode = response.status;
                console.log('Response Body for 2 :===>>> ', response.data);
                console.log('RESPONSE 2 HEADERS - '+response.headers);
                return response;
                })

        } catch (err) {
            console.log(err);
        }
    });

})


