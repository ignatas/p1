import CartPage from "../../pageObjects/cart-page"
import ProductPage from "../../pageObjects/product-page"
import SearchPage from "../../pageObjects/search-page"
import Chance from 'chance'
let product = [
    {
        "description": "add to cart - product with color selection" // #1
    },
    {
        "description": "add to cart - product without color selection" // #2
    }
] // 2 testcases hardcode

describe('task2 - add product to cart', () => {

    beforeEach(() => {
        cy.clearCookies()
    })

    product.forEach((product, index) => {
        it('positive : ' + product.description, () => {
            cy.fixture('products')
                .then(products => {
                    product = Chance().pickone(products[index])
                    cy.log('[GIVEN : product = ](http://e.com)' + product.display_name)
                    SearchPage.openSearchResults(product.display_name)

                    cy.log('[WHEN : User buys the product](http://e.com)')
                    SearchPage.pickProductFromSearchResultsByUrl(product.url)
                    ProductPage.getProductPrice().then((price) => { product.price = price })// save the price

                    let color = Chance().pickone(product.colors)
                    cy.log(color + '[ color is selected](http://e.com)')
                    // buy the product
                    ProductPage.addProductToCart(product, color)
                    cy.log('check: the color is correct')
                    // check: the color is correct
                    CartPage.getProductTitle(product.url).contains(color).should('exist')

                    cy.log('[THEN : The product is added to the cart](http://e.com)')
                    cy.log('check : the product price is correct')
                    CartPage.getProductPrice(product.url).then((productPrice) => {
                        expect(productPrice).to.eq(product.price + '.00')
                    })

                    cy.log('check : the only one item in the cart')
                    CartPage.getProductQuantity(product.url).then((quantity) => {
                        expect(quantity).to.eq("1")
                    })

                    cy.log('check : the total price is correct')
                    CartPage.getTotalPrice().then((totalPrice) => {
                        expect(totalPrice).to.eq(product.price + '.00')
                    })

                })
        })
    });

    afterEach('cleaning', () => {
        cy.clearCookies()
    })
})