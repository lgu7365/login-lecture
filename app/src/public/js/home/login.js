const id = document.querySelector('#id');
const passward = document.querySelector('#passward');
const loginbtn = document.querySelector('button');

loginbtn.addEventListener('click', login);

function login(){
  const req = {
    id: id.value,
    passward: passward.value,
  }
  
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
}