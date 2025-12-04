const express = require('express');
const router = express.Router();
const controller = require('../controllers/enterprise.controller');

router.get('/search', controller.searchEnterprise);
router.get('/:id', controller.getEnterpriseById);
router.put('/:id', controller.updateEnterprise);


router.post('/', controller.createEnterprise);
router.delete('/:id', controller.deleteEnterprise);

module.exports = router;
