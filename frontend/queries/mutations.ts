import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!) {
    login(username: $username) {
      user {
        id
        username
        role
        isActive
        createdAt
        cartId
      }
      refresh_token
      expires_in
      totalQuantity
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      refresh_token
      expires_in
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
  mutation AddItemToCart($item: CartItemInput, $price: Float!) {
    addItemToCart(item: $item, price: $price) {
      id
    }
  }
`;

export const CREATE_CART = gql`
  mutation FetchOrCreateCart {
    fetchOrcreateCart {
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
  mutation DeletecartItem($itemId: String!) {
    deletecartItem(itemId: $itemId) {
      quantity
    }
  }
`;
