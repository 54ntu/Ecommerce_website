import { Table, Column, DataType, Model } from "sequelize-typescript";
import { PaymentMode, PaymentStatus } from "../../globals/types";

@Table({
    tableName: "paymentDetails",
    modelName: "Payment",
    timestamps: true,
})



class Payment extends Model {


    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })

    declare id: string;


    @Column({
        type: DataType.ENUM(PaymentMode.Khalti, PaymentMode.Esewa, PaymentMode.COD),
        defaultValue: PaymentMode.COD
    })

    declare paymentMode: string;


    @Column({
        type: DataType.ENUM(PaymentStatus.paid, PaymentStatus.pending),
        defaultValue: PaymentStatus.pending
    })

    declare paymentStatus: string;


}


export default Payment; 