Design and develop an ecommerce store using Next.js. It should have the following:

- A Products page (where all the products are listed)
  - Minimum of 4 different products
  - The page should have a relevant `h1` element
  - Each product (incl. product name and image) needs to be contained in an anchor element (a link) with an attribute of `data-test-id="product-<product id>"`
    - This link will lead to its single product page
  - The header (described below) needs to have a link to the products page with the HTML attribute `data-test-id="products-link"`
- A page for each single product (when you click on the product it goes to this page) with ability to add a quantity to the cart
  - The single product URL needs to contain the `id` (eg. `/products/<product id>`)
  - The product name needs to be directly inside an `h1` element (it should be the only `h1`)
  - The product image needs to be in an `img` element with the HTML attribute `data-test-id="product-image"`
  - The product price (without any currency symbol or thousands separator) needs to be directly inside an element with the HTML attribute `data-test-id="product-price"`
  - The quantity input needs to have the HTML attribute `data-test-id="product-quantity"`
    - The starting quantity should be `1`
  - The add to cart button needs to have the HTML attribute `data-test-id="product-add-to-cart"`
    - Clicking this button will add the amount from the product quantity input to any quantity of this product already in the cart
      - For example, if the amount in the product quantity input is `2` and the existing quantity of this product in the cart is `3`, then after clicking the button, the quantity of this product in the cart will become `5`
  - Negative quantity values should not be possible to enter
- A Cart page (containing a list where products appear when you click on the "Add to cart" button on the single product page), which also shows the total price of all products
  - Each product needs to be contained in an element with the HTML attribute `data-test-id="cart-product-<product id>"`
    - Inside the product element:
      - the product name needs to be be visible
      - the quantity needs to be visible, as the only content inside an element with the HTML attribute `data-test-id="cart-product-quantity-<product id>"`
      - the product subtotal needs to be visible (price × quantity)
      - the remove button needs to have the HTML attribute `data-test-id="cart-product-remove-<product id>"`
  - The total price (the number without any currency symbol) needs to be directly inside an element with the HTML attribute `data-test-id="cart-total"`
  - The checkout button needs to have the HTML attribute `data-test-id="cart-checkout"`
  - Negative quantity values should not be possible
  - Clicking on the checkout button should navigate to the checkout page
- A Checkout page which shows the total and asks for shipping and payment information
  - The first name input needs to have the HTML attribute `data-test-id="checkout-first-name"`
  - The last name input needs to have the HTML attribute `data-test-id="checkout-last-name"`
  - The email input needs to have the HTML attribute `data-test-id="checkout-email"`
  - The address input needs to have the HTML attribute `data-test-id="checkout-address"`
  - The city input needs to have the HTML attribute `data-test-id="checkout-city"`
  - The postal code input needs to have the HTML attribute `data-test-id="checkout-postal-code"`
  - The country input needs to have the HTML attribute `data-test-id="checkout-country"`
  - The credit card input needs to have the HTML attribute `data-test-id="checkout-credit-card"`
  - The expiration date input needs to have the HTML attribute `data-test-id="checkout-expiration-date"`
  - The security code input needs to have the HTML attribute `data-test-id="checkout-security-code"`
  - The form should prevent submission with any of the above fields being empty
  - The Confirm Order button needs to have the HTML attribute `data-test-id="checkout-confirm-order"`
  - Privacy: don't save user information (payment or other personal information) anywhere (unless you have a privacy policy and are creating a real ecommerce store)
  - Clicking on the Confirm Order button should empty the cart and navigate to the Thank You page
- A Thank You page
  - The page title should include `Thank you for your order`
- A header with a link to the Cart, showing the number of items in the cart
  - This header needs to appear on all pages
  - The header needs to use the HTML `<header>` element
  - The number of items is the sum of the quantity of all products (eg. if you have 2 apples and 3 bananas in your cart, the number of items is 5)
  - The number of items needs to update when you add or remove items from the cart
  - The link needs to have an HTML attribute `data-test-id="cart-link"`
  - The count needs to be contained in an element with the HTML attribute `data-test-id="cart-count"`

This project is to build an Ecommerce store on your own - don't use an all-in-one solution like [Next.js Commerce](https://nextjs.org/commerce).

## Cookies

- Use a cookie called `cart` to store information about what the user has added to their cart
  - Security: Prevent the user from making changes to cart data they shouldn't be able to (eg. prices). Remember: users can edit any information that is in the cookie.

## Database

- Create a PostgreSQL database and table(s)
- Connect to and query information from this database

## TypeScript / JSDoc

- Write at least 2 pages with props and 4 other non-migration, non-database files in TypeScript (type the React props like in [the cheatsheet](https://learn.upleveled.io/pern-extensive-immersive/modules/cheatsheet-typescript-jsdoc/))

## Tests

This project should also include tests written for the following functionality:

- E2E: Add to cart, change quantity and remove from cart
- E2E: Checkout flow, payment page, thank you page
- Unit: Test function that combines the product data from the database with the product quantity data from your cookie
- Unit: Test function for updating quantity in item of cookie (eg. adding an item to the cart that already exists)
- Unit: Test cart sum function
- Set up GitHub Actions to automatically test your code

## SEO

- Add titles to all pages
- Add meta descriptions to all pages

## Deploying

- Deploy to [Fly.io](https://fly.io/) ([cheatsheet](https://learn.upleveled.io/pern-extensive-immersive/modules/cheatsheet-deployment/#deploying-a-nextjs--postgresql-app-to-flyio))

## Documentation

- Create a readme with:
  - Title
  - Description
  - List of all technologies used
  - 1 or 2 screenshots
  - Setup instructions
  - Deployment instructions
