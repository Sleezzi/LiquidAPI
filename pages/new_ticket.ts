import express, { Express, Request, Response } from "express";
module.exports = {
    name: "/new_ticket",
    type: "POST",
    execute(request: Request, response: Response) {
        response.status(200).json(JSON.stringify({status: 200}));
    }
}