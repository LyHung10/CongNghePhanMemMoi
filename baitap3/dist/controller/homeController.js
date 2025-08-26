import db from '../models/index.js';
import CRUDService from '../services/CRUDService.js';
// hàm getHomePage
const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // lấy dữ liệu từ models/index
        console.log("....................");
        console.log(data);
        console.log("....................");
        return res.render("homepage.ejs", {
            data: JSON.stringify(data), // trả dữ liệu data về view
        });
    }
    catch (e) {
        console.log(e);
    }
};
// hàm getAbout
const getAboutPage = (req, res) => {
    return res.render("test/about.ejs");
};
// hàm CRUD
const getCRUD = (req, res) => {
    return res.render("crud.ejs");
};
// hàm findAll CRUD
const getFindAllCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render("users/findAllUser.ejs", {
        datalist: data,
    });
};
// hàm post CRUD
const postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body); // gọi service
    console.log(message);
    return res.send("Post crud to server");
};
const getEditCRUD = async (req, res) => {
    const userId = Number(req.query.id); // ép thẳng sang number
    if (!isNaN(userId)) {
        const userData = await CRUDService.getUserInfoById(userId);
        return res.render("users/editUser.ejs", {
            data: userData,
        });
    }
    else {
        return res.send("không lấy được id");
    }
};
// update user
const putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data);
    return res.render("users/findAllUser.ejs", {
        datalist: data1,
    });
};
// delete user
const deleteCRUD = async (req, res) => {
    let id = Number(req.query.id);
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send("Deleted!!!!!!!!!!!!!!");
    }
    else {
        return res.send("Not find user");
    }
};
export default {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
};
