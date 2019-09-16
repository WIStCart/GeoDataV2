require "application_system_test_case"

class SearchResultsTest < ApplicationSystemTestCase
  def setup
    visit '/?q=water'
  end

  def test_search
    assert page.has_content?("Search Results")
  end

  def test_facets
    within("div#facets") do
      assert page.has_content?("Collection")
      assert page.has_content?("Created By")
      assert page.has_content?("Held By")
      assert page.has_content?("Time Period")
      assert page.has_content?("Year")
      assert page.has_content?("Subject")
      assert page.has_content?("Publisher")
      assert page.has_content?("Data type")
      assert page.has_content?("Format")
    end
  end

  def test_empty_search
    visit '/?utf8=✓&q=&search_field=all_fields'
    assert page.assert_selector('article.document', :count => 20)
  end
end
