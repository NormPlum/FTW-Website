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
      if (i < currentPageStart || i >= currentPageEnd) {
        $(this.comb.elements.items[i]).hide();
      }
    }

    this.updatePager();
    this.updatePager();
    this.updatePager();
  }

  // Update the pager links.
  updatePager() {
    // Create new pager.
    let pagerList = $("<ul></ul>");
    for (let i = 0; i < this.numPages(); i++) {
      let active = (i+1 == this.currentPage) ? ' class="comb-active"' : "";
      pagerList.append('<li><a href="#"' + active + '>' + (i+1) + '</a></li>');
    }

    if ($(this.comb.elements.pager).children("ul").length) {
      // Replace the old pager.
      $(this.comb.elements.pager).children("ul").replaceWith(pagerList);
    }
    else {
      // Add the new pager.
      $(this.comb.elements.pager).append(pagerList);
    }
  }

}

export default Pager;
