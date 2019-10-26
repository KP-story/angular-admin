package com.kp.core.spring.admin.constants;

import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * Created by kukubutukandy on 09/05/2017.
 */
public enum ResultCode {

    SUCCESS(Code.SUCCESS, "SUCCESS", HttpStatus.OK),
    INTERNAL_SERVER_ERROR(Code.INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED(Code.UNAUTHORIZED, "UNAUTHORIZED", HttpStatus.UNAUTHORIZED),
    PERMISSION_DENIED(Code.PERMISSION_DENIED, "ACCESS DENIED", HttpStatus.FORBIDDEN),
    OTHER_SERVLET_ERROR(Code.OTHER_SERVLET_ERROR, "OTHER_SERVLET_ERROR", HttpStatus.INTERNAL_SERVER_ERROR),
    TIMEOUT_ERROR(Code.TIMEOUT_ERROR, "TIMEOUT_ERROR", HttpStatus.REQUEST_TIMEOUT),
    LOST_CONNECTION_ERROR(Code.LOST_CONNECTION_ERROR, "LOST_CONNECTION_ERROR", HttpStatus.SERVICE_UNAVAILABLE),
    MISSING_PARAMETER(Code.MISSING_PARAMETER, "MISSING PARAMETER", HttpStatus.BAD_REQUEST),
    INVALID_PARAMETER(Code.INVALID_PARAMETER, "INVALID PARAMETER", HttpStatus.BAD_REQUEST),
    NOT_FOUND(Code.NOT_FOUND, "API NOT FOUND", HttpStatus.NOT_FOUND),
    METHOD_ARGUMENT_TYPE_MISMATCH(Code.METHOD_ARGUMENT_TYPE_MISMATCH, "API NOT FOUND", HttpStatus.BAD_REQUEST),
    REQUEST_METHOD_NOT_SUPPORTED(Code.REQUEST_METHOD_NOT_SUPPORTED, "API NOT FOUND", HttpStatus.BAD_REQUEST),
    CONSTRAIN_VIOLATION(Code.CONSTRAIN_VIOLATION, "CONSTRAIN_VIOLATION", HttpStatus.METHOD_NOT_ALLOWED),
    OBJECT_NOT_EXIST(Code.OBJECT_NOT_EXIST, "OBJECT_NOT_EXIST", HttpStatus.OK),
    OBJECT_EXISTED(Code.OBJECT_EXISTED, "OBJECT_EXISTED", HttpStatus.OK),
    OBJECT_HAS_RELATIONSHIPS(Code.OBJECT_HAS_RELATIONSHIPS, "OBJECT HAS RELATIONSHIPS", HttpStatus.BAD_REQUEST),
    WRONG_PASSWORD(Code.WRONG_PASSWORD, "WRONG_PASSWORD", HttpStatus.OK),;


    private final String code;
    private final String desc;
    private final HttpStatus httpStatus;

    ResultCode(String code, String desc, HttpStatus httpStatus) {
        this.code = code;
        this.desc = desc;
        this.httpStatus = httpStatus;
    }

    public static void main(String[] args) throws IOException {
        File file = new File("/home/khanh/resultcode.txt");
        if (file.createNewFile()) {
            System.out.println("File is created!");
        } else {
            System.out.println("File already exists.");
        }
        FileWriter fileWriter = new FileWriter(file);
        fileWriter.write("CODE,EXTENTSION_CODE,DESCRIPTION" + "\n\r");
        for (ResultCode resultCode : ResultCode.values()) {
            fileWriter.write(resultCode.getCode() + "," + resultCode.getHttpStatus().value() + "," + resultCode.getDesc() + "\n\r");
        }
        fileWriter.flush();
        fileWriter.close();
    }

    public static final String fromDesc(String code) {
        for (ResultCode e : values()) {
            if (e.getCode().equalsIgnoreCase(code)) {
                return e.getDesc();
            }
        }
        return null;
    }

    public static final ResultCode fromCode(String code) {
        for (ResultCode e : values()) {
            if (e.getCode().equalsIgnoreCase(code)) {
                return e;
            }
        }
        return ResultCode.INTERNAL_SERVER_ERROR;
    }

    public static final ResultCode fromExCode(int code) {
        for (ResultCode e : values()) {
            if (e.getHttpStatus().value() == code) {
                return e;
            }
        }
        return null;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getCode() {
        return this.code;
    }

    public String getDesc() {
        return this.desc;
    }

    public interface Code {
        String SUCCESS = "0";
        String TIMEOUT_ERROR = "ERR-100";
        String LOST_CONNECTION_ERROR = "ERR-200";
        String INTERNAL_SERVER_ERROR = "ERR-500";
        String UNAUTHORIZED = "ERR-401";
        String PERMISSION_DENIED = "ERR-1001";
        String OTHER_SERVLET_ERROR = "ERR-1002";
        String MISSING_PARAMETER = "ERR-1003";
        String INVALID_PARAMETER = "ERR-1004";
        String NOT_FOUND = "ERR-1005";
        String CONSTRAIN_VIOLATION = "ERR-1006";
        String METHOD_ARGUMENT_TYPE_MISMATCH = "ERR-1007";
        String REQUEST_METHOD_NOT_SUPPORTED = "ERR-1008";
        String OBJECT_EXISTED = "ERR-1009";
        String OBJECT_NOT_EXIST = "ERR-1010";
        String RESOURCES_NOT_EXIST = "ERR-1011";
        String ROLE_NOT_EXIST = "ERR-1012";
        String USER_NOT_EXIST = "ERR-1013";
        String OBJECT_HAS_RELATIONSHIPS = "ERR-1014";
        String WRONG_PASSWORD = "ERR-1015";
    }
}
