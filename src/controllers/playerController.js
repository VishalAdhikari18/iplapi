const Player = require('../models/Player');

exports.getPlayers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const filter = {};
  
    if (req.query.team) {
      filter.team = req.query.team;
    }
    
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }
    
    let sort = {};
    
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith('-') 
        ? req.query.sort.substring(1) 
        : req.query.sort;
      
      const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
      
      if (['runs', 'salary'].includes(sortField)) {
        sort[sortField] = sortOrder;
      }
    }
    
    const total = await Player.countDocuments(filter);
    
    const players = await Player.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    res.json({
      page,
      limit,
      total,
      players: players.map(player => ({
        id: player.id,
        name: player.name,
        image: player.image,
        role: player.role,
        team: player.team
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json({ message: 'Player created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    Object.keys(req.body).forEach(key => {
      player[key] = req.body[key];
    });
    
    await player.save();
    res.json({ message: 'Player updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlayerDescription = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json({
      name: player.name,
      team: player.team,
      country: player.country,
      runs: player.runs,
      image: player.image,
      role: player.role,
      salary: player.salary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 