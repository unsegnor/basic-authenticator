Feature: Register
  In order to access the system with basic authentication
  As a user
  I want to register my user with login and password

  Scenario: Register new user
    Given the login "newUser" is not registered
    When Admin registers a new user with login "newUser" and the password "newPassword"
    Then the system must register a user with login "newUser", password "newPassword" and id "newUser"

  Scenario: Register new user with existing login
    Given the login "registeredLogin" is registered with the password "registeredPassword" and the id "registeredUserId"
    When Admin registers a new user with login "registeredLogin" and the password "newPassword"
    Then Admin must receive an error saying "duplicated-login"
    And the system must not register a user with login "registeredLogin", password "newPassword" and id "registeredLogin"

  Scenario: Not admin user are not able to register
    When Victor registers a new user with login "victor" and the password "victorPassword"
    Then Victor must receive an error saying "unauthorized"
    And the system must not register a user with login "victor", password "victorPassword" and id "victor"