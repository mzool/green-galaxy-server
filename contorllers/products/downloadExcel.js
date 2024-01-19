import exceljs from 'exceljs'
import product from "../../model/products/product.js"
import logger from "../../services/winston_logger.js"
async function GenerateProductExcelFile(req, res) {
    try {
        /// new excel file
        const workbook = new exceljs.Workbook();
        /// new sheet
        const worksheet = workbook.addWorksheet('all products');
        /// add headers row
        worksheet.addRow(['product name', 'product description', 'product images links', 'product category', 'product price', 'product stock', 'current product discount', 'colors', 'sizes', 'other varients', 'available countries']);
        /// add vlues
        const allProducts = await product.find({});
        Object.keys(allProducts).forEach((product) => {
            worksheet.addRow([allProducts[product].productName, allProducts[product].productDescription, allProducts[product].productImgs?.join(", "), allProducts[product].productCategory, allProducts[product].productPrice, allProducts[product].productStock, allProducts[product].productDiscount, allProducts[product].colors?.join(", "), allProducts[product].sizes?.join(", "), allProducts[product].otherVarients?.join(", "), allProducts[product].availableCountries?.join(", ")])

        })
        /// spread sheet format
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');
        await workbook.xlsx.write(res);
        return res.end()
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later." })
    }
}

export default GenerateProductExcelFile