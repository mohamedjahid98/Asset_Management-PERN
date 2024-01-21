const express = require("express");
const router = express.Router();
const sequelize = require("../database");

router.get("/signupdata", async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM signups');
        res.status(200).json({
            success: true,
            users: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

router.post("/signup", async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;
    const insertSignup = `INSERT INTO signups (username, email, password, confirmpassword) VALUES ('${username}', '${email}', '${password}', '${confirmpassword}')`;

    try {
        const response = await sequelize.query(insertSignup);
        console.log("Signup Success");
        console.log(response);
        res.send("Saved" + req.body);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/getUserProfile/:id", async (req, res) => {
    const employeeId = req.params.id;

    try {
        const result = await sequelize.query('SELECT * FROM signups WHERE id = $1', [employeeId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                user: result.rows[0],
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

router.put("/updateUserProfile/:id", async (req, res) => {
    const employeeId = req.params.id;
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required for updating an User",
        });
    }

    const updateUserQuery = `
    UPDATE signups
    SET username = $1, email = $2, password = $3, confirmpassword = $4
    WHERE id = $5
    RETURNING *;`;

    try {
        const result = await sequelize.query(updateUserQuery, [username, email, password, confirmpassword , employeeId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                category: result.rows[0],
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

module.exports = router;
