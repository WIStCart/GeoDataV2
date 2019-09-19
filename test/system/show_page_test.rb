require "application_system_test_case"

class ShowPageTest < ApplicationSystemTestCase
  def setup
  end

  def teardown
  end

  def test_uw_esri_link_show
    visit "/catalog/405A9341-737D-4E8B-8791-9D1574CA971F"
    assert page.has_content?("Elementary School Districts, Wisconsin 2018")

    # Type
    assert page.has_link?("Web services")
    click_link 'Web services'

    # WMS Web Service
    assert page.has_no_content?("Web Mapping Service (WMS)")
    assert page.has_no_selector?("#wms_webservice")

    # Esri Web Service
    assert page.has_no_content?("ArcGIS Dynamic Map Layer")
    assert page.has_no_selector?("#dynamic_map_layer_webservice")

    # ArcGIS Feature Layer
    assert page.has_content?("ArcGIS Feature Layer")
    assert page.has_selector?("#feature_layer_webservice")

    # Type
    click_button 'Close'

    # ISO Metadata
    assert page.has_link?("Metadata")

    # IIIF Image
    assert page.has_selector?("div[data-protocol='FeatureLayer']")

    # Downloads
    assert page.has_content?("Downloads")
    assert page.has_link?("Download Shapefile")
  end
end
