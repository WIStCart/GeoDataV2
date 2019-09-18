module ApplicationHelper
  def citation_dct_issued_s(dct_issued_s)
    date_string = ""

    if dct_issued_s.size == 4
      date_string = dct_issued_s
    elsif dct_issued_s.match?(/[-|:|\/]/)
      date_string = Chronic.parse(dct_issued_s).to_date.strftime('%b %d, %Y')
    else
      date_string = dct_issued_s
    end

    date_string
  end

  def citation_solr_year_i(solr_year_i)
    date_string = ""

    if solr_year_i.to_s.include?('9999')
      date_string = "[unknown date]"
    else
      date_string = solr_year_i.to_s
    end

    date_string
  end  
end
