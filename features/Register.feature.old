Feature: Register
  In order to access the system with basic authentication
  As a user
  I want to register my user with login and password

  Scenario: Register new user with specific user id existing in the repository
    For the moment we give an error register a new login to an existing userId we need to confirm that the user is the same
    so we will need to authenticate the user with any other authentication mechanism
    Given the login "newUser" is not registered
    And there is a user with the user id "userId"
    When I register the user "userId" with the login "newUser" and the password "newPassword"
    Then the system must respond with an error saying "user-is-already-registered"
    Then the system must register the user "userId" with the login "newUser" and the password "hashedNewPassword"
    

  Scenario: Register new user with specific userid not existing in the repository
    Given the login "newUser" is not registered
    And there is a user with the user id "userId"
    When I register the user "userId" with the login "newUser" and the password "newPassword"
    Then the system must respond with an error saying "needed-a-user-id"
    Then the system must register the user "userId" with the login "newUser" and the password "hashedNewPassword"
    #In order to register a new login to an existing userId we need to confirm that the user is the same
    #so we will need to authenticate the user with any other authentication mechanism

  Scenario: Register new user with a new user id
    Given the login "newUser" is not registered
    When I register a new user with login "newUser" and the password "newPassword"
    Then the system must create a new user in the repository
    And the system must register the new user with the login "newUser" and the password "hashedNewPassword"

  Scenario: Register existing login
    Given the login "registeredLogin" is registered with the password "registeredPassword" and the id "registeredUserId"
    When I register the user "otherUserId" with the login "registeredLogin" and the password "newPassword"
    Then the system must respond with an error saying "duplicated-login"

  Scenario: Register existing user with different login
    Given the login "registeredLogin" is registered with the password "registeredPassword" and the id "registeredUserId"
    When I register the user "registeredUserId" with the login "registeredLogin" and the password "newPassword"
    Then the system must respond with an error saying "user-registered-with-a-different-login"

  Scenario: Register user existing on the system
  #To have this into account we should have the ability to merge users in the future
    
    #User authenticated means mapped to a user id from the user repository


