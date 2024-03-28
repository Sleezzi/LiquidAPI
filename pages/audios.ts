import express, { Express, Request, Response } from "express";

import audios from "../audios.json";

module.exports = {
    name: "/audios",
    method: "GET",
    execute(request: Request, response: Response) {
        response.status(200).json(audios);
    }
}