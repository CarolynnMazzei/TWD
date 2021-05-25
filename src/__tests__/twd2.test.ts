import { TWDU } from "./AMC_TWDU";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";


const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new TWDU(driver);
let data;


test("go to Walking Dead Shop store and check headers", async () => {
  await page.navigate("https://thewalkingdeadshop.amc.com/");

  data = await page.getHeaderText("site-nav__item");
  expect(data[0]).toContain("SHOP BY SHOW"); 
  expect(data[1]).toContain("SHOP BY PRODUCT"); 
  expect(data[2]).toContain("SHOP BY COLLECTION"); 
  expect(data[3]).toContain("SUPPLY DROP"); 

});


test("search Shirts and check text", async () => {
  await page.searchShirts();

  data = await page.getHeaderText("product-single__meta");
  expect(data[0]).toContain("THE WALKING DEAD CARL GRIMES BLACK T-SHIRT"); 
  expect(data[0]).toContain("$24.95"); 
  expect(data[0]).toContain("We've all watched Carl grow up before our eyes on The Walking Dead, and here's your chance to honor one of everyone's favorite characters on the show."); 
});


test("add shirt to cart and check cart contents", async () => {
  await page.addToCart();

  data = await page.getHeaderText("drawer--right");
  expect(data[1]).toContain("CART"); 
  expect(data[1]).toContain("SUBTOTAL"); 
  expect(data[1]).toContain("$24.95"); 
  expect(data[1]).toContain("Shipping, taxes, and discounts codes calculated at checkout."); 
});


test("checkout and check texts on contact info page", async () => {
  await page.checkout();

  data = await page.getHeaderText("edit_checkout");
  expect(data[0]).toContain("Contact information"); 
  expect(data[0]).toContain("Shipping address"); 
  expect(data[0]).toContain("Country/Region"); 
  expect(data[0]).toContain("Add a house number if you have one"); 
});


test("fill-in contact info and check Billing headers", async () => {
  await page.fillContactInfo();

  data = await page.getHeaderText("section--payment-method");
  expect(data[0]).toContain("Payment"); 
  expect(data[0]).toContain("Choose a payment method"); 
  expect(data[0]).toContain("Credit card"); 
  expect(data[0]).toContain("Visa"); 
  expect(data[0]).toContain("Mastercard"); 
  expect(data[0]).toContain("American Express"); 
  expect(data[0]).toContain("Discover"); 
  expect(data[0]).toContain("PayPal"); 
  expect(data[0]).toContain("Amazon Pay"); 
});


afterAll(async () => {
  await driver.quit();
});