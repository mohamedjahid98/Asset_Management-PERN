const express = require("express");
const router = express.Router();
const sequelize = require("../database");

router.get("/issuedata", async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM IssueAssets');
        res.status(200).json({
            success: true,
            issuedata: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

router.get("/getIssuedata/:id", async (req, res) => {
    const IssueId = req.params.id;

    try {
        const result = await sequelize.query('SELECT * FROM IssueAssets WHERE id = $1', [IssueId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                issuedata: result.rows[0],
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
router.post("/createIssue", async (req, res) => {
    const { empId,empsname, asset_type, issue_date, ret_date, reason } = req.body;

    const createAssetQuery = `
        INSERT INTO IssueAssets (empId,empsname, asset_type, issue_date, ret_date, reason)
        VALUES ($1, $2, $3, $4, $5,$6)
        RETURNING id;`;

    try {
        const result = await sequelize.query(createAssetQuery, [empId,empsname, asset_type, issue_date, ret_date, reason]);

        const issuedata = result.rows[0].id;
        res.status(201).json({
            success: true,
            id: issuedata,
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
router.put("/updateIssue/:id", async (req, res) => {
    const issueId = req.params.id;
    const { ret_date, reason } = req.body;

    if (!ret_date || !reason) {
        return res.status(400).json({
            success: false,
            message: "All fields are required for updating an asset",
        });
    }

    const updateIssueQuery = `
        UPDATE IssueAssets
        SET  ret_date = $1, reason = $2
        WHERE id = $3
        RETURNING *;`;

    try {
        const result = await sequelize.query(updateIssueQuery, [ret_date, reason, issueId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Issue updated successfully",
                issuedata: result.rows[0],
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


// Delete employee by ID
router.delete("/deleteIssue/:id", async (req, res) => {
    const issueId = req.params.id;

    const deleteCategoryQuery = `
        DELETE FROM IssueAssets
        WHERE id = $1
        RETURNING id;`;

    try {
        const result = await sequelize.query(deleteCategoryQuery, [issueId]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Issue deleted successfully",
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

module.exports = router;
