
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
- find the connect button && click it. here a dialogue will popup
- select "Connect with the mongo shell"
- select the "I have the mongo shell installed" option
mongo "mongodb+srv://cluster0-utxza.mongodb.net/test" --username states-api-user
- find the connection string under step 2

# Upload Data to remote instance
Here, I'll upload the census data objects to the db
- find the "Clusters" sidebat item && select it 
- find the button with the "..." and select it. a dropdown should appear.
- find the "Command Line Tools" and select that option
- find the "Data Import and Export Tools" portion of the page
find the ```mongoimport``` block && the suggested cli string
```
mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-utxza.mongodb.net:27017,cluster0-shard-00-01-utxza.mongodb.net:27017,cluster0-shard-00-02-utxza.mongodb.net:27017 --ssl --username states-api-user --password <PASSWORD> --authenticationDatabase admin --db <DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>
```
- replace the vars with my own content...
```
mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-utxza.mongodb.net:27017,cluster0-shard-00-01-utxza.mongodb.net:27017,cluster0-shard-00-02-utxza.mongodb.net:27017 --ssl --username states-api-user --password <PASSWORD> --authenticationDatabase admin --db censusData --collection states --type json --file states.json
```