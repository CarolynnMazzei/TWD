import { By, until, WebDriver } from "selenium-webdriver";


export class TWDU {
  driver: WebDriver;
  wait: number = 2500;


  constructor(driver: WebDriver) {
    this.driver = driver;
  }


  async navigate(url : string) {
    await this.driver.get(url);
    await (await this.driver).manage().window().maximize()
  }


  async getCharacters(){
    await this.driver.sleep(this.wait)

    this.driver.executeScript("window.scroll(0, 500);");

    let charBtn = await this.driver.wait(until.elementLocated(By.xpath('//a[2]/h2[1]')))
    await charBtn.click()
    await this.driver.sleep(this.wait)
  }


  async clickCharacter(){
    this.driver.executeScript("window.scroll(0, 1500);");
    await this.driver.sleep(this.wait)
    await (await this.driver.findElement(By.linkText("Daryl Dixon"))).click();
    await this.driver.sleep(this.wait)
  }


  async clickBackButton() {
    let searchBtn = await (await this.driver).findElement(By.className('CharacterDetailPageHeader-module__ArrowLeft__L_xyN'))
    await this.driver.wait(until.elementIsVisible(searchBtn))
    await this.driver.wait(until.elementIsEnabled(searchBtn))
    await searchBtn.click()
    this.driver.executeScript("window.scroll(0, 500);");
    await this.driver.sleep(this.wait)
  }


  async searchCharacter(){
    let search = await this.driver.wait(until.elementLocated(By.xpath('//div[3]/div[1]/div[1]/img[1]')))
    await search.click()
    await this.driver.sleep(this.wait)

    let searchBtn3 = await (await this.driver).findElement(By.className('SpoilerSearch-module__RealSearchInput__2Q9S5'))
    await this.driver.wait(until.elementIsVisible(searchBtn3))
    await this.driver.wait(until.elementIsEnabled(searchBtn3))
    await searchBtn3.sendKeys("Glenn");
    await this.driver.sleep(this.wait)

    await (await this.driver.findElement(By.linkText("Glenn Rhee"))).click();
    await this.driver.sleep(this.wait)
  }


  async searchShirts() {
   let click5 = await this.driver.wait(until.elementLocated(By.xpath('//div[1]/a[2]')))
   await click5.click()

   let click6 = await this.driver.wait(until.elementLocated(By.xpath('//div[2]/div[1]/div[1]/form[1]/input[2]')))
   await click6.sendKeys("Shirts")
   await this.driver.sleep(this.wait)

   let click7 = await this.driver.wait(until.elementLocated(By.xpath('//div[3]/div[1]/a[1]/div[1]/div[1]/div[1]/img[1]')))
   await click7.click();
   await this.driver.sleep(this.wait)
  }


  async addToCart() {
   await (await this.driver.findElement(By.name("add"))).click();
   await this.driver.sleep(this.wait)
  }


  async checkout() {
   await (await this.driver.findElement(By.name("checkout"))).click();
   await this.driver.sleep(this.wait)

   let click8 = await this.driver.wait(until.elementLocated(By.xpath('//div[1]/div[2]/button[2]')))
   await click8.click();
   await this.driver.sleep(this.wait)
  }


  async fillContactInfo() {
    let emailTxt = await this.driver.findElement(By.name("checkout[email]"));
    await emailTxt.sendKeys("testemail@gmail.com");
    await this.driver.sleep(this.wait)

    let firstnameTxt = await this.driver.findElement(By.name("checkout[shipping_address][first_name]"));
    await firstnameTxt.sendKeys("Carolynn");

    let lastnameTxt = await this.driver.findElement(By.name("checkout[shipping_address][last_name]"));
    await lastnameTxt.sendKeys("Mazzei");

    let addressTxt = await this.driver.findElement(By.name("checkout[shipping_address][address1]"));
    await addressTxt.sendKeys("123 Main Street");

    let addressTxt2 = await this.driver.findElement(By.name("checkout[shipping_address][address2]"));
    await addressTxt2.sendKeys("Apt. 2");

    let cityTxt = await this.driver.findElement(By.name("checkout[shipping_address][city]"));
    await cityTxt.sendKeys("Paramus");

    let zipTxt = await this.driver.findElement(By.name("checkout[shipping_address][zip]"));
    await zipTxt.sendKeys("07652");

    let phoneTxt = await this.driver.findElement(By.name("checkout[shipping_address][phone]"));
    await phoneTxt.sendKeys("201-123-4567");
    await this.driver.sleep(this.wait)
    
    this.driver.executeScript("window.scroll(0, 1000);");

    await (await this.driver.findElement(By.name("button"))).click();
    await this.driver.sleep(this.wait)

    await (await this.driver.findElement(By.name("button"))).click();
    await this.driver.sleep(this.wait)

  }


  async getHeaderText(name: string) {
    let data = [];

    await this.driver.wait(until.elementsLocated(By.className(name)));
 
    let elements = await this.driver.findElements(By.className(name));
    for (let i = 0; i < elements.length; i++) {
      data.push(await (await elements[i].getText()));
    }

    //console.log("DATA == " + data[0])
    
    return data;
  }
 
  
}