import express, { Application } from "express";
import homeController from "../controller/homeController.js";

const router = express.Router(); // khởi tạo Router

const initWebRoutes = (app: Application) => {
    // cách 1:
    router.get('/', (req, res) => {
        return res.send('Nguyễn Lý Hùng');
    });

    // cách 2: gọi hàm trong controller
    router.get('/home', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getFindAllCrud);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    return app.use("/", router);
};

export default initWebRoutes;
