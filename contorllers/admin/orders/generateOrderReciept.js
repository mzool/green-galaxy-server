import logger from "../../../services/winston_logger.js";
import OrdersDB from "../../../model/orders/order.js";
import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";
async function generateOrderReciepte(req, res) {
    try {
        const { addItem, order_id } = req.body;
        // /// first git the order from DB
        // const theOrder = await OrdersDB.findOne({ order_id }).populate({
        //     path: "items.product",
        //     model: "product"
        // }).lean();
        // if (!theOrder) {
        //     return res.status(404).json({ success: false, message: "Order not found" })
        // }
        const htmlPath = path.resolve("views/reciept.html");
        const htmlTemplate = fs.readFileSync(htmlPath, "utf-8");
        //////////////////////////////////////////////////////////////
        const storeName = "Your Store Name";
        const email = "yourstore@example.com";
        const address = "123 Main Street, Cityville";
        const totalAmount = "$100.00";
        const customerName = "John Doe";
        const customerAddress = "456 Customer Street, Cityville";
        const dateOfIssued = "January 20, 2024";
        const receiptNumber = "#12345";
        const items = [
            { quantity: 2, itemName: "Product A", price: "$25.00", amount: "$50.00" },
            { quantity: 1, itemName: "Product B", price: "$30.00", amount: "$30.00" }
        ];
        const subtotal = "$80.00";
        const taxes = "$5.00";
        const delivery = "$10.00";
        const discount = "-$5.00";
        const total = "$90.00";
        /////////////////////////////////////////////////////////////
        const reciept = htmlTemplate.replace('{{STORE_NAME}}', storeName)
            .replace('{{EMAIL}}', email)
            .replace('{{ADDRESS}}', address)
            .replace('{{TOTAL_AMOUNT}}', totalAmount)
            .replace('{{CUSTOMER_NAME}}', customerName)
            .replace('{{CUSTOMER_ADDRESS}}', customerAddress)
            .replace('{{DATE_OF_ISSUED}}', dateOfIssued)
            .replace('{{RECEIPT_NUMBER}}', receiptNumber)
            .replace('{{ITEMS}}', generateItemsHTML(items))
            .replace('{{SUBTOTAL}}', subtotal)
            .replace('{{TAXES}}', taxes)
            .replace('{{DELIVERY}}', delivery)
            .replace('{{DISCOUNT}}', discount)
            .replace('{{TOTAL}}', total);
        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Add HTML content to the PDF
        // Options for pdf.create
        const pdfOptions = { format: 'Letter' };

        pdf.create(reciept, pdfOptions).toBuffer(async (err, buffer) => {
            if (err) {
                console.log(err.message);
                logger.error(err);
                return res.status(500).json({ success: false, message: "Something went wrong while generating PDF" });
            }

            // Send the PDF as a response
            res.contentType("application/pdf").send(buffer);

            // ... (other code)
        });
        // Save or send the PDF as a response
        //  send the PDF as a response, use the following line instead:
        //res.contentType("application/pdf").send(pdf.output("blob"));
        return res.status(200).json({success:true, message:"reciept is here"})

    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "Somthing went wrong, try again later" })
    }
}
function generateItemsHTML(items) {
    return items.map(item => `
        <tr>
            <td>${item.quantity}</td>
            <td>${item.itemName}</td>
            <td>${item.price}</td>
            <td>${item.amount}</td>
        </tr>
    `).join('');
}

export default generateOrderReciepte