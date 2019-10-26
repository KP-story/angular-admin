package com.kp.core.spring.admin.utilities;

import java.lang.reflect.Method;

public class ObjectUtils {
    public static <T> T getValueByMenthod(String name, Object object) throws Exception {
        Method method = object.getClass().getMethod(name);
        return (T) method.invoke(object);
    }


}
