import fetch from "node-fetch"
import fs from "fs"

const getSavedCredentials = (filePath = "./auth/credentials.json") => {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const credentials = JSON.parse(rawData);

    // Replace password with environment variable
    credentials.password = process.env.PASSWORD;
    // console.log("Request Body:", credentials);
    // console.log(rawData);
    return credentials;
};


export const getLoginToken = async() => {
    // console.log(getSavedCredentials())
    const reqBody = getSavedCredentials()
    // console.info(reqBody)
    const apiResponse = await fetch("http://localhost:2221/api/login", {
    method: "POST",
    headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    body: JSON.stringify(reqBody)
})

    // console.log("Status" + apiResponse.status)

    const body = await apiResponse.text();
    // console.log("Response body:", body);

if (apiResponse.status !== 200) {
        throw new Error("Login failed");
    }
// const respBody = await apiResponse.json()
// console.log(respBody);
return JSON.parse(body).token
}