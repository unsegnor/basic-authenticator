Feature: Authenticate
  In order to access to my personal data
  As a user
  I want to authenticate myself

  Scenario: Not existing login
    Given the login "victor" is not registered
    When Victor authenticates with login "victor" and password "victorPassword"
    Then Victor must receive an error saying "not-registered-user"

  Scenario: existing login and correct password
    Given the login "victor" is registered with the password "victorPassword" and the id "victorId"
    When Victor authenticates with login "victor" and password "victorPassword"
    Then Victor must receive the user id "victorId"
    And Victor must not receive any error

  Scenario: existing login and incorrect password
    Given the login "victor" is registered with the password "victorPassword" and the id "victorId"
    When Victor authenticates with login "victor" and password "wrongPassword"
    Then Victor must receive an error saying "incorrect-password"


    #User authenticated means mapped to a user id from the user repository


