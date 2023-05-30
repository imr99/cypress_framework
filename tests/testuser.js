const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { create } = require('domain');
const { httpsAgentPreProd } = require('../utils/config.js');
const dataJson = require('../data/testData.json');
const apiConfigJson = require('../data/apiConfig.json');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

var url = null;
var uri = null;
var environementUrl = null;
var updatedRequestBody = null;
var response = null;
var randomUser = null;
var statusCode = null;
var statusText=null;
var randomNumber = Math.floor((Math.random() * 10000) + 1);

//--------------------------------------------------------------
//solutionOfferExternalID==>>Alacarte-BBC_World_CP
var solutionOfferExternalID = 'Alacarte-AE_CP';
var solutionOfferID = '5872';
var propertyName = 'OPTIK';
//-------------------------------------------------

describe('BSS Sanity Suite', () => {

    it('Create User - CRM Account List', async function () {
        try {
            randomUser = "TestUser" + randomNumber;
            url = apiConfigJson.ams_preprod.url;
            uri = apiConfigJson.ams_preprod.CreateUser_CRMAccountListMgmt_URI;
            environementUrl = url + "/" + uri;

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
            response = await axios(config).then((response) => {
                statusCode=response.status;
               // statusText= expect(response).to.have.statusMessage('OK');
                console.log('Response Body :===>>> ',response.data);
                console.log('Response Code :===>>> ', statusCode);
                console.log('Status Line:', response.statusText);

              const data =  expect(statusCode).to.equal(200);
                return response;
            })
        } catch (err) {
            console.log(err);
        }
        console.log('---------------------------------Test1------------------------------------------------------------------------------');
    });

    //---------------------------------------------------------------------------------------------------------------------------------------------

        // it('Cancel Subscription Update Crm Account List Commercial Profile', async function () {
        //     try {

        //         url = apiConfigJson.ams_preprod.url;
        //         uri = apiConfigJson.ams_preprod.CancelSubscription_UpdateCrmAccountListCommercialProfile_URI;
        //         environementUrl = url + "/" + uri;
        //         console.log('Env URL :===>> ' + environementUrl);

        //         updatedRequestBody = dataJson.testData.CancelSubscription_UpdateCrmAccountListCommercialProfile;
        //         updatedRequestBody.subscriberPackageList[0].userName = randomUser;
        //         updatedRequestBody.subscriberPackageList[0].crmAccountId = randomUser;
        //         updatedRequestBody.subscriberPackageList[0].commProfileList[0].solutionOfferExternalID=solutionOfferExternalID;
        //         updatedRequestBody.subscriberPackageList[0].commProfileList[0].solutionOfferID=solutionOfferID;

        //         const config = {
        //             'method': 'POST',
        //             'url': environementUrl,
        //             'maxBodyLength': Infinity,
        //             'headers': {
        //                 'Content-Type': 'application/json'
        //             },
        //             'data': JSON.stringify(updatedRequestBody),
        //             'httpsAgent': httpsAgentPreProd
        //         }
        //         response = await axios(config).then((response) => {
        //             statusCode=response.status;
        //             console.log('Response Body :===>>> ',response.data);
        //             console.log('Response Code :===>>>', statusCode);
        //             return response;

        //         })
        //     } catch (err) {
        //         console.log(err);
        //     }
        //     console.log('---------------------------------Test-2------------------------------------------------------------------------------');    
        // });

//----------------------------------------------------------------------------------------------------------------------------------------

//         it('Update Profile', async function () {
//             try {
//                 url = apiConfigJson.ams_preprod.url;
//                 uri = apiConfigJson.ams_preprod.userSearch_URI;
//                 environementUrl = url + "/" + uri + "" + randomUser;
//                 console.log('Env URL := ' + environementUrl);

//                 const config = {
//                     'method': 'GET',
//                     'url': environementUrl,
//                     'maxBodyLength': Infinity,
//                     'headers': {
//                         'Content-Type': 'application/json'
//                     },
//                     'data': JSON.stringify(updatedRequestBody),
//                     'httpsAgent': httpsAgentPreProd
//                 }
//                 response = await axios(config);
//                 let apiResponse = response.data;
//                 console.log(apiResponse);


//                 //       const resultCode = apiResponse.resultCode;
//                 //       console.log(resultCode);
//                 //       const resultDescription = apiResponse.resultDescription;
//                 //       console.log(resultDescription);
//                 const resultObj = apiResponse.resultObj;
//                 console.log("Result Object Body := ", resultObj);
//                 //       const totalCount = resultObj.totalCount;
//                 // console.log(totalCount);
//                 const accountSearchResponseList = resultObj.accountSearchResponseList;
//                 console.log("Account Search Response List Body : = ", accountSearchResponseList);
//                 accountSearchResponseList.forEach(account => {
//                     // const crmAccountId = account.crmAccountId;
//                     // const customerCode = account.customerCode;
//                     const region = account.region;
//                     console.log('Region Body : = ', region);
//                     const accountList = account.accountList;
//                     console.log("Account List Body : = ", accountList);
//                     const consentList = account.consentList;
//                     console.log("Consent List Body :=", consentList);
//                     // ... access other properties of each account object
//                     statusCode=response.status;
//                     console.log('Response Code :===>>> ', statusCode);
//                 });

//             } catch (err) {
//                 console.log(err);

//             }
//             console.log('---------------------------------Test-3------------------------------------------------------------------------------');
//         });
// //-----------------------------------------------------------------------------------------------------------------------------------------------
//         it('Update User CRM Account List Mgmt', async function () {
//             try {
//                 url = apiConfigJson.ams_preprod.url;
//                 uri = apiConfigJson.ams_preprod.UpdateUser_CRMAccountListMgmt_URI;
//                 environementUrl = url + "/" + uri;
//                 console.log('Env URL :===>> ' + environementUrl);


//                 updatedRequestBody = dataJson.testData.UpdateUser_CRMAccountListMgmt;
//                 updatedRequestBody.subscriberList[0].crmAccountId = randomUser;
//                 updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;
//                 updatedRequestBody.subscriberList[0].commProfileList[0].solutionOfferExternalID=solutionOfferExternalID;
//                 updatedRequestBody.subscriberList[0].commProfileList[0].solutionOfferID=solutionOfferID;


//                 const config = {
//                     'method': 'POST',
//                     'url': environementUrl,
//                     'maxBodyLength': Infinity,
//                     'headers': {
//                         'Content-Type': 'application/json'
//                     },
//                     'data': JSON.stringify(updatedRequestBody),
//                     'httpsAgent': httpsAgentPreProd
//                 }
//                 response = await axios(config).then((response) => {
//                     // const apiResponse = response.data;
//                     // console.log(apiResponse);
//                     statusCode=response.status;
//                     console.log('Response Body :===>>> ',response.data);
//                     console.log('Response Code :===>>> ', statusCode);
//                     return response;
//                     // const deviceID = apiResponse.subscriber[0].deviceList;
//                     // console.log("Device List : = ", deviceID);

//                 })
//             } catch (err) {
//                 console.log(err);
//             }
//             console.log('---------------------------------Test4------------------------------------------------------------------------------');
//         });
// //---------------------------------------------------------------------------------------------------------------------------------------------------
//         it('FIPS Code Pin', async function () {
//             try {
//                 url = apiConfigJson.ams_preprod.url;
//                 uri = apiConfigJson.ams_preprod.FIPS_Code_URI;
//                 environementUrl = url + "/" + uri;
//                 console.log('Env URL := ' + environementUrl);


//                 updatedRequestBody = dataJson.testData.FIPS_Code;
//                 updatedRequestBody.subscriberList[0].crmAccountId = randomUser;
//                 updatedRequestBody.subscriberList[0].properties[0].propertyName=propertyName;
//                 updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;

//                 const config = {
//                     'method': 'POST',
//                     'url': environementUrl,
//                     'maxBodyLength': Infinity,
//                     'headers': {
//                         'Content-Type': 'application/json'
//                     },
//                     'data': JSON.stringify(updatedRequestBody),
//                     'httpsAgent': httpsAgentPreProd
//                 }
//                 response = await axios(config).then((response) => {
//                     // const apiResponse = response.data;
//                     // console.log(apiResponse);
//                     statusCode=response.status;
//                     console.log('Response Body :===>>> ',response.data);
//                     console.log('Response Code :===>>> ', statusCode);
//                     return response;
//                     // const deviceID=apiResponse.subscriber[0].deviceList;
//                     // console.log("Device List : = ",deviceID);

//                 })
//             } catch (err) {
//                 console.log(err);
//             }
//             console.log('---------------------------------Test5------------------------------------------------------------------------------');
//         });
// //-----------------------------------------------------------------------------------------------------------------------------------------------------
//         it('Cancel Subscription Update Crm Account List Commercial Profile Copy Check', async function() {
//             try{
//              //   randomUser = "TestUser"+randomNumber;
//                 url = apiConfigJson.ams_preprod.url;
//                 uri = apiConfigJson.ams_preprod.CancelSubscription_UpdateCrmAccountListCommercialProfile_URI;
//                 environementUrl = url+"/"+uri;
//                 console.log('Environement URL :===>> ',environementUrl);

//                 updatedRequestBody = dataJson.testData.CancelSubscription_UpdateCrmAccountListCommercialProfile_Copy;
//                 updatedRequestBody.subscriberPackageList[0].userName = randomUser;
//                 updatedRequestBody.subscriberPackageList[0].crmAccountId = randomUser;
//                 updatedRequestBody.subscriberPackageList[0].commProfileList[0].solutionOfferExternalID=solutionOfferExternalID;
//                 updatedRequestBody.subscriberPackageList[0].commProfileList[0].solutionOfferID=solutionOfferID;

//                 const config = {
//                     'method': 'POST',
//                     'url': environementUrl,
//                     'maxBodyLength': Infinity,
//                     'headers': {
//                         'Content-Type': 'application/json'
//                     },
//                     'data': JSON.stringify(updatedRequestBody),
//                     'httpsAgent': httpsAgentPreProd
//                 }
//                 response = await axios(config).then((response)=> {
//                     statusCode=response.status;
//                     console.log('Response Body :===>>> ',response.data);
//                     console.log('Response Code :===>>> ', statusCode);

//                 })
//             }catch(err){
//                 console.log(err);
//             }
//             console.log('---------------------------------Test-6------------------------------------------------------------------------------');
//         });
// //----------------------------------------------------------------------------------------------------------------------------------------------

//     it('Update Crm Account List Commercial Profile', async function() {
//         try{
//             url = apiConfigJson.ams_preprod.url;
//             uri = apiConfigJson.ams_preprod.UpdateCrmAccountListCommercialProfile_URI;
//             environementUrl = url+"/"+uri;
//             console.log('Environement URL :===>> ',environementUrl);

//             updatedRequestBody = dataJson.testData.UpdateCrmAccountListCommercialProfile;
//             updatedRequestBody.subscriberPackageList[0].userName = randomUser;
//             updatedRequestBody.subscriberPackageList[0].crmAccountId = randomUser;

//             const config = {
//                 'method': 'POST',
//                 'url': environementUrl,
//                 'maxBodyLength': Infinity,
//                 'headers': {
//                     'Content-Type': 'application/json'
//                 },
//                 'data': JSON.stringify(updatedRequestBody),
//                 'httpsAgent': httpsAgentPreProd
//             }
//             response = await axios(config).then((response)=> {
//                 statusCode=response.status;
//                 console.log('Response Body :===>>> ',response.data);
//                 console.log('Response Code :===>>> ', statusCode);
//                 return response;

//             })
//         }catch(err){
//             console.log(err);
//         }
//         console.log('---------------------------------Test-7------------------------------------------------------------------------------');
//     });
// //-----------------------------------------------------------------------------------------------------------------------------------------------------------
//     it('CRM Account Device List Mgmt Service', async function() {
//         try{
//             url = apiConfigJson.ams_preprod.url;
//             uri = apiConfigJson.ams_preprod.CRMAccountDeviceListMgmtService_URI;
//             environementUrl = url+"/"+uri;
//             console.log('Environement URL :===>> ',environementUrl);

//             updatedRequestBody = dataJson.testData.CRMAccountDeviceListMgmtService;
//             updatedRequestBody.subscriberList[0].userName = randomUser;
//             updatedRequestBody.subscriberList[0].crmAccountId = randomUser;
//             //updatedRequestBody.subscriberList[0].subscriberDeviceList[0].deviceUUID=;
//             //updatedRequestBody.subscriberList[0].subscriberDeviceList[0].deviceAlias=;


//             const config = {
//                 'method': 'POST',
//                 'url': environementUrl,
//                 'maxBodyLength': Infinity,
//                 'headers': {
//                     'Content-Type': 'application/json'
//                 },
//                 'data': JSON.stringify(updatedRequestBody),
//                 'httpsAgent': httpsAgentPreProd
//             }
//             response = await axios(config).then((response)=> {
//                 statusCode=response.status;
//                 console.log('Response Body :===>>> ',response.data);
//                 console.log('Response Code :===>>> ', statusCode);
//                 return response;

//             })
//         }catch(err){
//             console.log(err);
//         }
//         console.log('---------------------------------Test-8------------------------------------------------------------------------------');
//     });
// //------------------------------------------------------------------------------------------------------------------------------------------------------
//     it('Get Subscriber ', async function() {
//         try{
//             url = apiConfigJson.ams_preprod.url;
//             uri = apiConfigJson.ams_preprod.Get_Subscriber_URI;
//             environementUrl = url+"/"+uri+""+randomUser;
//             console.log('Environement URL :===>> ',environementUrl);

//             const config = {
//                 'method': 'GET',
//                 'url': environementUrl,
//                 'maxBodyLength': Infinity,
//                 'headers': {
//                     'Content-Type': 'application/json'
//                 },
//             //    'data': JSON.stringify(updatedRequestBody),
//                 'httpsAgent': httpsAgentPreProd
//             }
//             response = await axios(config).then((response)=> {
//                 statusCode=response.status;
//                 console.log('Response Body :===>>> ',response.data);
//                 console.log('Response Code :===>>> ', statusCode);
//                 return response;

//             })
//         }catch(err){
//             console.log(err);
//         }
//         console.log('---------------------------------Test-9------------------------------------------------------------------------------');
//     });
//     //-------------------------------------------------------------------------------------------------------------------------------------------------------
//     it('Get Assigned Packages', async function() {
//         try{
//             url = apiConfigJson.ams_preprod.url;
//             uri = apiConfigJson.ams_preprod.getAssignedPackages_URI;
//             environementUrl = url+"/"+uri+"/"+randomUser+"/"+"packages";
//             console.log('Environement URL :===>> ',environementUrl);

//             const config = {
//                 'method': 'GET',
//                 'url': environementUrl,
//                 'maxBodyLength': Infinity,
//                 'headers': {
//                     'Content-Type': 'application/json'
//                 },
//               //  'data': JSON.stringify(updatedRequestBody),
//                 'httpsAgent': httpsAgentPreProd
//             }
//             response = await axios(config).then((response)=> {
//                 statusCode=response.status;
//                 console.log('Response Body :===>>> ',response.data);
//                 console.log('Response Code :===>>> ', statusCode);
//                 return response;

//             })
//         }catch(err){
//             console.log(err);
//         }
//         console.log('---------------------------------Test-10------------------------------------------------------------------------------');
//     });
//     //----------------------------------------------------11--------------------------------------------------------------------------------------------------
//     // // it('Set Pins', async function() {
//     // //     try{
//     // //         url = apiConfigJson.ams_preprod.url;
//     // //         uri = apiConfigJson.ams_preprod.setPins_URI;
//     // //         environementUrl = url+"/"+uri+"/"+randomUser+"/"+"pin";
//     // //         console.log('Environement URL :===>> ',environementUrl);

//     // //         const config = {
//     // //             'method': 'POST',
//     // //             'url': environementUrl,
//     // //             'maxBodyLength': Infinity,
//     // //             'headers': {
//     // //                 'Content-Type': 'application/json'
//     // //             },
//     // //            //'data': JSON.stringify(updatedRequestBody),
//     // //             'httpsAgent': httpsAgentPreProd
//     // //         }
//     // //         response = await axios(config).then((response)=> {
//     // //             console.log(response.data);
//     // //             return response;

//     // //         })
//     // //     }catch(err){
//     // //         console.log(err);
//     // //     }
//     // //     console.log('---------------------------------Test-11[Not Working]------------------------------------------------------------------------------');
//     // // });
//     // // //------------------------------------------------------12------------------------------------------------------------------------------------------------
//     // // it('check Purchase Pin', async function() {
//     // //     try{
//     // //         url = apiConfigJson.ams_preprod.url;
//     // //         uri = apiConfigJson.ams_preprod.che;
//     // //         environementUrl = url+"/"+uri+"/"+randomUser+"/"+"pin";
//     // //         console.log('Environement URL :===>> ',environementUrl);

//     // //         const config = {
//     // //             'method': 'POST',
//     // //             'url': environementUrl,
//     // //             'maxBodyLength': Infinity,
//     // //             'headers': {
//     // //                 'Content-Type': 'application/json'
//     // //             },
//     // //            'data': JSON.stringify(updatedRequestBody),
//     // //             'httpsAgent': httpsAgentPreProd
//     // //         }
//     // //         response = await axios(config).then((response)=> {
//     // //             console.log(response.data);
//     // //             return response;

//     // //         })
//     // //     }catch(err){
//     // //         console.log(err);
//     // //     }
//     // //     console.log('---------------------------------Test-12[Not Working]------------------------------------------------------------------------------');
//     // // });
//     // // //---------------------------------------------------------13---------------------------------------------------------------------------------------------
//     // // it('check Parental Control Pin', async function() {
//     // //     try{
//     // //         url = apiConfigJson.ams_preprod.url;
//     // //         uri = apiConfigJson.ams_preprod.che;
//     // //         environementUrl = url+"/"+uri+"/"+randomUser+"/"+"pin";
//     // //         console.log('Environement URL :===>> ',environementUrl);

//     // //         const config = {
//     // //             'method': 'POST',
//     // //             'url': environementUrl,
//     // //             'maxBodyLength': Infinity,
//     // //             'headers': {
//     // //                 'Content-Type': 'application/json'
//     // //             },
//     // //            'data': JSON.stringify(updatedRequestBody),
//     // //             'httpsAgent': httpsAgentPreProd
//     // //         }
//     // //         response = await axios(config).then((response)=> {
//     // //             console.log(response.data);
//     // //             return response;

//     // //         })
//     // //     }catch(err){
//     // //         console.log(err);
//     // //     }
//     // //     console.log('---------------------------------Test-13[Not Working]------------------------------------------------------------------------------');
//     // // });

// //-------------------------------------------------------------------------------------------------------------------------------------------------------
//     it('User Refresh Token', async function () {
//         try {
//             url = apiConfigJson.ams_preprod.url;
//             uri = apiConfigJson.ams_preprod.UserRefreshToken_URI;
//             environementUrl = url + "/" + uri + "" + randomUser;
//             console.log('Env URL := ' + environementUrl);

//             const config = {
//                 'method': 'GET',
//                 'url': environementUrl,
//                 'maxBodyLength': Infinity,
//                 'headers': {
//                     'Content-Type': 'application/json'
//                 },
//                 'data': JSON.stringify(updatedRequestBody),
//                 'httpsAgent': httpsAgentPreProd
//             }
//             response = await axios(config).then((response)=> {
//                 statusCode=response.status;
//                 console.log('Response Body :===>>> ',response.data);
//                 console.log('Response Code :===>>> ', statusCode);
//                 return response;

//             })
//         } catch (err) {
//             console.log(err);

//         }
//         console.log('---------------------------------Test-14------------------------------------------------------------------------------');
//     });

// //-------------------------------------------------------------------------------------------------------------------------------------------------------
//     it('delete User Refresh Token', async function () {
//         try {
//             url = apiConfigJson.ams_preprod.url;
//             uri = apiConfigJson.ams_preprod.deleteUserRefreshToken_URI;
//             environementUrl = url + "/" + uri + "" + randomUser;
//             console.log('Env URL := ' + environementUrl);

//             const config = {
//                 'method': 'DELETE',
//                 'url': environementUrl,
//                 'maxBodyLength': Infinity,
//                 'headers': {
//                     'Content-Type': 'application/json'
//                 },
//                 'data': JSON.stringify(updatedRequestBody),
//                 'httpsAgent': httpsAgentPreProd
//             }
//             response = await axios(config).then((response)=> {
//                 statusCode=response.status;
//                 console.log('Response Body :===>>> ',response.data);
//                 console.log('Response Code :===>>> ', statusCode);
//                 return response;

//             })
//         } catch (err) {
//             console.log(err);

//         }
//         console.log('---------------------------------Test-15------------------------------------------------------------------------------');
//     });

// //-------------------------------------------------------------------------------------------------------------------------------------------------------
//     it('Created user Deactivation ', async function() {
//         try{
//             url = apiConfigJson.ams_preprod.url;
//             uri = apiConfigJson.ams_preprod.Created_User_Deactivation_URI;
//             environementUrl = url+"/"+uri;
//             console.log('Environement URL :===>> ',environementUrl);

//              updatedRequestBody = dataJson.testData.Created_User_Deactivation;
//              updatedRequestBody.subscriberList[0].crmAccountId= randomUser;
//             updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;
//             //updatedRequestBody.subscriberList[0].subscriberDeviceList[0].deviceUUID=;
//             //updatedRequestBody.subscriberList[0].subscriberDeviceList[0].deviceAlias=;


//             const config = {
//                 'method': 'POST',
//                 'url': environementUrl,
//                 'maxBodyLength': Infinity,
//                 'headers': {
//                     'Content-Type': 'application/json'
//                 },
//                 'data': JSON.stringify(updatedRequestBody),
//                 'httpsAgent': httpsAgentPreProd
//             }
//             response = await axios(config).then((response)=> {
//                 statusCode=response.status;
//                 console.log('Response Body :===>>> ',response.data);
//                 console.log('Response Code :===>>> ', statusCode);
//                 return response;

//             })
//         }catch(err){
//             console.log(err);
//         }
//         console.log('---------------------------------Test-16------------------------------------------------------------------------------');
//     });
// //-----------------------------------------------------------------------------------------------------------------------------------------------------
//     it('Created User Deletion ', async function() {
//         try{
//             url = apiConfigJson.ams_preprod.url;
//             uri = apiConfigJson.ams_preprod.Created_User_Deletion_URI;
//             environementUrl = url+"/"+uri;
//             console.log('Environement URL :===>> ',environementUrl);

//              updatedRequestBody = dataJson.testData.Created_User_Deletion;
//              updatedRequestBody.subscriberList[0].crmAccountId= randomUser;
//             updatedRequestBody.subscriberList[0].accountList[0].username = randomUser;


//             const config = {
//                 'method': 'POST',
//                 'url': environementUrl,
//                 'maxBodyLength': Infinity,
//                 'headers': {
//                     'Content-Type': 'application/json'
//                 },
//                 'data': JSON.stringify(updatedRequestBody),
//                 'httpsAgent': httpsAgentPreProd
//             }
//             response = await axios(config).then((response)=> {
//                 statusCode=response.status;
//                 console.log('Response Body :===>>> ',response.data);
//                 console.log('Response Code :===>>> ', statusCode);
//                 return response;

//             })
//         }catch(err){
//             console.log(err);
//         }
//         console.log('---------------------------------Test-17------------------------------------------------------------------------------');
//     });
    //-----------------------------------------------------------------------------------------------------------------------------------------------------
})


