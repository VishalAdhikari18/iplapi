const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const { validatePlayer, validatePlayerUpdate } = require('../middlewares/validation');


router.get('/', playerController.getPlayers);

router.post('/', validatePlayer, playerController.createPlayer);

router.patch('/:id', validatePlayerUpdate, playerController.updatePlayer);

router.delete('/:id', playerController.deletePlayer);

router.get('/:id/description', playerController.getPlayerDescription);

module.exports = router; 