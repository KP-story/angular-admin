package com.kp.core.spring.admin.controller.impl;

import com.kp.core.spring.admin.caching.UserCache;
import com.kp.core.spring.admin.caching.UserKeyCache;
import com.kp.core.spring.admin.constants.FieldNames;
import com.kp.core.spring.admin.constants.Paths;
import com.kp.core.spring.admin.constants.ResultCode;
import com.kp.core.spring.admin.constants.Status;
import com.kp.core.spring.admin.dao.AmUserRepository;
import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.security.jwt.JwtTokenUtil;
import com.kp.core.spring.admin.utilities.UserValidator;
import com.kp.core.spring.admin.vo.ResponseMsg;
import com.kp.core.spring.admin.vo.RestMessage;
import com.kp.core.spring.admin.vo.dto.UserCacheVo;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    @Autowired
    private UserValidator userValidator;
    @Autowired
    private AmUserRepository amUserRepository;
    @Autowired
    private UserCache userCaching;
    @Value("${jwt.header}")
    private String tokenHeader;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserKeyCache userKeyCache;

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = Paths.LOGIN_PATH, method = RequestMethod.POST)
    public ResponseMsg createAuthenticationToken(@RequestBody RestMessage login) throws AuthenticationException {

        String username = login.getString(FieldNames.USERNAME);
        String password = login.getString(FieldNames.PASSWORD);
        ResponseMsg responseMsg = ResponseMsg.new500ErrorResponse();

        if (!userValidator.validUsername(username)) {
            responseMsg = ResponseMsg.newResponse(ResultCode.INVALID_PARAMETER);
        } else {
            try {

                final UserCacheVo userDetails = userCaching.getByUsername(username);
                if (userDetails == null || !userDetails.getStatus().equals(Status.ACTIVE)) {
                    responseMsg = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);
                } else {
                    if (!userDetails.getPassword().equals(password)) {
                        responseMsg = ResponseMsg.newResponse(ResultCode.WRONG_PASSWORD);

                    }

                    final String token = jwtTokenUtil.generateToken(userDetails);
                    final String expire = DateFormatUtils.format(jwtTokenUtil.getExpirationDateFromToken(token), "yyyy-MM-dd'T'HH:mm:ss");
                    // Return the token

                    RestMessage loginRs = new RestMessage();
                    loginRs.put(FieldNames.TOKEN, token);
                    loginRs.put(FieldNames.EXPIRED, expire);
                    responseMsg = ResponseMsg.newOKResponse(loginRs);
                }

            } catch (Exception e) {
                logger.error("login failed {} error", login, e);
            }
        }


        logger.info("login done {}", responseMsg);
        return responseMsg;
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = Paths.CHANGE_PASSWORD_PATH, method = RequestMethod.POST)
    public ResponseMsg changePassword(@RequestBody RestMessage request) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        String username = request.getString(FieldNames.USERNAME);
        String oldPassword = request.getString(FieldNames.OLD_PASSWORD);
        String newPassword = request.getString(FieldNames.NEW_PASSWORD);
        Subject currentUser = SecurityUtils.getSubject();
        if (!currentUser.getPrincipal().toString().equals(username)) {
            response = ResponseMsg.newResponse(ResultCode.UNAUTHORIZED);
            return response;
        }
        if (!userValidator.validUsername(username)) {

            response = ResponseMsg.newResponse(ResultCode.INVALID_PARAMETER);

        } else {
            try {

                final AmUser userDetails = amUserRepository.findByUserName(username);
                userDetails.setModifiedPassword(new Date(System.currentTimeMillis()));
                if (!userDetails.getPassword().equals(oldPassword)) {
                    response = ResponseMsg.newResponse(ResultCode.WRONG_PASSWORD);
                    return response;
                }
                userDetails.setPassword(newPassword);
                if (amUserRepository.save(userDetails) != null) {
                    userCaching.removeUser(username);
                    userKeyCache.remove(username);

                    response = ResponseMsg.newOKResponse();
                }

            } catch (Exception e) {

                logger.error("change failed {} error", request, e);

            }
        }


        logger.info("change done {}", response);
        return response;
    }


    @RequestMapping(value = Paths.REFRESH_PATH, method = RequestMethod.GET)
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        UserCacheVo user = (UserCacheVo) userCaching.getByUsername(username);
        if (jwtTokenUtil.canTokenBeRefreshed(token, user.getModifiedPassword())) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            final String expire = DateFormatUtils.format(jwtTokenUtil.getExpirationDateFromToken(refreshedToken), "yyyy-MM-dd'T'HH:mm:ss");

            RestMessage loginRs = new RestMessage();
            loginRs.put(FieldNames.TOKEN, token);
            loginRs.put(FieldNames.EXPIRED, expire);
            return ResponseMsg.newOKResponse(FieldNames.AUTHENTICATION, loginRs);
        } else {
            return ResponseMsg.newResponse(ResultCode.UNAUTHORIZED);
        }
    }

}
