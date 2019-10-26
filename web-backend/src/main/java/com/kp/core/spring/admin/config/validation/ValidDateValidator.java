package com.kp.core.spring.admin.config.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class ValidDateValidator implements ConstraintValidator<ValidDate, Date> {

    private Boolean isOptional;
    private String format;

    private static boolean isValidFormat(String format, Date value) {
        java.util.Date date = null;
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        if (value != null) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(value.getTime());
            String temp = sdf.format(calendar.getTime());
            try {
                date = sdf.parse(temp);
            } catch (Exception e) {
                date = null;
            }
            System.out.println(temp);
        }
        return date != null;
    }

    @Override
    public void initialize(ValidDate validDate) {
        this.isOptional = validDate.optional();
        this.format = validDate.dateTimeFormat();
    }

    @Override
    public boolean isValid(Date value, ConstraintValidatorContext constraintValidatorContext) {
        boolean validDate = isValidFormat(format, value);
        return isOptional ? (validDate) : validDate;
    }
}