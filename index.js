const express = require("express")
const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Implementing a route that serves a static HTML file

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

// Define empty Array For Books
let books = []

// Implementing a route that returns a JSON array of books

app.get("/books",(req,res)=>{
    res.json(books)
})

// Implementing a route that allows a user to add a book, while a POST request is made

app.post("/books",(req,res)=>{
    const {title,author,publishedDate} = req.body

    const id = uniqueId()
    
    books.push({id,title,author,publishedDate})

    res.json({id,title,author,publishedDate})
})

// Delete a specific book from Books array When DELETE request is made

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const index = books.findIndex(book => book.id === id);
  
    if (index === -1) {
      return res.status(404).json({ message: 'Book is not Available.' });
    }
  
    books.splice(index, 1);
    res.json({ message: 'Delete Success.' });
  });

// Unique Id for books 
function uniqueId(){
    return "_" + Math.random().toString(36).substr(2, 9)
  
}

// Running The Server

app.listen(8000,()=>{
    console.log("Server running successfully")
})