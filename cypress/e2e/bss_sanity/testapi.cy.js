const axios = require("axios");
const https = require("https")
const fs = require("fs")
const url = "https://client68-ams-ma-telus.preprod.n.svc.tv.telus.net/AMS/rest/crmAccountListMgmtService/subscriberRequest"
const username = "TestUser-160"
const propertyName = "OPTIK"
const commercialPackageId_Add = "Alacarte-AE_CP"
/**
 * THIS FILE IS ONLY USED FOR RUNTIME TESTING TO TEST OUT NEW CODE. DO NOT MODIFY THIS FILE ---
 */


const body = {
    "operationType": "CREATE",
    "tenantName": "TELUS",
    "subscriberList": [
        {
            "crmAccountId": username,
            "userType": "R",
            "qualitySetting": "1",
            "userPaymentMethod": "5",
            "userPinPurchase": "0000",
            "userPinParentalControl": "0000",
            "crmAccountRetailerDomain": "0001",
            "newsLetters": "Y",
            "blackList": "N",
            "fiscalCode": "AS99DD87D92HJ",
            "address": "str1234",
            "addressNumber": "str1234",
            "marketingFlag": "Y",
            "personalizedServicesFlag": "Y",
            "thirdPartiesFlag": "Y",
            "freeRentals": "20",
            "serviceStartDate": "2012-12-13",
            "serviceEndDate": "2012-12-13",
            "maxBWOverride": "100",
            "onePinFlag": "Y",
            "purchasePinEnabled": "N",
            "parentalControlPinEnabled": "N",
            "preferredEpgFormat": "vertical",
            "maxHDStreams": "100",
            "accessBWProfile": "100",
            "maxHDSetTopBoxes": "99",
            "properties": [
                {
                    "propertyName": propertyName
                }
            ],
            "accountList": [
                {
                    "isMaster": "Y",
                    "userStatus": "1",
                    "username": username,
                    "password": "Passw0rd1!",
                    "firstname": "K",
                    "surname": "K",
                    "birthDate": "2012-12-13",
                    "gender": "M",
                    "crmAccountMobileNumber": "4654564564",
                    "userLanguage": "ENG",
                    "isAdmin": "false",
                    "lockUnratedShows": "Y",
                    "showAllTitles": "Y",
                    "showGuideInformation": "Y",
                    "audioLanguageType": "ENG",
                    "uiLanguageType": "",
                    "nickName": "nagam",
                    "advTags": "str1234",
                    "purchaseEnabled": "true"
                }
            ],
            "subscriberDeviceList": [],
            "userRememberPinFlag": "Y",
            "userRememberPurchasePinflag": "Y",
            "pcFlag": "N",
            "monthlyBillingDay": 16,
            "weeklyBillingDay": "Tuesday",
            "commProfileList": [
                {
                    "solutionOfferExternalID": commercialPackageId_Add,
                    "operationType": "ADD",
                    "startDate": "2015-01-20T01:00:00+01:00",
                    "endDate": "",
                    "packageLocked": "Y"
                }
            ]
        }
    ]
}

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: fs.readFileSync("./../certificates/certificate_PreProd_Prod.pem", { encoding: "utf8", flag: "r" }),
    key: fs.readFileSync("./../certificates/certificate_key_PreProd_Prod.pem", { encoding: "utf8", flag: "r" }),
    passphrase: "YYY"
})

const config = {
    "method": "post",
    "url": url,
    "maxBodyLength": Infinity,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify(body),
    "httpsAgent": httpsAgent
}


async function getWithCerts() {
    try {
        const res = await axios(config).then((res) => {
            return res
        })
        console.log(res.data)
    }
    catch (err) {
        console.log(err)
    }
}

getWithCerts()



