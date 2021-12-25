require('chromedriver');

const swd = require('selenium-webdriver');

const browser = new swd.Builder();
const tab = browser.forBrowser('chrome').build();
const { firstname, lastname, password,email, company,address,zipcode,number,city} = require('./data.json');


function selectByVisibleText(select, textDesired) {
  select.findElements(swd.By.css('option'))
  .then(options => {
      options.map(option => {
          option.getText().then(text => {
              if (text == textDesired)
                  option.click();
          });
      });
  });
}



(async function main() {
  await tab.get('http://automationpractice.com/index.php?controller=authentication&back=my-account#account-creation');

  const currentUrl = await tab.getCurrentUrl();

  const email_create = await tab.findElement(swd.By.css('#email_create'))
  await email_create.sendKeys(email)

  const SubmitCreate = await tab.findElement(swd.By.css('#SubmitCreate'))
  await SubmitCreate.click()

  await tab.manage().setTimeouts({
    implicit: 10000,
  })
  const id_gender1 = await tab.findElement(
    swd.By.css('#id_gender1'),
  )
  await id_gender1.click()
  const customer_firstname = await tab.findElement(swd.By.css('#customer_firstname'))
  await customer_firstname.sendKeys(firstname)

  const customer_lastname = await tab.findElement(swd.By.css('#customer_lastname'))
  await customer_lastname.sendKeys(lastname)
  
  //const email_input = await tab.findElement(swd.By.css('#email'))
  //await email_input.sendKeys('')
  //await email_input.sendKeys(email)


  const password_input = await tab.findElement(swd.By.css('#passwd'))
  await password_input.sendKeys(password)


  const customer_firstname_second = await tab.findElement(swd.By.css('#firstname'))
  await customer_firstname_second.sendKeys(firstname)

  const customer_lastname_second = await tab.findElement(swd.By.css('#lastname'))
  await customer_lastname_second.sendKeys(lastname)

  const customer_company_second = await tab.findElement(swd.By.css('#company'))
  await customer_company_second.sendKeys(company)

  const customer_address1 = await tab.findElement(swd.By.css('#address1'))
  await customer_address1.sendKeys(address)

  const customer_address2 = await tab.findElement(swd.By.css('#address2'))
  await customer_address2.sendKeys(address)


  const customer_city = await tab.findElement(swd.By.css('#city'))
  await customer_city.sendKeys(city)

 


  const customer_zipcode = await tab.findElement(swd.By.css('#postcode'))
  await customer_zipcode.sendKeys(zipcode)

  const customer_phone = await tab.findElement(swd.By.css('#phone'))
  await customer_phone.sendKeys(number)






  const customer_mobile_phone = await tab.findElement(swd.By.css('#phone_mobile'))
  await customer_mobile_phone.sendKeys(number)



  const customer_future_address = await tab.findElement(swd.By.css('#alias'))
 // await customer_future_address.clear_field()
  await customer_future_address.sendKeys(address)
  
  const select  = await tab.findElement(swd.By.css('#id_state'))
  await select.click()

  const option  = await tab.findElement(swd.By.xpath('//*[@id="id_state"]/option[2]'))
  await option.click()

  

  const button_submit_registration = await tab.findElement(swd.By.css('#submitAccount'))
  await button_submit_registration.click()


  
  
 



 
  const successMsg = await tab.findElement(swd.By.css('.info-account')).getAttribute('innerHTML');
  if (successMsg.indexOf("Welcome to your account. Here you can manage all of your personal information and orders.") !== -1) {
    console.log('Account was created')
    console.log('SUCCESS!')
    await tab.sleep(5000);
    await tab.close();
  }
}())
