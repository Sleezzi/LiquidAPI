import express, { Express, Request, Response, NextFunction } from "express";
import bodyparser from "body-parser";

import { readdirSync } from "fs";

const PORT: number | string = process.env.PORT || 3000;

const app: Express = express();
app.use(bodyparser.json());
app.use((request: Request, response: Response, next: NextFunction) => {
    response.setHeader('Access-Control-Allow-Origin', '*'); // Autoriser toutes les origines
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Autoriser les méthodes HTTP
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Autoriser certains en-têtes
    next();
});

interface Page {
    name: string,
    method: string | "GET" | "POST" | "PUT" | "DELETE",
    execute: Function
}

for (const file of readdirSync("./pages").filter((file: string) => file.endsWith(".ts"))) {
    const page: Page = require(`./pages/${file}`);
    if (page.name && page.execute) {
        app[page.method.toLowerCase() as keyof Express || "get"](page.name, (request: Request, response: Response) =>  page.execute(request, response));
        console.log(`Pages ${page.name} loaded!`);
    } else {
        console.log(`Pages ${file} not loaded: Somethings is missing in file`);
    }
}

app.get("*", (request: Request, response: Response) => {
    require("./error")(request, response, 404);
});

app.listen(PORT, () => {
    console.log("LiquidAPI is launched on the port:", PORT, `(http://localhost:${PORT})`);
});