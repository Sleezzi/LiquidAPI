import { Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";
module.exports = {
    name: "/new_audio",
    method: "POST",
    execute(request: Request, response: Response) {        
        if (
            !request.body ||
            !request.body.title // ||
            // !request.body.artists ||
            // !request.body.artists[0] ||
            // !request.body.artists[0].name ||
            // !request.body.artists[0].url ||
            // !request.body.cover ||
            // !request.body.cover["512"] ||
            // !request.body.cover["1024"] ||
            // !request.body.url
        ) {
            require("../response")(request, response, 400);
            return;
        }
        const audios = JSON.parse(readFileSync("./audios.json", { encoding: 'utf8', flag: 'r' }));
        audios.push({
            title: request.body.title,
            artists: request.body.artists,
            cover: request.body.cover,
            url: request.body.url
        });
        writeFileSync("./audios.json", JSON.stringify(audios));
        
        require("../response")(request, response, 201);
    }
}