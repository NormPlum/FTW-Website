class Pager {

  // Initial setup.
  constructor(comb) {
    this.comb = comb;
    this.numPages = Math.max(Math.ceil(this.comb.items.length / this.comb.settings.pagerItemsPerPage), 1);
    this.currentPage = 1;

    this.paginate();
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(value) {
    this._currentPage = Math.max(Math.min(value, this.numPages), 1);
  }

  // Paginate items.
  paginate() {
    console.log(this.currentPage);
    this.currentPage = 50;
    console.log(this.currentPage);

    // for (let i = 0; i < this.comb.settings.pagerItemsPerPage; i++) {
    //   console.log(this.comb.items[i]);
    //   this.comb.hideItem(this.comb.items[i]);
    // }
  }

}

export default Pager;
