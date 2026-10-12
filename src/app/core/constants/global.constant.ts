export const GLOBAL_CONSTANT={
    API_METHODS:{
        LOGIN_USER:'Login',
        CUSTOMERS:{
            GET_ALL_CUSTOMERS:'GetAllCustomers',
            GET_CUSTOMER_BY_ID:'GetCustomerById/',
            ADD_CUSTOMER:'AddCustomer',
            UPDATE_CUSTOMER:'UpdateCustomer/',
            DELETE_CUSTOMER:'DeleteCustomer/'
        },
        WAREHOUSE:{
            GET_ALL_WAREHOUSES:'GetAllWarehouses',
            GET_WAREHOUSE_BY_ID:'GetWarehouseById/',
            ADD_WAREHOUSE:'AddWarehouse',
            UPDATE_WAREHOUSE:'UpdateWarehouse/',
            DELETE_WAREHOUSE:'DeleteWarehouse/'
        }
    },
    LOCAL_LOGIN_KEY: 'WarehouseUser',
    LOCAL_LOGIN_TOKEN_KEY:'WarehouseToken',
    REGEX:{
        EMAIL:'',
        AADHAR_CARD:''
    },
    VALIDATION_TEXT:{
        REQUIRED:'This is mandatory',
        EMAIL:'Provide Proper Email',
        AADHAR_CARD:'Aadhar Card should be of 12 digits'
    }
}