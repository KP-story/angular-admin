package com.kp.core.spring.admin.controller.impl;

import com.kp.core.spring.admin.caching.RoleCache;
import com.kp.core.spring.admin.constants.AppResources;
import com.kp.core.spring.admin.constants.BaseOperations;
import com.kp.core.spring.admin.constants.ResultCode;
import com.kp.core.spring.admin.controller.BaseControler;
import com.kp.core.spring.admin.dao.SeResourceRepository;
import com.kp.core.spring.admin.entities.SeResource;
import com.kp.core.spring.admin.services.abs.AbstractSeResourceService;
import com.kp.core.spring.admin.services.impl.AuthorizationService;
import com.kp.core.spring.admin.utilities.DateUtils;
import com.kp.core.spring.admin.vo.ResponseMsg;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SeResourceController extends BaseControler<SeResource, java.lang.String, SeResourceRepository, AbstractSeResourceService> {

    @Autowired
    private AuthorizationService authorizationService;
    @Autowired
    private RoleCache roleCache;

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seResource/list", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.RESOURCE + BaseOperations.KING, AppResources.RESOURCE + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getSeResources(Pageable pageable) throws Exception {
        return findAll(pageable);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seResource/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @RequiresPermissions(value = {AppResources.RESOURCE + BaseOperations.KING, AppResources.RESOURCE + BaseOperations.S}, logical = Logical.OR)

    public ResponseMsg getDetailSeResource(@PathVariable("id") java.lang.String id) throws Exception {
        return super.getById(id);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seResource", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.RESOURCE + BaseOperations.KING, AppResources.RESOURCE + BaseOperations.I}, logical = Logical.OR)

    public ResponseMsg addSeResource(@Valid @RequestBody SeResource seResource) throws Exception {
        seResource.setCreatedTime(DateUtils.now());
        return create(seResource);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seResource/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.RESOURCE + BaseOperations.KING, AppResources.RESOURCE + BaseOperations.U}, logical = Logical.OR)

    public ResponseMsg updateSeResource(@PathVariable("id") java.lang.String id, @Valid @RequestBody SeResource seResource) throws Exception {
        return super.update(id, seResource);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/seResource/{id}", method = RequestMethod.DELETE, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    @RequiresPermissions(value = {AppResources.RESOURCE + BaseOperations.KING, AppResources.RESOURCE + BaseOperations.D}, logical = Logical.OR)

    public ResponseMsg deleteSeResource(@PathVariable("id") java.lang.String id) {
        return super.delete(id);
    }

    @RequiresPermissions(value = {AppResources.RESOURCE + BaseOperations.KING, AppResources.RESOURCE + BaseOperations.D}, logical = Logical.OR)
    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "seResource/multiple/delete", method = RequestMethod.POST)
    public ResponseMsg deleteResources(@RequestBody List<String> resources) throws AuthenticationException {

        ResponseMsg response = ResponseMsg.new500ErrorResponse();
        try {

            authorizationService.excuteDeleteResources(resources);

            response = ResponseMsg.newOKResponse();

        } catch (Exception e) {
            if (e instanceof DataIntegrityViolationException) {
                response = ResponseMsg.newResponse(ResultCode.OBJECT_HAS_RELATIONSHIPS);
            }
            getLogger().error("failed {} error", resources, e);
        } finally {
            roleCache.removeAll();
        }
        getLogger().info("done {}", response);
        return response;
    }

    @Override
    public void merge(SeResource newBean, SeResource currentBean) {

        currentBean.setName(newBean.getName());
        currentBean.setStatus(newBean.getStatus());

    }

    @Override
    public String getBeanName() {
        return "seResource";
    }
} 