module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },




    FAIL_EMAIL_SEND: {"isSuccess": false, "code":2000, "message": "이메일을 보내지 못했습니다. 이메일을 제대로 입력했는지 확인해 주세요."},

    SIGNUP_EMAIL_EMPTY: {"isSuccess": false, "code":2001, "message": "이메일을 입력해주세요."},
    SIGNUP_EMAIL_LENGTH:{"isSuccess": false, "code":2002, "message": "이메일 길이는 30자를 넘지 않습니다."},
    SIGNUP_EMAIL_ERROR_TYPE:{"isSuccess": false, "code": 2003,"message":"이메일 형식을 확인해 주세요."},
    SIGNUP_CERIFINUM_ERROR:{"isSuccess":false, "code": 2004, "message": "인증번호를 입력해주세요"},
    SIGNUP_PASSWORD_CHECK:{"isSuccess":false, "code": 2005, "message": "비밀번호를 확인해주세요 "},
   // SIGNUP_NICKNAME_EMPTY:{"isSuccess":false, "code": 2006, "message": "닉네임을 입력해 주세요"},
    SIGNIN_EMAIL_WRONG:{"isSuccess":false, "code": 2007, "message": "이메일을 확인해 주세요."},
    SIGNIN_PASSWORD_WRONG:{"isSuccess":false, "code": 2008, "message": "비밀번호를 확인해 주세요"},
    SIGNIN_PASSWORD_EMPTY:{"isSuccess":false, "code": 2009, "message": "비밀번호를 입력해주세요"},
    SIGNUP_REDUNDANT_EMAIL:{"isSuccesss": false, "conde":2010, "message": "이메일이 중복되었습니다."},

    VERIFY_NUM_INVALID:{"isSuccess": false, "code": 2011, "message": "인증번호가 틀렸습니다. "},

    PRODUCT_ID_EMPTY:{"isSuccess": false, "code": 2012, "message": "제품아이디를 입력해주세요 "},
    SIGNUP_NICKNAME_EMPTY:{"isSuccess": false, "code": 2013, "message": "닉네임을 입력해 주세요 "},
    SIGNUP_NICKNAME_CHECK:{"isSuccess": false, "code":2014, "message": "닉네임이 중복되었습니다."},

    PRODUCT_IS_NOT_EXIST:{"isSuccess": false, "code":2015, "message": "제품 정보가 없습니다"},
    PRODUCT_INFO_IMG_IS_NOT_EXIST:{"isSuccess": false, "code":2016, "message": "제품 정보 사진이 없습니다"},
    PRODUCT_STAR_IS_NOT_EXIST:{"isSuccess": false, "code":2017, "message": "별점이 없습니다."},
    PRODUCT_REVIEW_IS_NOT_EXIST:{"isSuccess": false, "code":2018, "message": "제품 리뷰가 없습니다."},
    PRODUCT_OPTIONLIST_IS_NOT_EXIST:{"isSuccess": false, "code":2019, "message": "제품의 선택지가 없습니다."},


    MAIN_EVENT_EMPTY:{"isSuccess": false, "code":2020, "message": "이벤트가 없습니다."},
    MAIN_STORY_EMPTY:{"isSuccess": false, "code":2021, "message": "오늘의 스토리가 없습니다."},
    MAIN_CATEGORY_EMPTY:{"isSuccess": false, "code":2022, "message": "카테고리 정보가 없습니다."},
    MAIN_TODAYDEAL_EMPTY:{"isSuccess": false, "code":2023, "message": "오늘의 딜이 없습니다."},
    MAIN_PHOTO_EMPTY:{"isSuccess": false, "code":2024, "message": "오늘의 사진이 없습니다."},
    MAIN_INTERIOR_EMPTY:{"isSuccess": false, "code":2025, "message": "인테리어 리뷰가 없습니다."},
    MAIN_BEST_EMPTY:{"isSuccess": false, "code":2026, "message": "인기상품이 없습니다."},

    MAIN_PRODUCT_BY_CATEGORY_EMPTY:{"isSuccess": false, "code":2027, "message": "선택된 카태고리의 상품이 없습니다."},

    MAIN_PHOTO_IS_EMPTY:{"isSuccess": false, "code":2028, "message": "사진이 없습니다. "},

    MAIN_HOUSES_IS_EMPTY:{"isSuccess": false, "code":2029, "message": "집들이가 없습니다."},

    USER_ID_NOT_MATCH:{"isSuccess": false, "code":2031, "message": "유저 아이디가 일치하지 않습니다. 로그인정보를 확인해주세요"},
    ORDER_PROD_ID_EMPTY:{"isSuccess": false, "code":2032, "message": "제품이 없습니다"},


    MAIN_QNA_IS_EMPTY:{"isSuccess": false, "code":2030, "message": "질문이 없습니다."},


    KAKAO_LOGIN_EMPTY:{"isSuccess": false, "code":2033, "message": "회원가입이 되어있지 않습니다."},


    DELIVERY_NAME_EMPTY:{"isSuccess": false, "code":2034, "message": "배송지명을 입력해 주세요."},
    USER_NAME_EMPTY:{"isSuccess": false, "code":2035, "message": "받는사람을 입력해주세요"},
    USER_NUMBER_EMPTY:{"isSuccess": false, "code":2036, "message": "연락처를 입력해주세요."},
    DELIVERY_PLACE_EMPTY:{"isSuccess": false, "code":2037, "message": "주소를 입력해주세요."},


    JWT_IS_EMPTY:{"isSuccess": false, "code":2038, "message": "로그인 정보를 확인해 주세요"},
    COUPON_IS_EMPTY:{"isSuccess": false, "code":2039, "message": "쿠폰이 없습니다."},


    REVIEW_DURABILITY_EMPTY:{"isSuccess": false, "code":2040, "message": "내구성 별점을 입력해주세요"},
    REVIEW_PRICE_EMPTY:{"isSuccess": false, "code":2041, "message": "가격 별점을 입력해주세요"},
    REVIEW_DESIGN_EMPTY:{"isSuccess": false, "code":2042, "message": "디자인 별점을 입력해주세요"},
    REVIEW_IMG_EMPTY:{"isSuccess": false, "code":2043, "message": "리뷰이미지를 입력해주세요"},
    REVIEW_TEXT_EMPTY:{"isSuccess": false, "code":2044, "message": "텍스트를 입력해주세U"},
    USERID_EMPTY:{"isSuccess": false, "code":2045, "message": "유저 아이디를 입력해 주세요"},
    PRODUCT_ID_EMPTY:{"isSuccess": false, "code":2046, "message": "제품아이디를 입력해 주세요. "},

   DB_ERROR:{"isSuccess": false, "code":4000, "message": "데이터베이스 에러"}
 
}
