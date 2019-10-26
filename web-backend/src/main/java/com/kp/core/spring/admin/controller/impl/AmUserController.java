package com.kp.core.spring.admin.controller.impl;

import com.k.common.data.vo.VObject;
import com.kp.core.spring.admin.caching.RoleCache;
import com.kp.core.spring.admin.caching.UserCache;
import com.kp.core.spring.admin.caching.UserKeyCache;
import com.kp.core.spring.admin.constants.AppResources;
import com.kp.core.spring.admin.constants.BaseOperations;
import com.kp.core.spring.admin.constants.FieldNames;
import com.kp.core.spring.admin.constants.ResultCode;
import com.kp.core.spring.admin.controller.BaseControler;
import com.kp.core.spring.admin.dao.AmUserRepository;
import com.kp.core.spring.admin.entities.AmUser;
import com.kp.core.spring.admin.security.Sha1PasswordEncoder;
import com.kp.core.spring.admin.services.abs.AbstractAmUserService;
import com.kp.core.spring.admin.utilities.UserUtils;
import com.kp.core.spring.admin.vo.ResponseMsg;
import com.kp.core.spring.admin.vo.RestMessage;
import com.kp.core.spring.admin.vo.dto.AmUserVo;
import com.kp.core.spring.admin.vo.dto.UserCacheVo;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.auth.AuthenticationException;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AmUserController extends BaseControler<AmUser, Integer, AmUserRepository, AbstractAmUserService> {

    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private UserCache userCaching;

    @Autowired
    private RoleCache roleCache;
    @Autowired
    private UserKeyCache userKeyCache;
    private Sha1PasswordEncoder passwordEncoder = new Sha1PasswordEncoder();
    @Value("${spring.application.name}")
    private String appName;

    public void sendEmailCreateUserSuccess(
            String to, String password) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("You have signed up on " + appName);

        message.setText("You have created successful account on " + appName + ". Your password is " + password + " .You should change password for security reason.");
        emailSender.send(message);

    }

    public void sendEmailResetPassword(
            String to, String password) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("You have reset password  ");

        message.setText(" Your password is " + password + " .You should change password for security reason.");
        emailSender.send(message);

    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser/list", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.USER + BaseOperations.KING, AppResources.USER + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getAmUsers(Pageable pageable) throws Exception {
        return findAll(pageable);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser/search", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.USER + BaseOperations.KING, AppResources.USER + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg searchAmUser(Pageable pageable,AmUser amUser) throws Exception {
        return findByObject(amUser,pageable);
    }


    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.USER + BaseOperations.KING, AppResources.USER + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getDetailAmUser(@PathVariable("id") java.lang.Integer id) throws Exception {
        return super.getById(id);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser/detail", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
     public ResponseMsg getDetailAmUser(@RequestParam() java.lang.String username) throws Exception {

        Subject currentUser = SecurityUtils.getSubject();
        if (!currentUser.getPrincipal().equals(username)) {
            try {
                currentUser.checkPermission(AppResources.USER + BaseOperations.KING);

            } catch (Exception e) {
                currentUser.checkPermission(AppResources.USER + BaseOperations.S);

            }

        }

        return ResponseMsg.newOKResponse(getBeanName(),getService().findByUserName(username));
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.USER + BaseOperations.KING, AppResources.USER + BaseOperations.I}, logical = Logical.OR)

    public ResponseMsg addAmUser(@Valid @RequestBody AmUser amUser) {
        String randomPassword = RandomStringUtils.randomAlphanumeric(7) + 9;
        amUser.setPassword(passwordEncoder.encode(randomPassword));

        ResponseMsg responseMsg = create(amUser.getUserId(), amUser);
        if (responseMsg.isSuccess()) {
            sendEmailCreateUserSuccess(amUser.getEmail(), randomPassword);

        }
        return responseMsg;
    }


    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    public ResponseMsg updateAmUser(@PathVariable("id") java.lang.Integer id, @Valid @RequestBody AmUser amUser) throws Exception {

        Subject currentUser = SecurityUtils.getSubject();
        if (!currentUser.getPrincipal().equals(amUser.getUsername())) {
            try {
                currentUser.checkPermission(AppResources.USER + BaseOperations.KING);

            } catch (Exception e) {
                currentUser.checkPermission(AppResources.USER + BaseOperations.U);

            }

        }
        return super.update(id, amUser);
    }


    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser/{id}", method = RequestMethod.DELETE, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.USER + BaseOperations.KING, AppResources.USER + BaseOperations.D}, logical = Logical.OR)
    public ResponseMsg deleteUser(@RequestBody RestMessage request) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {
            AmUser amUserEntity = new AmUser();
            amUserEntity.setUsername(request.getString(FieldNames.USERNAME));


            if (getService().findByUserName(request.getString(FieldNames.USERNAME)) != null) {
                userCaching.removeUser(amUserEntity.getUsername());
                getService().delete(amUserEntity);

            } else {
                response = ResponseMsg.newOKResponse();

            }


        } catch (Exception e) {
            getLogger().error("failed {} error", request, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    @RequiresPermissions(value = {AppResources.USER + BaseOperations.KING, AppResources.USER + BaseOperations.S}, logical = Logical.OR)

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser/search", method = RequestMethod.POST)
    public ResponseMsg listUsers(@RequestBody RestMessage request) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {

            int rowsInPage = request.getInteger(FieldNames.ROWS_IN_PAGE, 30);
            int fistIndex = request.getInteger(FieldNames.FIRST_INDEX, 0);
            VObject condition = request.getAndCastVObject(FieldNames.CONDITIONS);

            String username = condition.getString(FieldNames.USERNAME);
            String fullname = condition.getString(FieldNames.FULLNAME);
            String email = condition.getString(FieldNames.EMAIL);
            String phone = condition.getString(FieldNames.PHONE);
            int status = condition.containsKey(FieldNames.STATUS) ? condition.getInteger(FieldNames.STATUS) : -1;
            Pageable pageable = PageRequest.of(fistIndex, rowsInPage);
            Page<AmUserVo> amUserEntitys = getService().searchUser(username, fullname, phone, email, status, pageable);
            RestMessage restMessage = new RestMessage();
            restMessage.put(FieldNames.TOTAL, amUserEntitys.getTotalElements());
            restMessage.put(FieldNames.USERS, amUserEntitys.getContent());
            response = ResponseMsg.newOKResponse(restMessage);


        } catch (Exception e) {
            getLogger().error("failed {} error", request, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    @CrossOrigin(origins = "/**")
    @RequiresPermissions(value = {AppResources.USER + BaseOperations.KING, AppResources.USER + BaseOperations.U}, logical = Logical.OR)

    @RequestMapping(value = "/amUser/resetPassword", method = RequestMethod.POST)
    public ResponseMsg resetPassword(@RequestBody RestMessage request) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {
            String username = request.getString(FieldNames.USERNAME);
            String randomPassword = RandomStringUtils.randomAlphanumeric(7) + 3;

            AmUser amUserEntity = getService().findByUserName(username);
            if (amUserEntity != null) {

                amUserEntity.setPassword(passwordEncoder.encode(randomPassword));
                AmUser savedUser = getService().save(amUserEntity);
                if (savedUser != null) {
                    sendEmailResetPassword(amUserEntity.getEmail(), randomPassword);
                    userCaching.removeUser(amUserEntity.getUsername());
                    userKeyCache.remove(username);
                    response = ResponseMsg.newOKResponse();
                }


            } else {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);

            }


        } catch (Exception e) {
            getLogger().error("failed {} error", request, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    @RequiresPermissions(value = {AppResources.USER + BaseOperations.KING, AppResources.USER + BaseOperations.D}, logical = Logical.OR)
    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser/multiple/delete", method = RequestMethod.POST)
    public ResponseMsg deleteMultiUsers(@RequestBody List<String> users) throws AuthenticationException {
         ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {

             getService().deleteByUsernames(users);
            response = ResponseMsg.newOKResponse();
        } catch (Exception e) {
            getLogger().error("failed {} error", users, e);
        } finally {

            if (users != null) {
                userCaching.removeMultiUsers(users);
            }

        }
        getLogger().info("done {}", response);
        return response;
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/amUser/getPermissions", method = RequestMethod.GET)
    public ResponseMsg getUserPermission(@RequestParam String username) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {

            Subject currentUser = SecurityUtils.getSubject();
            if (!currentUser.getPrincipal().equals(username)) {
                try {
                    currentUser.checkPermission(AppResources.USER + BaseOperations.KING);

                } catch (Exception e) {
                    currentUser.checkPermission(AppResources.USER + BaseOperations.U);

                }

            }
            UserCacheVo amUserEntity = userCaching.getByUsername(username);
            RestMessage restMessage = new RestMessage();
            restMessage.put(FieldNames.PERMISSIONS, UserUtils.getPermissionOfUser(amUserEntity, roleCache));
            response = ResponseMsg.newOKResponse(restMessage);
        } catch (Exception e) {
            getLogger().error("failed {} error", username, e);
        }
        getLogger().info("done {}", response);
        return response;
    }


    @Override
    public void merge(AmUser newBean, AmUser currentBean) {
        currentBean.setAddress(newBean.getAddress());
        currentBean.setFullname(newBean.getFullname());
        currentBean.setEmail(newBean.getEmail());
        currentBean.setPhone(newBean.getPhone());
        currentBean.setStatus(newBean.getStatus());

    }


    @Override
    public String getBeanName() {
        return "amUser";
    }
} 