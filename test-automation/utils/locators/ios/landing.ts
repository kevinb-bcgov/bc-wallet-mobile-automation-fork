export const landing = {
    // Landing page title and confirmation text
    landing_page_title: '//XCUIElementTypeStaticText[@label="I have confirmed that this app is for me."]',
    confirmation_checkbox: '//XCUIElementTypeOther[@name="com.ariesbifold:id/IAgree"]',
    
    // Button locators
    continue_button: '//XCUIElementTypeButton[@label="Continue"]',
    accept_button: '//XCUIElementTypeButton[@label="Accept"]',
    get_started_button: '//XCUIElementTypeButton[@label="Get Started"]',
    create_pin_button: '//XCUIElementTypeButton[@label="Create PIN"]',
    
    // Input field locators
    pin_input: '//XCUIElementTypeTextField[@name="com.ariesbifold:id/EnterPIN"]',
    pin_confirm_input: '//XCUIElementTypeTextField[@name="com.ariesbifold:id/ReenterPIN"]',
    pin_confirm_label: '//XCUIElementTypeStaticText[@label="Re-enter PIN"]',
    
    // Text locators
    personal_credential_text: '//XCUIElementTypeStaticText[@label="Get your Person credential"]',
    
    // Icon locators
    close_icon: '//XCUIElementTypeButton[@name="com.ariesbifold:id/Dismiss"]',
    
    // Link locators - try multiple approaches
    next_link: '//XCUIElementTypeStaticText[@label="Next"]',
    next_link_alt: '//XCUIElementTypeButton[@label="Next"]',
    next_link_alt2: '//XCUIElementTypeStaticText[@name="Next"]',
    next_link_alt3: '//XCUIElementTypeButton[@name="Next"]',
    next_link_alt4: '//XCUIElementTypeStaticText[@value="Next"]',
    next_link_alt5: '//XCUIElementTypeButton[@value="Next"]',
    next_link_alt6: '//XCUIElementTypeStaticText[contains(@label, "Next")]',
    next_link_alt7: '//XCUIElementTypeButton[contains(@label, "Next")]',
    next_link_alt8: '//XCUIElementTypeStaticText[contains(@name, "Next")]',
    next_link_alt9: '//XCUIElementTypeButton[contains(@name, "Next")]',
    
    // Dynamic text-based locators (for text-based interactions)
    landing_text: '//XCUIElementTypeStaticText[@label="I have confirmed that this app is for me."]'
}; 