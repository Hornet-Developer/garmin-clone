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
  title: string;
  [key: string]: any;
}
