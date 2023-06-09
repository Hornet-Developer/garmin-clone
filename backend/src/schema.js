const { gql } = require("apollo-server-core/dist/gql");

const typeDefs = gql`
  scalar Date

  enum Sort {
    asc
    desc
  }

  input productFilter {
    take: Int
    gender: Gender
    price: Sort
    date: Sort
  }

  type Query {
    banners: [Banner!]!
    featureds: [Featured!]!
    pods: [Pod!]!
    categories(hasSeries: Boolean!, hasCoverImgsList: Boolean!): [Category!]!
    category(
      id: String!
      serieId: String
      hasProducts: Boolean!
      hasSeries: Boolean!
    ): Category!
    products(
      filter: productFilter
      search: String
      categoryId: String
      serieId: String
    ): [Product!]!
    productsByCategory(categoryId: String, serieId: String): [Product!]!
    product(id: String!): Product!
    serie(id: String!, hasProducts: Boolean!): Serie!
    cart(cartId: String): Cart
    fetchUserSession: AuthSession!
    initialCart(cartId: String!): Cart
    cartItemsCount(cartId: String!): Count!
  }

  type Mutation {
    login(username: String!, cartId: String): AuthSession!
    refreshToken: AuthSession!
    logout: LogoutSession
    addItemToCart(cartId: String, item: CartItemInput, price: Float!): Cart
    fetchOrcreateCart(cartId: String): Cart!
    updateCart(cartId: String!, item: ItemInput!): Cart!
    deletecartItem(cartId: String, itemId: String!): DeleteItemCart!
    signup(username: String!, cartId: String): AuthSession!
  }

  # type Subscription {}

  type DeleteItemCart {
    quantity: Int!
  }

  input ItemInput {
    itemId: String!
    price: Float!
    quantity: Int!
  }

  type CartWithMessage {
    message: String
    cart: Cart!
  }

  type Count {
    count: Int!
  }

  type AuthSession {
    user: Customer
    totalQuantity: Int!
    token: String
    expiresIn: String
  }

  type LogoutSession {
    message: String
  }

  enum Gender {
    Male
    Female
    None
  }

  type Banner {
    id: ID!
    imgM: String
    imgT: String
    imgD: String
    title: String!
    subtitle: String!
    createdAt: Date!
  }

  type Featured {
    id: ID!
    img: String!
    title: String!
    subtitle: String!
    new: Boolean!
    sale: Boolean!
    createdAt: Date!
  }

  type Pod {
    id: ID!
    img: String!
    title: String!
    createdAt: Date!
  }

  type CoverImgList {
    id: ID!
    img: String!
    title: String!
    subtitle: String!
  }

  type Category {
    id: ID!
    name: String!
    displayName: String!
    img: String!
    title: String!
    coverImg: String!
    coverImgsList: [CoverImgList]
    series: [Serie]
  }

  type Serie {
    id: ID!
    name: String!
    products: [Product]
    categoryId: String
  }

  type ChosenFeature {
    id: ID!
    name: String!
    item: String!
  }

  type ProductFeature {
    id: ID!
    name: String!
    description: String
    items: [String!]!
  }

  type Model {
    id: ID!
    color: String!
    img: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    subDescription: String
    subscriptionUrl: String
    partNumber: String!
    gender: Gender
    price: Float!
    formattedPrice: String!
    oldPrice: Float
    formattedOldPrice: String
    interestFree: Float
    formattedInterestFree: String
    imgList: [String!]!
    features: [ProductFeature]
    models: [Model]
    video: String
    sale: Boolean
    available: Boolean
    new: Boolean
    createdAt: Date!
    serieId: String
  }

  input CartItemInput {
    productId: String!
    modelId: String
    features: [ChosenFeatureInput]
  }

  input ChosenFeatureInput {
    name: String!
    item: String!
  }

  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
    model: Model
    features: [ChosenFeature]
    createdAt: Date!
  }

  type Cart {
    id: ID!
    subtotal: Float
    formattedSubtotal: String
    estimatedTotal: Float
    formattedEstimatedTotal: String
    expires: Date
    inSession: Boolean
    cartItems: [CartItem]
    createdAt: Date!
  }

  enum OrderStatus {
    PANDING
    SHIPPED
    CANCELED
    ARRIVED
    COMPLETED
  }

  type Order {
    id: String!
    status: OrderStatus!
    products: [CartItem!]!
    createdAt: Date!
  }

  enum Role {
    Admin
    # Guest
    Customer
  }

  interface User {
    id: ID!
    role: Role!
    createdAt: Date!
  }

  type Admin {
    id: ID!
    username: String!
    role: Role!
    isActive: Boolean!
    createdAt: Date!
  }

  type Customer {
    id: ID!
    username: String!
    role: Role!
    isActive: Boolean!
    cartId: String!
    cart: Cart!
    createdAt: Date!
  }

  # type Guest {
  #   id: ID!
  #   role: Role!
  #   cart: Cart
  #   createdAt: Date!
  # }
`;

module.exports = typeDefs;
