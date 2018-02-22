package DateUtil;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateFormatting {

    static DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_DATE_TIME;
    static String strDefaultDatewithTime = "1900-01-01T00:00:00";

    public static String getFormattedDate(LocalDateTime localDateTime)
    {
        return localDateTime.format(dateTimeFormatter);
    }

    public static LocalDateTime setToFormattedDate(String localDateString)
    {

        try
        {
            if(localDateString == null)
            {
                throw new Exception("null, converting to default : "+ strDefaultDatewithTime);
            }
            return LocalDateTime.parse(localDateString);
        }
        catch (Exception e) {
            System.out.println("Coult not parse :" + e.getMessage());
        }
        return LocalDateTime.parse(strDefaultDatewithTime);
    }
}
