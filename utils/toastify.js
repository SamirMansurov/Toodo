export function WrongToastify(){
    Toastify({
        text: "something was WRONG!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right,  #ff0000, #ff3333)",
        },
        onClick: function(){}
      }).showToast();
}
export function TrueToastify(){
    Toastify({
        text: "successfuly",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "left",
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){}
      }).showToast();
}