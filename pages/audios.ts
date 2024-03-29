import { Request, Response } from "express";
import { readFileSync } from "fs";

module.exports = {
    name: "/audios",
    method: "GET",
    execute(request: Request, response: Response) {
        response.status(200).json(JSON.parse(readFileSync("./audios.json", { encoding: 'utf8', flag: 'r' })));
    }
}