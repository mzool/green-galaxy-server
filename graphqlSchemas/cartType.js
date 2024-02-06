import {
    GraphQLInt, GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList,
    GraphQLFloat
} from "graphql";

//// to do get cart details with products and user information if available

/// product type
const CartProductsType = new GraphQLObjectType({
    name: "ProductOfCart",
    description: "populate products inside cart items",
    fields: () => ({
        productName: { type: GraphQLString },
        productId: { type: GraphQLString },
        productCategory: { type: GraphQLString },
        productPrice: { type: GraphQLFloat },
        productBrand: { type: GraphQLString },
        productDiscount: { type: GraphQLFloat }
    })
})
/// items type
const CartItemType = new GraphQLObjectType({
    name: "CartItem",
    description: "Details of an item",
    fields: () => ({
        size: { type: GraphQLString },
        otherVarients: { type: GraphQLString },
        color: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        product: { type: CartProductsType }
    }),
});
/// user type
const UserType = new GraphQLObjectType({
    name: "User",
    description: "Details of user own the cart",
    fields: () => ({
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});
/// cart type
const CartsType = new GraphQLObjectType({
    name: "Carts",
    description: "Details of all Carts on DB",
    fields: () => ({
        cart_id: { type: new GraphQLNonNull(GraphQLString) },
        items: { type: new GraphQLList(CartItemType) },
        user: { type: UserType },
        createdAt:{type: GraphQLString}
    }),
});

export default CartsType