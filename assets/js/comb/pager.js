class Pager {

  // Initial setup.
  constructor(comb) {
    this.comb = comb;
    this.currentPage = 1;
    this.pagerWidth = 7;

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
    let visibleItems = this.comb.visibleItems();

    for (let item in visibleItems) {
      // Hide all items.
      $(visibleItems[item]).hide();

      // Then show items on the current page.
      if (item >= currentPageStart && item < currentPageEnd) {
        $(visibleItems[item]).show();
      }
    }

    this.updatePager();
  }

  // Update the pager links.
  updatePager() {
    // Skip the pager if there's only one page.
    if (this.numPages() == 1) {
      if ($(this.comb.elements.pager).children("ul").length) {
        $(this.comb.elements.pager).children("ul").remove();
      }
      return;
    }

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
      this.currentPage = $(event.currentTarget).attr("data-page");
      this.paginate();
    });
  }

  // Generate a single pager item.
  pagerItem(type) {
    let listItem = $("<li></li>");
    let anchor = $('<a href="#"></a>');
    let span = $("<span></span>");

    switch (type) {
      case "previous":
      case "next":
        anchor.text(type);
        let page = (type == "previous") ? this.currentPage - 1 : this.currentPage + 1;
        anchor.attr("data-page", page);
        listItem.append(anchor);
        listItem.addClass("comb-pager-" + type);
        break;
      case "ellipsis":
        span.text("…");
        listItem.append(span);
        listItem.addClass("comb-pager-" + type);
        break;
      case this.currentPage:
        span.text(type);
        listItem.append(span);
        listItem.addClass("comb-pager-active");
        break;
      default:
        anchor.text(type);
        anchor.attr("data-page", type);
        listItem.append(anchor);
    }

    return listItem;
  }

}

export default Pager;
