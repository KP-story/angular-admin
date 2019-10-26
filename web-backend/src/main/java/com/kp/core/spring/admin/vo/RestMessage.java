package com.kp.core.spring.admin.vo;

import com.k.common.data.vo.VObject;
import com.kp.core.spring.admin.constants.FieldNames;
import com.kp.core.spring.admin.constants.ResultCode;

public class RestMessage extends VObject {


    public RestMessage(String transId, String command) {
        put(FieldNames.TRANS_ID, transId);
        put(FieldNames.COMMAND, command);
    }

    public RestMessage(String command) {
        put(FieldNames.COMMAND, command);
    }

    public RestMessage() {
    }

    public RestMessage(ResultCode resultCode) {
        setResultCode(resultCode);
    }

    public static RestMessage newDetailError(String... errors) {
        RestMessage restMessage = new RestMessage();
        restMessage.put(FieldNames.DETAIL_ERRORS, errors);
        return restMessage;
    }

    @Override
    public Object put(String key, Object value) {
        if (value == null) {
            return null;
        }
        return super.put(key, value);
    }

    public RestMessage createResponse(int resultCode) {
        RestMessage response = new RestMessage();
        response.put(FieldNames.TRANS_ID, getId());
        response.put(FieldNames.COMMAND, getCommand());
        response.put(FieldNames.RESULT_CODE, resultCode);
        return response;

    }

    public RestMessage createResponse(ResultCode resultCode) {
        RestMessage response = new RestMessage();
        response.put(FieldNames.TRANS_ID, getId());
        response.put(FieldNames.COMMAND, getCommand());
        response.setResultCode(resultCode);
        return response;

    }

    public void setResultCode(ResultCode resultCode) {
        put(FieldNames.RESULT_CODE, resultCode.getCode());
        put(FieldNames.DESCRIPTION, resultCode.getDesc());


    }

    public void setResultCode(ResultCode resultCode, String moreInfor) {
        put(FieldNames.RESULT_CODE, resultCode.getCode());
        put(FieldNames.DESCRIPTION, moreInfor + " " + resultCode.getDesc());


    }

    public void setResultCode(String code, String description) {
        put(FieldNames.RESULT_CODE, code);
        put(FieldNames.DESCRIPTION, description);


    }

    public String getCommand() {
        return getString(FieldNames.COMMAND);
    }

    public void setTransId(String transId) {
        put(FieldNames.TRANS_ID, transId);
    }

    public String getId() {
        return getString(FieldNames.TRANS_ID);
    }


    public long getCreatedTime() {
        return getLong(FieldNames.CREATED_TIME);
    }

    public void setCreatedTime(long time) {
        put(FieldNames.CREATED_TIME, time);
    }

    public long getFinishedTime() {
        return getLong(FieldNames.FINISHED_TIME);
    }
}
