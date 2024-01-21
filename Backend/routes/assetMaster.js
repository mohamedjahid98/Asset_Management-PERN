const express = require("express");
const router = express.Router();
const sequelize = require("../database");

router.get("/assetsdata", async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM Assetsmaster');
        res.status(200).json({
            success: true,
            assetsdata: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

router.get("/getAssetsmas/:id", async (req, res) => {
    const categoryId = req.params.id;

    try {
        const result = await sequelize.query('SELECT * FROM Assetsmaster WHERE id = $1', [categoryId]);

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
router.post("/createAssetsmas", async (req, res) => {
    const { serial_no, asset_type, make, model, purchase_date,purchase_cost } = req.body;

    const createAssetQuery = `
        INSERT INTO Assetsmaster (serial_no, asset_type, make, model, purchase_date,purchase_cost)
        VALUES ($1, $2, $3, $4, $5,$6)
        RETURNING id;`;

    try {
        const result = await sequelize.query(createAssetQuery, [serial_no, asset_type, make, model, purchase_date,purchase_cost]);

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
router.put("/updateAssetsmas/:id", async (req, res) => {
    const categoryId = req.params.id;
    const { serial_no, asset_type, make, model, purchase_date, purchase_cost } = req.body;

    // Check if all required fields are provided
    if (!serial_no || !asset_type || !make || !model || !purchase_date || !purchase_cost) {
        return res.status(400).json({
            success: false,
            message: "All fields are required for updating an asset",
        });
    }

    const updateCategoryQuery = `
        UPDATE Assetsmaster
        SET serial_no = $1, asset_type = $2, make = $3, model = $4, purchase_date = $5, purchase_cost = $6
        WHERE id = $7
        RETURNING *;`;

    try {
        const result = await sequelize.query(updateCategoryQuery, [serial_no, asset_type, make, model, purchase_date, purchase_cost, categoryId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Asset updated successfully",
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
router.delete("/deleteAssetsmas/:id", async (req, res) => {
    const categoryeId = req.params.id;

    const deleteCategoryQuery = `
        DELETE FROM Assetsmaster
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
