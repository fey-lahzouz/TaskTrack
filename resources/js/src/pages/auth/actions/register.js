import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";

// RegisterUserType and RegisterResponseType types removed since they are not needed in JS

export const registerInput = ref({}); // Initialize with an empty object

export function useRegisterUser() {
    const loading = ref(false);

    async function register() {
        try {
            loading.value = true;

            const data = await makeHttpReq(
                "register",
                "POST",
                registerInput.value
            );

            loading.value = false;
            registerInput.value = {}; // Reset the input after registration
            successMsg(data.message);
        } catch (error) {
            loading.value = false;
            // Assume error is an array of strings
            for (const message of error) {
                showError(message);
            }
        }
    }

    return { register, loading };
}
