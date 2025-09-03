require('dotenv').config();
//import cac nguon can dung
const express = require('express'); //commonjs
const configViewEngine = require('./src/config/viewEngine');
const apiRoutes = require('./src/routes/api');
const productRoutes = require('./src/routes/productRoutes');
const connection = require('./src/config/database');
const { getHomepage } = require('./src/controllers/homeController');
const cors = require('cors');
const categoryRoutes = require('./src/routes/categoryRoute');


const app = express(); //cấu hình app là express
//cấu hình port, nếu tìm thấy port trong env, không thì trả về 8888
const port = process.env.PORT || 8888;
app.use(cors()); //config cors
app.use(express.json()); // config req.body cho json
app.use(express.urlencoded({ extended: true })); // for form data

configViewEngine(app); //config template engine

//khai bao route cho view ejs
const webAPI = express.Router();
webAPI.get("/", getHomepage);
app.use("/", webAPI);

//khai bao route cho API
app.use('/v1/api', apiRoutes);
app.use('/v1/product', productRoutes);
app.use("/v1/category", categoryRoutes);

(async () => {
    try {
        //kết nối database using mongoose
        await connection();

        //lắng nghe nghe port trong env
        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`);
        });
    } catch (error) {
        console.log(`>>> Error connect to DB:`, error);
    }
})();