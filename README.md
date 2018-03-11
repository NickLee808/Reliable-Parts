# Reliable Parts

## Load Data into Database

1. Install Node
    * `sudo apt-get install nodejs npm` (on Ubuntu)
    * `brew install node`
2. Install sequelize-cli
    * `npm install -g sequelize-cli`
3. Run migrations and seeds
    * `sequelize db:create`
    * `sequelize db:migrate`
4. Load data
    * `node database.js`
