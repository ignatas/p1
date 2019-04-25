//import commonPageActions from "../commonPageActions";

class pageShop {

    selectProductByName(product) { //Selection from 1st page hardcoded for now
        return cy.get('a[ng-href="' + product.url + '"]', { timeout: 20000 })
    }    

    selectProductColor(color) {
        return cy.get('div[class="mqn-lobby-swatch__card__headline ng-binding ng-scope"]', { timeout: 20000 })
            .contains(color)
            .parent().parent()
            .find('div[class="mqn-button mqn-button--hairline ng-binding ng-scope mdc-ripple-upgraded"]', { timeout: 20000 })
    }

} export default new pageShop()