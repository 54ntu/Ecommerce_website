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






}


export default CategoryController;