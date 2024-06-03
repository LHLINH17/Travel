const User = require('../models/User');
const { mutipleMongooesToObject } = require('../../util/mongooes');
const Tour = require('../models/Tour');

class SiteController {
    // [GET] /
    index(req, res, next) {
        // User.find({}, function(err, users) {
        //     if(!err) res.json(users);
        //     res.status(400).json({error: 'Error!'});
        // });

        // User.find({})
        // .then(users => {
        //     // Nếu không có lỗi, trả về danh sách khóa học dưới dạng JSON
        //     res.json(users);
        // })
        // .catch(err => {
        //     // Nếu có lỗi, xử lý lỗi và trả về một trạng thái lỗi hoặc thông báo
        //     console.error(err);
        //     res.status(500).json({ error: 'Internal Server Error' });
        // });

        // User.find({})
        //     // .then(users => res.json(users))
        //     .then(users => {
        //         res.render('home', {
        //             users: mutipleMongooesToObject(users)
        //         });
        //     })
        //     .catch(next);

        Tour.find({})
            .then((tours) => {
                res.render('home', {
                    tours: mutipleMongooesToObject(tours),
                });
            })
            .catch(next);

        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

// module.exports = new SiteController();
//     // res.render('home');

//     // [GET] /search
//     search(req, res) {
//         res.render('search');
//     }
// }

module.exports = new SiteController();
