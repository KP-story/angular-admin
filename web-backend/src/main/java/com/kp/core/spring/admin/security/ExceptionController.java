package com.kp.core.spring.admin.security;


import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.k.common.log.Loggable;
import com.kp.core.spring.admin.config.exception.CommandFailureException;
import com.kp.core.spring.admin.constants.FieldNames;
import com.kp.core.spring.admin.constants.ResultCode;
import com.kp.core.spring.admin.vo.ResponseMsg;
import org.apache.shiro.ShiroException;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionController implements Loggable {
    // Catch CommandFailureException
    @ExceptionHandler(CommandFailureException.class)
    public ResponseMsg handleLogicException(CommandFailureException e) {
        ResponseMsg restMessage = ResponseMsg.newResponse(e.getHttpStatus(), e.getCode(), e.getDesc());
        return restMessage;
    }

    // Catch Other Exception
    @ExceptionHandler(Exception.class)
    public ResponseMsg globalException(HttpServletRequest request, Throwable ex) {
        getLogger().error("Unknown exception ", ex);
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.INTERNAL_SERVER_ERROR);
        return restMessage;
    }

    // Catch Other ServletException
    @ExceptionHandler(ServletException.class)
    public ResponseMsg servletException(HttpServletRequest request, Throwable ex) {
        getLogger().error("All error in servlet  exception ", ex);
        ResponseMsg restMessage = ResponseMsg.newResponse(getStatus(request), ex.getMessage());
        return restMessage;
    }

    // Catch UnauthorizedException
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseMsg handle401() {
        getLogger().error("unauthorized");

        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.UNAUTHORIZED);
        return restMessage;
    }

    @ExceptionHandler(ShiroException.class)
    public ResponseMsg handle4012() {
        getLogger().error("unauthorized");

        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.UNAUTHORIZED);
        return restMessage;
    }

    @ExceptionHandler(org.apache.shiro.authz.AuthorizationException.class)
    public ResponseMsg unauthorized2() {
        getLogger().error("unauthorized");

        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.UNAUTHORIZED);
        return restMessage;
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseMsg unauthorized() {
        getLogger().error("unauthorized");

        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.UNAUTHORIZED);
        return restMessage;
    }

    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public ResponseMsg forbidden() {
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.PERMISSION_DENIED);
        return restMessage;
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseMsg notFound() {
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.NOT_FOUND);
        return restMessage;
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseMsg missingParameter(MissingServletRequestParameterException e) {
        getLogger().error("MissingParameter: ", e);
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.MISSING_PARAMETER, e.getParameterName() + ": " + e.getMessage());
        return restMessage;
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseMsg accessDeniedException(HttpServletRequest request, Throwable ex) {
        getLogger().error("AccessDeniedException ", ex);
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.PERMISSION_DENIED);
        return restMessage;
    }

    /*HuongNV*/
    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseMsg handleConstraintViolation(ConstraintViolationException ex, WebRequest request) {
        getLogger().error("ConstraintViolationException ", ex);
        Map<String, String> errors = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.put(violation.getRootBeanClass().getName() + " " + violation.getPropertyPath() + ": " + violation.getMessage(), "");
        }
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.CONSTRAIN_VIOLATION, ex.getMessage());
        return restMessage;
    }

    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseMsg handleEntityNotFound(EntityNotFoundException ex) {
        getLogger().error("EntityNotFound ", ex);
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.NOT_FOUND, ex.getMessage());
        return restMessage;
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    public ResponseMsg handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex, WebRequest request) {
        getLogger().error("MethodArgumentTypeMismatch ", ex);
        String error = ex.getName() + " should be of type " + ex.getRequiredType().getName();
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.METHOD_ARGUMENT_TYPE_MISMATCH, error);
        return restMessage;
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseMsg handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        getLogger().error("RequestMethodNotSupported ", ex);
        StringBuilder builder = new StringBuilder();
        builder.append(ex.getMethod());
        builder.append(" method is not supported for this request. Supported methods are ");
        ex.getSupportedHttpMethods().forEach(t -> builder.append(t + " "));
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.METHOD_ARGUMENT_TYPE_MISMATCH, builder.toString());
        return restMessage;
    }

    /*End*/
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseMsg paramInvalid(MethodArgumentNotValidException e) {
        getLogger().error("ParamInvalid: ", e);
        Map<String, String> errors = new HashMap<>();

        for (FieldError error : e.getBindingResult().getFieldErrors()) {
//            errors.put(error.getField() + ": " + error.getDefaultMessage(), "");
            errors.put(error.getDefaultMessage(), "");
        }

        for (ObjectError objectError : e.getBindingResult().getAllErrors()) {
            errors.put(objectError.getDefaultMessage(), "");
        }
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.INVALID_PARAMETER, "detailError", errors.keySet());
        return restMessage;
    }


    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseMsg invalidDataType(HttpMessageNotReadableException e) {
        getLogger().error("InvalidDataType: ", e);
        Object obj = e.getCause();

        if (obj instanceof InvalidFormatException) {
            InvalidFormatException invalidFormatException = (InvalidFormatException) obj;
            if (invalidFormatException.getPath() != null && !invalidFormatException.getPath().isEmpty()) {
                String[] err = {invalidFormatException.getPath().get(0).getFieldName() + "-> Invalid data type"};
                return ResponseMsg.newResponse(ResultCode.INVALID_PARAMETER, FieldNames.DETAIL_ERRORS, err);
            }
        }
        ResponseMsg restMessage = ResponseMsg.newResponse(ResultCode.INVALID_PARAMETER);
        return restMessage;
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseMsg handleDataIntegrityViolationException(HttpServletRequest request, Exception ex) {
        getLogger().error(ex.getMessage());
        return ResponseMsg.newResponse(ResultCode.INVALID_PARAMETER, "detailError", ex);
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.valueOf(statusCode);
    }
}