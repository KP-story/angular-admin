package com.kp.core.spring.admin.security.rolebased.realm;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kp.core.spring.admin.constants.ResultCode;
import com.kp.core.spring.admin.security.jwt.JwtTokenUtil;
import com.kp.core.spring.admin.vo.ResponseMsg;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JWTFilter extends BasicHttpAuthenticationFilter {

    /**
     *
     */

    JwtTokenUtil jwtTokenUtil;
    private Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    public JWTFilter(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    /**
     * Judge if the user wanna login or not
     */
    @Override
    protected boolean isLoginAttempt(ServletRequest request, ServletResponse response) {
        HttpServletRequest req = (HttpServletRequest) request;
        String authorization = req.getHeader("Authorization");
        return authorization != null;
    }

    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String authorization = httpServletRequest.getHeader("Authorization");
        String authToken;
        if (authorization != null && authorization.startsWith("Bearer ")) {
            authToken = authorization.substring(7);
            String username = jwtTokenUtil.getUsernameFromToken(authToken);
            JWTToken token = new JWTToken(username, authToken);
            getSubject(request, response).login(token);
            return true;
        }
        return false;
    }


    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {


        try {
            if (!executeLogin(request, response)) {
                throw new UnauthorizedException();
            }
        } catch (Exception e) {
            response401(request, response);

        }

        return true;
    }

    private void response401(ServletRequest req, ServletResponse resp) {
        try {


            HttpServletResponse httpServletResponse = (HttpServletResponse) resp;
            ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.UNAUTHORIZED);
            httpServletResponse.setStatus(restMessage.getStatusCodeValue());
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(resp.getOutputStream(), restMessage.getBody());
            resp.getOutputStream().flush();
        } catch (IOException e) {
            LOGGER.error(e.getMessage());
        }
    }

    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.setHeader("Access-control-Allow-Origin", httpServletRequest.getHeader("Origin"));
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", httpServletRequest.getHeader("Access-Control-Request-Headers"));
        if (httpServletRequest.getMethod().equals(RequestMethod.OPTIONS.name())) {
            httpServletResponse.setStatus(HttpStatus.OK.value());
            return false;
        }
        return super.preHandle(request, response);
    }


}
