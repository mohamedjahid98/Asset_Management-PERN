const express = require("express");
const router = express.Router();
const sequelize = require("../database");

router.get("/categorydata", async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM AssetsCategory');
        res.status(200).json({
            success: true,
            categorydata: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

router.get("/getCategory/:id", async (req, res) => {
    const categoryId = req.params.id;

    try {
        const result = await sequelize.query('SELECT * FROM AssetsCategory WHERE id = $1', [categoryId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                category: result.rows[0],
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Category not found",
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
router.post("/createCategory", async (req, res) => {
    const { categoryname } = req.body;

    const createCategoryQuery = `
        INSERT INTO AssetsCategory (categoryname)
        VALUES ($1)
        RETURNING id;`;

    try {
        const result = await sequelize.query(createCategoryQuery, [categoryname]);

        const categoryeId = result.rows[0].id;
        res.status(201).json({
            success: true,
            id: categoryeId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});



// Update employee by ID
router.put("/updateCategory/:id", async (req, res) => {
    const categoryId = req.params.id;
    const { categoryname } = req.body;

    // Check if all required fields are provided
    if (!categoryname) {
        return res.status(400).json({
            success: false,
            message: "All fields are required for updating an category",
        });
    }

    const updateCategoryQuery = `
        UPDATE AssetsCategory
        SET categoryname = $1
        WHERE id = $2
        RETURNING *;`;

    try {
        const result = await sequelize.query(updateCategoryQuery, [categoryname, categoryId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "category updated successfully",
                category: result.rows[0], // Return the updated employee details
            });
        } else {
            res.status(404).json({
                success: false,
                message: "category not found",
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
router.delete("/deleteCategory/:id", async (req, res) => {
    const categoryeId = req.params.id;

    const deleteCategoryQuery = `
        DELETE FROM AssetsCategory
        WHERE id = $1
        RETURNING id;`;

    try {
        const result = await sequelize.query(deleteCategoryQuery, [categoryeId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Category deleted successfully",
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Category not found",
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
