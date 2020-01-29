const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Video = require('../models/video');
require('dotenv').config()

const router = express();

mongoose.connect(process.env.API_KEY, 
    {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Failed database connection');
    }
);

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({extended: false}));

// MY ADDITION  WAS NOT ORIGINALLY HERE
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

router.get('/videos', function(req, res) {
    console.log('Get request for all videos');
    Video.find({}).exec(function(err, videos) {
        if (err) {
            console.log('Error retreiving videos');
        }else{
            res.json(videos);
        }
    });
    // const videos = [
    //     { title: 'Title 1', url: 'poiupoiu', description: 'Title 1 content here...' },
    //     { title: 'Title 2', url: 'poiupoiu', description: 'Title 2 content here...' },
    //     { title: 'Title 3', url: 'poiupoiu', description: 'Title 3 content here...' }
    // ];
    // res.json(videos);
});

router.get('/videos/:id', function(req, res) {
    console.log('Get request single videos');
    Video.findById(req.params.id).exec(function(err, video) {
        if (err) {
            console.log('Error retreiving video');
        }else{
            res.json(video);
        }
    });
});

router.post('/video', function(req, res) {
    console.log('Post a video');
    const newVideo = new Video;
    //newVideo._id = null;
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo) {
        if (err) {
            console.log('Error: Failure to Post Video: ' + err);
        } else {
            //newVideo._id = res._id;
            console.log('inserVideo._id: ' + insertedVideo._id);
            res.json({postId: insertedVideo._id});
        }
    });
});

router.put('/video/:id', function(req, res) {
    console.log('Put Request running in api ==');
    console.log(req.params.id);
    console.log(req.body.title);
    // Video.findByIdAndUpdate({_id: req.params.id}, 
    //     {
    //         $set: {
    //             title: req.body.title,
    //             url: req.body.url,
    //             description: req.body.description
    //         }
    //     },
    //      {new: true}, function(err, updatedVideo) {
    //     if (err) {
    //         res.send('Error updating video' + err);
    //     } else {
    //         res.json(updatedVideo);
    //     }
    // });
    const video = new Video({
        _id: req.body._id,
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
    });
    
    Video.updateOne({_id: req.params.id}, video).then(

        function(err, updatedVideo) {
        // if (err) {
        //     res.json(err);
        // } else {
        //     res.json(updatedVideo);
        // }
    });

});

    // Video.findByIdAndUpdate(req.params.id,
    //     {
    //         $set: {
    //             title: req.body.title,
    //             url: req.body.url,
    //             description: req.body.description
    //         }
    //     }, {new: true}, function(err, updatedVideo) {
    //     if (err) {
    //         console.log('Failed Update');
    //     } else {
    //         res.json(updatedVideo);
    //     }
    // });

router.delete('/video/:id', function(req, res){
    console.log('Deleting Video: ' + req.params.id);
    // findByIdAndRemove
    Video.deleteOne({_id: req.params.id}).then(something => {
        // use to be a .catch() above
        // if (err) {
        //     console.log('Error to Delete');
        //     throw error;
        // } 
        //else {
        //     res.json(deletedVideo);
        // }
        //console.log(res);
        console.log('Deleting process ran ??');
        res.status(200).json({message: 'Post deleted'});
    });
});

module.exports = router;



// originall stuff below
// ###################################################
// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Video = require('../models/video');

// const db = "mongodb://useuse2Vid098:dapassVid634@ds139576.mlab.com:39576/videoplayer";
// mongoose.Promise = global.Promise;

// mongoose.connect(db, { 
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//     }, 
//     function(err) {
//     if (err) {
//         console.log('Error: ' + err);
//     }
// });

// // MY ADDITION  WAS NOT ORIGINALLY HERE
// router.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
//     next();
// });

// router.get('/videos', function(req, res) {
//     console.log('Get request for all videos');
//     Video.find({}).exec(function(err, videos) {
//         if (err) {
//             console.log('Error retreiving videos');
//         }else{
//             res.json(videos);
//         }
//     });
// });

// router.get('/videos/:id', function(req, res) {
//     console.log('Get request single videos');
//     Video.findById(req.params.id).exec(function(err, video) {
//         if (err) {
//             console.log('Error retreiving video');
//         }else{
//             res.json(video);
//         }
//     });
// });

// router.post('/video', function(req, res) {
//     console.log('Post a video');
//     const newVideo = new Video;
//     newVideo.title = req.body.title;
//     newVideo.url = req.body.url;
//     newVideo.description = req.body.description;
//     newVideo.save(function(err, insertedVideo) {
//         if (err) {
//             console.log('Error: Failure to Post Video: ' + err);
//         } else {
//             res.json(insertedVideo);
//         }
//     });
// });

// router.put('/video/:id', function(req, res) {
//     console.log('Updated Video');
//     Video.findByIdAndUpdate(req.params.id,
//         {
//             $set: {
//                 title: req.body.title,
//                 url: req.body.url,
//                 description: req.body.description
//             }
//         }, {new: true}, function(err, updatedVideo) {
//         if (err) {
//             console.log('Failed Update');
//         } else {
//             res.json(updatedVideo);
//         }
//     });
// });

// router.delete('/video/:id', function(req, res){
//     console.log('Deleting Video');
//     Video.findByIdAndRemove(req.params.id, function(err, deletedVideo){
//         if (err) {
//             console.log('Failed to Delete');
//         } else {
//             res.json(deletedVideo);
//         }
//     });
// });

// module.exports = router;