export interface DiscountInfo {
  Item: [code: any, description: string, unitMeasure: string, price: string];
  Discount: [code: any, units: string, discount: string];
  UserItems: [code: any, units: string, description: string];
}
export interface UserItems {
  code: any;
  units: string;
  description: string;
}
export interface Discount {
  code: any;
  units: string;
  discount: string;
}
export interface Item {
  code: any;
  description: string;
  unitMeasure: string;
  price: string;
}
