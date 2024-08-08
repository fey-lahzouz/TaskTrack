import { showError } from "./toast-notification";

/**
 * Displays error messages using a toast notification.
 * @param {unknown} error - The error object or array of error messages.
 */
export function showErrorResponse(error) {
    // Check if the error is an array
    if (Array.isArray(error)) {
        // Loop through the error messages and display each
        for (const message of error) {
            showError(message);
        }
    } else {
        // Display the error message if it's a single error object
        showError(error.message);
    }
}

/**
 * Creates a debounced version of a function that delays its execution.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} A debounced function.
 */
export function myDebounce(func, delay) {
    let timer;

    return function () {
        // Clear the previous timer
        clearTimeout(timer);

        // Set a new timer to execute the function after the delay
        timer = setTimeout(() => func(), delay);
    };
}

/**
 * Opens a Bootstrap modal by its element ID.
 * @param {string} element - The ID of the modal element.
 * @returns {Promise<HTMLElement>} A promise that resolves when the modal is opened.
 */
export function openModal(element) {
    return new Promise((resolve) => {
        // Get the modal element by its ID
        var modal = document.getElementById(element);

        if (modal) {
            // Add classes to show the modal with a fade effect
            setTimeout(function () {
                modal.classList.add("fade", "show");
                modal.style.display = "block";
                modal.classList.add("in");
            }, 500);

            // Add class to the body for the modal backdrop
            document.body.classList.add("modal-open");

            // Create and append the modal backdrop element
            var modalBackdrop = document.createElement("div");
            modalBackdrop.className = "modal-backdrop fade show";
            document.body.appendChild(modalBackdrop);
        }
        // Resolve the promise with the modal element
        resolve(modal);
    });
}

/**
 * Closes a Bootstrap modal by its element ID.
 * @param {string} element - The ID of the modal element.
 */
export function closeModal(element) {
    // Get the modal and backdrop elements
    var modal = document.getElementById(element);
    var modalBackdrop = document.querySelector(".modal-backdrop");

    if (modal) {
        // Remove classes to hide the modal
        modal.classList.remove("in", "show", "fade");
        modal.style.display = "";

        // Remove class from the body
        document.body.classList.remove("modal-open");

        // Remove the modal backdrop element
        if (modalBackdrop) {
            document.body.removeChild(modalBackdrop);
        }
    }
}

/**
 * Returns the character at the specified index in a string, in uppercase.
 * @param {string} str - The string from which to get the character.
 * @returns {string} The character at index 1, in uppercase, or an empty string.
 */
export function getChar(str) {
    if (typeof str !== "undefined") {
        const index = 1; // Index of the character to retrieve

        // Check if index is within bounds of the string
        if (index >= 0 && index < str.length) {
            return str.charAt(index).toLocaleUpperCase();
        } else {
            return "";
        }
    }
}
