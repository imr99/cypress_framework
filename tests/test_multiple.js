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


const cheerio = require('cheerio');
const qs = require('qs');
var formurlencoded = require('form-urlencoded');
const querystring = require('querystring');
const { error } = require('console');
const loginuser = require("./loginUser");

var cookieSession = require('cookie-session')
var express = require('express')
var app = express()


var url = null;
var uri = null;
var environementUrl = null;
var updatedRequestBody = null;
var response = null;
var response2 = null;
var randomUser = null;
var statusCode = null;
var statusText = null;
var randomNumber = Math.floor((Math.random() * 10000) + 1);
let headersConfig = null;


describe('BSS Sanity Suite', () => {

    it('Create User - CRM Account List', async function () {
        this.timeout(0);

        var array = new Array();

        app.set('trust proxy', 1);

        app.use(cookieSession({
            name: 'session',
            keys: [],
          
            // Cookie Options
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
          }))

          app.use(function (req, next) {
            req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
            next()
          })
       
        let secret = null;

        secret = await loginuser.login('ci.pp.sqd04.ts018@ci-opus-stg.com', 'Telus@1234');
        console.log('SECRET KEY -- > ', secret );
        //array.push(secret);

       // secret = await loginuser.login('ci.pp.sqd04.ts016@ci-opus-stg.com', 'Telus@1234');
       // console.log('SECRET KEY -- > ', secret );
        //array.push(secret);

        console.log('COOKIES ->>> ',loginuser.cookieData);

        // const userprofile = {
        //     'method': 'GET',
        //     'url': 'https://telus.sit.n.svc.tv.telus.net/TELUS/T2.2/R/ENG/ANDROID_TV_STB/OPTIK/USER/PROFILE',
        //     //'url': 'https://telusidentity-pp.telus.com/idp/IV6jn/resumeSAML20/idp/SSO.ping?service_type=optik',
        //     'maxBodyLength': Infinity,
        //     'headers': {
        //         'restful': 'yes',
        //         'Cookie': ,
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Host': 'telusidentity-pp.telus.com',
        //         'User-Agent': 'PostmanRuntime/7.32.2',
        //         'Accept': '*/*',
        //         'Origin': 'https://telusidentity-pp.telus.com',
        //         // 'Referer': formAction,
        //         'Referer': 'https://telusidentity-pp.telus.com/idp/SSO.saml2',
        //         't-optik-tvos': '1.0.0',
        //         'telusScripts': 'myTelusE2E'
    
        //     },
        //     'data': userCreds,
        //     'httpsAgent': httpsAgentPreProd
        // }


});



})


