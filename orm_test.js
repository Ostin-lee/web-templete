
const Sequelize = require('sequelize');


function getsequelize (){

    return new Sequelize('hmmpi', 'root', 'lee2391', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}
/*
const sequelize = new Sequelize('hmmpi', 'root', 'lee2391', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
*/

const User = sequelize.define('user', {
    // attributes
    firstName: {
    type: Sequelize.STRING,
    allowNull: false
    },
    lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
    }
});

module.exports = {
    sequelize : sequelize , User : User
}

/*
Sequelize.STRING                      // VARCHAR(255)
Sequelize.STRING(1234)                // VARCHAR(1234)
Sequelize.STRING.BINARY               // VARCHAR BINARY
Sequelize.TEXT                        // TEXT
Sequelize.TEXT('tiny')                // TINYTEXT
Sequelize.CITEXT                      // CITEXT      PostgreSQL and SQLite only.
Sequelize.INTEGER                     // INTEGER
Sequelize.BIGINT                      // BIGINT
Sequelize.BIGINT(11)                  // BIGINT(11)
Sequelize.FLOAT                       // FLOAT
Sequelize.FLOAT(11)                   // FLOAT(11)
Sequelize.FLOAT(11, 10)               // FLOAT(11,10)
*/

/*
User.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
        firstName: 'John2',
        lastName: 'Hancock'
    });
});
*/
/*
// Find all users
User.findAll({
    where: {
        firstName: 'John'
      }
}).then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
    
});
*/
/*

// Create a new user
User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
});


// Delete everyone named "Jane"
User.destroy({
    where: {
        firstName: "Jane"
    }
    }).then(() => {
    console.log("Done");
});


// Change everyone without a last name to "Doe"
User.update({ lastName: "Doe" }, {
    where: {
        lastName: null
    }
    }).then(() => {
    console.log("Done");
});


sequelize.query("UPDATE users SET y = 42 WHERE x = 12").then(([results, metadata]) => {
// Results will be an empty array and metadata will contain the number of affected rows.
});
*/

