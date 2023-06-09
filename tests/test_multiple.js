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

var cookieSession = require('cookie-session')
var express = require('express')
var app = express()
const cheerio = require('cheerio');


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
        try {
            let samlRequestValue = null;
            let relayStateValue = null;
            let formAction = null;
            let cookie = null;
            let html = null;
            let $ = null;
            let actionURL = null;
            
            

           const config = {
                'method': 'GET',
                'url': "https://oauth.cto.tv.telus.net/as/authorization.oauth2?response_type=code&scope=opuscisso&client_id=opus&state=STBUSER02&redirect_uri=http://localhost",
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json',
                    'Host': 'oauth.cto.tv.telus.net',
                    'User-Agent': 'PostmanRuntime/7.32.2',
                    'Accept': '*/*',
                    'Connection': 'keep-alive'

                },
                'httpsAgent': httpsAgentPreProd
            }

            response = await axios(config).then((response) => {
           // console.log('Response Body 1:===>>> ', response.data);
           // console.log('HEADERS -------'+response.headers);

            cookie = response.headers['set-cookie'];
           
           // console.log('COOKIE  -------'+response.headers['set-cookie']);

           
            html = response.data;
            $ = cheerio.load(html);

             
            // const mytext2 = $('[name="SAMLRequest"][value]');
            formAction = $('form').attr('action');
            samlRequestValue = $('input[name="SAMLRequest"]').val();
            relayStateValue = $('input[name="RelayState"]').val();
            
            // console.log('MY TEXT -- ', formAction);
           //  console.log('MY TEXT -- ', samlRequestValue);
             //console.log('MY TEXT -- ', relayStateValue);
            }) 
            
            //var data = JSON.stringify({ "RelayState": relayStateValue, "SAMLRequest": samlRequestValue });
            const formData = new URLSearchParams();
            formData.append('RelayState', relayStateValue);
            formData.append('SAMLRequest', samlRequestValue);

 

            const config2 = {
                'method': 'POST',
                'url': formAction,
                'maxBodyLength': Infinity,
                'headers': {
                    //'Cookie': 'TS01b2e300=018051be83be2f411e6f9a85b524b49c5dacb5ad314d10513b4ac14a650f47f1c8fd72166fb8a1c43cbe8c8571ad855e8f08fe6c0932f33ea5f460fbce86e16412f74b79a7047340d1fad8330e2f54772b602005195108baed9d7ab95c3448fb0acec497f1c0445029f2b861dd849b41a3c2e21a32c898c6b5aa9c0593a10eb2677cdfa7bc3ae7ab8cd3c700753af71a9b18daf82a06771327c622b65bd1e034bca8b20a53; VSzeb0FX=A2wwbICIAQAAZnSIi-M9QrW5cvs_DwI5we9Ojlt-OLy9MUCEQx4eoIM8z2KJAc5sHyIAAAAAAAAAAAAAAAAAAA|1|0|5d8a8ede18853cdaab490acb5b83c2432c84be11; pf_sessionid=25d32039-5ba0-4141-945e-ad3787c2b57c; BIGipServercii_east_https_pool=3558085548.18211.0000; PF=2zEQf9KH62jh48Nm2n0rod1Z5n4cf2baiUpgJ6zXZhmy; PersistanceCookie=4019217954.47873.0000; TS0157dc05=015c320ccf8f24b64c3ff90aff46d3ca8c0b6f328f2bb5cc2cfb66aeec8a72641364a07a294f0a4aff4c407b920f78ee3c831e5cb44a6ff5a036c339ad8d4cdde13daf77754ad60f18bb79ddf423d84724415415c310b3dd47d47b82442e01e5beb2d32ba9',
                    'Cookie': cookie,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Host': 'telusidentity-pp.telus.com',
                    'User-Agent': 'PostmanRuntime/7.32.2',
                    'Accept': '*/*',
                    'Origin': 'https://oauth.cto.tv.telus.net',
                    'Referer': 'https://oauth.cto.tv.telus.net'

                },
                'data': formData.toString(),
                'httpsAgent': httpsAgentPreProd
            }

            response = await axios(config2).then((response) => {
                // console.log('Response Body 2:===>>> ', response.data);
                // console.log('RESPONSE PF COOKIE - '+ response.headers);
                html = response.data;
                $ = cheerio.load(html);
                actionURL = $('input[name="actionURL"]').attr('value');
                //console.log('ACTION URL===>>> ', actionURL);
                }) 

                let IDToken1 = 'ci.pp.sqd04.ts018@ci-opus-stg.com'
                let IDToken2 = 'Telus@1234'

                const userCreds = new URLSearchParams();
                userCreds.append('IDToken1', IDToken1);
                userCreds.append('IDToken2', IDToken2);
                userCreds.append('UserLanguage', 'en');
             //   console.log('ACTION URL ---------- '+actionURL)
                
              //  let actualParams = userCreds.toString().replace(/%40/g, '');
              //  console.log('USER CREDS -------- ', actualParams);

                const config3 = {
                    'method': 'POST',
                    'url': 'https://telusidentity-pp.telus.com'+actionURL,
                    //'url': 'https://telusidentity-pp.telus.com/idp/IV6jn/resumeSAML20/idp/SSO.ping?service_type=optik',
                    'maxBodyLength': Infinity,
                    'headers': {
                        'Cookie': cookie,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Host': 'telusidentity-pp.telus.com',
                        'User-Agent': 'PostmanRuntime/7.32.2',
                        'Accept': '*/*',
                        'Origin': 'https://telusidentity-pp.telus.com',
                       // 'Referer': formAction,
                       'Referer': 'https://telusidentity-pp.telus.com/idp/SSO.saml2',
                       't-optik-tvos': '1.0.0',
                       'telusScripts': 'myTelusE2E'
    
                    },
                    'data': userCreds,
                    'httpsAgent': httpsAgentPreProd
                }
    
                response = await axios(config3).then((response) => {
                   // console.log('Response Body 3:===>>> '+ response.data);
                    html =  response.data;
                    $ = cheerio.load(html);
            
                   relayStateValue = $('input[name="RelayState"]').val();
                   samlRequestValue = $('input[name="SAMLResponse"]').val();
                   formAction = $('form').attr('action');
                  // actionURL = $('input[name="actionURL"]').attr('value');
                    
                   
                   
                    
                    });

                    //  console.log('RELAY STATE ', relayStateValue);
                    // console.log('SAML ', samlRequestValue);
               // console.log('ACTIOB URL', actionURL);
               // console.log('FORM ACTION -----', formAction);
                

                    const formData2 = new URLSearchParams();
                    formData2.append('RelayState', relayStateValue);
                    formData2.append('SAMLRequest', samlRequestValue);


                    var details = {
                        'RelayState': relayStateValue,
                        'SAMLRequest': samlRequestValue
                    };
                    
                    var formBody = [];
                    for (var property in details) {
                      var encodedKey = encodeURIComponent(property);
                      var encodedValue = encodeURIComponent(details[property]);
                      formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                    
                    let referer = 'https://telusidentity-pp.telus.com'+actionURL;

                    
                   // console.log('FORM DATA 2 - ', formData2.toString().replace(/%/g, ""));
                   // console.log('FORM BODY - ', formBody.toString().replace(/%/g, ""));

                    
                    //let updatedCookie = new String(cookie).split(';');

                    //let arr = updatedCookie.split(';');
                    //console.log('UPDATED COOKIE - ', updatedCookie[0]);
                    console.log('FORM ACTION >>>>> ', formAction);
                    //console.log('ORIGIN >>>>>>>'+origin);
                    console.log('REFERER >>>>>> '+referer);

                    const config4 = {
                        'method': 'POST',
                        'url': formAction,
                        //'url': 'https://telusidentity-pp.telus.com/idp/IV6jn/resumeSAML20/idp/SSO.ping?service_type=optik',
                        'maxBodyLength': Infinity,
                        'headers': {
                            'Cookie': cookie,
                           'Cache-Control': 'max-age=0',
                           'Content-Type': 'application/x-www-form-urlencoded',
                            'Host': 'oauth.cto.tv.telus.net',   //CHANGE THIS TO FETCH FROM ACTION URL OF FORM
                            'User-Agent': 'PostmanRuntime/7.32.2',
                            'Accept': '*/*',
                            'Origin': 'https://telusidentity-pp.telus.com',
                            'Referer': referer,
                           //'Referer': 'https://telusidentity-pp.telus.com/idp/SSO.saml2',
                             't-optik-tvos': '1.0.0',
                             'telusScripts': 'myTelusE2E',
                            'Connection': 'keep-alive'
                           // 'json': true
        
                        },
                        data: formBody.toString().replace(/%/g, ""),
                        'httpsAgent': httpsAgentPreProd

                    }
                    response = await axios(config4).then((response) => {
                        console.log('Response Body 4:===>>> '+ response.data);
                        //html =  response.data;
                        //$ = cheerio.load(html);
                        response.render('error', {
                            message: err.message,
                            error: {}
                        });
                        
                       // console.log('RESPONSE PF COOKIE 3 - '+ response.headers);
                    //    relayStateValue = $('input[name="RelayState"]').val();
                    //     console.log('ACTION URL ', relayStateValue);
                        }) 

                    //    console.log('REFERER >>>>>> '+referer);
    

        } catch (err) {
            console.log(err);
        }
    });

})


