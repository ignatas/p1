import BasePage from "./base-page"

class ShopPage extends BasePage {

    openShop() {
        cy.visit(`${this.storeUrl}/?hl=en-US&countryRedirect=true`)
    }

} export default new ShopPage()