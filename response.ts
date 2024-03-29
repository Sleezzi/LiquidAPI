import express, { Express, Request, Response } from "express";
const codeList: { [index: number]: string } = {
    200: "OK",
    201: "Created",
    400: "Bad request",
    401: "Authentication is required to access the resource.",
    404: "This resource does not exist/no longer exists",
    403: "The server understood the request but refuses to execute it"
}

module.exports = function (request: Request, response: Response, code: number) {
    if (codeList[code]) {
        response.status(code).json({
            status: code,
            statusText: codeList[code]
        });
    } else {
        response.status(code).json({
            status: code
        });
    }
}