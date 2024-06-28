const routes = {
    HOME: '/',
    LOGIN: '/login',
    
    LOGOUT: '/logout',
    SIGN_UP: '/signup',
    PROFILE: '/profile',
    EDIT_PROFILE: '/edit-profile/:id',

    BOOK_DETAILS: '/book-details/:id',
    BOOK_LIST: '/book-list',
    ADD_BOOK: '/add-book',
    EDIT_BOOK: '/edit-book/:id',
    
    EDIT_REVIEW: '/book-details/:bookId/edit-review/:id'
};

export const beforeLoginRoutes = [
    routes.HOME,
    routes.SIGN_UP,
    routes.LOGIN
];

export default routes;