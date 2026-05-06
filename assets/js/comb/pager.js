class Pager {

  // Initial setup.
  constructor(comb) {
    this.comb = comb;
    this.currentPage = 1;
    this.pagerWidth = 5;

    this.paginate();
  }

  // Getter & setter for currentPage.
  get currentPage() {
    return this._currentPage;
  }
  set currentPage(value) {
    this._currentPage = Math.max(Math.min(value, this.numPages()), 1);
  }

  // Count the number of pages there should be.
  numPages() {
    let pages = this.comb.visibleItems().length / this.comb.settings.pagerItemsPerPage;
    return Math.max(Math.ceil(pages), 1);
  }

  // Paginate items.
  paginate() {
    let currentPageStart = (this.currentPage - 1) * this.comb.settings.pagerItemsPerPage;
    let currentPageEnd = currentPageStart + this.comb.settings.pagerItemsPerPage;

    for (let i in this.comb.visibleItems()) {
      // Hide all items.
      $(this.comb.elements.items[i]).hide();

      // Then show items on the current page.
      if (i >= currentPageStart && i < currentPageEnd) {
        $(this.comb.elements.items[i]).show();
      }
    }

    this.updatePager();
  }

  // Update the pager links.
  updatePager() {
    // Build the pager.
    let pagerList = $('<ul class="comb-pager"></ul>');

    // Calculate the lower and upper limits of the pager links.
    let lowerLimit = 1;
    let upperLimit = this.numPages();

    if (this.numPages() > this.pagerWidth) {
      let adjacentLinks = Math.floor(this.pagerWidth / 2);
      lowerLimit = this.currentPage - adjacentLinks;
      upperLimit = this.currentPage + adjacentLinks;

      if (lowerLimit < 1) {
        upperLimit += 1 - lowerLimit;
        lowerLimit = 1;
      }
      if (upperLimit > this.numPages()) {
        lowerLimit -= upperLimit - this.numPages();
        upperLimit = this.numPages();
      }
    }

    // 'Previous' link.
    if (this.currentPage > 1) {
      pagerList.append(this.pagerItem("previous"));
    }

    // First page link.
    if (lowerLimit > 1) {
      pagerList.append(this.pagerItem("1"));

      if (lowerLimit > 2) {
        pagerList.append(this.pagerItem("ellipsis"));
      }
    }

    // Numbered links.
    for (let i = lowerLimit; i <= upperLimit; i++) {
      pagerList.append(this.pagerItem(i));
    }

    // Last page link.
    if (upperLimit < this.numPages()) {
      if (upperLimit < this.numPages() - 1) {
        pagerList.append(this.pagerItem("ellipsis"));
      }

      pagerList.append(this.pagerItem(this.numPages()));
    }

    // 'Next' link.
    if (this.currentPage < this.numPages()) {
      pagerList.append(this.pagerItem("next"));
    }

    // Add/update the pager.
    if ($(this.comb.elements.pager).children("ul").length) {
      $(this.comb.elements.pager).children("ul").replaceWith(pagerList);
    }
    else {
      $(this.comb.elements.pager).append(pagerList);
    }

    // Handle click events.
    $(this.comb.elements.pager).find("ul.comb-pager a").on("click", (event) => {
      this.currentPage = $(event.currentTarget).data("page");
      this.paginate();
    });
  }

  // Generate a single pager link.
  pagerItem(type) {
    let listItem = $("<li></li>");
    let anchor = $('<a href="#"></a>');

    if (["previous", "next"].includes(type)) {
      anchor.text(type);
      let page = (type == "previous") ? this.currentPage - 1 : this.currentPage + 1;
      anchor.attr("data-page", page);
      listItem.append(anchor);
      listItem.addClass("comb-pager-" + type);
    }
    else if (type == "ellipsis") {
      listItem.text("…");
      listItem.addClass("comb-pager-" + type);
    }
    else if (type == this.currentPage) {
      listItem.text(type);
      listItem.addClass("comb-pager-active");
    }
    else {
      anchor.text(type);
      anchor.attr("data-page", type);
      listItem.append(anchor);
    }

    return listItem;
  }

}

export default Pager;
