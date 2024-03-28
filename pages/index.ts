import express, { Express, Request, Response } from "express";
module.exports = {
    name: "/",
    type: "GET",
    execute(request: Request, response: Response) {
        response.status(200).json({status: 200});
    }
}