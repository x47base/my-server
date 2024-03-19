function login() {
    const password = document.getElementById("password-input").value;
    const r1 = fetch("/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cookie: password
        })
    }).then(response => {
        if (response.ok) {
            if (response.status == 200) {
                fetch("/api/auth/login-status")
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == true) {
                            fetch("/api/auth/user-info")
                                .then(response => response.json())
                                .then(data2 => {
                                    getBalance()
                                    document.getElementById("username").innerHTML = data2.username;
                                    document.getElementById("thumbnail").src = data2.thumbnailUrl;
                                });
                        }
                    });
                document.getElementById("password-input").value = "";
                document.getElementById("login-form").style.display = "none";
                document.getElementById("header").style.display = "block";
            }
        } else {
            alert("Incorrect .ROBLOXSECURITY");
        }

    })

}

function logout() {
    fetch("/api/auth/logout", {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("username").innerHTML = "";
                document.getElementById("thumbnail").src = "";
                document.getElementById("login-form").style.display = "block";
                document.getElementById("header").style.display = "none";
            }
        });
}

function checkLoginStatus() {
    return true;
    fetch("/api/auth/login-status")
        .then(response => response.json())
        .then(data => {
            if (data.status == true) {
                fetch("/api/auth/user-info")
                    .then(response => response.json())
                    .then(data2 => {
                        getBalance()
                        document.getElementById("username").innerHTML = data2.username;
                        document.getElementById("thumbnail").src = data2.thumbnailUrl;
                        document.getElementById("login-form").style.display = "none";
                        document.getElementById("header").style.display = "block";
                    });
            } else {
                console.log(data.status)
            }
        });
}

document.getElementById("login-form").onsubmit = function (event) {
    event.preventDefault();
    // login();
}

window.onload = function () {
    checkLoginStatus();
    setTimeout(function () {
        document.getElementById("loading-screen").style.display = "none";
    }, 1250);
}