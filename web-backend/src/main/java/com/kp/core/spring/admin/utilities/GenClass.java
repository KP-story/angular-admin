package com.kp.core.spring.admin.utilities;

import com.kp.generator.spring.GenAngularModelClass;
import com.kp.generator.spring.GenSpringClass;
import org.apache.commons.lang3.text.WordUtils;
import org.reflections.Reflections;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

// co the dung StringBuilder nhung met bo me di dc

public class GenClass {


    public static void main(String[] args) throws Exception {
        GenSpringClass.gen("com.kp.core.spring.admin.entities","com/kp/core/spring/admin");

    }

}
