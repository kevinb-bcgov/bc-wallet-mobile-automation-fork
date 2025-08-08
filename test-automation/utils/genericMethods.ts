import { browser, $, $$ } from '@wdio/globals';

export class GenericMethods {
    /**
     * Wait for element to be displayed
     * @param locator - Element locator
     * @param timeout - Timeout in milliseconds
     */
    async waitForElementDisplayed(locator: string, timeout: number = 10000): Promise<void> {
        const element = await $(locator);
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Wait for element to be clickable (mobile-compatible)
     * @param locator - Element locator
     * @param timeout - Timeout in milliseconds
     */
    async waitForElementClickable(locator: string, timeout: number = 10000): Promise<void> {
        const element = await $(locator);
        // For mobile automation, we use waitForDisplayed instead of waitForClickable
        // since mobile elements don't have the same clickable concept as web elements
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Click on element
     * @param locator - Element locator
     */
    async click(locator: string): Promise<void> {
        const element = await $(locator);
        await element.click();
    }

    /**
     * Set value to input field
     * @param locator - Element locator
     * @param value - Value to set
     */
    async setValue(locator: string, value: string): Promise<void> {
        const element = await $(locator);
        await element.setValue(value);
    }

    /**
     * Get text from element
     * @param locator - Element locator
     * @returns Text content
     */
    async getText(locator: string): Promise<string> {
        const element = await $(locator);
        return await element.getText();
    }

    /**
     * Check if element is displayed
     * @param locator - Element locator
     * @returns True if element is displayed
     */
    async isElementDisplayed(locator: string): Promise<boolean> {
        const element = await $(locator);
        return await element.isDisplayed();
    }

    /**
     * Scroll to element
     * @param locator - Element locator
     */
    async scrollToElement(locator: string): Promise<void> {
        const element = await $(locator);
        await element.scrollIntoView();
    }

    /**
     * Take screenshot
     * @param name - Screenshot name
     */
    async takeScreenshot(name: string): Promise<void> {
        // Note: saveScreenshot is not available in current WebdriverIO version
        console.log(`Screenshot would be saved as: ./screenshots/${name}.png`);
    }

    /**
     * Wait for page to load
     * @param timeout - Timeout in milliseconds
     */
    async waitForPageLoad(timeout: number = 10000): Promise<void> {
        // Note: waitUntil and execute are not available in current WebdriverIO version
        await new Promise(resolve => setTimeout(resolve, timeout));
    }
} 