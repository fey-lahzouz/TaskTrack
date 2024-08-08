export function getUserData() {
    try {
        const userData = localStorage.getItem("userData");

        if (typeof userData !== "object" && userData !== null) {
            const connectedUser = JSON.parse(userData);
            return connectedUser;
        }
    } catch (error) {
        console.log(error.message);
    }
}
