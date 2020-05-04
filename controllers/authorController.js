const mongoose = require("mongoose");

// import author model
const Author = mongoose.model("author");

    
// function to handle a request to get all authors
const getAllAuthors = async (req, res) => {
  authors = []  
  try {
    const all_authors = await Author.find();
    
    res.send(all_authors);

  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};
    
  
  

// function to modify author by ID
const updateAuthor = async (req, res) => {
  const authorId = req.params.id;
  const new_author = req.body;
  

  try {
    const authors = await Author.find({id: authorId});
    if (!authors) {
      res.status(400);
      console.log("Author not found");
      return res.send("Author not found");
    }
    
    const author = authors[0];
    console.log("Author found!!!", author);
    
    author["id"] = new_author["id"]
    author["first_name"] = new_author["first_name"];
    author["last_name"] = new_author["last_name"];
    
    
    await author.save();
    res.render('index', {
        title: 'Library App'
    });
  } catch (err) {
    res.status(400);
    console.log(err);
    return res.send("Database query failed");
  }
};

// function to add author
const addAuthor = async (req, res) => {
 res.send("Working on this feature");
};

// function to get author by id
const getAuthorByID = async (req, res) => {
  const authorId = req.params.id;
  
  try {
    const authors = await Author.find({id: authorId});
    if (!authors) {
      res.status(400);
      console.log("Author not found");
      return res.send("Author not found");
    }
    
    const author = authors[0];
    console.log("Author found!!!", author);
    
    
    res.render('authorupdateform', {
        title: 'Update Author',
        id: author.id,
        first_name: author.first_name,
        last_name: author.last_name
    });
  } catch (err) {
    res.status(400);
    console.log(err);
    return res.send("Database query failed");
  }
};

// remember to export the functions
module.exports = {
  getAllAuthors,
  getAuthorByID,
  addAuthor,
  updateAuthor
};
