import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query Categories($hasSeries: Boolean!, $hasCoverImgsList: Boolean!) {
    categories(hasSeries: $hasSeries, hasCoverImgsList: $hasCoverImgsList) {
      id
      name
      displayName
      img
      title
    }
  }
`;

export const BANNERS = gql`
  query Banners {
    banners {
      id
      imgM
      imgT
      imgD
      title
      subtitle
      createdAt
    }
  }
`;

export const FEATUREDS = gql`
  query Featureds {
    featureds {
      id
      title
      img
      subtitle
      new
      sale
      createdAt
    }
  }
`;

export const PODS = gql`
  query Pods {
    pods {
      id
      title
      img
      createdAt
    }
  }
`;

export const PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory($categoryId: String, $serieId: String) {
    productsByCategory(categoryId: $categoryId, serieId: $serieId) {
      id
      name
      description
      subDescription
      formattedPrice
      imgList
      sale
      new
    }
  }
`;

export const CATEGORY = gql`
  query Category(
    $categoryId: String!
    $serieId: String
    $hasProducts: Boolean!
    $hasSeries: Boolean!
  ) {
    category(
      id: $categoryId
      serieId: $serieId
      hasProducts: $hasProducts
      hasSeries: $hasSeries
    ) {
      id
      name
      displayName
      img
      title
      coverImg
      coverImgsList {
        id
        img
        title
        subtitle
      }
      series {
        id
        name
      }
    }
  }
`;

export const PRODUCT = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      name
      description
      subDescription
      subscriptionUrl
      partNumber
      gender
      price
      formattedPrice
      oldPrice
      formattedOldPrice
      interestFree
      formattedInterestFree
      imgList
      features {
        id
        name
        description
        items
      }
      models {
        id
        color
        img
      }
      video
      sale
      available
      new
      createdAt
      serieId
    }
  }
`;

export const CATEGORY_PRODUCT_PAGE = gql`
  query Category(
    $categoryId: String!
    $serieId: String
    $hasProducts: Boolean!
    $hasSeries: Boolean!
  ) {
    category(
      id: $categoryId
      serieId: $serieId
      hasProducts: $hasProducts
      hasSeries: $hasSeries
    ) {
      id
      displayName
    }
  }
`;

export const SERIE_PRODUCT_PAGE = gql`
  query Serie($serieId: String!, $hasProducts: Boolean!) {
    serie(id: $serieId, hasProducts: $hasProducts) {
      id
      name
      categoryId
    }
  }
`;

export const INITIAL_CART = gql`
  query InitialCart($cartId: String!) {
    initialCart(cartId: $cartId) {
      id
      cartItems {
        id
      }
    }
  }
`;

export const FULL_CART = gql`
  query Cart($cartId: String) {
    cart(cartId: $cartId) {
      id
      cartItems {
        id
        product {
          id
          name
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
      formattedSubtotal
      formattedEstimatedTotal
    }
  }
`;

export const USER_SESSION = gql`
  query FetchUserSession {
    fetchUserSession {
      user {
        id
        role
        username
        isActive
        cartId
        cart {
          id
          cartItems {
            id
          }
        }
      }
      token
      expiresIn
    }
  }
`;

export const ITEMS_CART_COUNT = gql`
  query CartItemsCount($cartId: String!) {
    cartItemsCount(cartId: $cartId) {
      count
    }
  }
`;

export const ALL_PRODUCTS = gql`
  query Products(
    $categoryId: String
    $serieId: String
    $filter: productFilter
    $search: String
  ) {
    products(
      categoryId: $categoryId
      serieId: $serieId
      filter: $filter
      search: $search
    ) {
      id
      name
      description
      subDescription
      gender
      price
      formattedPrice
      oldPrice
      formattedOldPrice
      interestFree
      formattedInterestFree
      imgList
      features {
        id
        name
        description
        items
      }
      models {
        id
        color
        img
      }
      video
      sale
      available
      new
      createdAt
      subscriptionUrl
      partNumber
    }
  }
`;
