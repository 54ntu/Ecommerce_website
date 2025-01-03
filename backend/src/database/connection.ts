import { Sequelize } from 'sequelize-typescript'
import { envConfig } from '../config/config'
import Product from './model/product.models'
import Category from './model/category.model'

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [__dirname + '/model']
})

try {
    sequelize.authenticate()
        .then(() => {
            console.log("database connect vayo.!")
        })
        .catch(err => {
            console.log('error aayo hai.!', err)
        })

} catch (error) {
    console.log('error while connecting data base', error)

}

sequelize.sync({ force: false, alter: false }).then(() => { console.log("synced") })  //force true garda migrate hunxa...so whenever we made changes into the table that time only we need to make this force true 
//when force is set to true for migration it will delete all the existing data of the table
//alter true garda table maa changes vako matra update hunxa without any loss in data of the table



//relationships between the fields of table
Product.belongsTo(Category)
Category.hasMany(Product)

export default sequelize