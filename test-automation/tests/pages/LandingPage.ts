import { browser, driver, $ } from '@wdio/globals';
import { GenericMethods } from '../../utils/genericMethods';
import { ObjectRepository } from '../../utils/ObjectRepository';

export class LandingPage {
    private genericMethods: GenericMethods;
    private objectRepository: ObjectRepository;

    constructor() {
        this.genericMethods = new GenericMethods();
        this.objectRepository = ObjectRepository.getInstance();
    }

    /**
     * Wait for landing page to load
     */
    async waitForLandingPage(): Promise<void> {
        const landingTitle = await this.objectRepository.getLocatorString('landing', 'landing_page_title');
        await this.genericMethods.waitForElementDisplayed(landingTitle);
    }

    /**
     * Click checkbox with specific text
     * @param checkboxText - Text of the checkbox to click
     */
    async clickCheckboxWithText(checkboxText: string): Promise<void> {
        const checkboxLocator = await this.objectRepository.getLocatorString('landing', 'confirmation_checkbox');
        await this.genericMethods.waitForElementDisplayed(checkboxLocator);
        await this.genericMethods.click(checkboxLocator);
    }

    /**
     * Click button with specific text
     * @param buttonText - Text of the button to click
     */
    async clickButtonWithText(buttonText: string): Promise<void> {
        let buttonLocator: string;
        
        switch (buttonText.toLowerCase()) {
            case 'continue':
                buttonLocator = await this.objectRepository.getLocatorString('landing', 'continue_button');
                break;
            case 'accept':
                buttonLocator = await this.objectRepository.getLocatorString('landing', 'accept_button');
                break;
            case 'get started':
                buttonLocator = await this.objectRepository.getLocatorString('landing', 'get_started_button');
                break;
            case 'create pin':
                buttonLocator = await this.objectRepository.getLocatorString('landing', 'create_pin_button');
                break;
            default:
                buttonLocator = `~${buttonText.replace(/\s+/g, '_').toLowerCase()}_button`;
        }
        
        await this.genericMethods.waitForElementDisplayed(buttonLocator);
        await this.genericMethods.click(buttonLocator);
    }

    /**
     * Click link with specific text
     * @param linkText - Text of the link to click
     */
    async clickLinkWithText(linkText: string): Promise<void> {
        let linkLocator: string;
        
        switch (linkText.toLowerCase()) {
            case 'next':
                // Try multiple locators for Next link
                const nextLocators = [
                    'next_link',
                    'next_link_alt',
                    'next_link_alt2',
                    'next_link_alt3',
                    'next_link_alt4',
                    'next_link_alt5',
                    'next_link_alt6',
                    'next_link_alt7',
                    'next_link_alt8',
                    'next_link_alt9'
                ];
                
                let clicked = false;
                for (const locatorName of nextLocators) {
                    try {
                        linkLocator = await this.objectRepository.getLocatorString('landing', locatorName);
                        await this.genericMethods.waitForElementDisplayed(linkLocator, 5000);
                        await this.genericMethods.click(linkLocator);
                        clicked = true;
                        console.log(`Successfully clicked Next link using locator: ${locatorName}`);
                        break;
                    } catch (error: any) {
                        console.log(`Failed to click Next link using locator: ${locatorName}`, error.message);
                        continue;
                    }
                }
                
                if (!clicked) {
                    throw new Error(`Failed to click Next link. Tried all available locators.`);
                }
                return;
            default:
                linkLocator = `~${linkText.replace(/\s+/g, '_').toLowerCase()}_link`;
        }
        
        await this.genericMethods.waitForElementDisplayed(linkLocator);
        await this.genericMethods.click(linkLocator);
    }

    /**
     * Click close icon on popup
     */
    async clickCloseIcon(): Promise<void> {
        const closeIconLocator = await this.objectRepository.getLocatorString('landing', 'close_icon');
        await this.genericMethods.waitForElementDisplayed(closeIconLocator);
        await this.genericMethods.click(closeIconLocator);
    }

    /**
     * Enter PIN code
     * @param pinCode - PIN code to enter
     */
    async enterPin(pinCode: string): Promise<void> {
        const pinInputLocator = await this.objectRepository.getLocatorString('landing', 'pin_input');
        await this.genericMethods.waitForElementDisplayed(pinInputLocator);
        await this.genericMethods.setValue(pinInputLocator, pinCode);
    }

    /**
     * Re-enter PIN code
     * @param pinCode - PIN code to re-enter
     */
    async reEnterPin(pinCode: string): Promise<void> {
        const reEnterPinLocator = await this.objectRepository.getLocatorString('landing', 'pin_confirm_input');
        await this.genericMethods.waitForElementDisplayed(reEnterPinLocator);
        await this.genericMethods.setValue(reEnterPinLocator, pinCode);
    }

    /**
     * Verify text is displayed
     * @param expectedText - Expected text to verify
     */
    async verifyTextDisplayed(expectedText: string): Promise<void> {
        let textLocator: string;
        
        switch (expectedText.toLowerCase()) {
            case 'i have confirmed that this app is for me.':
                textLocator = await this.objectRepository.getLocatorString('landing', 'landing_text');
                break;
            default:
                textLocator = `~${expectedText.replace(/\s+/g, '_').toLowerCase()}_text`;
        }
        
        await this.genericMethods.waitForElementDisplayed(textLocator, 10000);
        const actualText = await this.genericMethods.getText(textLocator);
        console.log('Expected text:', expectedText);
        console.log('Actual text:', actualText);
    }

    /**
     * Verify Dashboard page text is displayed
     * @param text - Text to verify on Dashboard page
     */
    async verifyDashboardPageTextDisplayed(text: string): Promise<void> {
        const landingTextLocator = await this.objectRepository.getLocatorString('landing', 'personal_credential_text');
        await this.genericMethods.waitForElementDisplayed(landingTextLocator);
        const actualText = await this.genericMethods.getText(landingTextLocator);
        console.log('Dashboard page text:', actualText);
    }

    /**
     * Verify landing page text is displayed
     * @param text - Text to verify on landing page
     */
    async verifyLandingPageTextDisplayed(text: string): Promise<void> {
        const landingTextLocator = await this.objectRepository.getLocatorString('landing', 'landing_page_title');
        await this.genericMethods.waitForElementDisplayed(landingTextLocator);
        const actualText = await this.genericMethods.getText(landingTextLocator);
        console.log('Landing page text:', actualText);
    }

    /**
     * Check if continue button exists
     * @returns True if continue button exists
     */
    async checkContinueButtonExists(): Promise<boolean> {
        const continueButtonLocator = await this.objectRepository.getLocatorString('landing', 'continue_button');
        return await this.genericMethods.isElementDisplayed(continueButtonLocator);
    }

    /**
     * Verify continue button exists
     */
    async verifyContinueButtonExists(): Promise<void> {
        const continueButtonLocator = await this.objectRepository.getLocatorString('landing', 'continue_button');
        await this.genericMethods.waitForElementDisplayed(continueButtonLocator);
    }

    /**
     * Get current platform
     * @returns Current platform (android or ios)
     */
    async getCurrentPlatform(): Promise<string> {
        return process.env.PLATFORM || 'android';
    }

    /**
     * Check if running on Android
     * @returns True if running on Android
     */
    async isAndroid(): Promise<boolean> {
        return (await this.getCurrentPlatform()) === 'android';
    }

    /**
     * Check if running on iOS
     * @returns True if running on iOS
     */
    async isIOS(): Promise<boolean> {
        return (await this.getCurrentPlatform()) === 'ios';
    }

    /**
     * Take screenshot of landing page
     * @param name - Screenshot name
     */
    async takeScreenshot(name: string = 'landing_page'): Promise<void> {
        await this.genericMethods.takeScreenshot(name);
    }

    /**
     * Wait for element to be displayed
     * @param locator - Element locator
     * @param timeout - Timeout in milliseconds
     */
    async waitForElementToBeDisplayed(locator: string, timeout: number = 10000): Promise<void> {
        await this.genericMethods.waitForElementDisplayed(locator, timeout);
    }

    /**
     * Wait for element to be clickable
     * @param locator - Element locator
     * @param timeout - Timeout in milliseconds
     */
    async waitForElementToBeClickable(locator: string, timeout: number = 10000): Promise<void> {
        await this.genericMethods.waitForElementDisplayed(locator, timeout);
    }
} 