require "application_system_test_case"

class ShowPageTest < ApplicationSystemTestCase
  def setup
  end

  def teardown
  end

  def test_web_services_as_links
    visit "/catalog/purdue-urn-f082acb1-b01e-4a08-9126-fd62a23fd9aa/web_services"
    assert page.has_content?("Web services")

    # WMS Web Service
    assert page.has_content?("Web Mapping Service (WMS)")
    assert page.has_selector?("a#wms_webservice")

    # Esri Web Service
    assert page.has_content?("ArcGIS Dynamic Map Layer")
    assert page.has_selector?("a#dynamic_map_layer_webservice")
  end
end
