import { Request, Response } from "express";
import Order from "../database/model/order.model";
import OrderDetails from "../database/model/orderDetails.model";
import Payment from "../database/model/payment.model";
import { PaymentMode } from "../globals/types";
import axios from "axios";


interface IProduct {
    productId: string,
    productQty: string
}


interface OrderRequest extends Request {
    user?: {
        id: string,
    }
}


interface IPaymentDetails {

}
class OrderController {
    async createOrder(req: OrderRequest, res: Response) {
        const userId = req.user?.id
        const { phoneNumber, address, totalAmount, paymentMethod } = req.body
        const products: IProduct[] = req.body.products
        console.log(products.length)
        console.log(paymentMethod)
        if (!phoneNumber || !address || !totalAmount || products.length == 0) {
            res.status(400).json({
                message: "please provide phoneNumber,shipping address, totalAmount,products"
            })
            return;
        }

        const orderData = await Order.create({
            phoneNumber,
            address,
            totalAmount,
            userId: userId


        })

        products.forEach(async function (product) {
            await OrderDetails.create({
                quantity: product.productQty,
                productId: product.productId,
                orderId: orderData.id
            })
        })

        //for payment
        if (paymentMethod == PaymentMode.COD) {
            await Payment.create({
                orderId: orderData.id,
                PaymentMode: paymentMethod
            })

        } else if (paymentMethod == PaymentMode.Khalti) {
            console.log('total amount i am is :', totalAmount)
            console.log("hello i am khalti")
            const data = {
                return_url: "http://localhost:5173/",
                website_url: "http://localhost:5173/",
                amount: totalAmount * 100,
                purchase_order_id: orderData.id,
                purchase_order_name: "order_" + orderData.id
            }

            console.log(`hello i am data ${data.amount}`)

            try {
                const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", data, {
                    headers: {
                        'Authorization': 'Key f1b854113d2c424f820427cadb100265',
                    }
                });
                console.log(response);
            } catch (error) {
                console.log(error)

            }



        } else {

        }

        res.status(200).json({
            message: "order placed successfully!!."
        })

    }
}


export default new OrderController;