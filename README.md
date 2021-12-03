# today_house_test_Server_Havy
 
### 21.08.15 
#### + 1.RDS 서버 새로 만들고 설정하기 
#### + 2.로컬 개발환경 세팅 및 파일 다운 받고 dev, prod 서버 나누기 
        2-1 dev에서 api서버가 실행이 되지만 postman에서 정보를 받아오지 못함. 
             -default 설정 확인 
             -https 추가 --> 여전히 안됨
#### + 3. api 개발 상황
     + 이메일 인증 api
     + 회원가입 api 
### 21.08.16
#### + 1.기존 회원가입 api validation 수정 
#### + 2.Client 요청사항 
  - 2.1.회원가입의 이메일 중복 api 분리
  - 2.2.회원가입의 닉네임 중복 api 분리 
  - 2.3.구매 옵션 밑 코드처럼 출력
    
        {
         optionlist{
            {"컬러", { 1,2,3,...},
            {"사이즈",{1,2,3,...},
            ...
            {"추가 상품",{1,2,3}
         }
        }
#### + 3._21.8.17_ 피드백 후 기획서 수정 예정(우선순위 수정)
#### + 4.ERD 주문/배송 부분 제외하고 완성(나중에 필요한게 있으면 추가할 예정) 
#### + 5.api 개발 상황
    +로그인 api 
    +제품 상세페이지 api (validation 추가해야함)
#### + 6.오류 
- 로그인 api 에서 cannot read property 'password' of undefined 에러 
  -  password가 일치하지 않을 때 쿼리로 password를 못받아오면 생기는 오류로 확인, 수정 완료 
- dev, prod 서버 아직 안됨.. 
  - ssl인증 다시 받아 왔지만 https://dev.havynine.site를 검사해보면  alternative name server에 dev.havynine.site(dev서버)가 없다고 뜸. 
  - 다시 건드려볼 예정 .
#### + 7.더미데이터
  + 아직 제품, 카테고리 몇개 씩만 넣어둠. 
  + 다음 우선순위인 메인 페이지 만들 때 더 추가할 예정. 
  
### 21.08.17
#### + 1.dev,prod 서버 설정 완료..! 
         1.1.aws ec2 Inbound rule 에 포트번호를 잘못 설정함 ;;
         1.2.prod는 제대로 설정했지만 계속 dev만 확인해서 오류를 못 찾음. 
         1.3. ..
#### + 2._21.08.16_ 의 client 요청사항을 모두 완료
#### + 3.기획서 우선순위 수정완료
#### + 4.api 개발 상황
    +회원가입 api를 분리하여 로그인, 이메일 중복, 인증 번호 확인, 닉네임 중복 api 구현하고 code 더 추가
#### + 5.피드백
    5.1.인증번호 캐쉬로 바꾸기 ->일단은 이대로 두고 나중에 여유가 있을 때 바꾸기 
    5.2.이벤트 테이블 추가(광고 etc)
    5.3.오늘의 딜은 호출당시 몇초 남았는지만 호출 
    5.4.비밀번호 확인은 클라이언트에서 하는게 맞다고 생각 
    5.5.Response 형식을 객체로 진행 
### 21.08.18
#### + 1. api 개발 상황 
    +상품페이지 response 값 object로 변경 
    +에러코드 설정 완료 
#### + 2. 오류
- postman에서 https로 요청 보내면 에러가 뜸. 
- client가 안드로이드에서는 https로만 적용가능
    
### 21.08.20
#### + 1. api 개발 상황 
    +상품 페이지 code 추가
    +메인 페이지 쿼리 만들기 
    +카카오톡 소셜로그인 구현 
      +토큰을 받고 다시 보내느 부분으 어떻게 구현할 지 모르겠음
      +다른 api 먼저하고 다시 찾아볼 예정
    +메인 페이지 api
    
#### + 2.더미데이터 
         2.1.product 더미데이터 추가
         2.2.메인페이지 관련 더미데이터 추가
         2.3.세부 카테고리 사진 구해야됨
### 21.08.21
#### + 1. api 개발 상황
    +메인페이지 상품 api 
    +메인페이지 상품 정렬
#### + 2. 더미데이터 
         2.1.houses 더미데이터 추가
         2.2.houses review 더미데이터 추가 
#### + 3. 에러 
    3.1.https 'client socket 어쩌구 에러' 해결 못함 
    
### 21.08.22~23
#### + 1. api 개발상황
    +카카오톡 accestoekn받기 api 구현
    +메인페이지 사진, 집들이 api 구현
#### + 2.에러상황
    2.1 일단 http로 작업 하기로 함 


### 21.08.24
#### + 1. api 개발상황 
    +메인화면 관련 탭 전부 구현 


### 21.08.25
#### + 1. api 개발상황 
    +배송지 추가 api 구현
    +나의 쇼핑 조회 api 구현

### 21.08.26~27
#### + 1. api 개발상황
    +카카오 accessToken으로 profile받아서 jwt토큰 발급하는 api 구현
    +나의 쇼핑조회 api 구현
    +리뷰쓰기 api 구현
    +리뷰 수정 api 구현
    +리뷰 삭제 api 구현
#### + 2. 더미데이터 
    2.1.자잘한 더미데이터들 추가 
