package com.kp.core.spring.admin.security.rolebased.realm;

import com.kp.core.spring.admin.caching.RoleCache;
import com.kp.core.spring.admin.caching.UserCache;
import com.kp.core.spring.admin.constants.Status;
import com.kp.core.spring.admin.security.jwt.JwtTokenUtil;
import com.kp.core.spring.admin.utilities.UserUtils;
import com.kp.core.spring.admin.vo.dto.UserCacheVo;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Set;

public class JDBCRealm extends AuthorizingRealm {

    @Autowired
    UserCache userCaching;
    @Autowired
    RoleCache roleCache;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public boolean supports(AuthenticationToken token) {
        return token instanceof JWTToken;
    }

    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        JWTToken upToken = (JWTToken) token;
        String username = jwtTokenUtil.getUsernameFromToken((String) token.getCredentials());
        String jwtToken = (String) upToken.getCredentials();
        if (username == null) {
            throw new AccountException("Null usernames are not allowed by this realm.");
        } else {
            SimpleAuthenticationInfo info = null;

            try {

                UserCacheVo userDetails = userCaching.getByUsername(username);
                if (userDetails == null || !userDetails.getStatus().equals(Status.ACTIVE)) {
                    throw new AuthenticationException("user not found or inactive");

                }
                userDetails.setUsername(username);
                if (!jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                    throw new AuthenticationException("Token invalid");
                }
                return new SimpleAuthenticationInfo(username, token.getCredentials(), getName());
            } catch (Exception var12) {


                throw new AuthenticationException(var12);
            }


        }
    }


    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        if (principals == null) {
            throw new AuthorizationException("PrincipalCollection method argument cannot be null.");
        } else {
            String username = (String) this.getAvailablePrincipal(principals);
            Set<String> roleNames = null;
            Set permissions = null;

            try {
                UserCacheVo amUserEntity = userCaching.getByUsername(username);
                roleNames = new HashSet<>(amUserEntity.getRoles());
                permissions = new HashSet(UserUtils.getPermissionOfUser(amUserEntity, roleCache));

            } catch (Exception var11) {


                throw new AuthorizationException(var11);
            }

            SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);
            info.setStringPermissions(permissions);
            return info;
        }
    }

}
