package com.kp.core.spring.admin;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:securities.properties")
@PropertySource("classpath:regex_expression.properties")
@Configuration("PropertiesWithJavaConfig")
@ConfigurationProperties
public class PropertiesWithJavaConfig {

}
