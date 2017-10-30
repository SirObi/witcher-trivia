As a fan of "The Witcher" game series, I want to discover which locations in Europe inspired the author of the Witcher book saga
So I can know more about my beloved saga and impress my friends


Scenario: User views main page
    Given I am on the home page
    Then I can see a map of Europe with markers on it
         And I can see a welcome message encouraging me to explore the map
         And I can see a filter which says 'Characters' and 'Places'
         And I can see an empty list of places under the filter

Scenario: User clicks on filter
    Given I can see a filter which says 'Show Characters' and 'Show Locations'
    When I select 'Show Characters'
        And I select 'Show Locations'
    Then I can see a list of characters under the filter
        And I can see a list of places under the filter
        And I can see a group of markers on the map
        And I can see a group of markers in a different colour on the map

Scenario: User clicks on a character marker to learn more
    Given I can see a group of 'character' markers on the map
    When I click on any given marker from that group
    Then I can see a popup next to the marker
        And the popup contains a Wikipedia image of the character
        And the popup contains a short explanatory note from the author of this app
        And I can see a link to a Wikipedia article the actual character
        And the marker is placed in a real world location corresponding to the character
