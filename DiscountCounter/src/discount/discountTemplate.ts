export default class DiscountTemplate {
  table: HTMLTableElement | undefined;
  thead: HTMLTableSectionElement | undefined;
  tbody: HTMLTableSectionElement | undefined;
  itemToDisplay: any = [];
  constructor(private userItems: any) {
    this.userItems.forEach((item: any) => {
      this.itemToDisplay.push({
        description: item.description,
        units: item.units,
        unitMeasure: item.unitMeasure,
        fullPrice: item.fullPrice,
        discountPrice: item.discountPrice,
        priceDifference: item.priceDifference,
      });
    });

    let saving = this.itemToDisplay.reduce(function (sum: any, current: any) {
      return sum + Number(current.priceDifference);
    }, 0);
    this.itemToDisplay.push({
      description: "",
      units: "",
      unitMeasure: "",
      fullPrice: "",
      discountPrice: "",
      priceDifference: saving,
    });
    const container = document.getElementById("content");
    if (container) {
      container.appendChild(this.buildTable(this.itemToDisplay, saving));
    }
  }

  buildTable(data: any, saving: any) {
    let table = document.createElement("table");
    table.className = "table";
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let headRow = document.createElement("tr");
    [
      "Description",
      "Units",
      "Unit Measure",
      "Full Price",
      "Discount Price",
      "Saving",
    ].forEach(function (el) {
      let th = document.createElement("th");
      th.appendChild(document.createTextNode(el));
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    data.forEach(function (el: any) {
      let tr = document.createElement("tr");
      for (let i in el) {
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(el[i]));
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }
}
