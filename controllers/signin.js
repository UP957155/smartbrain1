const handleSignin = (req, res, bcrypt, letter, sql) => {
    if (!req.body.email || !req.body.password){
        return res.status(400).json('Empty')
    }
    letter.answer(sql`select email, hash from login where email = ${req.body.email};`)
    .then(user => {
        if (user.length){
    bcrypt.compare(req.body.password, user[0].hash, (err, result) => {
      if (result == true){
          letter.answer(sql`select * from users where user_email = ${user[0].email};`)
          .then(user => {
              res.json(user[0])
          })
      }else{
          res.status(400).json('Invalid email or password')
      }
    })
  }else{
      res.status(400).json('Invalid email or password')
  }
  })
  }

  module.exports = {
      handleSignin: handleSignin
  }