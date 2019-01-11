import { FETCHED_CATEGORY, FETCHING_CATEGORY } from "../types";

export function fetchCategories(id) {
    return (dispatch) => {
        dispatch(
            { type: FETCHING_CATEGORY }
        )
        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/categories`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then(r => r.json())
            .then(categories => {
                dispatch({ type: FETCHED_CATEGORY, payload: categories });
            });
    }
}