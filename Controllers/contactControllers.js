const asyncHandler = require("express-async-handler"); //this module handle all the exception without use try catch
const contacts = require("../models/contacts");
// @Get all contacts
// @Routes get api/contacts
//access public
const getContacts = asyncHandler(async (req, res) => {
  const allcontact = await contacts.find().count();
  res.status(200).json(allcontact);
});
// @Get a contact by id
// @Routes get api/contacts/id
//access public
const getContact = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const contact = await contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Conatact is not found.");
  }
  res.status(200).json(contact);
});

// @Post all contacts
// @Routes get api/contacts
//access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, MobileNo, Profession } = req.body;
  if (!name || !email || !MobileNo || !Profession) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const addContact = await contacts.create(req.body);
  res.status(201).json(addContact);
});
// @Put all contacts
// @Routes get api/contacts/id
//access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Conatact is not found.");
  }
  // const upadateContact= await contacts.findByIdAndUpdate(req.params.id,req.body,{new:true})
  const upadateContact= await contacts.updateOne ({ _id: req.params.id },{ $set: req.body })
  res.status(200).json(upadateContact);
});

// @Delete a contacts
// @Routes get api/contacts/id
//access public
const deleteContact = asyncHandler(async (req, res) =>{
const deleteData= await contacts.deleteOne({ _id: req.params.id })
  res.status(200).json(deleteData)
}
);

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
