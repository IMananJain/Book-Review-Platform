export const backendApiUrl = "http://localhost:3001/";
const endPoints = {
    user: {
        SIGN_UP: '/signup',
        LOGIN: '/login',
        EDIT_PROFILE:'/:id',
        DELETE_PROFILE: '/delete-profile/:id',
    },
    book:{
        ADD_BOOK:'/books',
        GET_BOOKS:'/books',
        GET_BOOK:'/books/:id',
        EDIT_BOOK:'/books/:id',
        DELETE_BOOK:'/books/:id',
    },
    review:{
        ADD_REVIEW:'/books/:bookId/reviews',
        GET_REVIEWS:'/books/:bookId/reviews',
        EDIT_REVIEW:'/reviews/:id',
        DELETE_REVIEW:'/reviews/:id',
    }
};

export default endPoints;