import fs from 'fs';
import YAML from 'yamljs';
import path from 'path';

const yamlConfig = YAML.load('./configs/config.yml');
const platform = process.env.PLATFORM || 'android';
const environment = process.env.ENV || 'saucelabs';

// Function to substitute environment variables in YAML config
function substituteEnvVars(obj: any): any {
    if (typeof obj === 'string') {
        return obj.replace(/\$\{([^}]+)\}/g, (match, key) => {
            return process.env[key] || match;
        });
    }
    if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            return obj.map(item => substituteEnvVars(item));
        } else {
            const result: any = {};
            for (const [key, value] of Object.entries(obj)) {
                result[key] = substituteEnvVars(value);
            }
            return result;
        }
    }
    return obj;
}

// Substitute environment variables in the config
const processedConfig = substituteEnvVars(yamlConfig);

// Resolve app paths for local environment
const platformConfig = processedConfig.platforms[platform][environment];
if (environment === 'local' && platformConfig['appium:app']) {
    platformConfig['appium:app'] = path.resolve(process.cwd(), platformConfig['appium:app']);
}

// Sauce Labs configuration based on platform
const sauceConfig = processedConfig.saucelabs[platform];

export const config = {
    hostname: environment === 'saucelabs' ? sauceConfig.hostname : '127.0.0.1',
    port: environment === 'saucelabs' ? sauceConfig.port : 4723,
    protocol: environment === 'saucelabs' ? sauceConfig.protocol : 'http',
    path: environment === 'saucelabs' ? sauceConfig.path : '/',
    runner: 'local',
    specs: ['./tests/features/*.feature'],
    maxInstances: 1,
    capabilities: [platformConfig],
    logLevel: 'info',
    reporters: ['spec', 'allure'],
    reporterOptions: {
        allure: {
            outputDir: './allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        },
    },
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./tests/step-definitions/*.ts'],
        timeout: 60000,
        requireModule: ['ts-node/register'],
        format: ['pretty'],
        formatOptions: {
            snippetInterface: 'async-await'
        },
        publishQuiet: true,
        strict: false,
    },
    // Sauce Labs specific options
    user: environment === 'saucelabs' ? sauceConfig.username : undefined,
    key: environment === 'saucelabs' ? sauceConfig.accessKey : undefined,
    region: environment === 'saucelabs' ? sauceConfig.region : undefined,
    headless: processedConfig.saucelabs.headless,
    services: environment === 'saucelabs' ? [
        ['sauce', {
            sauceConnect: false
        }]
    ] : [],
}; 