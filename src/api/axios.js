import axios from "axios";
// Global configs
export default axios.create({
    baseURL: 'https://interview.outstem.io',
    headers: {
        'Content-Type': 'application/json',
    }
})