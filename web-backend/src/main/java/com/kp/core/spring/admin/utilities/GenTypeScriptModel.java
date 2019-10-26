package com.kp.core.spring.admin.utilities;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class GenTypeScriptModel {


    private void createTypeScriptInterface(List<GenClass.MyEntity> entities, String path) throws IOException {
        String content;
        for (GenClass.MyEntity t : entities) {
            String tname = t.getClassName();
            String name = tname;
            content = "export class " + tname + "{ /n";
            for (GenClass.Param param : t.params) {


            }
            content = content + "}";
            File file = new File("./" + path + "/" + tname + ".model.ts");
            if (!file.exists()) {

                if (!file.createNewFile()) {
                    System.out.println("File already exists.");
                }
                FileWriter fileWriter = new FileWriter(file);
                fileWriter.write(content);
                fileWriter.flush();
                fileWriter.close();
            } else {
                System.out.println(file.getName() + "  already exists.");

            }
        }
    }
}
