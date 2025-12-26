import fs from "fs";
import path from "path";

export class SignupPage {
    constructor(page) {
        this.page = page
        this.email = page.getByPlaceholder("E-Mail")
        this.password = page.getByPlaceholder("password")
        this.btnRegister = page.locator("form button")
    }

    createandSaveNewAccount = async(email, password) => {

        await this.email.waitFor()
        
        await this.email.fill(email)

        await this.password.waitFor()
        
        await this.password.fill(password)

        // const credentials = { username: email, password: password };
        const credentials = { username: email, password: password };

        // ------------------------
        // Save password to .env
        // ------------------------
        const envFilePath = path.resolve(process.cwd(), ".env");

        // Append password to .env (or overwrite existing)
        fs.writeFileSync(envFilePath, `PASSWORD=${credentials.password}\n`, { flag: "w" });

        // ------------------------
        // Save email to JSON
        // ------------------------
        const dataDir = path.resolve(process.cwd(), "auth");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        const filePath = path.join(dataDir, "credentials.json");

        // Only save the email
        const jsonData = { username: email, password: "fetching from environment Variable (.env File)" };
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

        console.log("Email saved in JSON and password saved in .env!");

        //for debug purpose only
        // console.log("Credentials saved:", credentials);

        await this.btnRegister.waitFor()
        await this.btnRegister.click()

        return credentials;
    }

}