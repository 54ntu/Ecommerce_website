import { Request, Response } from "express"
import Category from "../database/model/category.model"

class CategoryController {
    static categoryData = [
        {
            categoryName: 'Electronics',
        },
        {
            categoryName: 'Fashion',
        },
        {
            categoryName: 'Foods',
        }
    ]


    static async seedCategory(): Promise<void> {
        try {
            const datas = await Category.findAll()
            if (datas.length == 0) {
                await Category.bulkCreate(CategoryController.categoryData)
            } else {
                console.log('Category already seeded')
            }
        } catch (error) {
            console.log(error)

        }
    }


    static async addCategory(req: Request, res: Response): Promise<void> {
        const { categoryName } = req.body;
        if (!categoryName) {
            res.status(400).json({
                status: 'error',
                message: "category name is required"
            })
            return;
        }

        await Category.create({ categoryName })
        res.status(201).json({ message: "Category added successfully" })





    }


    static async getCategories(req: Request, res: Response): Promise<void> {
        const data = await Category.findAll()
        res.status(200).json({ status: 'success', message: 'category fetched succesfully', data: data })
    }

    static async deleteCategory(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ status: 'error', message: 'id is required' })
            return;
        }
        // const data = await Category.findByPk(id) //it return objects

        const data = await Category.findAll({ where: { id: id } })//it returns array
        if (data.length == 0) {
            res.status(404).json({ status: 'error', message: 'category not found' })
            return;
        } else {
            await Category.destroy({ where: { id: id } })
            res.status(200).json({ status: 'success', message: 'category deleted successfully' })
        }
    }


    static async updateCategory(req: Request, res: Response): Promise<void> {

        const { id } = req.params;
        const { categoryName } = req.body;
        if (!id || !categoryName) {
            res.status(400).json({ status: 'error', message: 'id and category name is required' })
            return;
        }

        const data = await Category.findAll({ where: { id: id } })
        if (data.length == 0) {
            res.status(404).json({ status: 'error', message: 'category not found' })

        }
        else {
            await Category.update({ categoryName: categoryName }, { where: { id: id } })
            res.status(200).json({ status: 'success', message: 'category updated successfully' })
        }



    }


}

export default CategoryController;