package com.kp.core.spring.admin.services;

public interface CustomService<Repository> {
    Repository getRepository();
}