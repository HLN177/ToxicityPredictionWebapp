var express = require('express');
var router = express.Router();
var shell = require('shelljs');
const multer = require('multer');
var fs = require("fs");
var crypto = require('crypto');
// import MySQL model 
var mysql = require('mysql');
var dbConfig = require('../config/db');
var moment = require('moment');
const { resolve } = require('path');


//Registration
var pool = mysql.createPool(dbConfig.mysql);
router.post('/register', function(req, res, next) {
    //req.body handle post request

    var username = req.body.username,
        password = req.body.password,
        passwordRepeat = req.body.passwordRepeat;

    if (password != passwordRepeat) {
        console.log('passwords not consistent!');
        return res.send("111");
    }

    //Prevent overflow errors
    if (username.length>30 || password.length>30){
        console.log('username or password too long')
        return res.send("222");
    }

    //Encrypt the password by md5
    var md5 = crypto.createHash('md5'),
        md5password = md5.update(password).digest('hex');

    var promise = new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query('SELECT * FROM users WHERE username = ?', [username],
                    function(err, rows, fields) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                        connection.release();
                    });
            }
        });
    });
    promise.then(function(rows1) {
        console.log('search of user executed successfully.');
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
            } else {
                if (rows1.length > 0) {
                    // console.log('rows' + rows1);
                    console.log('username already existed');
                    return res.send('333');
                    // return res.json({
                    //     data:'222'
                    // })
                } else {
                    connection.query('INSERT INTO users(username,password) VALUES(?,?)', [username, md5password],
                        function(err, rows2, fields) {
                            if (err) {
                                console.log(err);
                            } else {
                                // req.flash('success', "register successfully！");
                                delete password;
                                req.session.username = username;
                                return res.send('444')
                            }
                            connection.release();
                        });
                }

            }
        });
    }, function(err) {
        console.log(err);
    });
});

//Login
router.post('/login',(req, res, next)=>{
    var username = req.body.username,
        password = req.body.password;

    //Prevent overflow errors
    if (username.length>30 || password.length>30){
            console.log('username or password too long')
            return res.send("overflow");
    }

    var md5 = crypto.createHash('md5'),
        md5password = md5.update(password).digest('hex');
    
    new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }else{
                connection.query('SELECT * FROM users WHERE username = ? AND password=?',[username, md5password],
                function(error,results,fields){
                    if(error){
                        reject(error);
                    }else{
                        resolve(results);
                    }
                    connection.release();
                })
            }
        })
    }).then((val)=>{
        if(val.length > 0){
            req.session.username = username;
            req.session.userId = val[0].userId;
            // delete password;
            // console.log('session name is: ' + req.session.username);
            // console.log('session userID is: ' + req.session.userId);
            console.log(req.session.username+' login');
            return res.send('success');
        }else{
            console.log("username or password incorrect");
            return res.send('fail')
        }
        // console.log(res[0].userId);
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/showdb',(req, res, next)=>{
    var buffer = req.session.userId;
    new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }else{
                connection.query('SELECT * FROM usersLog WHERE userId = ?',[buffer],
                function(error,results,fields){
                    if(error){
                        reject(error);
                    }else{
                        resolve(results);
                    }
                    connection.release();
                })
            }
        })
    }).then((val)=>{
        // console.log(typeof(val))
        res.send(val);
        // console.log(val);
    }).catch((err)=>{
        console.log(err);
    })
})

//Logout
router.get('/logout', (req, res, next)=>{
        console.log(req.session.username+" logout")
        req.session.destroy(function(err) {
            // cannot access session here
            if(err){
                res.json({ret_code: 2, ret_msg: 'logout fail'});
                return;
            }else{
                res.send("ok");
            }
          });
          
    })

/** use multer to accept post requires and create its path and name */
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/images/')  // path
    },
    filename: function (req, file, cb){
        console.log(file.originalname)
        cb(null, 'test.png')// name
    }
})

var upload = multer({ storage: storage})

/** use shelljs to execute conmand line function */
router.post('/upload', upload.single('image'), function (req,res,next){
    shell.exec('./imago_console ./public/images/test.png'); //call imago_console
    shell.cp('molecule.mol', './', './public/molfile/');// copy document
    shell.rm('molecule.mol', './');// delete document
    shell.exec('python mol2smile.py -i ./public/molfile/molecule.mol');//call mol2smile.py
    shell.exec('python smile2png.py'); //call smile2png
    res.send('http://localhost:3000/newpng.png');
})


/** save SMILE into database and send the SMILE to front-end*/
router.get('/download', function (req, res, next) {
    var data = fs.readFileSync('./public/result.txt');
    console.log(data.toString());
    pool.getConnection((err,connection)=>{
        if(err){
            reject(err);
        }else{ 
            var varId = req.session.userId;
            var now = moment();
            console.log(varId);
            connection.query('INSERT INTO usersLog(userId,loginfo,time) VALUES(?,?,?)',[varId,data.toString(),now.format('YYYY-MM-DD HH:mm:ss')]);
            console.log("save in databse");
            resolve();
        }
        connection.release();
    })
    res.send(data.toString());
  })

  /** call the python file to construct machine learning prediction*/
router.post('/prediction',(req,res,next)=>{
    var smile = req.body.smile
    smile = '\'' + smile + '\''
    cmma1= 'python kmeans_use.py ' + smile
    // cmma2= 'python knn_use.py ' + smile + ' 9'
    shell.exec(`python knn_use.py ${smile} 9`)
    shell.exec(cmma1)
    var buffer1 = fs.readFileSync('./knnResult.txt')
    knnRes = buffer1.toString().split('\n')
    // res.send(data1)
    var buffer2 = fs.readFileSync('./kmeansResult.txt')
    kmeansRes = buffer2.toString().split('\n')
    data = [
        {
            name: 'K-NN',
            result: knnRes[0],
            runtime: knnRes[1],
        },
        {
            name: 'K-Means',
            result: kmeansRes[0],
            runtime: kmeansRes[1],
        }
    ]
    res.send(data)
})

// pool.end(function (err) {
//   // all connections in the pool have ended
//   console.log(err);
// })
module.exports = router;