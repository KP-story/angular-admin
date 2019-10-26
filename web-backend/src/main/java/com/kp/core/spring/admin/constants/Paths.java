package com.kp.core.spring.admin.constants;

public class Paths {
    public final static String LOGIN_PATH = "/auth/login";
    public final static String REFRESH_PATH = "/auth/refresh";
    public final static String CHANGE_PASSWORD_PATH = "/auth/password/change";
    public final static String CREATE_USER_PATH = "auth/account/create";
    public final static String UPDATE_USER_PATH = "auth/account/update";
    public final static String LIST_USERS_PATH = "auth/account/fetch";
    public final static String GET_USERS_PATH = "auth/account/get";
    public final static String GET_USER_PERMISSONS_PATH = "auth/account/getPermissions";

    public final static String DELETE_USER_PATH = "auth/account/delete";
    public final static String DELETE__MULTI_USERS_PATH = "auth/account/deleteMulti";
    public final static String RESET_PASSWORD_PATH = "auth/password/reset";

    public final static String CREATE_RESOURCE_PATH = "author/resource/create";
    public final static String FETCH_RESOURCE_PATH = "author/resource/fetch";
    public final static String CREATE_OPERATION_PATH = "author/operation/create";
    public final static String UPDATE_OPERATION_PATH = "author/operation/update";
    public final static String UPDATE_RESOURCE_PATH = "author/resource/update";
    public final static String DELETE_MULTI_RESOURCES_PATH = "author/resource/deleteMulti";
    public final static String CREATE_PERMISSION_PATH = "author/permission/create";
    public final static String CREATE_ROLE_PATH = "author/role/create";
    public final static String UPDATE_ROLE_PATH = "author/role/update";
    public final static String DELETE_MULTI_ROLES_PATH = "/author/role/deleteMulti";

    public final static String GRANTING_PERMISSION_ROLE_PATH = "author/role/grant";
    public final static String REVOKING_PERMISSION_ROLE_PATH = "author/role/revoke";
    public final static String FETCH_PERMISSION_ROLE_PATH = "/author/role/fetch";
    public final static String FETCH_PERMISSION_ROLE_BY_USER_PATH = "author/role/fetchByUser";

    public final static String FETCH_ROLE_PATH = "author/role/fetch";
    public final static String ASSIGN_ROLE_PATH = "author/user/assignRole";
    public final static String REVOKE_ROLE_PATH = "author/user/revokeRole";
    public final static String FETCH_OPERATIONS_PATH = "author/operation/fetch";
    public final static String SEARCH_OPERATIONS_PATH = "author/operation/search";
    public final static String DELETE_MULTI_OPERATIONS_PATH = "author/operation/deleteMulti";

    public final static String CHANGE_ROLE_OF_USER_PATH = "author/user/changeRole";

    public final static String CREATE_GRANT_PERMISSION_PATH = "/author/permission/create_grant";


}
