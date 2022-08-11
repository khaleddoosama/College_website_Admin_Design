for (var i = 0; i < document.querySelectorAll("a").length; i++) {
    
    document.querySelectorAll("a")[i].onclick = function (event) {
        if (event.target.id === "Human" || event.target.id === "Higher" ||event.target.id === "Laboratory") {
            alert("oops!!\n" + this.innerHTML + " not found!");
            event.preventDefault();
        }
    }
}

function aa(event) {
    var user_confirm = confirm("Are you sure you want to delete this student?");
    if (user_confirm == true) {
        alert("Your Account deleted!");
    }
    else {
        event.preventDefault();
        alert("Your account is not deleted");
    }
}