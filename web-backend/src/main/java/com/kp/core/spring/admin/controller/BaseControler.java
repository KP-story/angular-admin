package com.kp.core.spring.admin.controller;


import com.k.common.log.Loggable;
import com.kp.core.spring.admin.constants.FieldNames;
import com.kp.core.spring.admin.constants.ResultCode;
import com.kp.core.spring.admin.dao.BaseRepo;
import com.kp.core.spring.admin.services.CURDService;
import com.kp.core.spring.admin.vo.ResponseMsg;
import com.kp.core.spring.admin.vo.RestMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.time.LocalDateTime;


public abstract class BaseControler<Bean, ID, Repo extends BaseRepo<Bean, ID>, Service extends CURDService<Bean, ID, Repo>> implements Loggable {
    @Autowired
    Service service;

    public abstract String getBeanName();

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public ResponseMsg create(ID id, Bean bean) {
        try {
            if (id != null && getService().existsById(id)) {
                return ResponseMsg.newResponse(ResultCode.OBJECT_EXISTED);
            } else {
                if (getService().saveBean(bean)) {
                    return ResponseMsg.newOKResponse(bean.getClass().getSimpleName(), bean);
                } else {
                    return ResponseMsg.new500ErrorResponse();
                }
            }
        } catch (Exception e) {
            getLogger().error("CREATE", e.getMessage());
            return ResponseMsg.new500ErrorResponse();
        }
    }

    public ResponseMsg create(Bean bean) {
        if (service.saveBean(bean)) {
            return ResponseMsg.newOKResponse(bean.getClass().getSimpleName(), bean);
        } else {
            return ResponseMsg.new500ErrorResponse();
        }
    }

    public ResponseMsg delete(ID id) {
        try {
            if (id != null && getService().existsById(id)) {
                if (getService().deleteById2(id)) {
                    return ResponseMsg.newOKResponse();
                } else {
                    return ResponseMsg.new500ErrorResponse();
                }
            } else {
                return ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);
            }
        } catch (Exception e) {
            getLogger().error("DELETE: " + e.getMessage());
            return ResponseMsg.new500ErrorResponse();
        }
    }

    public ResponseMsg findAll() throws Exception {
        return ResponseMsg.newOKResponse(getBeanName(), getService().findAll());
    }

    public ResponseMsg findAll(Pageable pageable) throws Exception {
        RestMessage restMessage= new RestMessage();

        Iterable<Bean> data;
        if(pageable==null)
        {
          data=  getService().findAll();
        }else
        {
          Page<Bean> beans= getService().findAll(pageable);
            data=beans.getContent();
            restMessage.put(FieldNames.TOTAL_ELEMENT,beans.getTotalElements());
            restMessage.put(FieldNames.TOTAL_PAGE,beans.getTotalPages());
            restMessage.put(FieldNames.SIZE,beans.getSize());
            restMessage.put(FieldNames.PAGEABLE,beans.getPageable());
        }
        restMessage.put(getBeanName(),data);
        return ResponseMsg.newOKResponse(restMessage);
    }

    public ResponseMsg findByObject(Bean bean) throws Exception {
        return ResponseMsg.newOKResponse(getBeanName(), getService().findByObject(bean));
    }

    public ResponseMsg findByObject(Bean bean, Pageable pageable) throws Exception {
        return ResponseMsg.newOKResponse(getBeanName(), getService().findByObject(bean, pageable));
    }

    public ResponseMsg getById(ID id) throws Exception {
        return ResponseMsg.newOKResponse(getBeanName(), getService().findById(id));
    }

    public abstract void merge(Bean newBean, Bean currentBean);

    public ResponseMsg update(ID id, Bean bean) throws Exception {
        if (id != null && getService().existsById(id)) {
            Bean currentBean = getService().findById(id);
            merge(bean, currentBean);
            if (getService().saveBean(currentBean)) {
                return ResponseMsg.newOKResponse();
            } else {
                return ResponseMsg.new500ErrorResponse();
            }
        } else {
            return ResponseMsg.newResponse(ResultCode.OBJECT_NOT_EXIST);
        }
    }

    protected Timestamp getCurrTimestamp() {
        java.util.Date date = new java.util.Date();
        Timestamp timestamp = new Timestamp(date.getTime());
        return timestamp;
    }

    protected Timestamp getCurrSqlTimestamp() {
        LocalDateTime localDateTime = LocalDateTime.now();
        Timestamp timestamp = Timestamp.valueOf(localDateTime);
        return timestamp;
    }
}
