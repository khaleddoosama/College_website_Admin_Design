//Global
let navbar = document.querySelectorAll(".navbar li a");
let duration = 1500;
let inputs = document.querySelectorAll(".input");
let selectes = document.querySelectorAll("select");
let regexPhone = /^[0][1]\d{9}$/;
let Confirm = document.querySelector(".confirm");
let confirmBody = document.querySelector(".confirm-body");

//Edit Page and Register Page
let editId= document.querySelector("#id");
let phone = document.querySelector("#phone");
let editSubmit = document.querySelector("#submit");
let Delete = document.querySelector("#del");

let deleteConfirm = document.querySelector(".deleteConfirm");
let deleteConfirmContent = document.querySelector(".deleteConfirm-content");
let deleteConfirmBody = document.querySelector(".deleteConfirm-body");
let deleteButtonConfirm = document.querySelector("#delete");
let cancelButton = document.querySelector("#cancel");

//Search Page And Status Page
let searchTable = document.querySelector("table");
let tableData = document.querySelector("#data");

//Department Page
let departmentId = document.querySelector("#id");
let departmentSubmit = document.querySelector("#departmentSubmit");

//Global
//change navigation bar color on change of page. 
for (var i = 0; i < navbar.length; i++) {
    navbar[i].classList.remove("active");
    if (window.location.pathname.split("/")[1] == navbar[i].pathname.split("/")[1]) {
        navbar[i].classList.add("active");
    }
}

//toggle menu
document.querySelector(".navbar .navbar-toggler").addEventListener("click", function (e) {
    document.querySelector(".navbar ul").classList.toggle("open");
    document.querySelector(".navbar .navbar-toggler").classList.toggle("border");
    if(document.querySelector(".container-Form"))
        document.querySelector(".container-Form").classList.toggle("marginTop");
});

//put * before label if the input is required
for (var i = 0; i < inputs.length; i++) {
    try {
        if (inputs[i]) {
            if (inputs[i].required) {
                inputs[i].previousElementSibling.innerHTML = "<span class='text-danger' style='position: absolute;top: 50%;transform: translateY(-50%);left: -8px;'>*</span>" + inputs[i].previousElementSibling.innerHTML;
            }
            else {
            }
        }
        if (selectes[i]) {
            if (selectes[i].required) {
                selectes[i].parentElement.parentElement.querySelector("label").innerHTML = "<span class='text-danger'style='position: absolute;top: 50%;transform: translateY(-50%);left: -8px;'>*</span>" + selectes[i].parentElement.parentElement.querySelector("label").innerHTML;
            }
        }
    }
    catch (e) {
    }
}
//hide any confirm when click outside of it
window.addEventListener("click", function (e) { 
    if (e.target == deleteConfirm)
        HideDeleteConfirmContent();
    else if (e.target == Confirm)
        HideConfirmContent();
});

//show delete confirm
function ShowDeleteConfirmContent() {  
    deleteConfirm.style.visibility = "visible";
    deleteConfirmContent.style.opacity = '1';
    deleteConfirmContent.style.top = "50%";
}
//hide delete confirm
function HideDeleteConfirmContent() { 
    deleteConfirm.style.visibility = "hidden";
    deleteConfirmContent.style.opacity = "0";
    deleteConfirmContent.style.top = "20%";
}
//show confirm
function ShowConfirmContent() { 
    Confirm.style.visibility = "visible";
    confirmBody.style.opacity = '1';
    confirmBody.style.top = "50%";
}
//hide confirm
function HideConfirmContent() {     
    Confirm.style.visibility = "hidden";
    confirmBody.style.opacity = "0";
    confirmBody.style.top = "20%";
}

//check if all inputs are filled
function requiredInputs(event) { 
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "" && inputs[i].hasAttribute("required")) {
            inputs[i].style.borderColor = "red";
            inputs[i].style.caretColor = "red";
            inputs[i].focus();
            inputs[i].addEventListener("keyup", function () {
                inputs[i].style.borderColor = "";
                inputs[i].style.caretColor = "";
            });
            event.preventDefault();
            return;
        }
    }
    return true;
}
//check if all selects are filled
function requiredSelects(event) { 

    for (var i = 0; i < selectes.length; i++) {
        if (selectes[i].value == "" && selectes[i].hasAttribute("required")) {
            selectes[i].style.borderColor = "red";
            selectes[i].focus();
            selectes[i].addEventListener("change", function () {
                selectes[i].style.borderColor = "";
            });
            event.preventDefault();
            return;
        }
    }
    return true;
}

// make all elements disapled 
function disableAll() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }
    for (var i = 0; i < selectes.length; i++) {
        selectes[i].disabled = true;
    }
}

//Edit Page And Register Page

function RegisterAndEdit(event) {
    // check if phone number is valid
    if (!regexPhone.test(phone.value) && phone.value !== "") {
        phone.style.borderColor = "red";
        phone.style.borderWidth = "2px";
        phone.style.borderStyle = "solid";
        phone.focus();

        //show tooltip if phone number is invalid
        phone.parentElement.style.overflow="visible";     
        document.querySelector(".toolTip").style.opacity = "1";
        setTimeout(function () {
            document.querySelector(".toolTip").style.opacity = "0";
            phone.parentElement.style.overflow="visible";     
        } , duration);
    }
    else {
        // check if all inputs are filled
        if (requiredInputs(event) && requiredSelects(event) && editSubmit.type == "button") {

            ShowConfirmContent();
            // check if the user is editing or registering
            if (event.target.value == "Register") {
                //register
                confirmBody.firstElementChild.innerHTML = "<i class='fa-solid fa-circle-check text-primary fs-1 p-2'></i>";
                confirmBody.firstElementChild.nextElementSibling.innerHTML = "<p class='fs-2 p-2'>Sign Up Successfully</p>";
            }
            else {
                //edit
                confirmBody.firstElementChild.innerHTML = "<i class='fa-solid fa-circle-check text-primary fs-1 p-2'></i>";
                confirmBody.firstElementChild.nextElementSibling.innerHTML = "<p class='fs-2 p-2'>Updated Successfully</p>";
            }
            
            setTimeout(function () {
                HideConfirmContent();
                editSubmit.type = "submit";
                editSubmit.click();
            }, duration);

            disableAll();
        }
    }
    phone.addEventListener("blur", function () {
            if (regexPhone.test(phone.value) || phone.value == "") {
                phone.style.borderColor = "";
                phone.style.borderWidth = "";
                phone.style.borderStyle = "";
                }
            else {
                phone.style.borderColor = "red";
                phone.style.borderWidth = "1px";
                phone.style.borderStyle = "solid";
            }
        });
}

function deleteStudent(event) {

    if (editId.value !== "" && Delete.type == "button") {

        ShowDeleteConfirmContent();

        deleteButtonConfirm.addEventListener("click", DeleteFunction);
            
        cancelButton.addEventListener("click", cancelFunction);

    }
    else if (editId.value == ""){
        editId.style.borderColor = "red";
        editId.style.caretColor = "red";
        editId.focus();
        editId.addEventListener("keyup", function () {
            editId.style.borderColor = "";
            editId.style.caretColor = "";
        });
    }
}

function cancelFunction(event) {

    HideDeleteConfirmContent(); 

    ShowConfirmContent();

    setTimeout(function () {
        HideConfirmContent();
    }, duration);
}

function DeleteFunction(event) {

    HideDeleteConfirmContent();

    ShowConfirmContent();

    confirmBody.firstElementChild.innerHTML = "<i class='fa-solid fa-circle-check text-primary fs-1 p-2'></i>";
    confirmBody.firstElementChild.nextElementSibling.innerHTML = "<p class='fs-2 p-2'>Deleted!</p>";
    setTimeout(function () {
        HideConfirmContent();
        Delete.type = "submit";
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute("required");
        }
        for (var i = 0; i < selectes.length; i++) {
            selectes[i].removeAttribute("required");
        }

        Delete.click();
        disableAll();
    }, duration);

}

//Search Page And Status Page
function tablesStudent() {
    if (tableData) {
        searchTable.classList.remove("d-none");
    }
    else if (window.location.href.split("/")[window.location.href.split("/").length - 1] == "#" && window.location.pathname.split("/")[1] == "Search") {
        document.getElementById("dataFound").innerHTML = "No Data Found";
        
    }
}
tablesStudent();


//Department Page
function departmentAllow(event) {
    if (window.location.href.split("/")[window.location.href.split("/").length - 1] == "#" && window.location.pathname.split("/")[1] == "Department") {


        if (departmentId && selectes[0].value) {
            ShowConfirmContent();
            confirmBody.firstElementChild.innerHTML = "<i class='fa-solid fa-circle-check text-primary fs-1 p-2'></i>";
            confirmBody.firstElementChild.nextElementSibling.innerHTML = "<p class='fs-2 p-2'>Enrolled!</p>";

            setTimeout(function () {
                HideConfirmContent();   
            }, duration*2);
            setTimeout(function () {
                window.location.href = window.location.href.substring(0, window.location.href.length - 1);
            }, (duration * 2) + 500);

            disableAll();
        }
        else if (departmentId.value) {
            ShowConfirmContent();
            confirmBody.firstElementChild.innerHTML = "<i class='fa-solid fa-circle-xmark fs-1 text-danger p-2'></i>";
            confirmBody.firstElementChild.nextElementSibling.innerHTML = "<p class='fs-2 p-2'>Departments allowed for level three only </p>";
            setTimeout(function () {
                HideConfirmContent();         
            }, duration * 2);
            
            setTimeout(function () {
                window.location.href = window.location.href.substring(0, window.location.href.length - 1);
            }, (duration * 2) + 500);
            
            disableAll();
        }
        else {
            ShowConfirmContent();

            confirmBody.firstElementChild.innerHTML = "<i class='fa-solid fa-do-not-enter fs-1 text-danger p-2'></i>";
            confirmBody.firstElementChild.nextElementSibling.innerHTML = "<p class='fs-2 p-2'>Please select a existing student!</p>";

            setTimeout(function () {
                HideConfirmContent();   
            }, duration*2);
            setTimeout(function () {
                window.location.href = window.location.href.substring(0, window.location.href.length - 1);
            }, (duration * 2) + 500);

            disableAll();
        }
    }
    else if (window.location.pathname.split("/")[1] == "Department") {
        departmentSubmit.type = "submit";
    }
}
window.addEventListener("load", departmentAllow);


