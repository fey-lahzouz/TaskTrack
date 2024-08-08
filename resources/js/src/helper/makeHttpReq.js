import { APP } from "./../App/APP";
import { getUserData } from "./getUserData";

export function makeHttpReq(endpoint, verb, input) {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = getUserData();
            const res = await fetch(`${APP.apiBaseURL}/${endpoint}`, {
                method: verb,
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + (userData ? userData.token : ""),
                },
                body: JSON.stringify(input),
            });

            const data = await res.json();

            if (!res.ok) {
                reject(data);
            } else {
                resolve(data);
            }
        } catch (error) {
            reject(error);
        }
    });
}
