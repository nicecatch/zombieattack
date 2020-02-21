import { parse } from "url";
import next from "next";
import mongooseConnect from "../database";
import express from "express";
import { IncomingMessage, ServerResponse } from "http";
import populate from "../database/seedDatabase";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();


const runServer = async () => {
  await mongooseConnect();
  await populate()

  app.prepare().then(() => {
    const server = express();

    server.all("*", (req: IncomingMessage, res: ServerResponse) => {
      const parsedUrl = parse(req.url!, true);
      return handler(req, res, parsedUrl);
    });

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log(
        `> Server listening at http://localhost:${port} as ${
          dev ? "development" : process.env.NODE_ENV
        }`
      );
    });
  });
};

runServer();
