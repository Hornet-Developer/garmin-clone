import { Gender } from "@faker-js/faker";

export interface CategoryType {
  id: string;
  name: string;
  displayName: string;
  img: string;
  title: string;
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

export interface ItemType {
  img: string;
  name?: string;
  title?: string;
  [key: string]: any;
}

export interface Feature {
  id: string;
  name: string;
  description?: string;
  items?: string[];
}

export interface Model {
  id: string;
  color: string;
  img: string;
}

export interface ProductType {
  id: string;
  name: string;
  description?: string;
  subDescription?: string;
  subscriptionUrl?: string;
  partNumber: string;
  gender?: Gender;
  price: number;
  formattedPrice: string;
  oldPrice: number;
  formattedOldPrice: string;
  interestFree: number;
  formattedInterestFree: string;
  imgList: string[];
  features?: Feature[];
  models?: Model[];
  video?: string;
  sale?: boolean;
  available?: boolean;
  new?: boolean;
  createdAt: Date;
}
