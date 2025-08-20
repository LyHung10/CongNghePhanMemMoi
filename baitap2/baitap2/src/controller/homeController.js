import db from '../models/index'; //import database
import CRUDService from '../services/CRUDService'; //import service

//hàm getHomePage
let getHomePage = async (req, res) => {
    //return res.send('Nguyễn Hữu Trung');
    try {
        let data = await db.User.findAll(); //lấy dữ liệu từ models/index
        console.log('....................');
        console.log(data);
        console.log('....................');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) //trả dữ liệu data về view
        });
    } catch (e) {
        console.log(e);
    }
};

//hàm getAbout
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

//hàm CRUD
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

//hàm findAll CRUD
let getFindAllCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', {
        datalist: data
    }); //gọi view và truyền dữ liệu ra view
};

//hàm post CRUD
let postCRUD = async (req, res) => { //dùng async để xử lý bất đồng bộ
    let message = await CRUDService.createNewUser(req.body); //gọi service
    //console.log(req.body); //lấy thông tin body của http request
    console.log(message);
    return res.send('Post crud to server');
};

//hàm lấy dữ liệu để edit
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) { //check id
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/editUser.ejs', {
            data: userData
        });
    } else {
        return res.send('không lấy được id');
    }
    // console.log(req.query.id);
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data); //update rồi hiển thị lại danh sách user
    //let data1 = await CRUDService.getAllUser(); //hiển thị danh sách user
    return res.render('users/findAllUser.ejs', {
        datalist: data1
    });
    // return res.send('update thành công');
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id; //vì trên view ?id=1
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!!!!!!!!!!!');
    } else {
        return res.send('Not find user');
    }
};

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud: getFindAllCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
};