const handleRegister = (req, res, bcrypt, letter, sql, saltRounds) => {
    const {name, email, password } = req.body;
    if (!name || !email || !password){
        return res.status(400).json('Empty')
    }
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            letter.answer(sql`INSERT INTO users
            (user_name, user_email, joined) VALUES
             (${name}, ${email}, ${new Date()});`)
             .then(() => {
                letter.answer(sql`select * from users where user_email = ${email};`)
                .then(data => res.json(data));
             });
             letter.answer(sql`INSERT INTO login (hash, email) VALUES 
             (${hash}, ${email});`);
        });
    });   
}

module.exports = {
    handleRegister: handleRegister
}