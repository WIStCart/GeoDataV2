require "application_system_test_case"

class AdvancedSearchPageTest < ApplicationSystemTestCase
  def setup
    visit "/advanced"
  end

  def test_page_elements
    assert page.has_content?("Advanced Search")
    assert page.has_content?("Limit Results By")
    within("div.limit-criteria") do
      assert page.has_content?("Created By")
      assert page.has_content?("Held By")
      assert page.has_content?("Year")
    end

    assert_equal page.all('select#f1 option').map(&:value), %w(keyword title publisher)
  end

  def test_facet_counts
    assert_operator page.all('select#uw_creator_advanced_search_sm option', visible: false).size, :>, 10
  end
end
