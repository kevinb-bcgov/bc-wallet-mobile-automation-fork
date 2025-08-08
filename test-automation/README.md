# BCGOV-WebdriverIO Test Automation Framework

A WebdriverIO-based test automation framework for mobile app testing with platform-specific locators.

## Platform-Specific Locators Strategy

This framework implements a platform-aware locators strategy that automatically loads the appropriate locators based on the current platform (Android or iOS).

### Directory Structure

```
utils/locators/
├── android/
│   └── landing.ts          # Android-specific locators
└── ios/
    └── landing.ts          # iOS-specific locators
```

### How It Works

1. **Platform Detection**: The framework detects the current platform using the `PLATFORM` environment variable (defaults to 'android')

2. **Dynamic Loading**: The `ObjectRepository` class automatically loads locators from the platform-specific directory:
   - Android: `utils/locators/android/`
   - iOS: `utils/locators/ios/`

3. **Locator Format**: Each platform uses its native locator format:
   - **Android**: XPath with Android-specific elements (`android.widget.*`)
   - **iOS**: XPath with iOS-specific elements (`XCUIElementType*`)

### Example Locator Differences

#### Android (landing.ts)
```typescript
export const landing = {
    landing_page_title: '//android.widget.TextView[@text="I have confirmed that this app is for me."]',
    continue_button: '//android.widget.Button[@text="Continue"]',
    pin_input: '//android.widget.TextView[@resource-id="com.ariesbifold:id/EnterPIN"]'
};
```

#### iOS (landing.ts)
```typescript
export const landing = {
    landing_page_title: '//XCUIElementTypeStaticText[@name="I have confirmed that this app is for me."]',
    continue_button: '//XCUIElementTypeButton[@name="Continue"]',
    pin_input: '//XCUIElementTypeTextField[@name="com.ariesbifold:id/EnterPIN"]'
};
```

### Usage in Page Objects

Page objects use the `ObjectRepository` to get platform-specific locators:

```typescript
export class LandingPage {
    private objectRepository: ObjectRepository;

    constructor() {
        this.objectRepository = ObjectRepository.getInstance();
    }

    async waitForLandingPage(): Promise<void> {
        const landingTitle = await this.objectRepository.getLocatorString('landing', 'landing_page_title');
        await this.genericMethods.waitForElementDisplayed(landingTitle);
    }
}
```

### Benefits

1. **Platform Independence**: Same test code works for both Android and iOS
2. **Maintainability**: Platform-specific locators are clearly separated
3. **Scalability**: Easy to add new platforms or pages
4. **Type Safety**: TypeScript provides compile-time validation
5. **Dynamic Loading**: Locators are loaded only when needed

### Adding New Pages

1. Create platform-specific locator files:
   - `utils/locators/android/newpage.ts`
   - `utils/locators/ios/newpage.ts`

2. Export the locators object with the same name as the file:
   ```typescript
   export const newpage = {
       element_name: '//platform-specific/xpath'
   };
   ```

3. Use in page objects:
   ```typescript
   const locator = await this.objectRepository.getLocatorString('newpage', 'element_name');
   ```

### Environment Configuration

Set the platform using the `PLATFORM` environment variable:
```bash
# For Android
PLATFORM=android npm test

# For iOS
PLATFORM=ios npm test
```

## Features

- **Cross-platform Support**: Android and iOS testing
- **Sauce Labs Integration**: Cloud-based device testing
- **Page Object Model**: Organized locator management
- **Cucumber BDD**: Behavior-driven development
- **Allure Reporting**: Detailed test reports
- **TypeScript**: Type-safe automation code
- **Enhanced Mobile Methods**: Advanced mobile gestures and device interactions

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Appium (for local testing)
- Sauce Labs account (for cloud testing)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mobile-automation-framework-saucelabs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your Sauce Labs credentials
```

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Sauce Labs Configuration
SAUCE_USERNAME=your_sauce_username
SAUCE_ACCESS_KEY=your_sauce_access_key

# App Configuration
APP_PACKAGE=io.softwarewerkstatt.meinwerkzeugkoffer
APP_ACTIVITY=io.softwarewerkstatt.meinwerkzeugkoffer.MainActivity

# Test Configuration
PLATFORM=android
ENV=saucelabs
TIMEOUT=60000
```

### Sauce Labs Setup

1. Create a Sauce Labs account at [saucelabs.com](https://saucelabs.com)
2. Get your username and access key from your account settings
3. Upload your app to Sauce Labs storage:
   ```bash
   # For Android
   curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
     -X POST \
     -H "Content-Type: application/octet-stream" \
     --data-binary @apps/BCWallet-2487.apk \
     https://api.us-west-1.saucelabs.com/rest/v1/storage/upload
   
   # For iOS
   curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
     -X POST \
     -H "Content-Type: application/octet-stream" \
     --data-binary @apps/bcwallet-2487.ipa \
     https://api.eu-central-1.saucelabs.com/rest/v1/storage/upload
   ```

## Running Tests

### Sauce Labs (Cloud Testing)

```bash
# Run Android tests on Sauce Labs
npm run test:android:saucelabs

# Run iOS tests on Sauce Labs
npm run test:ios:saucelabs
```

### Local Testing

```bash
# Run Android tests locally
npm run test:android:local

# Run iOS tests locally
npm run test:ios:local
```

### Allure Reports

```bash
# Generate Allure report
npm run allure:generate

# Serve Allure report
npm run allure:serve
```

## Project Structure

```
├── configs/
│   └── config.yml              # Configuration for platforms and environments
├── tests/
│   ├── features/               # Cucumber feature files
│   │   └── login.feature
│   └── step-definitions/       # Step definitions
│       └── login.steps.ts
├── utils/
│   ├── locators/              # YAML locator files
│   │   ├── login.yml
│   │   └── dashboard.yml
│   ├── genericMethods.ts      # Basic automation methods
│   ├── EnhancedGenericMethods.ts  # Advanced mobile methods
│   └── ObjectRepository.ts    # Locator management
├── apps/                      # App files (APK/IPA)
├── allure-results/            # Allure results
├── allure-report/             # Allure reports
├── screenshots/               # Test screenshots
├── wdio.conf.ts              # Sauce Labs configuration
├── wdio.local.conf.ts        # Local configuration
└── package.json
```

## Framework Components

### 1. Object Repository

The `ObjectRepository` class manages locators from YAML files:

```typescript
import { ObjectRepository } from './utils/ObjectRepository';

const objectRepository = ObjectRepository.getInstance();
const locator = objectRepository.getLocatorString('login', 'username_field');
```

### 2. Enhanced Generic Methods

Advanced mobile automation methods:

```typescript
import { EnhancedGenericMethods } from './utils/EnhancedGenericMethods';

const methods = new EnhancedGenericMethods();

// Swipe gestures
await methods.swipeUp();
await methods.swipeDown();
await methods.swipeLeft();
await methods.swipeRight();

// Device interactions
await methods.hideKeyboard();
await methods.setOrientation('LANDSCAPE');
await methods.setDeviceLocation(37.7749, -122.4194);
```

### 3. Locator Management

Create YAML files in `utils/locators/` for each page:

```yaml
# utils/locators/login.yml
username_field:
  accessibilityId: "username_field"
  xpath: "//android.widget.EditText[@resource-id='username']"
  iosPredicate: "type == 'XCUIElementTypeTextField' AND accessibilityIdentifier == 'username_field'"
```

### 4. Step Definitions

Write step definitions using Cucumber:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';

When('I enter my username {string}', async function(username: string) {
    const usernameField = objectRepository.getLocatorString('login', 'username_field');
    await genericMethods.setValue(usernameField, username);
});
```

## Sauce Labs Features

### Device Selection

The framework supports various Sauce Labs devices:

- **Android**: Samsung Galaxy S24, Google Pixel 8, etc.
- **iOS**: iPhone 16 Pro, iPhone 15, etc.

### Sauce Labs Options

Configure Sauce Labs-specific options in `configs/config.yml`:

```yaml
# Android Configuration
sauce:options:
  username: "${SAUCE_USERNAME}"
  accessKey: "${SAUCE_ACCESS_KEY}"
  build: "Android Build ${new Date().toISOString()}"
  name: "Android Mobile App Test"
  appiumVersion: "stable"
  deviceOrientation: "portrait"

# iOS Configuration
sauce:options:
  username: "${SAUCE_USERNAME}"
  accessKey: "${SAUCE_ACCESS_KEY}"
  build: "iOS Build ${new Date().toISOString()}"
  name: "iOS Mobile App Test"
  appiumVersion: "2.0.0"
  deviceOrientation: "portrait"
  tunnelIdentifier: "${SAUCE_TUNNEL_ID}"
```

**Note**: The framework now uses environment variables for Sauce Labs credentials. Set your credentials in the `.env` file:

### Parallel Testing

To run tests in parallel, modify `maxInstances` in the configuration:

```typescript
export const config = {
    maxInstances: 5, // Run 5 tests in parallel
    // ... other config
};
```

## Best Practices

### 1. Locator Strategy

- Use accessibility IDs when possible
- Provide platform-specific locators
- Keep locators in YAML files for maintainability

### 2. Test Organization

- Group related scenarios with tags
- Use Background steps for common setup
- Keep step definitions focused and reusable

### 3. Error Handling

- Add proper waits and timeouts
- Handle platform-specific behaviors
- Use try-catch blocks for critical operations

### 4. Reporting

- Use Allure for detailed reporting
- Add screenshots for failed tests
- Include device information in reports

## Troubleshooting

### Common Issues

1. **Sauce Labs Connection**: Verify credentials and network
2. **App Upload**: Ensure app is uploaded to Sauce Labs storage
3. **Device Availability**: Check device availability in your region
4. **Timeout Issues**: Increase timeout values for slow devices

### Debug Mode

Run tests with debug logging:

```bash
LOG_LEVEL=debug npm run test:android:saucelabs
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit a pull request

## License

This project is licensed under the MIT License. 