require "application_system_test_case"

class HomepageTest < ApplicationSystemTestCase
  def setup
    visit("/")
  end

  def test_homepage_dom
    assert page.has_content?("GeoData@Wisconsin")
    assert page.has_selector?("nav.uw-navbar")
    assert page.has_selector?("div#main-container")

    within("div#main-container") do
      assert page.has_content?("Browse All")
      assert page.has_content?("Statewide Layers")
      assert page.has_content?("Coastal Layers")
      assert page.has_content?("Aerial Imagery")
    end

    assert page.has_selector?("div#wrapper-map")
    assert page.has_selector?("footer")
  end

  def test_search
    within("div.navbar-search") do
      fill_in("q", with: 'water')
      click_button 'Search'
    end

    assert page.has_content?("Search Results")
  end
end
