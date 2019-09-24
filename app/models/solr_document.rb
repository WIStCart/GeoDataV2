# frozen_string_literal: true
class SolrDocument
  include Blacklight::Solr::Document
 include Geoblacklight::SolrDocument

  # self.unique_key = 'id'
  self.unique_key = 'layer_slug_s'

  # Email uses the semantic field mappings below to generate the body of an email.
  SolrDocument.use_extension(Blacklight::Document::Email)

  # SMS uses the semantic field mappings below to generate the body of an SMS email.
  SolrDocument.use_extension(Blacklight::Document::Sms)

  # DublinCore uses the semantic field mappings below to assemble an OAI-compliant Dublin Core document
  # Semantic mappings of solr stored fields. Fields may be multi or
  # single valued. See Blacklight::Document::SemanticFields#field_semantics
  # and Blacklight::Document::SemanticFields#to_semantic_values
  # Recommendation: Use field names from Dublin Core
  use_extension(Blacklight::Document::DublinCore)

  # URI Analysis
  def uris
    uris = Array.new

    begin
      self.references.refs.each do |ref|
        uri = SolrDocumentUri.where(
          document_id: id,
          document_type: self.class.to_s,
          uri_key: ref.reference[0],
          uri_value: ref.reference[1]
        ).first_or_create do |sc|
          sc.version = self._source["_version_"]
        end

        uris << uri
      end
    rescue Exception => e
      Rails.logger.error { "Exception found - #{e.inspect}" }
    end

    return uris
  end
end
