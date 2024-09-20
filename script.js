function validateForm() {
    var name = document.getElementById('name').value;
    if (!/^[a-zA-Z_ ]+$/.test(name)) {
        alert('Name must contain only letters, spaces, and underscores.');
        return false;
    }
    var rollNo = document.getElementById('roll_no').value;
    if (rollNo.length !== 12 || !/^\d{12}$/.test(rollNo)) {
        alert('Roll No must be exactly 12 digits.');
        return false;
    }
    var bookName = document.getElementById('book_name').value;
    if (!/^[a-zA-Z_ ]+$/.test(bookName)) {
        alert('Book Name must contain only letters, spaces, and underscores.');
        return false;
    }
    return true;
}
