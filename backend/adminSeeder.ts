import { envConfig } from "./src/config/config";
import User from "./src/database/model/user.model";
import bcrypt from 'bcrypt';

const adminSeeder = async () => {
    const [data] = await User.findAll({
        where: {
            email: envConfig.adminemail
        }
    })

    const encryptedPassword = await bcrypt.hashSync(envConfig.adminPassword as string, 10);
    if (!data) {
        await User.create({
            username: envConfig.adminUsername,
            password: encryptedPassword,
            email: envConfig.adminemail,
            role: 'admin'

        })
        console.log('admin seeded successfully.😎😎😎😎😎😎!')
    }
    else {
        console.log('please try again later😑!')

    }
}


export default adminSeeder;