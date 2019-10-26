package com.kp.core.spring.admin.utilities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UserValidator {

    @Value("${valid.username}")
    public String username_regex;
    @Value("${valid.password}")
    public String password_regex;

    public static void main(String[] args) {
        System.out.println("thunt123".matches("^[a-zA-Z\\d]*$"));
    }

    public boolean validUsername(String username) {
        if (username != null && username.matches(username_regex)) {
            return true;
        }
        return false;

    }

    public boolean validPassword(String password) {

        if (password != null && password.matches(password_regex)) {
            return true;
        }
        return false;
    }
}
