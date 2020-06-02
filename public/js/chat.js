document.addEventListener("DOMContentLoaded", function() 
{   
    var url_string = window.location.href;
    var url = new URL(url_string);
    var nickname = url.searchParams.get("nickname");

    if(nickname === "" || nickname === null)
    {
        window.location.replace("http://localhost:3000/");
    }
    else
    {
        document.getElementById("nickname").innerText = nickname;

        const socket = io("http://localhost:3000/");

        socket.on("user-connected", (user) => 
        {
            append_message(user + " is connected...");
        });

        document.getElementById("send").addEventListener("click", function()
        {
            var text = document.getElementById("input-message").value;

            if(text.trim() !== "") 
            {
                append_message("You: " + text);

                socket.emit("send-message", {user: nickname, message: text});

                document.getElementById("input-message").value = "";
            }
        });

        socket.on("received-message", (data) => 
        {
            var message = data.user + ": " + data.message;

            append_message(message);
        });

        socket.on("user-disconnected", (data) => 
        {
            var message = data + " disconnected...";

            append_message(message);
        });
    }
});

function append_message(data, self_message)
{
    var content = document.getElementById("chat-content");

    if(self_message)
        content.innerHTML += `<div class="wrap-message"><div class="message">${data}</div></div>`;
    else
        content.innerHTML += `<div class="wrap-message"><div class="self-message">${data}</div></div>`;
}


