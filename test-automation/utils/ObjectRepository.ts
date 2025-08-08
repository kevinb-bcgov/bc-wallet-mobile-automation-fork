import fs from 'fs';
import path from 'path';
import { PlatformHelper } from './PlatformHelper';

export interface Locator {
    id?: string;
    name?: string;
    className?: string;
    xpath?: string;
    accessibilityId?: string;
    androidUIAutomator?: string;
    iosPredicate?: string;
    iosClassChain?: string;
}

export interface PageObject {
    [key: string]: string; // Simplified to just store locator strings
}

export class ObjectRepository {
    private static instance: ObjectRepository;
    private locators: Map<string, PageObject> = new Map();
    private platform: string;

    private constructor() {
        this.platform = process.env.PLATFORM || 'android';
        // Initialize with empty locators, will be loaded when first accessed
    }

    public static getInstance(): ObjectRepository {
        if (!ObjectRepository.instance) {
            ObjectRepository.instance = new ObjectRepository();
        }
        return ObjectRepository.instance;
    }

    /**
     * Load locators from platform-specific TypeScript files
     */
    private async loadLocators(): Promise<void> {
        const platform = await PlatformHelper.getPlatform();
        const locatorsDir = path.join(process.cwd(), 'utils', 'locators', platform);
        
        if (!fs.existsSync(locatorsDir)) {
            console.warn(`Locators directory not found for platform ${platform}: ${locatorsDir}`);
            return;
        }

        const files = fs.readdirSync(locatorsDir);
        
        for (const file of files) {
            if (file.endsWith('.ts')) {
                const filePath = path.join(locatorsDir, file);
                const pageName = path.basename(file, '.ts');
                
                try {
                    // Dynamic import of the TypeScript module
                    const module = await import(filePath);
                    const pageLocators = module[pageName];
                    
                    if (pageLocators) {
                        this.locators.set(pageName, pageLocators);
                        console.log(`Loaded locators for page: ${pageName} on platform: ${platform}`);
                    }
                } catch (error) {
                    console.error(`Error loading locators from ${file}:`, error);
                }
            }
        }
    }

    /**
     * Get locator for a specific page and element
     * @param pageName - Name of the page
     * @param elementName - Name of the element
     * @returns Locator string
     */
    public async getLocator(pageName: string, elementName: string): Promise<string> {
        // Ensure locators are loaded
        if (this.locators.size === 0) {
            await this.loadLocators();
        }
        
        const page = this.locators.get(pageName);
        if (!page) {
            throw new Error(`Page '${pageName}' not found in object repository`);
        }

        const locator = page[elementName];
        if (!locator) {
            throw new Error(`Element '${elementName}' not found in page '${pageName}'`);
        }

        return locator;
    }

    /**
     * Get locator string for WebdriverIO (alias for getLocator)
     * @param pageName - Name of the page
     * @param elementName - Name of the element
     * @returns Locator string
     */
    public async getLocatorString(pageName: string, elementName: string): Promise<string> {
        return await this.getLocator(pageName, elementName);
    }

    /**
     * Get all locators for a page
     * @param pageName - Name of the page
     * @returns Page object with all locators
     */
    public getPageLocators(pageName: string): PageObject {
        const page = this.locators.get(pageName);
        if (!page) {
            throw new Error(`Page '${pageName}' not found in object repository`);
        }
        return page;
    }

    /**
     * Check if page exists
     * @param pageName - Name of the page
     * @returns True if page exists
     */
    public hasPage(pageName: string): boolean {
        return this.locators.has(pageName);
    }

    /**
     * Check if element exists in page
     * @param pageName - Name of the page
     * @param elementName - Name of the element
     * @returns True if element exists
     */
    public hasElement(pageName: string, elementName: string): boolean {
        const page = this.locators.get(pageName);
        return page ? page.hasOwnProperty(elementName) : false;
    }

    /**
     * Get all page names
     * @returns Array of page names
     */
    public getPageNames(): string[] {
        return Array.from(this.locators.keys());
    }

    /**
     * Get all element names for a page
     * @param pageName - Name of the page
     * @returns Array of element names
     */
    public getElementNames(pageName: string): string[] {
        const page = this.locators.get(pageName);
        return page ? Object.keys(page) : [];
    }

    /**
     * Reload locators from files
     */
    public async reloadLocators(): Promise<void> {
        this.locators.clear();
        await this.loadLocators();
    }

    /**
     * Add locator dynamically
     * @param pageName - Name of the page
     * @param elementName - Name of the element
     * @param locator - Locator string
     */
    public addLocator(pageName: string, elementName: string, locator: string): void {
        if (!this.locators.has(pageName)) {
            this.locators.set(pageName, {});
        }
        
        const page = this.locators.get(pageName)!;
        page[elementName] = locator;
    }

    /**
     * Remove locator
     * @param pageName - Name of the page
     * @param elementName - Name of the element
     */
    public removeLocator(pageName: string, elementName: string): void {
        const page = this.locators.get(pageName);
        if (page && page[elementName]) {
            delete page[elementName];
        }
    }

    /**
     * Get current platform
     * @returns Current platform
     */
    public getPlatform(): string {
        return this.platform;
    }

    /**
     * Debug method to print loaded locators
     */
    public debugLocators(): void {
        console.log('Loaded locators:');
        for (const [pageName, page] of this.locators) {
            console.log(`Page: ${pageName}`);
            for (const [elementName, locator] of Object.entries(page)) {
                console.log(`  ${elementName}: ${locator}`);
            }
        }
    }
} 