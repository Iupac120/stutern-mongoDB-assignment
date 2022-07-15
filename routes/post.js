const express = require('express')
const router = express.Router()
const postController = require('../controller/post')

router.get('/',postController.getAllJobs)
router.post('/',postController.createJob)

router.get('/:id',postController.getJob)
router.patch('/:id',postController.updateJob)
router.delete('/:id',postController.deleteJob)


module.exports = router