GeoblacklightHelper.module_eval do
  ##
  # Renders a reference url for a document
  # @param [Hash] document, field_name
  def render_references_url(args)
    link_to(
      args[:document].references.url.endpoint,
      args[:document].references.url.endpoint,
      target: "_blank"
    ) if args[:document]&.references&.url
  end
end
