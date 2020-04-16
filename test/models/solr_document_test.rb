require 'test_helper'

class SolrDocumentTest < ActiveSupport::TestCase
  def setup
    cat = Blacklight::SearchService.new(
      config: CatalogController.blacklight_config
    )
    _resp, @document = cat.fetch("WIDNR_ba31a86f566241bf9d127597271ac71c_8")
  end

  test 'supports sidecar method' do
    assert @document.respond_to? :sidecar
  end

  test 'supports uris method' do
    assert @document.respond_to? :uris
  end
end
