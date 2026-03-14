// Check for password to update
const params = new URLSearchParams(window.location.search);
if (params.get("updated") === "true") {
    const toast = document.getElementById("toast");
    toast.style.display = "flex";
    window.history.replaceState({}, document.title, "/users");
    setTimeout(() =>  toast.style.display = "none",4000 );
}
else if (params.get("error") === "wrong_password"){
    const toast = document.getElementById("toast-error");
    toast.style.display = "flex";
    window.history.replaceState({}, document.title,"/users");
    setTimeout(() => toast.style.display = "none", 4000);
}

function confirmDelete(userId, correctPassword) {
        let entered = prompt("Enter your password to delete:");
        
        if (entered === null) return; // user clicked Cancel
        
        if (entered === correctPassword) {
            window.location.href = `/users/${userId}/delete`;
        } else {
            alert("Wrong password! Try again.");
        }
}
