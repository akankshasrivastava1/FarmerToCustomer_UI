export const GlobalConstant = {
    // https://feestracking.freeprojectapi.com/api/farmerRoles/get-all-roles
    LOCAL_LOGIN_KEY:'farmerLoginData',
    TOKEN_KEY:'farmer-token',
    API_ENDPOINTS:{
        LOGIN: 'farmerUsers/login',
        CREATE_USER: 'farmerUsers/create-user',
        GET_ALL_USERS:'farmerUsers/get-all-users',
        GET_USER_BY_ID: 'getUserbyID?id=',
        CREATE_ROLES:'farmerRoles/create-role',
        GET_ALL_ROLES:'farmerRoles/get-all-roles',
        UPDATE_ROLE: 'farmerRoles/update-role/',
        DELETE_ROLE: 'farmerRoles/delete-role/',

        CREATE_CATEGORY:'farmerCategories/create-category',
        GET_ALL_CATEGORY: 'farmerCategories/get-all-categories',
        UPDATE_CATEGORY: 'farmerCategories/update-category/',
        DELETE_CATEGORY: 'farmerCategories/delete-category/',
    
        //Farmer product
        GET_ALL_FARMER_PRODUCTS_BY_CAT:'farmerFarmerProducts/getFarmerProductByCateId?categoryId=',
        GET_ALL_PRODUCTS:'farmerFarmerProducts/get-all-farmer-products-with-joins/',
        GET_ALL_PRODUCTS_BY_FARMER:'farmerFarmerProducts/get-farmer-products-by-farmer/',
        CREATE_PRODUCT:'farmerFarmerProducts/create-farmer-product',
        UPDATE_PRODUCT:'farmerFarmerProducts/update-farmer-product/',
        DELETE_PRODUCT:'farmerFarmerProducts/delete-farmer-product/',

        //product master
        CREATE_PRODUCT_MASTER:'farmerProducts/create-product',
        UPDATE_PRODUCT_MASTER: 'farmerProducts/update-product/',
        DELETE_PRODUCT_MASTER: 'farmerProducts/delete-product/',
        GET_ALL_PRODUCTS_MASTER: 'farmerProducts/get-all-products-with-joins'
    },

    VALIDATION_MESSAGE: {
        REQUIRED: 'This is Required',
        Mobile_No: 'MAx and Min 10 Char Needed'
    }
}
