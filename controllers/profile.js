const handleProfile = (req, res, letter, sql) => {
    let { id } = req.params;
    letter.answer(sql`select * from users where user_id = ${id};`)
    .then(data => {
        if (data.length){
        res.json(data[0]);
        } else {
            res.status(404).json('Not Found')
        }})
    .catch(err => {
        res.status(400).res.json('Not Found')
    })
}

module.exports = {
    handleProfile: handleProfile
}