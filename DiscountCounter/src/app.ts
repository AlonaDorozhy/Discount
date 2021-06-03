import DiscountComponent from "./discount/discount.js";
export class AppComponent {
  filePath: string = "./public/DiscountDB.csv";
  discountComponent = new DiscountComponent(this.filePath);
  constructor() {}
}

new AppComponent();
