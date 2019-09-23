class AdminMailer < ApplicationMailer
  def uri_analysis(report_file_path)
    @report = report_file_path
    mail(to: 'ewlarson@gmail.com', subject: 'GeoData - URI Analysis Report')
  end
end
