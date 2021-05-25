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

//test("search/type-in Character Rick and check text", async () => {
//  await page.searchCharacter();

//  data = await page.getHeaderText("CharacterDetailPageHeader-module__RightGroup__1MnGg");
//  expect(data[0]).toContain("RICK GRIMES"); 
//  expect(data[0]).toContain("PLAYED BY ANDREW LINCOLN"); 
//  expect(data[0]).toContain("At the end of last season, Rick unexpectedly let Negan live, and he stands by this decision in the name of his son."); 
//});


afterAll(async () => {
  await driver.quit();
});