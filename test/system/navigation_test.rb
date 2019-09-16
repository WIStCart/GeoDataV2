require "application_system_test_case"

class NavigationTest < ApplicationSystemTestCase
  def setup
    visit("/")
  end

  def test_header_nav
    within("nav") do

      # Bad Link - Should Fail
      assert page.has_no_link?("Google")

      # Footer Link - Should Fail
      assert page.has_no_link?("Robinson Map Library")

      # Good Links - Should Pass
      assert page.has_link?("Search History")
      assert page.has_link?("About")
      assert page.has_link?("Help")
    end
  end

  def test_footer_nav
    within("footer") do
      # Bad Link - Should Fail
      assert page.has_no_link?("Google")

      # Header Link - Should Fail
      assert page.has_no_link?("Search History")

      # Good Links - Should Pass
      # GeoData@WI
      assert page.has_link?("About")
      assert page.has_link?("Help")
      assert page.has_link?("Contribute")
      assert page.has_link?("Credits")

      # Partners
      assert page.has_link?("Robinson Map Library")
      assert page.has_link?("State Cartographer's Office")
      assert page.has_link?("UW Digital Collections Center")
      assert page.has_link?("Wisconsin Land Info Program")
      assert page.has_link?("Wisconsin LTSB GIS Services")
      assert page.has_link?("Wisconsin Sea Grant Institute")
      assert page.has_link?("WisconsinView")

      # Contact Us
      assert page.has_content?("geodata@sco.wisc.edu")
      assert page.has_content?("608-262-3065")
    end
  end
end
