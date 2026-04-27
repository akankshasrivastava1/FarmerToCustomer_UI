export const GlobalConstant = {
    // https://feestracking.freeprojectapi.com/api/farmerRoles/get-all-roles
    LOCAL_LOGIN_KEY:'farmerLoginData',
    API_ENDPOINTS:{
        LOGIN: 'farmerUsers/login',
        CREATE_USER: 'farmerUsers/create-user',
        GET_USER_BY_ID: 'getUserbyID?id=',
        CREATE_ROLES:'farmerRoles/create-role',
        GET_ALL_ROLES:'farmerRoles/get-all-roles',
        UPDATE_ROLE: '/farmerRoles/update-role/',
        CREATE_CATEGORY:'farmerCategories/create-category',
        GET_ALL_CATEGORY: 'farmerCategories/get-all-categories',
        UPDATE_CATEGORY: 'farmerCategories/update-category/'
    },

    VALIDATION_MESSAGE: {
        REQUIRED: 'This is Required',
        Mobile_No: 'MAx and Min 10 Char Needed'
    }
}