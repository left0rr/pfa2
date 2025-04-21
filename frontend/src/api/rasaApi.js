import axios from "axios";

const RASA_URL = "http://localhost:5005/webhooks/rest/webhook";

export const sendToRasa = async (message, sender = "user") => {
    try {
        const response = await axios.post(RASA_URL, {
            sender,
            message,
        });

        return response.data;
    } catch (error) {
        console.error("Error communicating with Rasa:", error);
        return [{ text: "Oops, something went wrong!" }];
    }
};
