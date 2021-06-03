var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CsvToArray from "./csvToArrayService.js";
export default class DiscountService {
    constructor() {
        this.csvToArray = CsvToArray;
        this.item = [];
        this.discount = [];
        this.userItems = [];
        this.discountInfo = [this.item, this.discount, this.userItems];
    }
    getDiscountData(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(filePath);
            let data = yield response.text();
            return data;
        });
    }
    csvToObjects(csv) {
        let arr = this.csvToArray(csv);
        let lines = csv.split("\n");
        let headers = [];
        lines.forEach((item, index) => {
            if (!item.endsWith(",\r") && item.split("").length > 0) {
                headers.push({ catrgory: item, index: index });
            }
        });
        let items = arr.slice(headers[0].index, headers[1].index);
        items.shift();
        items.map((item) => {
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
        discount.map((item) => {
            this.discount.push({
                code: item[0],
                units: item[1],
                discount: item[2],
            });
            return this.discount;
        });
        let userItems = arr.slice(headers[2].index, arr.length);
        userItems.shift();
        userItems.map((item) => {
            this.userItems.push({
                code: item[0],
                units: item[1],
                description: item[2],
            });
            return this.userItems;
        });
        let DiscountInfo = {
            Item: this.item,
            Discount: this.discount,
            UserItems: this.userItems,
        };
        return DiscountInfo;
    }
}
//# sourceMappingURL=discountService.js.map