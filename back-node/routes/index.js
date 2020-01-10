const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/',  async (req, res, next) =>{
  try {


    res.status(200).send('안녕 하세요12');
  } catch (error) {
    console.error(error);
    
  }
});

module.exports = router;