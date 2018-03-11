# Reliable Parts

## Load Data into Database

1. Install Node
    * `sudo apt-get install nodejs npm` (on Ubuntu)
    * `brew install node` (on MacOS)
2. Install sequelize-cli
    * `npm install -g sequelize-cli`
3. Enter credentials
    * Enter credentials in config/config.json
    * Change username and password for "development"
    * Change database name as see fit
    * Change dialect as see fit according to http://docs.sequelizejs.com/manual/installation/usage.html#dialects
4. Create database and run migrations
    * `sequelize db:create`
    * `sequelize db:migrate`
5. Load data
    * `node database.js`
