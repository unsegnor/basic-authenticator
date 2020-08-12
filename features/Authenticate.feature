Feature: Authenticate
  In order to access to my personal data
  As a user
  I want to authenticate myself

  Scenario: Not existing login
    Given the login "notRegisteredUser" is not registered
    When I authenticate the user "notRegisteredUser" with the password "anyPassword"
    Then the system must respond with an error saying "not-registered-user"

  Scenario: existing login and correct password
    Given the login "registeredLogin" is registered with the password "registeredPassword" and the id "registeredUserId"
    When I authenticate the user "registeredLogin" with the password "registeredPassword"
    Then the system must respond with the user id "registeredUserId"
    And the user must no receive any error

  Scenario: existing login and incorrect password
    Given the login "registeredLogin" is registered with the password "registeredPassword" and the id "registeredUserId"
    When I authenticate the user "registeredLogin" with the password "otherPassword"
    Then the system must respond with an error saying "incorrect-password"


    #User authenticated means mapped to a user id from the user repository


