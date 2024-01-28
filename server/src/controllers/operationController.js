const Category = require("../models/categoryModel.js");
const Ticket = require("../models/ticketModal.js");
const User = require("../models/userModal.js");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists, please choose another name",
      });
    }

    const category = new Category({ name });
    const savedCategory = await category.save();

    res.json({
      success: true,
      message: "Category successfully created",
      category: savedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the category." });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the categories." });
  }
};

const createTicket = async (req, res) => {
  try {
    const { category, price, date, availability } = req.body;
    console.log(category, price, date, availability)

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category does not exist",
      });
    }

    const existingTicket = await Ticket.findOne({ category, date });

    if (existingTicket) {
      return res.status(400).json({
        success: false,
        message: "A ticket with this category and date already exists",
      });
    }
    const ticket = new Ticket({
      category,
      price,
      date,
      availability,
      occupancy: 0,
    });
    const savedTicket = await ticket.save();
    res.json({
      success: true,
      message: "Ticket successfully created",
      ticket: savedTicket,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the ticket." });
  }
};


const getTickets = async (req, res) => {
  try {
    let { date, categoryName } = req.query;
    let category;

    if (categoryName) {
      category = await Category.findOne({ name: categoryName });

      if (!category) {
        return res.status(400).json({ error: "Category not found." });
      }
    }

    const query = {};

    // Build the query based on provided parameters
    if (date) query.date = date;
    if (category) query.category = category._id;

    const tickets = await Ticket.find(query).populate("category");
    res.json({
      success: true,
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the tickets." });
  }
};



const purchaseTicket = async (req, res) => {
  try {
    const { ticketId } = req.body;
    const userId = req.userId; // Get the user ID from the request object

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    // Find the ticket
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(400).json({ error: "Ticket not found." });
    }

    // Decrease the ticket's availability
    ticket.occupancy++;

    if (ticket.occupancy > ticket.availability) {
      return res.status(400).json({ error: "Ticket is not available." });
    }

    // Save the updated ticket
    await ticket.save();

    // Add the ticket to the user's ticket history
    const populatedTicket = await Ticket.findById(ticketId).populate(
      "category"
    );

    // Add the ticket to the user's ticket history
    user.ticketHistoy.push(populatedTicket);
    await user.save();
    if (ticket.occupancy === ticket.availability) {
      ticket.status = "booked";
      await ticket.save();
    }
    res.json({
      success: true,
      message: "Ticket purchased successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while purchasing the ticket." });
  }
};

const getTotalCounts = async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    const totalTickets = await Ticket.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      counts: {
        totalCategories,
        totalTickets,
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "An error occurred while fetching the counts." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({role : "user"});
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "An error occurred while fetching users." });
  }
};

const getUserTicketHistory = async (req, res) => {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId).populate('ticketHistoy'); 
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({
      success: true,
      ticketHistory: user.ticketHistoy,
      user:{
        name : user.name,
        email : user.email,
        phone : user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "An error occurred while fetching the user's ticket history." });
  }
};

const toggleUserActivation = async (req, res) => {
  try {
    const { userId } = req.query; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    user.is_deactivated = !user.is_deactivated;
    await user.save();

    res.json({
      success: true,
      message: "User activation status updated successfully.",
      user: {
        id: user._id,
        is_deactivated: !user.is_deactivated
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred while updating the user status." });
  }
};

const getTicketsforUsers = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      status: 'available',
      $expr: { $ne: ['$occupancy', '$availability'] },
    }).populate('category');

    res.json({
      success: true,
      message: 'Available tickets fetched successfully',
      tickets,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the tickets.' });
  }
};


module.exports = {
  createCategory,
  getCategories,
  createTicket,
  getTickets,
  purchaseTicket,
  getTotalCounts,
  getAllUsers,
  getUserTicketHistory,
  toggleUserActivation,
  getTicketsforUsers
};
