export enum JobsSubCategory {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  INTERNSHIP = 'INTERNSHIP',
  OTHER = 'OTHER',
}

export enum ServicesSubCategory {
  CLEANING = 'CLEANING',
  REPAIR = 'REPAIR',
  TUTORING = 'TUTORING',
  OTHER = 'OTHER',
}

export enum AutomobileSubCategory {
  CAR = 'CAR',
  MOTORCYCLE = 'MOTORCYCLE',
  BICYCLE = 'BICYCLE',
  TRUCK = 'TRUCK',
  BOAT = 'BOAT',
  PARTS = 'PARTS',
  OTHER = 'OTHER',
}

export enum FashionSubCategory {
  TSHIRT = 'TSHIRT',
  SHOES = 'SHOES',
  PANTS = 'PANTS',
  DRESS = 'DRESS',
  JACKET = 'JACKET',
  ACCESSORIES = 'ACCESSORIES',
  OTHER = 'OTHER',
}

export enum TechnologySubCategory {
  PHONE = 'PHONE',
  LAPTOP = 'LAPTOP',
  TABLET = 'TABLET',
  TV = 'TV',
  CAMERA = 'CAMERA',
  HEADPHONE = 'HEADPHONE',
  SPEAKER = 'SPEAKER',
  OTHER = 'OTHER',
}

export enum SportsSubCategory {
  FOOTBALL = 'FOOTBALL',
  BASKETBALL = 'BASKETBALL',
  TENNIS = 'TENNIS',
  GOLF = 'GOLF',
  VOLLEYBALL = 'VOLLEYBALL',
  OTHER = 'OTHER',
}

export enum HomeSubCategory {
  FURNITURE = 'FURNITURE',
  ELECTRONICS = 'ELECTRONICS',
  APPLIANCES = 'APPLIANCES',
  DECORATIONS = 'DECORATIONS',
  GARDEN = 'GARDEN',
  OTHER = 'OTHER',
}

export enum Categories {
  HOME = 'HOME',
  TECHNOLOGY = 'TECHNOLOGY',
  FASHION = 'FASHION',
  AUTOMOBILE = 'AUTOMOBILE',
  SERVICES = 'SERVICES',
  JOBS = 'JOBS',
}

export const categories = Object.values(Categories);

type SubCategories =
  | JobsSubCategory
  | ServicesSubCategory
  | AutomobileSubCategory
  | FashionSubCategory
  | TechnologySubCategory
  | HomeSubCategory;

export enum AdProductState {
  NEW = 'NEW',
  USED = 'USED',
  BROKEN = 'BROKEN',
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  published: boolean | null;
  state: AdProductState;
  authorId: string;
  category: Categories;
  subCategory: SubCategories;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}
