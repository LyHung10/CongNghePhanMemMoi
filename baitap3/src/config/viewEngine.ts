import express, { Application } from "express";

const configViewEngine = (app: Application) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

export default configViewEngine;
