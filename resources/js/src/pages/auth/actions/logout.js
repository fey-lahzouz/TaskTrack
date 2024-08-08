import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
//import { showError, successMsg } from "../../../helper/toast-notification";
import { showErrorResponse } from "../../../helper/util";

/**
 * Custom Composition API function to handle user logout.
 * @returns {Object} - An object containing the `logout` function and `loading` reactive reference.
 */
export function useLogoutUser() {
    // Reactive reference for loading state
    const loading = ref(false);

    /**
     * Logs out the user by sending a POST request to the 'logout' endpoint.
     * @param {number | undefined} userId - The ID of the user to log out. If undefined, logs out the current user.
     */
    async function logout(userId) {
        try {
            // Set loading to true when the request starts
            loading.value = true;

            // Send the HTTP request to logout
            const response = await makeHttpReq("logout", "POST", {
                userId: userId,
            });

            // Handle successful response (if needed)
            // Example: successMsg(response.message);

            // Set loading to false when the request completes
            loading.value = false;
        } catch (error) {
            // Log error to console
            console.log(error);

            // Show error response using a helper function
            showErrorResponse(error);

            // Check for specific error message and redirect if not authenticated
            if (error.message === "Not authenticated") {
                window.location.href = "/app/login";
            }

            // Set loading to false in case of error
            loading.value = false;
        }
    }

    // Return the logout function and loading state for use in components
    return { logout, loading };
}
