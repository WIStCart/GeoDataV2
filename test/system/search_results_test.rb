require "application_system_test_case"

class SearchResultsTest < ApplicationSystemTestCase
  def setup
  end

  def test_search_dom
    visit '/?q=water'
    assert page.has_content?("GeoData@Wisconsin")
    assert page.has_selector?("nav.uw-navbar")
    assert page.has_selector?("div#search-results")
    assert page.has_selector?("div#main-container")
    within("div#main-container") do
      assert page.has_selector?("div#appliedParams")
      assert page.has_selector?("section#content")
      assert page.has_selector?("div#sortAndPerPage")
      assert page.has_selector?("div.page-links")
      assert page.has_selector?("div.search-widgets")
      assert page.has_selector?("div.view-type")
      assert page.has_selector?("div#sort-dropdown")
      assert page.has_selector?("div#per_page-dropdown")
      assert page.has_selector?("section#sidebar")
    end
    assert page.has_selector?("footer")
  end

  def test_search
    visit '/?q=water'
    assert page.has_content?("Search Results")
  end

  def test_facets
    visit '/?q=water'
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

  def test_split_view_results
    visit '?q=&search_field=all_fields&utf8=%E2%9C%93&view=split'
    assert page.has_selector?("div#documents.split-view")
    assert page.has_no_selector?("div#map")
  end

  def test_map_view_results
    visit '?q=&search_field=all_fields&utf8=%E2%9C%93&view=mapview'
    assert page.has_selector?("div#documents.map-view")
    assert page.has_selector?("div#map")
  end

  def test_sort_options
    visit '/?q=water'
    click_button("Sort by Relevance")
    within("#sort-dropdown") do
      assert page.has_content?("Relevance")
      assert page.has_content?("Year (Newest first)")
      assert page.has_content?("Year (Oldest first)")
      assert page.has_content?("Title (A-Z)")
      assert page.has_content?("Title (Z-A)")
    end
  end
end
