import express, { Express, Request, Response } from "express";
module.exports = {
    name: "/",
    method: "GET",
    execute(request: Request, response: Response) {
        require("../error")(request, response, 404);
    }
}