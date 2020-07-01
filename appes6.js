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
		}
	}

	clearFields(){
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = ''; 
	}
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

		if ( title == '' || author == '' || isbn == '') {
			//Error Alert
			ui.showAlert('Please fill in all fields', 'error')
		} 
		else {
			//Add book to list
			ui.addBookToList(book);

			//Success alert
			ui.showAlert('Book Added', 'success')
			//Clear fields
			ui.clearFields()
		}

		e.preventDefault();
	})

//Event Listener to delete
document.querySelector('#book-list').addEventListener('click', 
	function(e){
		//Instantiate UI
		const ui = new UI()

		//Delete Book
		ui.deleteBook(e.target);

		//Success alert
		ui.showAlert('Book Deleted', 'success')

})