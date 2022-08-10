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
      }
      refresh_token
      expires_in
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
  mutation AddItemToCart($cartId: String, $item: CartItemInput) {
    addItemToCart(cartId: $cartId, item: $item) {
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
