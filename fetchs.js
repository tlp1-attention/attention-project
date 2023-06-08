import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

const state = {
    user: {},
    users: [],
    exercise: {},
    reports: []
}

export const getUsers = () => {
    axios.get(`/users`)
        .then(response => {
            state = {
                ...state,
                users: [...response.data]
            }
        }
    )
}

export const getUser = (id) => {
    axios.get(`/user/${id}`)
        .then(response => {
            state = {
                ...state,
                user: {...response.data}
            }
        })
}

export const getExercise = () => {
    axios.get(`/exercise`)
        .then(response => {
            state = {
                ...state,
                exercise: {...response.data}
            }
        }
    )
}

export const getReports = () => {
    axios.get(`/reports`)
        .then(response => {
            state = {
                ...state,
                reports: [...response.data]
            }
        }
    )
}

export default state;