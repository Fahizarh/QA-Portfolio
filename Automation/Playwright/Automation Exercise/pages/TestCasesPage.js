class TestCasesPage {
  constructor(page) {
    this.page = page;
    this.testCases = page.locator("#header li:nth-child(5)");
  }
}

module.exports = { TestCasesPage };
