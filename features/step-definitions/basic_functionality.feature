As a fan of "The Witcher" game series, I want to discover which locations in Europe inspired the author of the Witcher book saga
So I can know more about my beloved saga and impress my friends


Scenario: User views main page
    Given I am on the home page
    Then I can see a map of Europe with no markers on it
         And I can see a welcome message encouraging me to explore the map
         And I can see a filter which says 'Characters' and 'Places'
         And I can see an empty list of places under the filter

Scenario: User clicks on filter
    Given I can see a filter which says 'Characters' and 'Places'
    When I select 'Characters'
        And I select 'Places'
    Then I can see a list of characters under the filter
        And I can see a list of places under the filter
        And I can see a group of markers on the map
        And I can see a group of markers in a different colour on the map

Scenario: User clicks on a character marker to learn more
    Given I can see a group of 'character' markers on the map
    When I click on any given marker from that group
    Then I can see a popup next to the marker
        And the popup contains a Wikipedia image of the character
        And the popup contains the first sentence of a Wikipedia article about the character
        And the popup contains link to Wikipedia article the actual character
        And the popup contains a short explanatory note from the author of this app
        And the marker is placed in a real world location corresponding to the character
