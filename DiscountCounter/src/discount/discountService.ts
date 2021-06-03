import CsvToArray from "./csvToArrayService.js";
import { DiscountInfo } from "../interfaces/interface";
export default class DiscountService {
  csvToArray = CsvToArray;
  item: any = [];
  discount: any = [];
  userItems: any = [];
  discountInfo: DiscountInfo[] = [this.item, this.discount, this.userItems];
  constructor() {}

  async getDiscountData(filePath: string) {
    let response = await fetch(filePath);
    let data = await response.text();
    return data;
  }

  csvToObjects(csv: string) {
    let arr = this.csvToArray(csv);
    let lines = csv.split("\n");
    let headers: any = [];

    lines.forEach((item: any, index) => {
      if (!item.endsWith(",\r") && item.split("").length > 0) {
        headers.push({ catrgory: item, index: index });
      }
    });

    let items = arr.slice(headers[0].index, headers[1].index);
    items.shift();
    items.map((item: DiscountInfo["Item"]) => {
      this.item.push({
        code: item[0],
        description: item[1],
        unitMeasure: item[2],
        price: item[3],
      });
      return this.item;
    });
    let discount = arr.slice(headers[1].index, headers[2].index);
    discount.shift();
    discount.map((item: DiscountInfo["Discount"]) => {
      this.discount.push({
        code: item[0],
        units: item[1],
        discount: item[2],
      });
      return this.discount;
    });
    let userItems = arr.slice(headers[2].index, arr.length);
    userItems.shift();
    userItems.map((item: DiscountInfo["UserItems"]) => {
      this.userItems.push({
        code: item[0],
        units: item[1],
        description: item[2],
      });
      return this.userItems;
    });
    let DiscountInfo: DiscountInfo = {
      Item: this.item,
      Discount: this.discount,
      UserItems: this.userItems,
    };

    return DiscountInfo;
  }
}
