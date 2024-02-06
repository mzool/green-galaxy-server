import {
    GraphQLInt, GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList,
    GraphQLFloat
} from "graphql";

/// product type
const ProductsType = new GraphQLObjectType({
    name: "Product",
    description: "populate products inside order items",
    fields: () => ({
        productName: { type: GraphQLString },
        productId: { type: GraphQLString },
        productCategory: { type: GraphQLString },
        productPrice: { type: GraphQLFloat },
        productBrand: { type: GraphQLString },
    })
})

/// items type
const ItemType = new GraphQLObjectType({
    name: "Item",
    description: "Details of an item",
    fields: () => ({
        discount: { type: GraphQLString },
        size: { type: GraphQLString },
        otherVarient: { type: GraphQLString },
        color: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        product: { type: ProductsType }
    }),
});
/// orders type
const OrdersType = new GraphQLObjectType({
    name: "Orders",
    description: "Details of an order",
    fields: () => ({
        order_id: { type: new GraphQLNonNull(GraphQLString) },
        items: { type: new GraphQLList(ItemType) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLString },
        order_status: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export default OrdersType