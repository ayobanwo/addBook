// Book Constructor
function Book(title, author, isbn){
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

//UI Constructor
function UI () {}

// Add Book to List
UI.prototype.addBookToList = function(book){
	const list = document.getElementById('book-list');
	// Create tr elenent
	const row = document.createElement('tr');
	//Create columns
	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td> <a class='delete'> X </a> </td>
	`
	//Add row to the list
	list.appendChild(row);
}
//Event Listeners
document.getElementById('book-form').addEventListener('submit', 
	function(e){
		//Get Form values
		const title = document.getElementById('title').value,
				  author = document.getElementById('author').value,
				  isbn = document.getElementById('isbn').value;
		//Imstantite book
		const book = new Book(title, author, isbn);

		//Instantiate UI
		const ui = new UI()

		//Add book to list
		ui.addBookToList(book)

		e.preventDefault();
	})