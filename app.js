//BOOK CLASS: RESPESENT A BOOK
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}




//UI CLASS:HANDLE UI TASK
class UI {
    static displayBook() {
        const books = Store.getBook();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
       const list = document.querySelector('#book-list');

       const row = document.createElement('tr');
       row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#0" class="btn btn_danger btn-sm delete">X</a></td>
       `;

       list.appendChild(row)
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    
    static showAlert(message,classname){
        const div = document.createElement('div');
        div.className=`alert alert-${classname}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        // make vanish in 3 seconds

        setTimeout(() => {
            const alert = document.querySelector('.alert');
            if(alert) alert.remove();
        },3000)
    }
    static clearField(){
        document.querySelector('#title').value='';
         document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';

        }
}

//STORE CLASS:HANDLE STORAGE
class Store{
   static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books=[]
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook(isbn){
        const books= Store.getBook();
        books.forEach((book,index) => {
            if(book.isbn === isbn){
                    books.splice(index,1);

            }
        })

        localStorage.setItem('books',JSON.stringify(books));
    }
}
//EVENT:DISPLAY BOOK
document.addEventListener('DOMContentLoaded',UI.displayBook)

//EVENT:ADD A BOOK
document.querySelector('#book-form').addEventListener('submit',(e) =>{
    //prevetn actual submit
    e.preventDefault();
    //GEt form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate 
    if(title=='' || author=='' || isbn==''){
       UI.showAlert('please fill in all the fields','danger')
    }
    else{
        //insatntiate book
    const book = new Book(title,author,isbn);
    
    //add book to ui

    UI.addBookToList(book);

    //add book to store
    Store.addBook(book)

        //success message
        UI.showAlert('book added','success')
    //clear fields
    UI.clearField()
    }

    
    
})

//EVENT:REMOVE A BOOK
document.querySelector('#book-list').addEventListener('click',(e) =>{
    if(e.target.classList.contains('delete')) {
        //Remove book from ui
        UI.deleteBook(e.target);
        //remove book from store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        //success message
        UI.showAlert('book deleted','success');
    }
}); 