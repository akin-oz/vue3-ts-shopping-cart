const specTitle = require("cypress-sonarqube-reporter/specTitle");
const { ItemData } = require("../../../src/store/interfaces")
describe(specTitle("Home"), () => {
  let page = 1;
  const limit = 6;
  let offset = (page - 1) * limit;
  const fetchItems = (p: number, o: number) => {
    cy.request({
      method: 'GET',
      url: `https://api.musement.com/api/v3/activities?offset=${o}&limit=${limit}&venue_in=164`,
      headers: {
        "Content-type": "application/json",
        'X-Musement-Version': '3.4.0',
        'Accept-Language': 'it',
        'X-Musement-Currency': 'EUR'
      }
    }).its('body').as(`items-${p}`)
  }
  beforeEach(() => {
    page = 1
    offset = (page - 1) * limit;
    cy.visit(`/?page=${page}`)
  })
  it('loads the app', () => {
    cy.get('.product-page').should('be.visible')
  })

  it("should render correctly", () => {
    cy.get('.product-list__item').should('have.length', limit)
  })
  it("should call items", () => {
    fetchItems(page, offset)
    cy.get(`@items-${page}`).its('data').should('have.length', limit)
  })
  it("should have correct image", () => {
    fetchItems(page, offset)
    cy.get('[itemprop="image"]')
    .and(($img) => {
      Array.from($img).forEach((item, index) => {
        expect(item).to.be.visible
        expect(item.clientWidth).be.greaterThan(0)
        cy.get(`@items-${page}`).its(`data.${index}.cover_image_url`).should('equal', item.getAttribute('src'))
      })

    })
  })
  it('should have correct title', () => {
    fetchItems(page, offset)
    cy.get('[itemprop="brand"]').each(($el, index) => {
      cy.get(`@items-${page}`).its(`data.${index}.title`).should('equal', $el.text())      
    })
  })
  it('should have correct description', () => {
    fetchItems(page, offset)
    cy.get('[itemprop="description"]').each(($el, index) => {
      cy.get(`@items-${page}`).its(`data.${index}.description`).should('equal', $el.text())      
    })
  })
  it('should have correct price', () => {
    fetchItems(page, offset)
    cy.get(`@items-${page}`).its('data').then((products: any) => {
      products.map((item: InstanceType<typeof ItemData>, index: number) => {
        cy.get('[itemprop="price"]').its(index).should('have.text', item.retail_price.formatted_value)
        if(item.discount > 0) {
          cy.get('.product__price--strike').should('have.text', item.original_retail_price.formatted_value);
        }
      })
    })
  })
  it('should have correct price', () => {
    fetchItems(page, offset)
    cy.get(`@items-${page}`).its('data').then((products: any) => {
      products.map((item: InstanceType<typeof ItemData>, index: number) => {
        cy.get('[itemprop="price"]').its(index).should('have.text', item.retail_price.formatted_value)
        if(item.discount > 0) {
          cy.get('.product__price--strike').should('have.text', item.original_retail_price.formatted_value);
        }
      })
    })
  })
  it('should add/remove item to the bag', () => {
    fetchItems(page, offset)
    cy.get('[itemprop="add-button"]').its(Math.floor(Math.random() * 6)).click()
    cy.get('[itemprop="minibag-trigger"]').trigger('mouseenter')
    cy.get('[itemprop="minibag"]').should('be.visible')
    cy.get('[itemprop="remove-button"]').click()
    cy.get('[itemprop="minibag"]').should('not.be.visible')
  })

  it('should add/remove item to wishlist', () => {
    fetchItems(page, offset)
    const randomNumber = Math.floor(Math.random() * 6)
    cy.get('[itemprop="wishlist-count"]').should('have.text', 0);
    cy.get('[itemprop="wishlist-button"]').its(randomNumber).click()
    cy.get('[itemprop="wishlist-count"]').should('have.text', 1);
    cy.get('[itemprop="wishlist-button"]').its(randomNumber).click()
    cy.get('[itemprop="wishlist-count"]').should('have.text', 0);
  })

  const checkPageData = (p: number,o: number) => {
    cy.url().should('include', `?page=${p}`)
    fetchItems(p, o)
    cy.wait(2000)
    cy.get('[itemprop="brand"]').each(($el, index) => {
      cy.get(`@items-${p}`).its(`data.${index}.title`).should('equal', $el.text())      
    })
  }

  it('should have clickable last page', () => {
    fetchItems(page, offset)
    cy.get(`@items-${page}`).its('meta').then(({ count }) => {
      const lastPage = Math.ceil(count / limit);
      cy.get(`[itemprop=page-${lastPage}`).should('be.visible')
      cy.get(`[itemprop=page-${lastPage}`).click()
      page = lastPage
      offset = (page - 1) * limit;
      checkPageData(page,offset)
    })
    
  })

  it('should click next page/prev page and get the correct data', () => {
    cy.get('[itemprop=page-next]').click()
    page++
    offset = (page - 1) * limit
    checkPageData(page,offset)
    cy.get('[itemprop=page-prev]').click()
    page--
    offset = (page - 1) * limit
    checkPageData(page,offset)

  })

  it('should click 2nd page and get the correct data', () => {
    cy.get('[itemprop=page-2]').click()
    page = 2
    offset = (page - 1) * limit
    checkPageData(page,offset)
  })


});