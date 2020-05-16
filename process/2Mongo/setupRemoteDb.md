# Setting Up A Project && A Cluster
- sign up with Mongo Atlas
- create a project in mongo gui
  - here, called it censusData
- create a cluster in the project
  - here, the gui is simple
  - called it Cluster0

# Setting Up a DB User
Here, the db user will be used by the app to connect from the app to the db.  
- find the sidebar on the left of the gui
- find the security header
- find the "Database Access" item, and select that
- the gui should show a Tab view, highlighting a "Database Users" tab
- create a user
  - states-api-user
  - **********

# Whitelist IPs
- in prep for Heroku connection, all ips will be whitelisted
- find sidebar
- find security header
- find "Network Access" option && select it
- GUI should show a tab view with "IP Whitelist" selected
- Add IP
- **ALL** for now

# Connect to remote atlas instance from local machine
Here, we're going to connect!
- find sidebar
- find "Data Storage" header
- find "Clusters" item && Click it
- find the sandbox pill, with Cluster0 named inside the outline


