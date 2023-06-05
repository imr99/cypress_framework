function cleansCode(dirtyData) {
    if (dirtyData === '') {
        return
    }
    // regex's
    const regexTelusAVSCookie = /avs_cookie=([^;]+)/;
    const regexTelusAccessCookie = /telus_access_cookie=([^;]+)/;
    const regexTelusRefreshCookie = /telus_refresh_cookie=([^;]+)/;
    const telusUserProfile = /telus_user_profile=([^;]+)/;
    const telusSessionId = /sessionId=([^;]+)/;
    const telusUp = /up=([^;]+)/;


    const matchAVSCookie = dirtyData.match(regexTelusAVSCookie);
    const matchAccessCookie = dirtyData.match(regexTelusAccessCookie);
    const matchRefreshCookie = dirtyData.match(regexTelusRefreshCookie);
    const matchUserProfile = dirtyData.match(telusUserProfile);
    const matchSessionID = dirtyData.match(telusSessionId);
    const matchUp = dirtyData.match(telusUp);
    

    const telus_avs_cookie = matchAVSCookie[1]
    const telus_access_cookie = matchAccessCookie[1]
    const telus_refresh_cookie = matchRefreshCookie[1]
    const telus_user_profile = matchUserProfile[1]
    const session_id = matchSessionID[1]
    const up = matchUp[1]


    const headerData = {
        "avs_cookie": telus_avs_cookie,
        "telus_access_cookie" : telus_access_cookie,
        "telus_refresh_cookie": telus_refresh_cookie,
        "telus_user_profile" : telus_user_profile,
        "sessionId" : session_id,
        "up" : up,
        "test": "test"
    }
    return headerData;
}
// const headers = cleansCode(' telus_access_cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWx1c19hY2Nlc3NfY29va2llIjoiOWE3MjViYzg4MWJkYmY2MzUwYmMwZDJlOTlkNDI4N2MzMTFiMjU4MzNlZTg1MGRiZDc3ZDFiMjk5N2E0MDRmZiIsImV4cCI6MTY4NTk2MzI0OCwiaXNzIjoiQVZTIn0.Z8wlPTq6RFYZoUDMid_Lltq2E_et582Yg263UpuswvY; Max-Age=14399; Path=/; Expires=Mon, 05 Jun 2023 11:07:29 GMT; HttpOnly; Secure,telus_refresh_cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWx1c19yZWZyZXNoX2Nvb2tpZSI6Ijc1MTQyY2E5YTQzYjlhM2UwYjFmNDVjYjU5OWNlMjllOTM1YjZjY2U5N2QzNDRhOWI2YTFjN2M0ZGI4ZTEwNjQyZWFlY2VhMzQzNjM4MzBiZmIwMWZlODYwMTRiODQxMCIsImV4cCI6MTcxNzQ4NDg0OSwiaXNzIjoiQVZTIn0.8npQFZAv-T59wb8dcL6G54ewkCI40V6WSgG7VocFBq0; Max-Age=31536000; Path=/; Expires=Tue, 04 Jun 2024 07:07:30 GMT; HttpOnly; Secure,telus_user_profile=df7d3ef66f5f96453ee4a52a486dcf8a4d000f44fc1bf30102c8fad173507b33e9f1e9bbe3f1e7d8da0a5feceab4fda122bacb9642ffdd05c921be1a14ec9b256ff7d74b30ae9214865fceb1418e0845930b337fe9a98e6c0091510fe479ac0f172dd86152566f6d6d117958561bedeb22810ebd674900c826a2f70e26ad3db0; Max-Age=31536000; Path=/; Expires=Tue, 04 Jun 2024 07:07:30 GMT; HttpOnly; Secure,sessionId=fa26ed05-e0c7-7d8e-be13-0184f218debb; Path=/; HttpOnly; Secure,up=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg5MCwidXNlcm5hbWUiOiJvcHVzLnNxZDA0LnRzMDE2IiwidXNlclBDTGV2ZWxFcGciOjYwLCJ1c2VyUGNFeHRlbmRlZFJhdGluZ3MiOiIiLCJ1c2VyUGFyZW50YWxDb250cm9sIjoiTiIsInByb3BlcnR5IjpbeyJwcm9wZXJ0eU5hbWUiOiJPUFRJSyJ9XSwiaXNPdXRPZkhvbWUiOiJOIiwiaWF0IjoxNjg1OTQ4ODUwLCJleHAiOjE2OTM3MjQ4NTB9.DpW8WIU9-ofD5Dx529gNG-qtfl-ThJDHi_NeK9BHIpM; Max-Age=7776000; Path=/; Expires=Sun, 03 Sep 2023 07:07:30 GMT; HttpOnly; Secure,avs_cookie=eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjoiRXp6RG9NbTN1R1VGY1ZpMmpNNm1FYmRtRzdZd0U3WGZJNDE1SnorSkJzSFpmRnZadDlTd1JUUFB3R3poSlo2TW9NRERlZ3hwY0N6aXBkVEpTMlZxMkVlRmZYRWFtVCtnT1o2bld3bkI5eU1zN2pzcDVHSEZwY0JCWlQ4WlJDU3hqK25ScllQNytOREQ2eWxvcnppeTUvckgreDFnRDlNY0Eza1k1M043dkJCRkQ0YzZCcTlCZ2dmL25TbXJDN2h4Rmxta0xKOGo4blVUZWs4TEdHMEtoM001OUVack5BMTJQQ3lIZVF2dWdVeGlYZktEejdLVUFvaTdqeitPdndsQWpZSmJOcU4zQ2Q3UnQ1TU44Y0lOOGY5UTRUc1hnVWcwME5UTVNaUHhOSUpxMVFqTGs1MHpnRXRUcWRkNzBtd1ZRUVlhK1haQjM3QVZMKzZSTEQvanFGdVlIdVZ2cCtUb2RtSWk4T0ZyaWpFdGRJTzNBSDg1dGFHWVlhM1dUYm5FTFJYZkYrcncwRWdIVG5hOVNJRFVYSm1sc0Q4V0VwRTQwYjJlRWdtbEluSEFhZDFoSFVjL21Zb1JlNHppWk5DV3gxa0Nhdz09Iiwibm9uY2UiOiJqM3JjdTZaSDV5ek1uWHRUIiwiaXNzIjoiQVZTIiwiZXhwIjoxNjg1OTYzMjUwfQ.xIHb0peXl51z6u23tukKmT0yMIFZ8DzILGqRizx9_1s; Max-Age=31622400; Path=/; Expires=Wed, 05 Jun 2024 07:07:30 GMT; HttpOnly; Secure')
// console.log("headers" , headers)

module.exports = {
    cleansCode : cleansCode
}
