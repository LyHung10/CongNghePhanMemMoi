require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        //check user exist
        const user = await User.findOne({ email: email });
        if (user) {
            console.log(`>>> user exist, chon 1 email khac: ${email}`);
            return null;
        }

        //hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        //save user to database
        const result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "user"
        });

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        //fetch user by email
        const user = await User.findOne({ email: email });
        if (user) {
            //compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (isMatchPassword) {
                //create an access token
                const payload = {
                    email: user.email,
                    name: user.name
                };

                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                }
                );
                return {
                    EC: 0,
                    access_token: access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        }
        return {
            EC: 2,
            EM: "Email/Password không hợp lệ"
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: "Đã có lỗi xảy ra"
        };
    }
}
const getUserService = async () => {
    try {
        let result = await User.find({}).select("-password");
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService,
    loginService,
    getUserService
};