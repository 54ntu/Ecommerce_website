import { Sequelize } from 'sequelize-typescript'
import { envConfig } from '../config/config'

const sequelize = new Sequelize(envConfig.connectionString as string)

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


export default sequelize