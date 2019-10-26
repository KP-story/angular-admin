package com.kp.core.spring.admin.vo;


import com.kp.core.spring.admin.config.exception.CommandFailureException;
import com.kp.core.spring.admin.constants.FieldNames;
import com.kp.core.spring.admin.constants.ResultCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.util.MultiValueMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ResponseMsg extends ResponseEntity<ResponseMsg.WrapContent> {
    private static final String DETAIL_ERR = "detailError";
    private static final String REGEX_DETAIL_ERROR = "interpolatedMessage='([a-zA-Z0-9_]+)'";
    private static final String REGEX_CONSTRAINT_ERROR = "constraint\\s\\[([a-zA-Z0-9_]+)\\]";

    protected ResponseMsg(HttpStatus status) {
        super(status);
    }


    protected ResponseMsg(@Nullable WrapContent body, HttpStatus status) {
        super(body, status);
    }


    protected ResponseMsg(@Nullable WrapContent body, @Nullable MultiValueMap<String, String> headers, HttpStatus status) {
        super(body, headers, status);
    }

    protected ResponseMsg(MultiValueMap<String, String> headers, HttpStatus status) {
        super(headers, status);
    }

    public static ResponseMsg newDtlErrResponse(ResultCode resultCode, Object body) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(resultCode, DETAIL_ERR, new Object[]{body});
        return new ResponseMsg(wrapContent, resultCode.getHttpStatus());
    }

    public static ResponseMsg newResponse(ResultCode resultCode, String dataName, Object body) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(resultCode, dataName, body);
        return new ResponseMsg(wrapContent, resultCode.getHttpStatus());
    }

    //ChienDX xử lý trả về kết quả theo exception
    public static ResponseMsg newResponse(ResultCode resultCode, String dataName, Exception ex) {
        String strEx = ex.getMessage();
        List<String> body = new ArrayList<>();

        if (strEx != null && strEx.contains("Validation failed for classes")) {
            Pattern pattern = Pattern.compile(REGEX_DETAIL_ERROR);
            Matcher matcher = pattern.matcher(strEx);

            while (matcher.find()) {
                body.add(matcher.group(1));
            }
        }

        if (strEx != null && strEx.contains("ConstraintViolationException")) {
            Pattern pattern = Pattern.compile(REGEX_CONSTRAINT_ERROR);
            Matcher matcher = pattern.matcher(strEx);

            while (matcher.find()) {
                body.add(matcher.group(1).toUpperCase());
            }
        }

        if (ex instanceof CommandFailureException) {
            body.add(((CommandFailureException) ex).getDesc());
        }

        WrapContent<Object> wrapContent = new WrapContent<Object>(resultCode, dataName, body);
        return new ResponseMsg(wrapContent, resultCode.getHttpStatus());
    }

    public static ResponseMsg newResponse(ResultCode resultCode) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(resultCode);
        return new ResponseMsg(wrapContent, resultCode.getHttpStatus());
    }

    public static ResponseMsg newResponse(HttpStatus httpStatus, String message) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(message);
        return new ResponseMsg(wrapContent, httpStatus);
    }

    public static ResponseMsg newResponse(ResultCode resultCode, Object body) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(resultCode, body);
        return new ResponseMsg(wrapContent, resultCode.getHttpStatus());
    }

    public static ResponseMsg newResponse(HttpStatus httpStatus, String resultCode, String message) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(resultCode, message);
        return new ResponseMsg(wrapContent, httpStatus);
    }

    public static ResponseMsg newResponse(ResultCode resultCode, String exDescription) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(resultCode.getCode(), exDescription);
        return new ResponseMsg(wrapContent, resultCode.getHttpStatus());
    }

    public static ResponseMsg newOKResponse() {
        WrapContent<Object> wrapContent = new WrapContent<Object>(ResultCode.SUCCESS);
        return new ResponseMsg(wrapContent, ResultCode.SUCCESS.getHttpStatus());
    }

    public static ResponseMsg newOKResponse(RestMessage data) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(ResultCode.SUCCESS, data);
        return new ResponseMsg(wrapContent, ResultCode.SUCCESS.getHttpStatus());
    }

    public static ResponseMsg newOKResponse(Object body) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(ResultCode.SUCCESS, body);
        return new ResponseMsg(wrapContent, ResultCode.SUCCESS.getHttpStatus());
    }

    public static ResponseMsg newOKResponse(String dataName, Object body) {
        WrapContent<Object> wrapContent = new WrapContent<Object>(ResultCode.SUCCESS, dataName, body);
        return new ResponseMsg(wrapContent, ResultCode.SUCCESS.getHttpStatus());
    }

    public static ResponseMsg new500ErrorResponse() {
        WrapContent<Object> wrapContent = new WrapContent<Object>(ResultCode.INTERNAL_SERVER_ERROR);
        return new ResponseMsg(wrapContent, ResultCode.INTERNAL_SERVER_ERROR.getHttpStatus());
    }

    public boolean isSuccess() {
        return this.getBody().get(FieldNames.RESULT_CODE).equals(ResultCode.SUCCESS.getCode());

    }

    protected static class WrapContent<T> extends HashMap<String, Object> {

        public WrapContent(ResultCode resultCode) {
            put(FieldNames.RESULT_CODE, resultCode.getCode());
            put(FieldNames.RESULT_MSG, resultCode.getDesc());
        }

        public WrapContent(ResultCode resultCode, RestMessage objectMap) {
            put(FieldNames.RESULT_CODE, resultCode.getCode());
            put(FieldNames.RESULT_MSG, resultCode.getDesc());
            putAll(objectMap);
        }

        public WrapContent(String code, String message) {
            put(FieldNames.RESULT_CODE, code);
            put(FieldNames.RESULT_MSG, message);

        }

        public WrapContent(String message) {
            put(FieldNames.RESULT_CODE, ResultCode.OTHER_SERVLET_ERROR.getCode());
            put(FieldNames.RESULT_MSG, message);
        }

        public WrapContent(ResultCode resultCode, T content) {
            this(resultCode);
            String name = FieldNames.DATA;
            put(name, content);
        }

        public WrapContent(ResultCode resultCode, String fieldNames, T content) {
            this(resultCode);
            put(fieldNames, content);
        }
    }
}
