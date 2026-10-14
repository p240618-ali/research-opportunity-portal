const express = require('express');
const router = express.Router();
const controller = require('../controllers/opportunityController');
const { validateOpportunity } = require('../middleware/validate');

router.post('/', validateOpportunity, controller.createOpportunity);
router.get('/', controller.getAllOpportunities);
router.get('/:id', controller.getOpportunityById);
router.put('/:id', validateOpportunity, controller.updateOpportunity);
router.delete('/:id', controller.deleteOpportunity);

module.exports = router;
