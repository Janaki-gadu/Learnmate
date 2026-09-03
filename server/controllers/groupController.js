const Group = require("../models/Group");


// CREATE GROUP
exports.createGroup = async (req, res) => {

  try {

    const group = new Group({

      name: req.body.name,

      description: req.body.description,

      category: req.body.category,

      createdBy: req.user.id,

      members: [req.user.id],

    });

    await group.save();

    res.json(group);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create group",
    });

  }

};


// GET ALL GROUPS
exports.getGroups = async (req, res) => {

  try {

    const groups = await Group.find()
      .populate("createdBy", "name email");

    res.json(groups);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch groups",
    });

  }

};


// JOIN GROUP
exports.joinGroup = async (req, res) => {

  try {

    const group = await Group.findById(req.params.id);

    if (!group) {

      return res.status(404).json({
        message: "Group not found",
      });

    }

    // Already joined
    if (
      group.members.includes(req.user.id)
    ) {

      return res.status(400).json({
        message: "Already joined group",
      });

    }

    group.members.push(req.user.id);

    await group.save();

    res.json(group);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to join group",
    });

  }

};