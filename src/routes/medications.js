const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Get all medications
router.get('/medicationList', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const medications = await db.collection('medicationList').find().toArray();
        res.json(medications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch medications" });
    }
});

module.exports = router;
