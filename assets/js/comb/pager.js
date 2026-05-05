class Pager {

  // Initial setup.
  constructor(comb) {
    this.comb = comb;
    this.currentPage = 1;
    this.pageClass = "comb-current-page";

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
    let pagerList = $("<ul></ul>");
    for (let i = 0; i < this.numPages(); i++) {
      let page = i + 1;
      let active = (page == this.currentPage) ? ' class="comb-active"' : "";
      pagerList.append('<li><a href="#"' + active + ' data-page="' + page + '">' + page + '</a></li>');
    }

    // Add/update the pager.
    if ($(this.comb.elements.pager).children("ul").length) {
      $(this.comb.elements.pager).children("ul").replaceWith(pagerList);
    }
    else {
      $(this.comb.elements.pager).append(pagerList);
    }

    // Handle click events.
    $(this.comb.elements.pager).find("ul a").on("click", (event) => {
      this.currentPage = $(event.currentTarget).data("page");
      this.paginate();
    });
  }

}

export default Pager;
