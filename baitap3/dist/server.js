import express from "express"; // nạp express
import bodyParser from "body-parser"; // nạp body-parser lấy tham số từ client /user?id=7
import viewEngine from "./config/viewEngine.js"; // nạp viewEngine
import initWebRoutes from "./route/web.js"; // nạp file web từ Route
import connectDB from "./config/configdb.js";
import dotenv from "dotenv"; // thay require bằng import
dotenv.config(); // gọi hàm config của dotenv để chạy lệnh process.env.PORT
const app = express();
// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
connectDB();
// Lấy PORT từ env, fallback về 6969
const port = Number(process.env.PORT) || 6969;
// chạy server
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port : " + port);
});
