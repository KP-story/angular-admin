package com.kp.core.spring.admin.constants;

public class Const {
    public static interface DFT {
        //date-format
        String DATETIME_FORMAT = "dd/MM/yyyy HH:mm:ss";
        //date
        String DATE_FORMAT = "dd/MM/yyyy";
    }

    public static final class BEAN {
        public static final String PROVINCE = "province";
        public static final String DISTRICT = "district";
        public static final String COMMUNE = "commune";
        public static final String BANK = "bank";
        public static final String USERS = "users";
        public static final String VEHICLE_TYPE = "vehicleType";
        public static final String VEHICLE_PRIORITIZE = "vehiclePrioritize";
        public static final String BOT = "bot";
        public static final String STATION = "station";
        public static final String ROUTE = "route";
        public static final String STAGES = "stages";
        public static final String METHOD_CHARGE = "methodCharge";
        public static final String DATA = "data";
    }

    public static final class AP_DOMAIN_TYPE {
        public static final String ACTION_ID = "01";
        public static final String TYPE = "02";
        public static final String CUSTOMER_TYPE = "03";
        public static final String IDENTITY_TYPE = "04";
        public static final String BILLING_CYCLE = "05";
        public static final String STATE = "06";
        public static final String BANK_TYPE = "07";
        public static final String GENDER = "08";
        public static final String SERVICE_PLAN_SERVICE_TYPE = "09";
        public static final String SERVICE_PLAN_DTL_SCOPE = "10";
        public static final String PLATE_COLOUR = "11";
        public static final String PAY_STATE = "12";
        public static final String REASON_TYPE = "13";
        public static final String VIP_TYPE = "16";
        public static final String NAME_STATE_RFID = "15";
        public static final String STATION_TYPE = "17";
    }

    public static final class CUSTOMER_TYPE {
        public static final String CUS_INDIVIDUAL = "1";
        public static final String CUS_CORPORATE = "2";
    }

    public static final class STATUS {
        public static final String ACTIVE = "1";
        public static final String DEACTIVE = "0";
    }

    public static final class RFID_STATE {
        public static final String CANCEL = "0";//The bi huy
        public static final String ACTIVE = "1";//The da kich hoat
        public static final String DEACTIVE = "2";//The tao moi (chua kh)
        public static final String LOCK = "3";//the tam khoa
    }

    public static final class TYPE {
        public static final String CUSTOMER = "1";//Tac dong khach hang
        public static final String VEHICLE = "2";//tac dong phuong tien
    }

    public static final class ACTION_ID {
        public static final String ADD_VEHICLE = "03";//Them moi phuong tien (ky them phu luc)
        public static final String EDIT_VEHICLE = "04";//Thay doi thong tin phuong tien
        public static final String ACTIVE_RFID = "11";
        public static final String EXCHANGE_RFID = "05"; //doi the
        public static final String ADD_CUSTOMER = "00";//Ký hợp đồng mới
        public static final String EDIT_CUSTOMER = "01";//Thay đổi TTHĐ
        public static final String DEACT_CUSTOMER = "02"; //Hủy hợp đồng
    }

    public static final class REASON_ID {
        public static final int ADD_CUSTOMER = 1;//Ký hợp đồng mới
    }

    public static final class SERVICE_PLAN_SERVICE_TYPE {
        public static final String PRIMARY_OFFER = "0";
        public static final String SUB_OFFERS = "1";
    }

    public static final class LANGUAGE_ID {
        public static final String VI = "57";
        public static final String EN = "89";
    }

    public static final class ETAG_STATUS {
        public static final Long MOI = 1L;//Vừa được nhập từ phía đối tác
        public static final Long HONG = 2L;//Kiểm kê phát hiện ra hỏng
        public static final Long KICH_HOAT = 3L;//dán cho khách hàng
        public static final Long DANG_DIEU_CHUYEN = 4L;//Nằm trong phiếu điều chuyển nhưng chưa duyệt
        public static final Long TRONG_KHO = 5L;//Nằm trong kho và không trong phiếu điều chuyển nào
        public static final Long MO_THE = 6L;//Khách hàng trả nợ hoặc yêu cầu mở
        public static final Long DONG_THE = 7L;//Khách hàng ko dùng hoặc nợ cước
        public static final Long HUY = 8L;
    }
}
