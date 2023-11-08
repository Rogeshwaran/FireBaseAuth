const request = require('superagent')
const { db, files, permissions } = require('../utils/sequelize');
const fetchData = require('../utils/helper');

exports.verifyAndFetchFile = async (req, res, next) => {
    try {
        console.log(req.body);
        const permitted = await permissions.findOne({
            where: {
                owner: req.body.owner,
                user: req.body.user
            },
            attributes: ['id']
        })

        if (permitted === null) {
            return res.status(401).json({message: 'user doesn\'t have permission'});
        }

        const data = await files.findOne({
            where: {
                owner: req.body.owner,
                pin: req.body.pin
            },
            attributes: ['link']
        })
        
        if (data === null) {
            return res.status(401).json({message: 'invalid pin or link'});
        }

        res.set('attachment; filename=file');

        return request(data.link).pipe(res);

    } catch (err) {
        console.log(err);
    }
}
