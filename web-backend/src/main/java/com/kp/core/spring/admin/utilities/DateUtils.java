package com.kp.core.spring.admin.utilities;

import java.sql.Date;

public class DateUtils {
    public static Date now() {
        java.util.Date date = new java.util.Date();
        Date sqlDate = new Date(date.getTime());
        return sqlDate;
    }
}
