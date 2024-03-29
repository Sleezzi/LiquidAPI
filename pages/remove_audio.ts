import { Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";
module.exports = {
    name: "/remove_audio",
    method: "DELETE",
    execute(request: Request, response: Response) {
        if (!request.query.id) {
            require("../response")(request, response, 400);
            return;
        }
        const audios = JSON.parse(readFileSync("./audios.json", { encoding: 'utf8', flag: 'r' }));
        if (!audios[request.query.id as keyof number]) {
            require("../response")(request, response, 404);
            return;
        }
        audios.splice(request.query.id, request.query.id);
        
        writeFileSync("./audios.json", JSON.stringify(audios));
        
        require("../response")(request, response, 200);
    }
}