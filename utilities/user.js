var db = require('./pool')
var properties = require('./prop-reader')
var bcrypt = require('bcrypt')

var pool = db.getPool();

module.exports.getUserByUsername = (username) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('selUserByUsername'), [username], function(err,rows){
                if (err)
                    rej(err);
                if (rows.length) {
                    rej(error);
                }
                res(rows);
                con.release();
            }
        )})
    })
    
}


module.exports.registerUser = (name, username, email, password) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if(err) rej(err);
            con.query(properties.get('selUserByUsername'), [username], function(err,rows){
                if (err)
                    rej(err);
                 if (rows.length) {
                    rej(err);
                } else {
    
                    con.query(properties.get('addUser'), [name, username, email, bcrypt.hashSync(password, 10)], function(error,rows){
                    if (error) throw error;
                    con.release();
                    res(rows);
                    });	
                    }	
                }
            )
        })
    })
}

module.exports.registerAdmin = (name, username, email, password) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if(err) rej(err);
            con.query(properties.get('selUserByUsername'), [username], function(err,rows){
                if (err)
                    rej(err);
                 if (rows.length) {
                    rej(err);
                } else {
    
                    con.query(properties.get('addAdmin'), [name, username, email, bcrypt.hashSync(password, 10)], function(error,rows){
                    if (error) throw error;
                    con.release();
                    res(rows);
                    });	
                    }	
                }
            )
        })
    })
}