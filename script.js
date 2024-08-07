const sendBtn = document.getElementById("send");
const sendingMessage = document.getElementById("sendingMessage")
const chat = document.getElementById("Chat")


sendBtn.addEventListener("click", function(e){

let message = sendingMessage.value;

chat.innerHTML += `<div>
<img src="person.png" alt="Avatar użytkownika"> ${message}
</div>`

sendingMessage.value = "";
})




