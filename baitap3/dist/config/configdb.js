import { Sequelize } from "sequelize";
// Tạo instance Sequelize
const sequelize = new Sequelize("CNPM", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});
// Hàm kết nối DB
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
export default connectDB;
export { sequelize };
