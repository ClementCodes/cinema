import axios from "axios";


//recuperer la liste de   posts au complet
 export const getPosts = () => {
   
    return new Promise((onSuccess, onFail )=> {
        axios.get("http://localhost:5000/api/posts")
            .then((response, error) => {
    if (!response || error) {
        onFail(`Reponse erroné sur la requete getPosts ${error}`)
        return false
    }
    onSuccess(response)
    })
    })
 }
 export const getPostsBy = (category) => {
   
    return new Promise((onSuccess, onFail )=> {
        axios.get(`http://localhost:5000/api/posts/${category}`)
            .then((response, error) => {
    if (!response || error) {
        onFail(`Reponse erroné sur la requete getPosts ${error}`)
        return false
    }
    onSuccess(response)
    })
    })
}

//requete pour cibler un seule category individuellement avec un arguement id 
export const getPostBy = (id) => {
   
    return new Promise((onSuccess, onFail )=> {
        axios.get(`http://localhost:5000/api/post/${id}`)
            .then((response, error) => {
    if (!response || error) {
        onFail(`Reponse erroné sur la requete getPosts ${error}`)
        return false
    }
    onSuccess(response)
    })
    })
}


//requette qui permettra d ecrire vers la base de donnée avec une method post et donc en passe en argument le body qui va etre le nouvel objet donc un nouveau post
export const addPost = (body) => {
    return new Promise((onSuccess, onFail) => {
    const post = {
        ...body,
        createdAt: new Date()
    }
   
        axios.post('http://localhost:5000/api/post/add', post).then((response, error)=>{
        
            if (error){
                onFail(`error addin new post: $(error)`)
                return false
            }
            onSuccess(`post ${post.title} added succefully`)
        }).catch(err => onFail(err))
        
    })

}

export const DELETE_POST = "DELETE_POST";


export const deletePost = (postId) => {
    return (dispatch) => {
      return axios({
        method: "delete",
        url: `http://localhost:5000/api/post/${postId }`,
      })
        .then((res) => {
          dispatch({ type: DELETE_POST, payload: { postId } });
        })
        .catch((err) => console.log(err));
    };
};
  

export const EDIT_MOVIE = "EDIT_MOVIE";

export const editFilm = (movieId, title,author, text) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `http://localhost:5000/api/post/${movieId}`,
        data: { title,author, text },
      })
        .then((res) => {
          dispatch({ type: EDIT_MOVIE, payload: { movieId, title,author, text } });
        })
        .catch((err) => console.log(err));
    };
  };