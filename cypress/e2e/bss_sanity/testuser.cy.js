const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { create } = require('domain');
const {httpsAgentPreProd} = require('../../utils/config.js');
const dataJson = require('../../data/testData.json');
const apiConfigJson = require('../../data/apiConfig.json');


var url = null;
var uri = null;
var environementUrl = null;
var updatedRequestBody = null;
var response = null;
var randomUser = null;
var randomNumber = Math.floor((Math.random() * 10000) + 1);


describe('BSS Sanity Suite', () => {

    it('Create User - CRM Account List', async function() {
        try{
            randomUser = "TestUser"+randomNumber;
            url = apiConfigJson.ams_preprod.url;
            uri = apiConfigJson.ams_preprod.CreateUser_CRMAccountListMgmt_URI;
            environementUrl = url+"/"+uri;

            updatedRequestBody = dataJson.testData.CreateUser_CRMAccountListMgmt;
            updatedRequestBody.subscriberList[0].crmAccountId = randomUser;
            updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;

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
            response = await axios(config).then((response)=> {
                console.log(response.data);
                return response;
                
            })
        }catch(err){
            console.log(err);
        }
    });


})


