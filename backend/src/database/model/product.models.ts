import { Table, Column, DataType, Model, AllowNull } from "sequelize-typescript";

@Table({
    tableName: 'products',
    modelName: 'Product',
    timestamps: true
})

class Product extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false

    })
    declare productName: string;

    @Column({
        type: DataType.STRING,

    })
    declare productDescription: string;

    @Column({
        type: DataType.FLOAT,
    })
    declare produtprice: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare productQuantity: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare discount: number;

    @Column({
        type: DataType.STRING,
    })
    declare productImageUrl: string;
}



export default Product;