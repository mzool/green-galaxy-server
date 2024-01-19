import ProductDB from '../../../model/products/product.js'
import exceljs from "exceljs"
import logger from "../../../services/winston_logger.js"
import idGenerator from '../../../services/idGenerator.js';

async function addProductsFromExcelFile(req, res) {
    try {
        const excelFile = req.file;
        const { deletePast } = req.body;
        /// delete past products
        if (deletePast) {
            await ProductDB.deleteMany({})
        }
        /// get the excel file 
        const workBook = new exceljs.Workbook();
        await workBook.xlsx.readFile(excelFile.path);
        /// get sheet
        const worksheet = workBook.getWorksheet(1);
        /// all product arry
        let allProducts = [];
        // Iterate through rows and save to MongoDB
        worksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber > 1) { await getRowData(row, allProducts) }

        });
        await ProductDB.insertMany(allProducts)
        return res.status(200).json({ success: true })
    } catch (err) {
        console.log(err.message);
        logger.error(err)
        return res.status(500).json({ success: false, message: "Something error, try again later" })
    }
}
export default addProductsFromExcelFile


async function getRowData(row, allProducts) {
    console.log(row.getCell(8).value);
    const productId = idGenerator(10, true)
    await allProducts.push({
        productId,
        productName: row.getCell(1).value,
        productDescription: row.getCell(2).value,
        productPrice: parseFloat(row.getCell(3).value),
        productDiscount: parseFloat(row.getCell(4).value),
        rating: parseFloat(row.getCell(5).value),
        productStock: parseFloat(row.getCell(6).value),
        productBrand: row.getCell(7).value,
        isMadeToOrder: row.getCell(8).value,
        otherVarients: row.getCell(9).value,
        sizes: row.getCell(10).value,
        colors: row.getCell(11).value,
        newProduct: row.getCell(12).value,
        productCategory: row.getCell(13).value,
        productImgs: JSON.parse(row.getCell(14).value),
    })
}