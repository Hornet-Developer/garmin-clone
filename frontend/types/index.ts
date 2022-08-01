import { Gender } from "@faker-js/faker";

export type DispatchAction = (...args: any) => void;

export interface ItemType {
  img: string;
  name?: string;
  title?: string;
  [key: string]: any;
}

export interface BannerType {
  id: string;
  imgM: string;
  imgT: string;
  imgD: string;
  title: string;
  subtitle: string;
  createdAt: string;
}

export interface FeaturedType {
  id: string;
  img: string;
  title: string;
  subtitle: string;
  new: boolean;
  sale: boolean;
  createdAt: string;
}

export interface PodType {
  id: string;
  img: string;
  title: string;
  createdAt: string;
}

export interface CategoryType {
  id: string;
  name: string;
  displayName: string;
  img: string;
  title: string;
  coverImg?: string;
  coverImgsList?: CoverImgListType[];
  series?: SerieType[];
}

export interface CoverImgListType {
  id: string;
  img: string;
  title: string;
  subtitle: string;
}

export interface SerieType {
  id: string;
  name: string;
  products: ProductType[];
}

export interface ProductType {
  id: string;
  name: string;
  description?: string;
  subDescription?: string;
  subscriptionUrl?: string;
  partNumber?: string;
  gender?: Gender;
  price?: number;
  formattedPrice: string;
  oldPrice?: number;
  formattedOldPrice?: string;
  interestFree?: number;
  formattedInterestFree?: string;
  imgList: string[];
  features?: FeatureType[];
  models?: ModelType[];
  video?: string;
  sale?: boolean;
  available?: boolean;
  new?: boolean;
  createdAt?: Date;
}

export interface FeatureType {
  id: string;
  name: string;
  description?: string;
  items?: string[];
}

export interface ModelType {
  id: string;
  color: string;
  img: string;
}

export interface TOrderFeature {
  id: string;
  label: string;
}
