import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
export default {
    async up(queryInterface) {
        await queryInterface.bulkInsert("users", [
            {
                email: "admin@example.com",
                password: bcrypt.hashSync("123456", salt),
                firstName: "Admin",
                lastName: "User",
                address: "123 Admin Street",
                phoneNumber: "0123456789",
                gender: true,
                image: "",
                roleId: "R1",
                positionId: "P1",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "john@example.com",
                password: bcrypt.hashSync("123456", salt),
                firstName: "John",
                lastName: "Doe",
                address: "456 John Street",
                phoneNumber: "0987654321",
                gender: true,
                image: "",
                roleId: "R2",
                positionId: "P2",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("users", {}, {});
    },
};
