const express = require("express");
const router = express.Router();
const sequelize = require("../database");

router.get("/empdata", async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM employees');
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

router.post("/createEmployee", async (req, res) => {
    const { empname, email, dept, position, mobile_no } = req.body;

    const createEmployeeQuery = `
        INSERT INTO employees (empname, email, dept, position, mobile_no)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;`;

    try {
        const result = await sequelize.query(createEmployeeQuery, [empname, email, dept, position, mobile_no]);

        const employeeId = result.rows[0].id;
        res.status(201).json({
            success: true,
            id: employeeId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

router.get("/getEmployee/:id", async (req, res) => {
    const employeeId = req.params.id;

    try {
        const result = await sequelize.query('SELECT * FROM employees WHERE id = $1', [employeeId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                employee: result.rows[0],
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



router.put("/updateEmployee/:id", async (req, res) => {
    const employeeId = req.params.id;
    const {  empname, email, dept, position, mobile_no } = req.body;

    if (!empname || !email || !dept || !position || !mobile_no) {
        return res.status(400).json({
            success: false,
            message: "All fields are required for updating an employee",
        });
    }

    const updateEmployeeQuery = `
    UPDATE employees
    SET empname = $1, email = $2, dept = $3, position = $4, mobile_no = $5
    WHERE id = $6
    RETURNING *;`;

    try {
        const result = await sequelize.query(updateEmployeeQuery, [empname, email, dept, position, mobile_no, employeeId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Employee updated successfully",
                category: result.rows[0],
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Asset not found",
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

// Delete employee by ID
router.delete("/deleteEmployee/:id", async (req, res) => {
    const employeeId = req.params.id;

    const deleteEmployeeQuery = `
        DELETE FROM employees
        WHERE id = $1
        RETURNING id;`;

    try {
        const result = await sequelize.query(deleteEmployeeQuery, [employeeId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Employee deleted successfully",
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

module.exports = router;
