document.getElementById("button-go").addEventListener("click", function (e)
{
    var value = document.getElementById("nickname").value;
    
    if(value === "")
    {
        notify({message: "The nickname is required...", color: "danger", timeout: 3000});
    }
    else
    {
        const socket = io("http://localhost:3000/");
        
        socket.emit("username", {user: value});

        document.getElementById("form").submit();
    }
});
