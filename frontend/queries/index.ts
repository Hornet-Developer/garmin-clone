import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query Categories {
    categories {
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
