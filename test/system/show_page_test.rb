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

  def test_uw_barron_county
    visit "/catalog/91EB253C-89CF-4217-9E58-F5A65F1F1506"
    assert page.has_content?("Roads Barron County, WI 2007")

    # Metadata
    assert page.has_link?("Metadata")
    click_link 'Metadata'

    assert page.has_content?("ISO 19139")
  end

  def test_uw_dataset_notice_show
    visit "/catalog/405A9341-737D-4E8B-8791-9D1574CA971F"
    assert page.has_selector?("div.dataset-notice")

    visit "/catalog/90f14ff4-1359-4beb-b931-5cb41d20ab90"
    assert page.has_no_selector?("div.dataset-notice")
  end
end
