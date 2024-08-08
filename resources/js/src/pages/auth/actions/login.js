import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";
import { showErrorResponse } from "../../../helper/util";

// Define loginInput using Vue's ref for reactive state
export const loginInput = ref({
    email: "",
    password: "",
});

export function useLoginUser() {
    const loading = ref(false);

    async function login() {
        try {
            loading.value = true;
            const data = await makeHttpReq("login", "POST", loginInput.value);
            loading.value = false;
            loginInput.value = { email: "", password: "" }; // Clear login input after use
            successMsg(data.message);

            if (data.isLoggedIn) {
                localStorage.setItem("userData", JSON.stringify(data)); // Save user data in local storage
                window.location.href = "/app/admin"; // Redirect to admin page
            }
        } catch (error) {
            loading.value = false;
            showErrorResponse(error); // Show error response
        }
    }

    return { login, loading };
}
