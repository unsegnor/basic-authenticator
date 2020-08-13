Feature: Register
  In order to access the system with basic authentication
  As a user
  I want to register my user with login and password

  Scenario: Register new user
    Given the login "newUser" is not registered
    When Admin registers a new user with login "newUser" and the password "newPassword"
    Then the system must create a new user in the repository
    And the system must register the new user with the login "newUser" and the password "hashedNewPassword"

  Scenario: Register new user with existing login
    Given the login "registeredLogin" is registered with the password "registeredPassword" and the id "registeredUserId"
    When I register a new user with login "registeredLogin" and the password "newPassword"
    Then the system must respond with an error saying "duplicated-login"
    And the system must not register the new user with the login "newUser" and the password "hashedNewPassword"

  Scenario: Register existing login
    Given the login "registeredLogin" is registered with the password "registeredPassword" and the id "registeredUserId"
    When I register the user "otherUserId" with the login "registeredLogin" and the password "newPassword"
    Then the system must respond with an error saying "duplicated-login"

  Scenario: Register existing user with different login
    Given the login "registeredLogin" is registered with the password "registeredPassword" and the id "registeredUserId"
    When I register the user "registeredUserId" with the login "registeredLogin" and the password "newPassword"
    Then the system must respond with an error saying "user-registered-with-a-different-login"
