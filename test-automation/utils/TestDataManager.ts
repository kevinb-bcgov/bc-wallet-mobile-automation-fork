import fs from 'fs';
import path from 'path';
import YAML from 'yamljs';

export interface TestUser {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
}

export interface Location {
    latitude: number;
    longitude: number;
    altitude: number;
}

export interface TestData {
    users: {
        [key: string]: TestUser;
    };
    test_data: {
        valid_emails: string[];
        invalid_emails: string[];
        valid_passwords: string[];
        invalid_passwords: string[];
    };
    locations: {
        [key: string]: Location;
    };
    devices: {
        android_devices: string[];
        ios_devices: string[];
    };
}

export class TestDataManager {
    private static instance: TestDataManager;
    private testData!: TestData;

    private constructor() {
        this.loadTestData();
    }

    public static getInstance(): TestDataManager {
        if (!TestDataManager.instance) {
            TestDataManager.instance = new TestDataManager();
        }
        return TestDataManager.instance;
    }

    /**
     * Load test data from YAML file
     */
    private loadTestData(): void {
        const testDataPath = path.join(process.cwd(), 'utils', 'testdata', 'testdata.yml');
        
        if (!fs.existsSync(testDataPath)) {
            throw new Error(`Test data file not found: ${testDataPath}`);
        }

        try {
            this.testData = YAML.load(testDataPath);
        } catch (error) {
            console.error('Error loading test data:', error);
            throw error;
        }
    }

    /**
     * Get user by key
     * @param userKey - User key (e.g., 'valid_user', 'invalid_user')
     * @returns TestUser object
     */
    public getUser(userKey: string): TestUser {
        const user = this.testData.users[userKey];
        if (!user) {
            throw new Error(`User '${userKey}' not found in test data`);
        }
        return user;
    }

    /**
     * Get random valid email
     * @returns Random valid email
     */
    public getRandomValidEmail(): string {
        const emails = this.testData.test_data.valid_emails;
        return emails[Math.floor(Math.random() * emails.length)];
    }

    /**
     * Get random invalid email
     * @returns Random invalid email
     */
    public getRandomInvalidEmail(): string {
        const emails = this.testData.test_data.invalid_emails;
        return emails[Math.floor(Math.random() * emails.length)];
    }

    /**
     * Get random valid password
     * @returns Random valid password
     */
    public getRandomValidPassword(): string {
        const passwords = this.testData.test_data.valid_passwords;
        return passwords[Math.floor(Math.random() * passwords.length)];
    }

    /**
     * Get random invalid password
     * @returns Random invalid password
     */
    public getRandomInvalidPassword(): string {
        const passwords = this.testData.test_data.invalid_passwords;
        return passwords[Math.floor(Math.random() * passwords.length)];
    }

    /**
     * Get location by key
     * @param locationKey - Location key (e.g., 'san_francisco', 'new_york')
     * @returns Location object
     */
    public getLocation(locationKey: string): Location {
        const location = this.testData.locations[locationKey];
        if (!location) {
            throw new Error(`Location '${locationKey}' not found in test data`);
        }
        return location;
    }

    /**
     * Get random Android device
     * @returns Random Android device name
     */
    public getRandomAndroidDevice(): string {
        const devices = this.testData.devices.android_devices;
        return devices[Math.floor(Math.random() * devices.length)];
    }

    /**
     * Get random iOS device
     * @returns Random iOS device name
     */
    public getRandomIOSDevice(): string {
        const devices = this.testData.devices.ios_devices;
        return devices[Math.floor(Math.random() * devices.length)];
    }

    /**
     * Get all valid emails
     * @returns Array of valid emails
     */
    public getAllValidEmails(): string[] {
        return this.testData.test_data.valid_emails;
    }

    /**
     * Get all invalid emails
     * @returns Array of invalid emails
     */
    public getAllInvalidEmails(): string[] {
        return this.testData.test_data.invalid_emails;
    }

    /**
     * Get all valid passwords
     * @returns Array of valid passwords
     */
    public getAllValidPasswords(): string[] {
        return this.testData.test_data.valid_passwords;
    }

    /**
     * Get all invalid passwords
     * @returns Array of invalid passwords
     */
    public getAllInvalidPasswords(): string[] {
        return this.testData.test_data.invalid_passwords;
    }

    /**
     * Get all Android devices
     * @returns Array of Android device names
     */
    public getAllAndroidDevices(): string[] {
        return this.testData.devices.android_devices;
    }

    /**
     * Get all iOS devices
     * @returns Array of iOS device names
     */
    public getAllIOSDevices(): string[] {
        return this.testData.devices.ios_devices;
    }

    /**
     * Get all users
     * @returns Object with all users
     */
    public getAllUsers(): { [key: string]: TestUser } {
        return this.testData.users;
    }

    /**
     * Get all locations
     * @returns Object with all locations
     */
    public getAllLocations(): { [key: string]: Location } {
        return this.testData.locations;
    }

    /**
     * Reload test data from file
     */
    public reloadTestData(): void {
        this.loadTestData();
    }

    /**
     * Generate random user data
     * @returns TestUser with random data
     */
    public generateRandomUser(): TestUser {
        const randomId = Math.floor(Math.random() * 10000);
        return {
            username: `testuser${randomId}@example.com`,
            password: `password${randomId}`,
            email: `testuser${randomId}@example.com`,
            firstName: `Test${randomId}`,
            lastName: `User${randomId}`
        };
    }

    /**
     * Generate random email
     * @returns Random email string
     */
    public generateRandomEmail(): string {
        const randomId = Math.floor(Math.random() * 10000);
        return `testuser${randomId}@example.com`;
    }

    /**
     * Generate random password
     * @returns Random password string
     */
    public generateRandomPassword(): string {
        const randomId = Math.floor(Math.random() * 10000);
        return `Password${randomId}!`;
    }
} 