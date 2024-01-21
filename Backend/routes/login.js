const express = require("express");
const router = express.Router();
const pool = require("../database");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const checkLogin = `SELECT * FROM signups WHERE email = '${email}' AND password = '${password}'`;

    try {
        const result = await pool.query(checkLogin);
        if (result.rows.length > 0) {
            console.log("Login Successful");

            res.status(200).json({
                success: true,
                user: {
                    email: result.rows[0].email,
                    username: result.rows[0].username,
                    id: result.rows[0].id,
                }
            });
        } else {
            console.log("Invalid credentials");
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
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
