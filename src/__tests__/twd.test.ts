import { TWDU } from "./AMC_TWDU";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";


const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new TWDU(driver);
let data;


test("open The Walking Dead home page and check headers", async () => {
  await page.navigate("https://www.amc.com/twdu/the-walking-dead/");

  data = await page.getHeaderText("Menu-module__NavListItem__1OnHh Menu-module__Desktop__3_9TG");
  expect(data[0]).toContain("SHOWS"); 
  expect(data[1]).toContain("NEWS"); 
  expect(data[2]).toContain("INTERACTIVE"); 
  expect(data[3]).toContain("SHOP"); 

});


test("click Header CHARACTERS and check text", async () => {
  await page.getCharacters();

  data = await page.getHeaderText("CharactersPage-module__MainCharacterCard__3XKrf");
  expect(data[0]).toContain("Lydia"); 
  expect(data[1]).toContain("Michonne"); 
  expect(data[2]).toContain("Enid"); 
  expect(data[3]).toContain("Morgan Jones"); 
  expect(data[4]).toContain("Gabriel Stokes"); 

});


test("click on Characters Daryl and check text", async () => {
  await page.clickCharacter();

  data = await page.getHeaderText("CharacterDetailPageHeader-module__RightGroup__1MnGg");
  expect(data[0]).toContain("DARYL DIXON"); 
  expect(data[0]).toContain("PLAYED BY NORMAN REEDUS"); 
  expect(data[0]).toContain("Although a lone wolf at heart, Daryl is loyal beyond measure"); 
});


test("click on Back button", async () => {
  await page.clickBackButton();

  data = await page.getHeaderText("CharactersPage-module__MainCharacterCard__3XKrf");
  expect(data[0]).toContain("Lydia"); 
  expect(data[1]).toContain("Michonne"); 
  expect(data[2]).toContain("Enid"); 
  expect(data[3]).toContain("Morgan Jones"); 
  expect(data[4]).toContain("Gabriel Stokes"); 
});


test("search/type-in Character Glenn and check text", async () => {
  await page.searchCharacter();

  data = await page.getHeaderText("CharacterDetailPageHeader-module__RightGroup__1MnGg");
  expect(data[0]).toContain("GLENN RHEE"); 
  expect(data[0]).toContain("PLAYED BY STEVEN YEUN"); 
  expect(data[0]).toContain("Glenn has fully “grown up” – he’s been through trauma after trauma and he’s come away stronger for it,"); 
});


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