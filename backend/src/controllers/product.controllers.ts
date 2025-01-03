import { Request, Response } from "express";
import Product from "../database/model/product.models";
import Category from "../database/model/category.model";

class ProductController {

    async addProduct(req: Request, res: Response): Promise<void> {
        const { productName, productDescription, productPrice, productQuantity, discount, categoryId } = req.body;
        const productImageUrl = req.file?.filename
        if (!productName || !productDescription || !productPrice || !productQuantity || !categoryId) {
            res.status(400).json({ message: "All fields are required" })
            return;
        }

        if (!productImageUrl) {
            res.status(400).json({
                message: "please upload an image of the product"
            })
            return;
        }

        const product = await Product.create({
            productName,
            productDescription,
            productPrice,
            productQuantity,
            discount: discount || 0,
            categoryId,
            productImageUrl

        })

        res.status(201).json({ message: "Product added successfully", data: product })


    }


    async getProducts(req: Request, res: Response): Promise<void> {
        const products = await Product.findAll({
            include: [{
                model: Category

            }]  // this include is used to join the tables
        });

        res.status(200).json({ message: "products fetched successfully..!!", data: products })
    }

    async getSingleProducts(req: Request, res: Response): Promise<void> {
        const productId = req.params.id;
        if (!productId) {
            res.status(400).json({ message: "Please provide a valid product id" })
            return;
        }
        const products = await Product.findAll({
            where: {
                id: productId
            },

            include: [{
                model: Category

            }]  // this include is used to join the tables
        });

        res.status(200).json({ message: "products fetched successfully..!!", data: products })
    }

    async deleteProducts(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const products = await Product.findAll({
            where: {
                id
            },
            include: [{
                model: Category

            }]  // this include is used to join the tables
        });
        if (products.length === 0) {
            res.status(400).json({ message: "Product not found" })
            return;
        }

        await products[0].destroy();

        res.status(200).json({
            message: "product deleted successfully...!!!"
        })

    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { productName, productDescription, productPrice, productQuantity, discount, categoryId } = req.body;
        const productImageUrl = req.file?.filename
        if (!productName || !productDescription || !productPrice || !productQuantity || !categoryId) {
            res.status(400).json({ message: "All fields are required" })
            return;
        }

        if (!productImageUrl) {
            res.status(400).json({
                message: "please upload an image of the product"
            })
            return;
        }

        const products = await Product.findAll({
            where: {
                id
            },
            include: [{
                model: Category

            }]  // this include is used to join the tables
        });
        if (products.length === 0) {
            res.status(400).json({ message: "Product not found" })
            return;
        }

        const updatedData = await products[0].update({
            productName,
            productDescription,
            productPrice,
            productQuantity,
            discount: discount || 0,
            categoryId,
            productImageUrl
        })

        res.status(200).json({
            message: "product updated successfully...!!!",
            data: updatedData
        })
    }

}


export default new ProductController