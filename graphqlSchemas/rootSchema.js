import { GraphQLSchema, GraphQLObjectType, GraphQLList } from "graphql";
import OrdersType from "./orderType.js";
import OrderDB from "../model/orders/order.js";
import CartDB from "../model/cart/Cart.js";
import CartsType from "./cartType.js";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Root query for fetching data",
    fields: () => ({
        getOrders: {
            type: new GraphQLList(OrdersType),
            resolve: async () => {
                try {
                    const result = await OrderDB.find({}).populate({
                        path: "items.product",
                        model: "product"
                    }).lean();
                    return result;
                } catch (error) {
                    console.error(error);
                    throw new Error(error.message);
                }
            },
        },
        getCarts: {
            type: new GraphQLList(CartsType),
            resolve: async () => {
                try {
                    const result = await CartDB.find({}).populate({
                        path: "items.product",
                        model: "product"
                    }).populate({
                        path:"user",
                        model:"user"
                    }).lean();
                    return result;
                } catch (err) {
                    console.error(err);
                    throw new Error(err.message);
                }
            }
        }
    }),
});

const graphRootSchema = new GraphQLSchema({
    query: RootQuery,
});

export default graphRootSchema;
