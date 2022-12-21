const express = require('express');
const router = express.Router()
const {getAlldata,newData} =require('./../controllers/userController')

router.get('/',getAlldata);
router.post('/',newData);

module.exports = router;
