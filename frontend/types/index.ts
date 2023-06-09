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
  name: string;
  item: string;
}

enum Role {
  Admin = "Admin",
  Customer = "Customer",
}

export interface UserType {
  id: string;
  username: string;
  isActive: string;
  role: Role;
  cart: CartType;
  cartId: string;
  createdAt?: Date;
}

export interface CartType {
  id: string;
  subtotal?: number;
  formattedSubtotal?: string;
  estimatedSubtotal?: number;
  formattedEstimatedTotal?: string;
  cartItems: CartItemType[];
  createdAt: Date;
}

export interface CartItemType {
  id: string;
  product: ProductType;
  quantity: number;
  model: ModelType;
  features: TOrderFeature[];
  createdAt: Date;
}

export interface TOrderBody {
  productId: string;
  modelId: string;
  features: Pick<TOrderFeature, "name" | "item">[];
}
