import fetch from "node-fetch"
import fs from "fs"

const getSavedCredentials = (filePath = "./auth/credentials.json") => {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const credentials = JSON.parse(rawData);

    // Replace password with environment variable
    credentials.password = process.env.PASSWORD;

    // console.log(credentials);
    return credentials;
};


export const getLoginToken = async() => {
    const reqBody = getSavedCredentials()
    const apiResponse = await fetch("http://localhost:2221/api/login", {
    method: "post",
    headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    body: JSON.stringify(reqBody)
})

if (apiResponse.status !== 200) {
        throw new Error("Login failed");
    }
const respBody = await apiResponse.json()
// console.log(respBody);
return respBody.token
}