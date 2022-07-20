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
  ) {
    category(id: $categoryId, serieId: $serieId, hasProducts: $hasProducts) {
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
