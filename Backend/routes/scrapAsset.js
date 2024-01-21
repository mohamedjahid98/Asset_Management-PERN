const express = require("express");
const router = express.Router();
const sequelize = require("../database");

router.get("/scrapdata", async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM ScrapAsset');
        res.status(200).json({
            success: true,
            scrapdata: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

router.get("/getscrap/:id", async (req, res) => {
    const ScrapId = req.params.id;

    try {
        const result = await sequelize.query('SELECT * FROM ScrapAsset WHERE id = $1', [ScrapId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                scrapdata: result.rows[0],
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Issue not found",
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
router.post("/createScrap", async (req, res) => {
    const { asset_type, scrap_date, reason } = req.body;

    const createScrapQuery = `
        INSERT INTO ScrapAsset (asset_type, scrap_date, reason)
        VALUES ($1, $2, $3)
        RETURNING id;`;

    try {
        const result = await sequelize.query(createScrapQuery, [asset_type, scrap_date, reason]);

        const scrapdata = result.rows[0].id;
        res.status(201).json({
            success: true,
            id: scrapdata,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});



// Update by ID
router.put("/updateScrap/:id", async (req, res) => {
    const ScrapId = req.params.id;
    const { asset_type, scrap_date, reason } = req.body;

    if (!asset_type || !scrap_date || !reason) {
        return res.status(400).json({
            success: false,
            message: "All fields are required for updating an asset",
        });
    }

    const updateIssueQuery = `
        UPDATE ScrapAsset
        SET  asset_type = $1, scrap_date = $2, reason = $3
        WHERE id = $4
        RETURNING *;`;

    try {
        const result = await sequelize.query(updateIssueQuery, [rasset_type, scrap_date, reason, ScrapId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Scrap updated successfully",
                issuedata: result.rows[0],
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Scrap not found",
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
router.delete("/deleteScrap/:id", async (req, res) => {
    const issueId = req.params.id;

    const deleteCategoryQuery = `
        DELETE FROM ScrapAsset
        WHERE id = $1
        RETURNING id;`;

    try {
        const result = await sequelize.query(deleteCategoryQuery, [issueId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Scrap deleted successfully",
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Scrap not found",
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
