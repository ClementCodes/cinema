import React ,{Fragment} from 'react';
import { useSelector } from 'react-redux';


import { Menu, Modal, PostAction, Posts, WithItems } from "./Index";



export const Home = () => {


    const state = useSelector(state => state);

    //la en dessous c'etatit une variable  local alors qu'au dessus avec le hook useSelector c'est une variable global pour recuperer le state sur tout l 'application grace a redux bien sur 
    // const [state, setState] = useState({
    //     posts: posts,
    //     isFetching:false
    // })

  

    return (

            <Fragment>

                <Modal/>
                  <Menu/>
                   { WithItems(state,Posts)}
                    <PostAction/> 
      
            </Fragment>
    
    );
};

                


//with items est un HOC un concept commposant d ordee superieur,qui va permettre d afficher et generer un nouveau composant via une fonction 