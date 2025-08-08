export class PlatformHelper {
    /**
     * Get current platform
     * @returns Current platform (android or ios)
     */
    public static async getPlatform(): Promise<string> {
        return process.env.PLATFORM || 'android';
    }

    /**
     * Check if running on Android
     * @returns True if running on Android
     */
    public static async isAndroid(): Promise<boolean> {
        const platform = await this.getPlatform();
        return platform.toLowerCase() === 'android';
    }

    /**
     * Check if running on iOS
     * @returns True if running on iOS
     */
    public static async isIOS(): Promise<boolean> {
        const platform = await this.getPlatform();
        return platform.toLowerCase() === 'ios';
    }

    /**
     * Get platform-specific timeout
     * @returns Timeout in milliseconds
     */
    public static async getPlatformTimeout(): Promise<number> {
        const isAndroid = await this.isAndroid();
        return isAndroid ? 10000 : 15000; // iOS might need more time
    }

    /**
     * Get platform-specific wait interval
     * @returns Wait interval in milliseconds
     */
    public static async getPlatformWaitInterval(): Promise<number> {
        const isAndroid = await this.isAndroid();
        return isAndroid ? 500 : 1000; // iOS might need longer intervals
    }

    /**
     * Get platform name for logging
     * @returns Platform name (Android or iOS)
     */
    public static async getPlatformName(): Promise<string> {
        const isAndroid = await this.isAndroid();
        return isAndroid ? 'Android' : 'iOS';
    }

    /**
     * Get platform-specific capabilities
     * @returns Platform capabilities object
     */
    public static async getPlatformCapabilities(): Promise<any> {
        const isAndroid = await this.isAndroid();
        
        if (isAndroid) {
            return {
                platformName: 'Android',
                automationName: 'UiAutomator2',
                deviceName: 'Android Emulator'
            };
        } else {
            return {
                platformName: 'iOS',
                automationName: 'XCUITest',
                deviceName: 'iPhone Simulator'
            };
        }
    }
} 