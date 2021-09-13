
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../lib/service';
import {  addNewPost,fetchPostsBy,fetchPosts } from '../lib/state/actions';

const styles = {
    

    blog: {
        flex: "1 0 60 %",
        Overflow: "scroll",
        margin: " 0 20 px"
    },
    posts: {
        fontWeight: "600"
    },
    small: {
        fontSize: "14px",
        fontWeight: "400"
    },
    menu: {
        
        flex: "0 1 10%"
    },
    
    categories: {
        display: "flex",
        alignItems: "flex-end",
        listStyleType: "none",
        flexDirection: "column"

    },
    category: {
        
        margin: "3px 0"

    },
    blogUl:
    {
        padding: "0",
    },
    add: {
        flex: "0 1 30%",
        marginleft: "50px"
    },
    a: {
        color: "#000"
    },

    plus: {
        fontSize: "22px",
        fontWeight: "700",
        background: "white",
        borderRadius: "5px"
    },
};
   

export const Menu = () => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state)
    const [active, setActive] = useState(categories[0])
    return (
        <div style ={styles.menu}>
            <ul style ={styles.categories} >
                {categories.map((category) => {
                    return <li key={category}
                        onClick={() => {
                            category === "All" ? dispatch(fetchPosts()) : dispatch(fetchPostsBy(category))
                           
                            setActive(category)
                        }}
                        style={styles.category} >  <Link className={`category ${active === category && "active"}`} to={`/${category === "All" ? "" : category}`} >{category}</Link></li>
                })}
            </ul>
            
        </div>
    );
};

export const PostAction = () => (

 
    
        <div style={styles.add}>
            <button style={styles.plus} data-toggle="modal" data-target="#form" >
                <span>+</span></button>
        </div>
    );



export const Form = () => {
    
    const inputs = document.querySelectorAll(".form-control")
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state)
    const cast = categories.filter(category => category !== "ALL")
    const [item, setItem] = useState({
        title: "",
        content: "",
        author: "",
        category: "film"
    })


    const validate = (callback) => {
        inputs.forEach(input => {
            if (!input.value) {
            
                input.style.border = "1px solid crimson";
            } else {
                input.style.border = "1px solid #ced4da";
            }
        })
        callback()
    }

    //add &reset 
   
    const add = () => {
        
      dispatch(addNewPost(item))
       
        window.jQuery('#form').modal("hide")
    }

    const reset = () => {
        
        inputs.forEach(input => {
            input.style.border = "1px solid #ced4da"
        })
        setItem({
            title: "",
            author: "",
            content: "",
            category: "film"
        })
    }
     
    const submit = (e) => {
        e.preventDefault()

         //validate
         validate(() => {
    
            if (item.title === "" || item.author === "" || item.content === "") { return false }
            add()
            reset()
        })
    }

 
    
  

       
    
        return (
            <form
                onSubmit={e => submit(e)}>
                <div className="modal-header">

                    <h5 className="modal-title"
                        id="exampleModalLabel">
                        Add a post
                    </h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        arial-label="close">
                        <span aria-hidden="true" >&times;</span>
                    </button>
                </div>
                <div >
                    <select 
                        onChange={e => {
                            setItem({
                                ...item, category: e.target.value
                            })
                        }}

                    >
                          
                       {cast.map(category => {
                            return <option key={category.id}>{category}</option>
                        })}
                      
                    </select>
                    <button>hello</button>
                    <input type="text"
                        className="form-control"
                        placeholder="title"
                        value={item.title}
                        onChange={e => {
                            setItem({ ...item, title: e.target.value })
                        }}
                    />
                
                    <br />
                    <input type="text"
                        className="form-control"
                        placeholder="author"
                        value={item.author}
                        onChange={e => {
                            setItem({ ...item, author: e.target.value })
                        }}
                    />
                    <textarea className="form-control"
                        id=""
                        cols="5"
                        value={item.content}
                        onChange={e => {
                            setItem({
                                ...item, content: e.target.value
                            })
                        }}
                    ></textarea>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        data-dismiss="modal"
                        style={styles.plus}
                    
                    >Close</button>
                    <button
                        type="submit"
                    
                        style={styles.plus}>
                        Save
                    </button>
                    
                </div>

            </form>
        )
    
}

export const Modal = () => {


   
    return (
        <div className="modal fade"
            id="form"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog"
                role="document"
               
            > <div className="modal-content">
                   
                    <Form />
                </div>
            </div>
        </div>
    );
};


export const Posts = () => {
    const state = useSelector(state => state)
    const { posts } = state
   

    
    // truncate est interressant car c 'est une fonction qui prend un parmatre et qui pemettra  de raccourcir le champs du texte si il est superieur a 100
    const truncate = text => {
        if (text.length < 99) {
            return
        }
        return `${text.substring(0, 100)}...`
    }
    return posts.map(post => {
            return (  
            <div  >
                <h3  key={post.id} style={styles.h3} >
                    <Link 
                        style={styles.a}
                        to={`/post/${post._id}`}
                        params={{ _id: post._id }}
                    >
                        {post.title}{" "}
                        </Link>
                     
                    <div style={styles.small}>by {post.author}</div>
                </h3>
                <p  >{truncate(post.content)}</p>
                <div style={{ border: "1px solid #eee" }} ></div>
            </div>
        )

    });
}

    //    Ce composant d'ordre superieur         

    export const WithItems = (props, Component) => {
    
        const { posts, isFetching } = props
     
        return (
            <div style={styles.blog}>

                {!posts.length && <p style={styles.posts} >No posts :( </p>}
                {isFetching && posts.length ? (
            
                    <p>Loading ... </p>
                ) : (
                        <Component />
                      
                )}
            </div>
        )


    
}
