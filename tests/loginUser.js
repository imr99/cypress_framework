const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { create } = require('domain');
const { httpsAgentpreprodProd } = require('../utils/config.js');
const dataJson = require('../data/testData.json');
const apiConfigJson = require('../data/apiConfig.json');
const cheerio = require('cheerio');

let url = null;
let uri = null;
let environementUrl = null;
let updatedRequestBody = null;
var response=null;
//------------------

//------------------

describe('AVS4-1644 ==>> Regresion Suite', () => {

    // it('Clean Up data', async function () {
    //     this.timeout(0);
    //     try {
    //         url = apiConfigJson.AVS4_1644.cleanUP;
    //         environementUrl = url ;
    //         console.log('ENV URL :===>>> ',environementUrl);

    //         const config = {
    //             'method': 'GET',
    //             'url': environementUrl,
    //             'maxBodyLength': Infinity,
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             'data': JSON.stringify(),
    //             'httpsAgent': httpsAgentpreprodProd
    //         }
    //     let response;
    //     try {
    //         response = await axios(config);
    //     } catch (error) {
    //         if (error.response) {
    //             console.log('Error Response Code :===>>> ', error.response.status);
    //             console.log('Response Body :===>>> ', error.response.data);
    //         } else {
    //             console.log('Error:', error.message);
    //         }
    //         return;
    //     }
    //     let statusCode = response.status;
    //     if (response.data.message === 'Authorization code is invalid or expired.') {
    //         statusCode = 500;
    //     }
    //     console.log('Response Body :===>>> ', response.data);
    //     console.log('Response Code :===>>> ', statusCode);
    // } catch (err) {
    //     console.log(err);
    // }
    // });













//
    it('Framework Initialization', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.AVS4_1644.framework_Initialization;
            environementUrl = url ;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentpreprodProd
            }
        let response;
        try {
            response = await axios(config);
        } catch (error) {
            if (error.response) {
                console.log('Error Response Code :===>>> ', error.response.status);
                console.log('Response Body :===>>> ', error.response.data);
            } else {
                console.log('Error:', error.message);
            }
            return;
        }
        let statusCode = response.status;
        if (response.data.message === 'Authorization code is invalid or expired.') {
            statusCode = 500;
        }
        console.log('Response Body :===>>> ', response.data);
        console.log('Response Code :===>>> ', statusCode);
    } catch (err) {
        console.log(err);
    }
    });

    it('Test Data Initialization', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.AVS4_1644.Test_Data_Initialization;
            environementUrl = url ;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentpreprodProd
            }
        let response;
        try {
            response = await axios(config);
        } catch (error) {
            if (error.response) {
                console.log('Error Response Code :===>>> ', error.response.status);
                console.log('Response Body :===>>> ', error.response.data);
            } else {
                console.log('Error:', error.message);
            }
            return;
        }
        let statusCode = response.status;
        if (response.data.message === 'Authorization code is invalid or expired.') {
            statusCode = 500;
        }
        console.log('Response Body :===>>> ', response.data);
        console.log('Response Code :===>>> ', statusCode);
    } catch (err) {
        console.log(err);
    }
    });

    it('AVS4-1644 - Auth Code Step 1 - Initiate Flow', async function () {
        this.timeout(0);
        try {
            url = apiConfigJson.AVS4_1644.Initiate_Flow;
            environementUrl = url ;
            console.log('ENV URL :===>>> ',environementUrl);

            const config = {
                'method': 'GET',
                'url': environementUrl,
                'maxBodyLength': Infinity,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(),
                'httpsAgent': httpsAgentpreprodProd
            }
        let response;
        try {
            response = await axios(config);
        } catch (error) {
            if (error.response) {
                console.log('Error Response Code :===>>> ', error.response.status);
                console.log('Response Body :===>>> ', error.response.data);
            } else {
                console.log('Error:', error.message);
            }
            return;
        }
        let statusCode = response.status;
        if (response.data.message === 'Authorization code is invalid or expired.') {
            statusCode = 500;
        }
        console.log('Response Body :===>>> ', response.data);
        console.log('Response Code :===>>> ', statusCode);

        const $ = cheerio.load(response.data);

        // Extract the values of SAMLRequest and RelayState
        const samlRequestValue = $('input[name="SAMLRequest"]').val();
        const relayStateValue = $('input[name="RelayState"]').val();

        console.log('SAMLRequest:===========================================>>>>>', samlRequestValue);
        console.log('RelayState:============================================>>>>>', relayStateValue);
        

    } catch (err) {
        console.log(err);
    }
    });

  //============================================================================================================  
         it('AVS4-1644 - Auth Code Step 2 - Get Login Page', async function () {
            const data1 = {
                SAMLRequest: 'PHNhbWxwOkF1dGhuUmVxdWVzdCBWZXJzaW9uPSIyLjAiIElEPSJBN0hfREs1Tk1FMlliU0FnNnpVUFBqTTFnYmUiIElzc3VlSW5zdGFudD0iMjAyMy0wNi0wNlQxNTo0NTowOC4zODhaIiB4bWxuczpzYW1scD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIj48c2FtbDpJc3N1ZXIgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+dGVsdXM6b2k6cHA6dHZlPC9zYW1sOklzc3Vlcj48c2FtbHA6TmFtZUlEUG9saWN5IEFsbG93Q3JlYXRlPSJ0cnVlIi8+PC9zYW1scDpBdXRoblJlcXVlc3Q+',
                RelayState: 'GoAz1VIQchevMs1VrNHHiA0hKamfhn',
              };
            this.timeout(0);
            try {
                url = apiConfigJson.AVS4_1644.Get_Login_Page;
                environementUrl = url;
                console.log('ENV URL :===>>> ',environementUrl);
                updatedRequestBody = dataJson.testData.GetBODy;
    
                const config = {
                    'method': 'POST',
                    'url': environementUrl,
                    'maxBodyLength': Infinity,
                    'headers': {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cache-Control':'max-age=0',
                        'Cookie':'PF=2mHOYBBgoBUfnbeShx0kv2',
                        'Origin':'https://oauth.cto.tv.telus.net',
                        'Referer':'https://oauth.cto.tv.telus.net',
                        't-optik-tvos':'1.0.0',
                        'telusScripts':'myTelusE2E'
                    },
                    'data': data1,
                    'httpsAgent': httpsAgentpreprodProd
                }
            let response;
            try {
                response = await axios(config);
            } catch (error) {
                if (error.response) {
                    console.log('Error Response Code :===>>> ', error.response.status);
                    console.log('Response Body :===>>> ', error.response.data);
                } else {
                    console.log('Error:', error.message);
                }
                return;
            }
            let statusCode = response.status;
            if (response.data.message === 'Authorization code is invalid or expired.') {
                statusCode = 500;
            }
            console.log('Response Body :===>>> ', response.data);
            console.log('Response Code :===>>> ', statusCode);
        } catch (err) {
            console.log(err);
        }
        });
//-----------------------------------------------------------------------------------------------------------------------------------
it('AVS4-1644 - Auth Code Step 3 - Submit Credentials', async function () {
    this.timeout(0);
    const data1 = {
        IDToken1: 'ci-pp-opus-tsqa060@opus-qa.com',
        IDToken2: 'Opustsqa@1234',
        userLanguage:'en'
      };
    try {
        url = apiConfigJson.AVS4_1644.Submit_Credentials;
        environementUrl = url;
        console.log('ENV URL :===>>> ',environementUrl);
        updatedRequestBody = dataJson.testData.GetBODy;

        const config = {
            'method': 'POST',
            'url': environementUrl,
            'maxBodyLength': Infinity,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control':'max-age=0',
                'Cookie':'pf_sessionid=43302197-db27-455a-bbc3-888781ea1c6d; Domain=telus.com; Path=/; Secure',
                'Origin':'https://telusidentity-pp.telus.com',
                'Referer':'https://telusidentity-pp.telus.com/idp/SSO.saml2',
                't-optik-tvos':'1.0.0',
                'telusScripts':'myTelusE2E'
            },
            'data': data1,
            'httpsAgent': httpsAgentpreprodProd
        }
    let response;
    try {
        response = await axios(config);
    } catch (error) {
        if (error.response) {
            console.log('Error Response Code :===>>> ', error.response.status);
            console.log('Response Body :===>>> ', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        return;
    }
    let statusCode = response.status;
    if (response.data.message === 'Authorization code is invalid or expired.') {
        statusCode = 500;
    }
    console.log('Response Body :===>>> ', response.data);
    console.log('Response Code :===>>> ', statusCode);
} catch (err) {
    console.log(err);
}
});
 //--------------------------------------------------------------------------------------------------------------
       
})