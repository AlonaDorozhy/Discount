import DiscountService from "./discountService.js";
import DiscountTemplate from "./discountTemplate.js";
var UnitMeasure;
(function (UnitMeasure) {
    UnitMeasure[UnitMeasure["EA"] = 1] = "EA";
    UnitMeasure[UnitMeasure["BX"] = 2] = "BX";
    UnitMeasure[UnitMeasure["Kg"] = 3] = "Kg";
    UnitMeasure[UnitMeasure["L"] = 4] = "L";
})(UnitMeasure || (UnitMeasure = {}));
export default class DiscountComponent {
    constructor(filePath) {
        this.fullUsetItems = new Array;
        this.discountService = new DiscountService();
        this.filePath = filePath;
        this.discountService
            .getDiscountData(this.filePath)
            .then((res) => this.discountService.csvToObjects(res))
            .then((res) => {
            this.getFullUserItems(res.Item, res.Discount, res.UserItems);
        });
    }
    getFullUserItems(item, discount, userItems) {
        userItems.forEach((userItem) => {
            userItem.discount = [];
            discount.find((obj) => {
                if (obj.code === userItem.code) {
                    userItem.discount.push({ units: obj.units, discount: obj.discount });
                }
            });
            item.find((obj) => {
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
    getDiscount(userItems) {
        userItems.forEach((item) => {
            item.discount.sort((a, b) => (a.units > b.units ? 1 : -1));
            item.discountPrice = "";
            if (item.discount.length > 0) {
                item.discount.forEach((discount) => {
                    if (item.units == discount.units || item.units > discount.units) {
                        item.priceDifference =
                            Number(item.fullPrice) * (Number(discount.discount) / 100);
                        item.discountPrice =
                            Number(item.fullPrice) - Number(item.priceDifference);
                    }
                    item.discountPrice;
                    item.priceDifference;
                });
            }
        });
        this.fullUsetItems = userItems;
        this.DiscountTemplate = new DiscountTemplate(this.fullUsetItems);
        return this.fullUsetItems;
    }
}
//# sourceMappingURL=discount.js.map