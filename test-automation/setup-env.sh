#!/bin/bash

# Setup script for environment variables
echo "Setting up environment variables for BC Wallet Mobile Automation Framework"
echo ""

# Check if .env file already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Do you want to overwrite it? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "Overwriting existing .env file..."
    else
        echo "Setup cancelled. Existing .env file preserved."
        exit 0
    fi
fi

# Create .env file
echo "Creating .env file..."

cat > .env << EOF
# Sauce Labs Configuration
SAUCE_USERNAME=bcgov-jenkins
SAUCE_ACCESS_KEY=ae07b827-c05c-4371-a704-3f7b2750e483
SAUCE_TUNNEL_ID=your_tunnel_id

# App Configuration
APP_PACKAGE=ca.bc.gov.BCWallet
APP_ACTIVITY=ca.bc.gov.BCWallet.MainActivity
BUNDLE_ID=ca.bc.gov.BCWallet

# Test Configuration
PLATFORM=android
ENV=saucelabs
TIMEOUT=60000
EOF

echo "✅ .env file created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Review and update the .env file with your specific credentials"
echo "2. Update SAUCE_TUNNEL_ID if you're using Sauce Connect"
echo "3. Place your app files in the apps/ directory"
echo "4. Run: npm run test:android:saucelabs"
echo ""
echo "🔧 To customize for your environment:"
echo "- Update SAUCE_USERNAME and SAUCE_ACCESS_KEY with your Sauce Labs credentials"
echo "- Set PLATFORM to 'ios' for iOS testing"
echo "- Set ENV to 'local' for local testing" 