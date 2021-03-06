var db = require('./pool');
var properties = require('./prop-reader');
var shortid = require('shortid');

var pool = db.getPool();

module.exports.insertForm = (title, menuId, description) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) rej(err);
            let formId = shortid.generate();
            con.query(properties.get('insertForm'), [formId, title, description, menuId], function(error,rows){
                if (error)
                    rej(error);
                res(formId)
                con.release()
            }
        )})
    })
}

module.exports.getForm = (id) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('getForm'), [id], function(err,rows){
                if (err)
                    rej(err);
                res(rows[0])
                con.release()
            }
        )})
    })
}

module.exports.getAllForms = () => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('getAllForms'), function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.getFormByMenu = (menuId) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('getFormByMenu'), [menuId], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.updateForm = (id) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('updateForm'), [id], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.deleteForm = (id) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('deleteForm'), [id], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}
