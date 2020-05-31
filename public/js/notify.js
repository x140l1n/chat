(function() {
  /*
  // Methods
  */
  function init() 
  {
    window.notify = notify;
  }

  function notify(options) 
  {
    if(isCreated()) return;

    if (!isOptionsValid(options)) return;
    
    var item = createNotifyItem(
      options.message || "",
      options.color || "default"
    );

    if (options.timeout) 
    {
      setAutocloseTimeout(item, options.timeout);
    }

    setCloseOnClick(item);

    document.getElementById("noti").append(item);
  }

  function createNotifyItem(message, color) 
  {
    var item = document.createElement("div");
    item.classList.add("notify-item");
    item.classList.add("notify-item--" + color);
    item.innerHTML = message;

    return item;
  }

  function setCloseOnClick(el) {
    el.addEventListener("click", function() {
      el.remove();
    });
  }

  function setAutocloseTimeout(el, timeout) {
    setTimeout(function() {
      el.remove();
    }, timeout);
  }

  function isCreated()
  {
    var element = document.getElementsByClassName("notify-item");

    return element.length == 0 ? false : true;
  }

  function isOptionsValid(options) {
    return (
      options ||
      console.error('usage: \n notify({ message: "OK", color: "success", timeout: 3000 })')
    );
  }

  /*
  // Init
  */

  init();
})();
