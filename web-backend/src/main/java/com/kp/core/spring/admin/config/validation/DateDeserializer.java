package com.kp.core.spring.admin.config.validation;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class DateDeserializer extends StdDeserializer<Timestamp> {

    /**
     *
     */
    private static final long serialVersionUID = -8465617556121097358L;
    String DATETIME_FORMAT;

    protected DateDeserializer(Class<Timestamp> valueType) {
        super(valueType);
    }
    public DateDeserializer() {
        this(null);
    }

    @Override
    public Timestamp deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        // TODO Auto-generated method stub
        DateFormat dateFormat = new SimpleDateFormat(DATETIME_FORMAT);
        dateFormat.setLenient(false);
        String strDate = parser.getText();
        try {
            java.util.Date date = dateFormat.parse(strDate);
            Calendar.getInstance().setTime(date);
            System.out.println("===========" + strDate);
            System.out.println(date.toString());
            System.out.println("---------------" + Calendar.getInstance().get(Calendar.YEAR));

            if (Calendar.getInstance().get(Calendar.YEAR) > 9999 || Calendar.getInstance().get(Calendar.YEAR) < 1900) {
                throw new Exception("Invalid datetime");
            }
            return new Timestamp(date.getTime());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}

