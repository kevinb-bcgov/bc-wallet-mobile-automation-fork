export const landing = {
    // Landing page title and confirmation text
    landing_page_title: '//android.widget.TextView[@text="I have confirmed that this app is for me."]',
    confirmation_checkbox: '//android.widget.CheckBox[@content-desc="I Agree"]',
    
    // Button locators
    continue_button: '//android.widget.Button[@content-desc="Continue"]',
    accept_button: '//android.widget.Button[@content-desc="Accept"]',
    get_started_button: '//android.widget.Button[@content-desc="Get Started"]',
    create_pin_button: '//android.widget.Button[@content-desc="Create PIN"]',
    
    // Input field locators
    pin_input: '//android.widget.TextView[@resource-id="com.ariesbifold:id/EnterPIN"]',
    pin_confirm_input: '//android.widget.TextView[@resource-id="com.ariesbifold:id/ReenterPIN"]',
    pin_confirm_label: '//android.widget.TextView[@text="Re-enter PIN"]',
    
    // Text locators
    personal_credential_text: '//android.widget.TextView[@text="Get your Person credential"]',
    
    // Icon locators
    close_icon: '//android.widget.Button[@content-desc="Dismiss"]',
    
    // Link locators - try multiple approaches
    next_link: '//android.widget.TextView[@content-desc="Next"]',
    next_link_alt: '//android.widget.Button[@content-desc="Next"]',
    next_link_alt2: '//android.widget.TextView[@content-desc="Next"]',
    next_link_alt3: '//android.widget.Button[@content-desc="Next"]',
    next_link_alt4: '//android.widget.TextView[@content-desc="Next"]',
    next_link_alt5: '//android.widget.Button[@content-desc="Next"]',
    next_link_alt6: '//android.widget.TextView[@content-desc="Next"]',
    next_link_alt7: '//android.widget.Button[@content-desc="Next"]',
    next_link_alt8: '//android.widget.TextView[@content-desc="Next"]',
    next_link_alt9: '//android.widget.Button[@content-desc="Next"]',
    
    // Dynamic text-based locators (for text-based interactions)
    landing_text: '//android.widget.TextView[@content-desc="I have confirmed that this app is for me."]'
}; 