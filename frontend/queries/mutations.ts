import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $cartId: String) {
    login(username: $username, cartId: $cartId) {
      user {
        id
        username
        role
        isActive
        createdAt
        cartId
      }
      token
      expiresIn
      totalQuantity
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      expiresIn
      user {
        id
        username
        role
        isActive
        createdAt
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddItemToCart($item: CartItemInput, $price: Float!, $cartId: String) {
    addItemToCart(item: $item, price: $price, cartId: $cartId) {
      id
    }
  }
`;

export const CREATE_CART = gql`
  mutation FetchOrCreateCart($cartId: String) {
    fetchOrcreateCart(cartId: $cartId) {
      id
      cartItems {
        id
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateCart($cartId: String!, $item: ItemInput!) {
    updateCart(cartId: $cartId, item: $item) {
      id
      subtotal
      formattedSubtotal
      estimatedTotal
      formattedEstimatedTotal
      cartItems {
        id
        product {
          id
          name
          description
          subDescription
          partNumber
          price
          formattedPrice
          imgList
        }
        quantity
        model {
          id
          color
          img
        }
        features {
          id
          name
          item
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation DeletecartItem($cartId: String, $itemId: String!) {
    deletecartItem(cartId: $cartId, itemId: $itemId) {
      quantity
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($username: String!, $cartId: String) {
    signup(username: $username, cartId: $cartId) {
      user {
        id
        username
        role
        isActive
        createdAt
        cartId
      }
      token
      expiresIn
      totalQuantity
    }
  }
`;
