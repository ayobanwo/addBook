class Book {
	constructor(title, author, isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}
class UI {
	addBookToList(book){
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

	showAlert(message, className){
		//Create div
		const div = document.createElement('div');
		// Add class
		div.className = `alert ${className}`;
		// Add message
		div.appendChild(document.createTextNode(message));
		//Get parent
		const container = document.querySelector('.container');
		//Get form
		const form = document.getElementById('book-form');
		//Insert div
		container.insertBefore(div, form);

		setTimeout(function(){
			document.querySelector('.alert').remove()
		} ,3000);
	}

	deleteBook(target){
		if(target.className == 'delete'){
			//Selecting the td by going 2 levels up from the 'a' tag then delete 'td'
			target.parentElement.parentElement.remove()

			const ui = new UI()
			ui.showAlert('Book Deleted', 'success');
		}

	}

	clearFields(){
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = ''; 
	}
}

//Local Storage class
class Store{
	static getBooks(){
		let books;
		if(localStorage.getItem('books') === null ){
			books = [];
		}
		else{
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}
	static displayBooks(){
		const books = Store.getBooks();

		books.forEach(function(book){
			const ui = new UI

			//Add book to UI
			ui.addBookToList(book);
		})
	}
	static addBook(book){
		const books = Store.getBooks();
 
		books.push(book);

		localStorage.setItem('books', JSON.stringify(books));
	}
	static deleteBook(isbn){
		const books = Store.getBooks();

		books.forEach(function(book, index){
			if(book.isbn === isbn){
				books.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
}
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
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

		if ( title == '' || author == '' || isbn == '') {
			//Error Alert
			ui.showAlert('Please fill in all fields', 'error')
		} 
		else {
			//Add book to list
			ui.addBookToList(book);

			// Add book to local storage
			Store.addBook(book)

			//Success alert
			ui.showAlert('Book Added', 'success')
			//Clear fields
			ui.clearFields()
		}

		e.preventDefault();
	}
)
//Event Listener to delete
document.querySelector('#book-list').addEventListener('click', 
	function(e){
		//Instantiate UI
		const ui = new UI()

		//Delete Book
		ui.deleteBook(e.target);

		//Delete from Ls
		Store.deleteBook(e.target.parentElement.previousElementSibling.textContent)
	}
)