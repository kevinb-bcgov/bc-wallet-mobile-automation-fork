@login-flow
Feature: Login Functionality

  Background:
    Given App is launched
    And Landing page is displayed

  @login-flow
  Scenario: Successfully lands on the Dashboard
    When I click on the "I have confirmed that this app is for me." checkbox
    And I click on the "Continue" button
    And I click on the "Next" link button
    And I click on the "Next" link button
    And I click on the "Get Started" button
    And I click on the "Accept" button
    And I click on the "Continue" button
    And I re-enter pin code "123456"
    And I enter pin code "123456"
    And I click on the "Create PIN" button
    And I click on the "Continue" button
    And I click on the "Continue" button
    And I click on close icon on the popup
    Then Verify that "Get your Person credential" is displayed on Dashboard page