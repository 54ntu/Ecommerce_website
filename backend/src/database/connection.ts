import { Sequelize } from 'sequelize-typescript'
import { envConfig } from '../config/config'

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


export default sequelize