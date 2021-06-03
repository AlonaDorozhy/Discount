
import { DiscountInfo } from "../interfaces/interface.js";
import DiscountService from "./discountService.js";
import DiscountTemplate from "./discountTemplate.js";

enum UnitMeasure {
  EA = 1,
  BX = 2,
  Kg = 3,
  L = 4,
}
export default class DiscountComponent {
  filePath: string;
  fullUsetItems = new Array;
  discountService = new DiscountService();
  DiscountTemplate: any;
  constructor(filePath: string) {
    this.filePath = filePath;
    this.discountService
      .getDiscountData(this.filePath)
      .then((res: any) => this.discountService.csvToObjects(res))
      .then((res: any) => {
        this.getFullUserItems(res.Item, res.Discount, res.UserItems);
      });
  }

  getFullUserItems(item: DiscountInfo['Item'], discount: DiscountInfo['Discount'], userItems: DiscountInfo['UserItems']) {
    userItems.forEach((userItem: any) => {
      userItem.discount = [];
      discount.find((obj: any) => {
        if (obj.code === userItem.code) {
          userItem.discount.push({ units: obj.units, discount: obj.discount });
        }
      });
      item.find((obj: any) => {
        if (obj.code === userItem.code) {
          userItem.description = obj.description;
          userItem.price = obj.price;
          userItem.unitMeasure = UnitMeasure[obj.unitMeasure];
        }
      });
      userItem.fullPrice = Number(userItem.units) * Number(userItem.price);
      userItem.priceDifference = "";
      this.fullUsetItems.push(userItem);
    });
    this.getDiscount(this.fullUsetItems);
    return this.fullUsetItems;
  }

  getDiscount(userItems: any) {
    userItems.forEach((item: any) => {
      item.discount.sort((a: any, b: any) => (a.units > b.units ? 1 : -1));
      item.discountPrice = ""
      if (item.discount.length > 0) {
        item.discount.forEach((discount: any) => {
          if (item.units == discount.units || item.units > discount.units) {
            item.priceDifference =
              Number(item.fullPrice) * (Number(discount.discount) / 100);
            item.discountPrice =
              Number(item.fullPrice) - Number(item.priceDifference);
          } 
            item.discountPrice ;
            item.priceDifference ;
        });
      }
    });

    this.fullUsetItems = userItems;
    this.DiscountTemplate = new DiscountTemplate(this.fullUsetItems);

    return this.fullUsetItems;
  }
}
