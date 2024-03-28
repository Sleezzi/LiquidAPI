import express, { Express, Request, Response } from "express";
import bodyparser from "body-parser";

import { readdirSync } from "fs";

const PORT: number | string = process.env.PORT || 3000;

const app: Express = express();
app.use(bodyparser.json());

interface Page {
    name: string,
    method: string | "GET" | "POST" | "PUT" | "DELETE",
    execute: Function
}

for (const file of readdirSync("./pages").filter((file: string) => file.endsWith(".ts"))) {
    const page: Page = require(`./pages/${file}`);
    if (page.name && page.execute) {
        app["get"](page.name, (request: Request, response: Response) =>  page.execute(request, response));
        console.log(`Pages ${page.name} loaded!`);
    } else {
        console.log(`Pages ${file} not loaded: Somethings is missing in file`);
    }
}

app.get("*", (request: Request, response: Response) => {
    require("./error")(request, response, 404);
});

app.listen(PORT, () => {
    console.log("API Launched!", PORT);
});