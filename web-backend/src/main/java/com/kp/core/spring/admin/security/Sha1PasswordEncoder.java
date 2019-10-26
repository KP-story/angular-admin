package com.kp.core.spring.admin.security;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Sha1PasswordEncoder implements PasswordEncoder {
    @Bean()
    @Qualifier(value = "SHA1")
    PasswordEncoder getPasswordEncoder() {
        return new Sha1PasswordEncoder();
    }

    @Override
    public String encode(CharSequence charSequence) {
        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA1");
            byte[] encodedhash = digest.digest(charSequence.toString().getBytes());
            ;
            return Base64.getEncoder().encodeToString(encodedhash);

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;

    }

    @Override
    public boolean matches(CharSequence charSequence, String s) {
        return false;
    }
}
