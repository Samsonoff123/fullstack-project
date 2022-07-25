import PostModel from '../modules/Post.js'
import CommentModel from '../modules/Comment.js'
import { postCreateValidation } from '../validations.js';

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить теги'
        })
    }
}


export const getAll = async (req, res) => {
    try {
        let posts
        if(req.query.tagName) {
            
             posts = await PostModel.find( { tags: { $in: [req.query.tagName] } } ).populate('user')
        } else {
             posts = await PostModel.find().populate('user')
             
            posts.sort(function(obj1, obj2) {
                return obj2.createdAt-obj1.createdAt;
            });
        }

        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getPopular = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        posts.sort(function(obj1, obj2) {
            return obj2.viewsCount-obj1.viewsCount;
          });

        res.json(posts)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

            PostModel.findOneAndUpdate({
                _id: postId,
            }, {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось вернуть статьи'
                    })
                }   

                if(!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    })
                }

                res.json(doc)
            }
        ).populate('user')

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findByIdAndDelete({
            _id: postId,
        },
        (err, doc)=>{
            if(err) {
                return res.status(500).json({
                    message: 'Не удалось удалить статьи'
                })
            }
            
            if(!doc) {
                return res.status(404).json({
                    message: 'Не удалось получить статьи'
                })
            }

            res.json({
                sucsess: true,
            })
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
}

export const commentCreate = async (req, res) => {
    try {
        const postId = req.params.id
        await PostModel.findOneAndUpdate({
            _id: postId,
        },
        {
            text: req.body.text,
            user: req.userId,
        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить комментарий'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        await PostModel.findOneAndUpdate({
            _id: postId,
        },
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}