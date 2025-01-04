import { Table, Model, DataType, Column } from "sequelize-typescript";

@Table({
    tableName: "orders",
    modelName: "Order",
    timestamps: true,
})


class Order extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 10],
                msg: "phone number must be 10 digits"
            }
        }
    })
    declare phoneNumber: string

    @Column({
        type: DataType.STRING,
        allowNull: false,

    })

    declare address: string;


    @Column({

        type: DataType.FLOAT,
        allowNull: false

    })

    declare totalAmount: number
    
}