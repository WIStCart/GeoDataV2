Rails.application.configure do
 # Settings specified here will take precedence over those in config/application.rb.

  # Google Analytics - Test and Dev
  config.google_analytics = 'UA-129066-16'

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join('tmp', 'caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on the local file system (see config/storage.yml for options)
  config.active_storage.service = :local

  # Actionmailer
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.perform_caching = false
  config.action_mailer.perform_deliveries = true

   #SMTP mail settings
   config.action_mailer.default_options = {from: 'geodata@sco.wisc.edu'}
   config.action_mailer.delivery_method = :smtp
   config.action_mailer.smtp_settings = {
      address:              'smtp.office365.com',
      port:                 587,
      domain:               'wisc.edu',
      user_name:            'geodata_sco@wisc.edu',
      password:             Rails.application.secrets.smtp_password,
      authentication:       'login',
      enable_starttls_auto: true }

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # To enable production values, uncomment here
  # Compress JavaScripts and CSS.
  # config.assets.compress = true
  # config.assets.js_compressor = :uglifier
  # config.assets.css_compressor = :sass
  # config.assets.debug = false

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Background Jobs
  config.active_job.queue_adapter = :sidekiq

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  #config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  # uncomment the following to test 404 and 500 error pages in development
  #config.consider_all_requests_local = false
end
