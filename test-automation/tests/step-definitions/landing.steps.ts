import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { browser } from '@wdio/globals';
import { LandingPage } from '../pages/LandingPage';

setDefaultTimeout(60000);

const landingPage = new LandingPage();

Given('App is launched', async function() {
    console.log('App is launched');
});

Given('Landing page is displayed', async function() {
    await landingPage.waitForLandingPage();
    // await landingPage.verifyLandingPageTextDisplayed('I have confirmed that this app is for me.');
});

// ============================================================================
// STEP DEFINITIONS USING PAGE OBJECT METHODS ONLY
// ============================================================================

When('I click on the {string} checkbox', async function(checkboxText: string) {
    await landingPage.clickCheckboxWithText(checkboxText);
});

When('I click on the {string} button', async function(buttonText: string) {
    await landingPage.clickButtonWithText(buttonText);
});

When('I click on the {string} link button', async function(linkText: string) {
    await landingPage.clickLinkWithText(linkText);
});

When('I click on close icon on the popup', async function() {
    await landingPage.clickCloseIcon();
});

When('I enter pin code {string}', async function(pinCode: string) {
    await landingPage.enterPin(pinCode);
});

When('I re-enter pin code {string}', async function(pinCode: string) {
    await landingPage.reEnterPin(pinCode);
});

Then('Verify that {string} is displayed', async function(expectedText: string) {
    await landingPage.verifyTextDisplayed(expectedText);
});

Then('Verify that {string} is displayed on Dashboard page', async function(expectedText: string) {
    await landingPage.verifyDashboardPageTextDisplayed(expectedText);
}); 