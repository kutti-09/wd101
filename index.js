let userform = document.getElementById("first-form");
const dInput = document.getElementById("dob");

dInput.addEventListener('input', (event) => {
    const dateofbirth = new Date(event.target.value);
    const presentdate = new Date();
    const ageofuser = presentdate.getFullYear() - dateofbirth.getFullYear();

    if ((ageofuser < 18) || ageofuser > 55) {
        dInput.setCustomValidity('Please enter a valid dob between 18 and 55.');
    }
    else{
        dInput.setCustomValidity('');
    }
});

const getentries = ()=>{
    let userentries = localStorage.getItem("entriesofuser");
    if(userentries){
        userentries = JSON.parse(userentries);
    }
    else{
        userentries = [];
    } 
    return userentries;
}
let userdata = getentries();

const showentries =()=>{
    const entries = getentries();
    const tabentries = entries.map((entry)=>{
        const nameCell = `<td>${entry.username}</td>`;
        const emailCell = `<td>${entry.useremail}</td>`;
        const passwordCell = `<td>${entry.userpassword}</td>`;
        const dobCell = `<td>${entry.userdocument}</td>`;
        const acceptTermsCell = `<td>${entry.userat}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>dob</th>
            <th>Accept Terms & Conditions</th>
        </tr>${tabentries}
    </table>`;

    let userdetails = document.getElementById("entriesofuser");
    userdetails.innerHTML = table;
}
const saveform = (event)=>{
    event.preventDefault();
    const username = document.getElementById("name").value; 
    const useremail = document.getElementById("email").value;
    const userpassword = document.getElementById("password").value;
    const userdocument = document.getElementById("dob").value;
    const userat = document.getElementById("checkbox").checked;
    const entry = {
        username,
        useremail,
        userpassword,
        userdocument,
        userat
    }
    userdata.push(entry);
    localStorage.setItem("entriesofuser",JSON.stringify(userdata));
    showentries();
}

userform.addEventListener("submit",saveform); 

showentries();
