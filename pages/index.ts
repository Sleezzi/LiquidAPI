import { Request, Response } from "express";
module.exports = {
    name: "/",
    method: "GET",
    execute(request: Request, response: Response) {
        if (request.accepts("html")) return response.send("<meta http-equiv=\"refresh\" content=\"0; url=https://sleezzi.fr\">");
        require("../response")(request, response, 404);
    }
}