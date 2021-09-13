import  React,{ Fragment } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

// import  Single  from './components/Single';

import { useEffect } from 'react';
import { Home } from './components/Home';

//use Dispatch
import { useDispatch } from 'react-redux';

import { Single } from './components/Single';
import { fetchPosts} from './lib/state/actions';
import { deletePost, editFilm } from './lib/service';



const styles = {
  
  container: {
    
    width: "90%",
    height: "calc(100vh -200px)",
    margin: "100px auto 0 auto",
    display: "flex"
  },
  blog: {
    flex: "0 1 40%",
    Overflow: "scroll"
  }
};

const App = () => {

  const dispatch = useDispatch()
  const dispatch2 = useDispatch()
  const dispatch3 = useDispatch()

  useEffect(() => {

    dispatch(fetchPosts())
    dispatch2(deletePost())
    dispatch3(editFilm())
  


  }, [dispatch, dispatch2,dispatch3]);
    
  
  return (

    <Fragment>
      <div style={styles.container}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/:category" component={Home} />

          <Route exact path="/post/:id" component={Single} />
        </Router>
      </div>
    </Fragment>
  
   
  );
  
};

export default App;
