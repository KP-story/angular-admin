package com.kp.core.spring.admin.security.rolebased.realm;

import org.apache.shiro.authc.AuthenticationToken;

public class JWTToken implements AuthenticationToken {

    private final String principal;
    private final String token;

    public JWTToken(String principal, String token) {
        this.principal = principal;
        this.token = token;
    }


    @Override
    public Object getPrincipal() {
        return principal;
    }

    @Override
    public Object getCredentials() {
        return token;
    }


}
