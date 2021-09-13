//c'est de la qu'est renvoye le state qu l'on pourra recuperer partout //



import { actions } from "./actions";
import { DELETE_POST} from "../service/index";
import { EDIT_MOVIE} from "../service/index";


const {
    FETCH_PENDING,
    FETCH_ERROR,
    FETCH_POSTS,
    FETCH_SINGLE_POST,
    SET_FILTER,
    

} = actions;



const getVisiblePosts = (posts, category) => {
    
    if (category === "ALL") {
        return posts;
    }
    return posts.filter(p => p.category === category)
};

const categories = ["All", "film", "anime", "animation"]

const initialState = {
    isFetching: false,
    error: null,
    posts: [],
    postsHolder: [],
    single: null,
    categories: categories,
    category: categories[0]
};


export default function blogApp(state = initialState, action) {
    

    switch (action.type) {
        case FETCH_PENDING:
            return { ...state, isFetching: true }
            case FETCH_ERROR:
            return { ...state, error: action.payload.error, isFetching: false }
            case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                postsHolder: action.payload.posts,
                error: null,
                single: null,
                isFetching: false
            }
            
        
            case FETCH_SINGLE_POST:
                return {
                    ...state,
                    single: action.payload.single,
                    error: null,
                    isFetching: false
                }
        case SET_FILTER:
            
            const { postsHolder } = state
            return {
                ...state,
                category: action.payload.category,
                posts: getVisiblePosts(postsHolder, action.payload.category)                  
            }
            case DELETE_POST:
                return state.filter((post) => post._id !== action.payload.postId);
                case EDIT_MOVIE:
                    return state.map((movie) => {
                      if (movie._id === action.payload.movieId) {
                        return {
                          ...movie,
                          title: action.payload.title,
                         author: action.payload.author,
                         text: action.payload.text,
                        };
                      } else return movie;
                    });
        default:
            return state;
    }
    
};
