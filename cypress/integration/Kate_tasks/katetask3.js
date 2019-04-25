import Chance from 'chance'
import pageShop from "../../support/Objects/pageShop"
import pageCart from "../../support/Objects/pageCart"
import commonPageActions from "../../support/Objects/commonPageActions"
import pageSearch from '../../support/Objects/pageSearch';


before('preparation : add random product to cart',()=>{
    
    commonPageActions.pickRandomProduct()
    
    commonPageActions.addProductToCart()


})

it('positive : product qnt change',()=>{
    
    cy.visit('https://store.google.com/us/cart?hl=en-US')
    

        pageCart.getProductQuantity().then((text) => { expect(text).to.eq("1") })//check : the only one item in the cart

        pageCart.getTotalPrice().then((text) => { expect(text).to.eq(pageCart.getProductPrice()) })//check : the total price is correct


})