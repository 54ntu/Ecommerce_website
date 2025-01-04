import { Sequelize } from 'sequelize-typescript'
import { envConfig } from '../config/config'
import Product from './model/product.models'
import Category from './model/category.model'
import Order from './model/order.model'
import User from './model/user.model'
import OrderDetails from './model/orderDetails.model'
import Payment from './model/payment.model'

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
Product.belongsTo(Category, { foreignKey: 'categoryId' })
Category.hasMany(Product, { foreignKey: 'categoryId' })



//users and orders model relationship
Order.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Order, { foreignKey: 'userId' })


//orderdetails and product || orderdetails and order table relationships
OrderDetails.belongsTo(Order, { foreignKey: 'orderId' })
Order.hasMany(OrderDetails, { foreignKey: 'orderId' })

OrderDetails.belongsTo(Product, { foreignKey: 'productId' })
Product.hasMany(OrderDetails, { foreignKey: 'productId' })


//payment models and order models relationship
Payment.belongsTo(Order, { foreignKey: 'orderId' })
Order.hasOne(Payment, { foreignKey: 'orderId' })

export default sequelize