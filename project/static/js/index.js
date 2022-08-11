function departmentAllow (event) {
    var level = document.getElementById("Level").value;
    if (level != "level 3") {
        alert("Departments allowed for level three only!");
        e.preventDefault();
    }
    else {
        alert("Enrolled!");
    }
}

function deleteStudent(event) {
    var user_confirm = confirm("Are you sure you want to delete this student?");
    if (user_confirm == true) {
        alert("Your Account deleted!");
    }
    else {
        event.preventDefault();
        alert("Your account is not deleted");
    }
}

