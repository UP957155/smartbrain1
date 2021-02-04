const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '03152a8bd2c145979c4d7acacde1c9a7'
   });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data));
}

module.exports = {
    handleApiCall: handleApiCall
}