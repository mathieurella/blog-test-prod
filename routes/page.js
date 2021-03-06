const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/', (req, res) => {
	const data = req.context // {cdn:<STRING>, global:<OBJECT>}

	const postsCtr = new controllers.post()
	postsCtr.get()
	.then(posts => {
		data['posts'] = posts
		res.render('home', data) // render home.mustache
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/posts', (req, res) => {
	const data = req.context

	const postsCtr = new controllers.post()
	postsCtr.get(req.query)
	.then(posts => {
		data['posts'] = posts
		res.render('home2', data) // render home.mustache
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/post/:slug', (req, res) => {
	const data = req.context

	const ctr = new controllers.post()
	ctr.get({slug:req.params.slug})
	.then(posts => {
		if (posts.length == 0){
			throw new Error('Post '+req.params.slug+' not found.')
			return
		}

    data['post'] = posts[0]
    res.render('post', data)
  })
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/about', (req, res) => {
	const data = req.context
	res.render('about', data)
})

module.exports = router
