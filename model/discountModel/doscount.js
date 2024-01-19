import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    discountType: { type: String, enum: ['percentage', 'fixed', 'buyOneGetOne'] },
    amount: Number,
    conditions: { type: String, default: 'none' },
    expirationDate: Date,
});

// Create an index on the expirationDate field for efficient querying
discountSchema.index({ expirationDate: 1 });

// Mongoose middleware to automatically remove expired discount codes
discountSchema.pre('deleteMany', function (next) {
    const currentDate = new Date();
    this.where('expirationDate').lt(currentDate);
    next();
});

const Discount = mongoose.model('Discount', discountSchema);

export default Discount


// Import necessary modules
// const express = require('express');
// const router = express.Router();
// const Discount = require('../models/discount'); // Replace with the path to your Discount model file

// // Endpoint for deleting expired discounts
// router.delete('/deleteExpiredDiscounts', async (req, res) => {
//     try {
//         // Trigger the deleteMany operation with the provided middleware conditions
//         const result = await Discount.deleteMany();

//         // Optionally, you can send a response indicating the number of deleted documents
//         res.json({ message: `${result.deletedCount} expired discounts deleted successfully.` });
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;
