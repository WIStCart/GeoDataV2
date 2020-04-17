# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever

# Use this file to easily define all of your cron jobs.
# Learn more: http://github.com/javan/whenever

# Cleans up recent anonymous search records
every :day, at: '2:30am', roles: [:app] do
  rake 'blacklight:delete_old_searches[7]'
end

# URI analysis
# At 01:00 on day-of-month 1 and 14.
every '0 1 1,14 * *', roles: [:app] do
  rake 'geodata:uri_purge'
end

# At 02:00 on day-of-month 1 and 14.
every '0 2 1,14 * *', roles: [:app] do
  rake 'geodata:uri_process_all'
end

# At 01:00 on day-of-month 2 and 15.
every '0 1 2,15 * *', roles: [:app] do
  rake 'geodata:uri_queue_incomplete_states'
end

# At 08:00 on day-of-month 2 and 15.
every '0 8 2,15 * *', roles: [:app] do
  rake 'geodata:uri_report'
end

# Harvest thumbnail images for search results
every :day, at: '12:05am', roles: [:app] do
  rake 'gblsci:images:harvest_retry'
end
