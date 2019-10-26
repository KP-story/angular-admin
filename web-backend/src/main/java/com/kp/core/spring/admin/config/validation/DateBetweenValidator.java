package com.kp.core.spring.admin.config.validation;


import com.kp.core.spring.admin.utilities.ObjectUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.sql.Date;

public class DateBetweenValidator implements
        ConstraintValidator<DateBetweenConstraint, Object> {
    private String beforeFieldName;
    private String afterFieldName;

    @Override
    public void initialize(DateBetweenConstraint constraintAnnotation) {
        this.beforeFieldName = constraintAnnotation.beforeFieldName();
        this.afterFieldName = constraintAnnotation.afterFieldName();
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        try {
            Date before = ObjectUtils.<Date>getValueByMenthod(beforeFieldName, o);
            Date after = ObjectUtils.<Date>getValueByMenthod(afterFieldName, o);
            boolean isA = before.before(after);
            return isA;
        } catch (Exception e) {
            return false;
        }

    }

}
