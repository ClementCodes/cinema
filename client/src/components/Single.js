import React, { useEffect ,Fragment, useState }from 'react';
import { deletePost, editFilm } from '../lib/service/index';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import { fetchSinglePost } from '../lib/state/actions';



const styles = {
    
    blog: {
        flex: " 0 1 60 %",
        overflow: "scroll",
        marginLeft:"15%"
    },
    info: {
        display: "flex",
        justifyContent:"space-between"
    },
    small: {
        fontSize: "14px",
        fontWeight:'400px'
    },
    category: {
        color: "navy",
        fontWeight:"800"
    }
}


  


export const Header = ({ category, createdAt, title, author,text,movieId }) => {
    const dispatch = useDispatch()
    const [auteur, setAuteur] = useState("");
    const [titre, setTitre] = useState("");
    const [synopsis, setSynopsis] = useState("");
 
    const singlePost = useSelector(state => state.single);
    console.log(singlePost);
    const format = createdAt => {
        const date = new Date(createdAt)
        const day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        
        return `${day}/${month}/${year}`
    }
// ,titre,synopsis
const handleUpdate = () => {

   dispatch(editFilm( singlePost._id ,auteur))
    console.log(setAuteur);
}
    return (
        <Fragment>
            <br />
            <div style={styles.info}>
                <span style={(styles.small, styles.category )} >{category}</span>
                <span style={styles.small} >{format(createdAt)}</span>
            </div>
            <h3>
                {title}&nbsp;
                <div style={styles.small} >By {author}</div>
            </h3>
            {/* <button onClick={remove}>Supprimer </button> */}
            <div className="form">
                <form  className="form"  >
             
                <input
                  type="text"
                        defaultValue={author}
                        
                        onChange={(e) => setAuteur(e.target.value)}
                    ></input>
                    <button onClick={handleUpdate}  ><a href="/" >Changer l 'auteur</a></button>

{/* 
                    <input
                  type="text"
                        defaultValue={title}
                        value={title}
                        onChange={e => setTitre(e.target.value)}
                    ></input>
                    <button onClick={handleUpdate} ><a href="/" >Changer le titre</a></button> */}

                    {/* <input
                  type="text"
                        defaultValue={text}
                        value={text}
                        onChange={e => setSynopsis(e.target.value)}
                    ></input>
                    <button onClick={handleUpdate} ><a href="/" >Changer le synopsis</a></button> */}
           
               
                   
               </form>
            </div>
          
        </Fragment>
        
    )
};

export const Single = ({match:{params:{id}}, category,  title, author,item }) => {
   
  
     const dispatch = useDispatch();
  
     const singlePost = useSelector(state => state.single);
    useEffect(() => {
        dispatch(fetchSinglePost(id))
       
    }, []);
    
   if (!singlePost){
       return <Fragment> No post</Fragment>
   }

    const remove = () => {
      
        dispatch(deletePost(id))
       
    }
    

   return (
       <div style={styles.blog}>
          <div>   <Link to="/" >Retour</Link></div>
           
        
           
           <Header {...singlePost} />
           <p>{singlePost.content}</p>
           <div>
               <button onClick={remove}> <a href="/" >Supprimer film</a></button>
               </div>
           <div style={{ border: "1ps solid #eee" }} ></div>




        
           

       </div>
   );
};