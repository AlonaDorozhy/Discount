import DiscountComponent from "./discount/discount.js";
export class AppComponent {
    constructor() {
        this.filePath = "./public/DiscountDB.csv";
        this.discountComponent = new DiscountComponent(this.filePath);
    }
}
new AppComponent();
//# sourceMappingURL=app.js.map