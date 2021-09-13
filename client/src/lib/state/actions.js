import { DELETE_POST } from "../service/index";

import { getPostBy, getPosts,addPost,getPostsBy } from "../service/index"


export const actions ={
    

    FETCH_POSTS: "FETCH_POSTS",
    FETCH_POSTS_BY_CATEGORY: "FETCH_POSTS_BY_CATEGORY",
    FETCH_SINGLE_POST: "FETCH_SINGLE_POST",
    FETCH_PENDING: "FETCH_POSTS_PENDING",
    FETCH_ERROR: "FETCH_POSTS_ERROR",
    ADD_POST: "ADD_POST",
    PATCH_POST: "PATCH_POST",
    SET_FILTER: "SET_FILTER",
    DELETE_POST: "DELETE_POST"
    
};


// fetchpending qui indique a l utilisateur q'on est en train d effectuer un appel reseau
//(fetchpending = aller chercher ou en attendant)donc indiquer l etat de chargement
 
export const fetchPending = () => {
    return {
        type:actions.FETCH_PENDING
    }
}


//payload c es tdans le sens recuperer des donnees utiles avec dans l ensemble
export const fetchError = (err) => {

    return {
        type: actions.FETCH_ERRROR,
        payload:{error:err}
    }
}

export const fetchPostsSuccess = (res) => {
    return {
        type: actions.FETCH_POSTS,
        payload: { posts: res.data.response }
    }
}

export const fetchSinglePostSuccess = (res) => {
    return {
        type: actions.FETCH_SINGLE_POST,
        payload: { single: res.data.response }
    }
}

export const setFilter = (category) => {
    return {
        type: actions.SET_FILTER,
        payload: { category: category }
    };
}




//Pour les srequttes http

// fetch post qui va servir à recuper les posts apres un appel reseaux
export function fetchPosts() {

    return async function (dispatch) {
            dispatch(fetchPending())
            try {
                const response = await getPosts()
                return dispatch(fetchPostsSuccess(response))
            } catch (err) {
                return dispatch(fetchError(err))
            }
        }
    }

    export function fetchSinglePost(id) {
        return async function (dispatch) {
            dispatch(fetchPending())
            try {
                const response = await getPostBy(id)
                return dispatch(fetchSinglePostSuccess(response))
            } catch (err) {
                return dispatch(fetchError(err))
            }
        }
}

    
export function addNewPost(item) {
    return async function (dispatch) {
        addPost(item).then(() => {
           dispatch(fetchPosts())
        })
    }
       
}

export function setFilterAction(category) {
    return function (dispatch) {
        dispatch(setFilter(category))
        
    }
}



//pour les category
export function fetchPostsBy(category) {
    return async function (dispatch) {
            dispatch(fetchPending())
            try {
                const response = await getPostsBy(category)
              
                return dispatch(fetchPostsSuccess(response))
            } catch (err) {
                return dispatch(fetchError(err))
            }
        }
}
    


       
//delete dans service directement pour le test



