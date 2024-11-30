# 포팅 매뉴얼

# 1. Gitlab 소스 클론 이후 빌드 및 배포할 수 있도록 정리한 문서

## 1) 사용한 JVM, 웹 서버, WAS 제품 등의 종류와 설정 값, 버전(IDE 버전 포함 기재)

| JDK | 21 | React | 18.3.1 |
| --- | --- | --- | --- |
| Gradle | 8.7.0-jdk21-alpine | Vite  | 5.3.4 |
| NginX | 1.21.4 | React Native | 0.74.3 |
| Jenkins  | 2.452.3 | Expo  | 51.0.23 |
| Spring Boot | 3.3.1 | Node | 20.15.0  |
| MySQL  | 9.0.1 | Eslint | 8.57.0 |
| Docker  | 27.1.1 | JWT decode | 4.0.0 |
| Ubuntu  | 20.04.6 | VS Code | 1.92.1 |
| IntelliJ IDEA | 2024.1.4 | Redis | 7.4.0 |

## 2) 빌드 시 사용되는 환경 변수 등

### - Frontend

```jsx
GOOGLE_PLACES_API_KEY=REMOVED
KAKAO_API_KEY=REMOVED
```

### - Backend

- docker-compose.yml
    
    ```yaml
    # spring boot 프로젝트 컨테이너의 환경 변수
    environment:
          - MYSQL_URL=jdbc:mysql://mysql:3306/imnotdurnk_db #내부포트 사용
          - MYSQL_USERNAME=ssafy
          - MYSQL_PASSWORD=ssafy
          - REDIS_HOST=redis
          - REDIS_PORT=6379
          # AWS 관련 환경 변수 추가
          - AWS_ACCESS_KEY_ID=REMOVED
          - AWS_SECRET_ACCESS_KEY=REMOVED
          - AWS_REGION=ap-northeast-2
          - AWS_S3_BUCKET=imnotdurnk
          # JWT 관련 환경 변수 추가
          - JWT_ACCESS_TOKEN_EXPIRY=30000000
          - JWT_REFRESH_TOKEN_EXPIRY=432000000
          - JWT_ACCESS_TOKEN_SECRET=REMOVED
          - JWT_REFRESH_TOKEN_SECRET=REMOVED
          # mail 관련 환경 변수 추가
          - MAIL_USERNAME=imnotdurnk.ssafy@gmail.com
          - MAIL_PASSWORD=prmodhkhbhfqtjhn
          - MAIL_HOST=smtp.gmail.com
          - MAIL_PORT=587
          # 음성파일분석 관련
          - ETRI_ACCESS_KEY=REMOVED
          # DDL 타입
          - DDL_AUTO=validate
          # 로그 레벨
          - LOG_LEVEL_ROOT=info
          - LOG_LEVEL_AUTH=info
          - LOG_LEVEL_CALENDAR=info
          - LOG_LEVEL_MAP=info
          - LOG_LEVEL_GAMELOG=debug
          - LOG_LEVEL_USER=info
          - LOG_LEVEL_UTIL=info
          # 오디새이 관련 변수
          - ODSAY_API_KEY=REMOVED
    ```
    
- application.yml
    
    ```yaml
    spring:
      application:
        name: imnotdurnk_backend
        title: 나안취햄ㅅ어
      security: ignored=/**   # 일단 비활성화
    
      # DB Setting
      datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: ${MYSQL_URL}
        username: ${MYSQL_USERNAME}
        password: ${MYSQL_PASSWORD}
      data:
        redis:
          host: ${REDIS_HOST}
          port: ${REDIS_PORT}
    
      jpa:
        database: mysql
        database-platform: org.hibernate.dialect.MySQL8Dialect
        properties:
          hibernate:
            storage_engine: innodb
            format_sql: true
            use_sql_comments: true
            globally_quoted_identifiers: true
        hibernate:
          ddl-auto: ${DDL_AUTO}
        open-in-view: false
        show-sql: false
    
      # Mail Setting
      mail:
        host: ${MAIL_HOST}
        port: ${MAIL_PORT}
        username: ${MAIL_USERNAME}
        password: ${MAIL_PASSWORD}
        properties:
          mail:
            smtp:
              debug: true
              auth: true
              ssl:
                enable: false
                trust: ${MAIL_HOST}
              starttls:
                enable: true
    
    cloud:
      aws:
        credentials:
          accessKey: ${AWS_ACCESS_KEY_ID}
          secretKey: ${AWS_SECRET_ACCESS_KEY}
        region:
          static: ${AWS_REGION}
        s3:
          bucket: ${AWS_S3_BUCKET}
    
    jwt:
      expiretime:
        accesstoken: ${JWT_ACCESS_TOKEN_EXPIRY}
        refreshtoken: ${JWT_REFRESH_TOKEN_EXPIRY}
      secretkey:
        accesstoken: ${JWT_ACCESS_TOKEN_SECRET}
        refreshtoken: ${JWT_REFRESH_TOKEN_SECRET}
    
    etri:
      accessKey: ${ETRI_ACCESS_KEY}
    
    Odsay:
      apikey: ${ODSAY_API_KEY}
    
    logging:
      level:
        root: ${LOG_LEVEL_ROOT}
        com:
          imnotdurnk:
            domain:
              auth: ${LOG_LEVEL_AUTH}
              calendar: ${LOG_LEVEL_CALENDAR}
              MAP: ${LOG_LEVEL_MAP}
              gamelog: ${LOG_LEVEL_GAMELOG}
              user: ${LOG_LEVEL_USER}
            global:
              util: ${LOG_LEVEL_UTIL}
    
    springdoc:
      swagger-ui:
        disable-swagger-default-url: true
        path: /swagger-ui.html
      api-docs:
        path: /v3/api-docs
      show-actuator: true
      default-produces-media-type: application/json
    ```
    

## 3) 프로젝트 실행 방법 (로컬)

- `git clone` 이후 **React(web)** 프로젝트 실행 방법
    - 주석 처리 되어 있는 api 요청 링크 2개 로컬용으로 변경 (원격용 링크 주석 처리)
        
        ```
        // 게임 등 로그인이 필요없는 api 요청시 사용(토큰없이도 요청 가능한 용)
        const apiNoToken = axios.create({
            //baseURL: 'http://i11a609.p.ssafy.io:8080', //로컬용1
            baseURL: 'https://i11a609.p.ssafy.io/api', // 원격용1
            timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
        });
        
        const api = axios.create({
            //baseURL: 'http://i11a609.p.ssafy.io:8080', //로컬용2
            baseURL: 'https://i11a609.p.ssafy.io/api', // 원격용2
            timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
            withCredentials: true, // 이게 있어야 refresh Token받을 수 있음
            //zustand로 저장된 accessToken 불러와서 매 요청의 헤더에 넣기
        });
        ```
        
    - `npm i`
    - `npm run dev` →  [http://localhost:5173/](http://localhost:5173/) 경로에서 로컬 테스트 가능
- `git clone` 이후 **React Native(mobile)** 프로젝트 실행 방법
    - 앱 화면을 띄울 안드로이드 기기와 유선 연결 (USB 디버깅 및 연결 허용)
    - `npm i`
    - `npm start` → `a`
    - 모바일 앱에서 위치 권한 - “항상 허용” 선택 (백그라운드 위치 추적)
    - 모바일 앱에서 마이크 액세스 권한 - “앱 사용 중에만 허용” 선택 (음성 게임)
- `git clone` 이후 **Spring Boot** 프로젝트 실행 방법
    - MySQL, Redis 설정
        - MySQL
            
            ```bash
            # 이미지 가져오기
            $ docker pull mysql
            
            # 컨테이너로 실행 
            # <password>에 비밀번호(ssafy)를 넣음
            $ docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=<password> -d -p 3306:3306 mysql
            
            # 컨테이너로 올린 mysql bash로 접속
            $ docker exec -it mysql-container bash
            ```
            
        - Redis
            
            ```bash
            # redis 이미지 가져오기
            $ docker pull redis
            
            # volume 생성
            $ docker volume create redis_data
            
            # 네트워크 생성
            $ docker network create redis-network --driver bridge
            
            # redis 환경 설정 파일 생성
            $ vi redis.conf
            ```
            
        - redis.conf 파일 작성
            
            ```
            bind 0.0.0.0
            port 6379
            save 900 1
            ```
            
            ```bash
            # redis 컨테이너 실행
            $ docker run \
            -d \
            --name redis \
            -p 6379:6379 \
            --network redis-network \
            -v ~/{redis.conf 생성 경로}/redis.conf:/etc/redis/redis.conf \
            -v redis_data:/data \
            redis:latest redis-server /etc/redis/redis.conf
            ```
            
    - JDK 21 설치 및 설정
        
        ```bash
        $ sudo apt update
        
        # 자바 설치
        $ sudo apt install openjdk-21-jdk
        
        # 자바 설치 확인
        $ java -version
        openjdk version "21.0.3" 2024-04-16
        OpenJDK Runtime Environment (build 21.0.3+9-Ubuntu-1ubuntu122.04.1)
        OpenJDK 64-Bit Server VM (build 21.0.3+9-Ubuntu-1ubuntu122.04.1, mixed mode, sharing)
        ```
        
        **JDK 환경변수 설정**
        
        - bash 환경 : `~/.bashrc`
        - zsh 환경: `~/.zshrc`
        
        ```bash
        export PATH=%PATH:/bin:/usr/local/bin:/usr/bin
        export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
        export PATH=$PATH:$JAVA_HOME/bin
        ```
        
    - Gradle 설치 및 설정
        - Gradle 공식 홈페이지에서 버전 확인 (8.7.0 사용)
        - wget 설치
            
            ```bash
            $ sudo apt install wget
            ```
            
        - Gradle 설치
            
            ```bash
            # 설치 파일 다운로드
            $ wget https://services.gradle.org/distributions/gradle-8.9.0-bin.zip -P /tmp
            
            # 압축 해제
            $ sudo unzip -d /opt/gradle /tmp/gradle-7.5.1-bin.zip
            
            # 압축 해제가 잘 되었는지 확인
            $ ls /opt/gradle/gradle-7.5.1
            ```
            
        - 환경 변수 설정
            
            ```bash
            $ sudo vi /etc/profile.d/gradle.sh
            ```
            
            ```bash
            $ export GRADLE_HOME=/opt/gradle/gradle-8.9.0
            $ export PATH=${GRADLE_HOME}/bin:${PATH}
            ```
            
            ```bash
            # 스크립트 실행
            $ sudo chmod +x /etc/profile.d/gradle.sh
            
            # 환경변수 로드
            source /etc/profile.d/gradle.sh
            ```
            
        - Gradle 설치 및 버전 확인
            
            ```bash
            $ gradle -v
            ```
            
    
    clone 받은 프로젝트는 환경 변수가 docker-compose 파일에 설정되어있기 때문에 로컬에서 실행시키기위해 application.yml 파일을 아래로 교체해준다.
    
    - application.yml
        
        ```bash
        spring:
          application:
            name: imnotdurnk_backend
            title: 나안취햄ㅅ어
          security: ignored=/**   # 일단 비활성화
        
          config:
            import: application-secret.yml
        
            # DB Setting
          datasource:
            driver-class-name: com.mysql.cj.jdbc.Driver
            url: jdbc:mysql://localhost:3306/imnotdurnk_db
            username: root
            password: ssafy
          data:
            redis:
              host: localhost
              port: 6379
              password: ssafy
          jpa:
            database: mysql
            database-platform: org.hibernate.dialect.MySQL8Dialect
            properties:
              hibernate:
                storage_engine: innodb
                format_sql: true
                use_sql_comments: true
                globally_quoted_identifiers: true
            hibernate:
              ddl-auto: validate
            open-in-view: false
            show-sql: false
        
          # Mail Setting
          mail:
            host: smtp.gmail.com
            port: 587
            username: imnotdurnk.ssafy@gmail.com
            password: prmodhkhbhfqtjhn
            properties:
              mail:
                smtp:
                  debug: true
                  auth: true
                  ssl:
                    enable: false
                    trust: smtp.gmail.com
                  starttls:
                    enable: true
        
        jwt:
          expiretime:
            accesstoken: 1800000 #30분
            refreshtoken: 432000000 #5일
          secretkey:
            accesstoken: REMOVED
            refreshtoken: REMOVED
        
        cloud:
          aws:
            credentials:
              accessKey: REMOVED
              secretKey: REMOVED
            region:
              static: ap-northeast-2
            s3:
              bucket: imnotdurnk
        
        etri:
          accessKey: REMOVED
        
        Odsay:
          apikey: REMOVED
        
        logging:
          level:
            root: info
            com:
              imnotdurnk:
                domain:
                  auth: info
                  calendar: info
                  map: info
                  gamelog: info
                  user: info
                global:
                  util: info
        
        springdoc:
          swagger-ui:
            disable-swagger-default-url: true
            path: /swagger-ui.html
          api-docs:
            path: /v3/api-docs
          show-actuator: true
          default-produces-media-type: application/json
        ```
        
    - **프로젝트 빌드 및 실행**
        
        ```bash
        #spring boot 프로젝트 빌드
        $ ./gradlew clean build
        
        # 권한 오류가 생긴다면 권한 부여하고 빌드 재시도
        $ chmod +x ./gradlew
        
        # 빌드된 JAR 파일 실행
        $ java -jar ./build/libs/imnotdurnk_backend-0.0.1-SNAPSHOT.jar
        ```
        

## 4) 배포

- 터미널에서 키페어를 통해 인스턴스 서버 접속
    - **a609 서버 페어 키 - mattermost A609 채널**
    - **인스턴스 user name : ubuntu**
    - **Public DNS 이름 :** i11a609.p.ssafy.io
    
    1. **터미널로 ssh 접속**
        
        ```bash
        # ssh -i [팀키파일명].pem [인스턴스 user name]@[Public DNS 이름]
        ssh -i I11A609T.pem ubuntu@i11a609.p.ssafy.io
        ```
        
        - I11A609T.pem 파일이 있는 위치가 아니라면, 경로까지 표시 필요
        
        <aside>
        💡 Are you sure you want to continue connecting? **yes**
        ——yes 입력한 후
        ****Permissions 0644 for 'test-key.pem' are too open. 이런 이유로 거절 당한다면
        pem 파일이 위치한 곳에서 **`chmod 600 I11A609T.pem`** 커맨드 입력
        (소유자만 읽고 쓰는 권한)
        
        </aside>
        
    
    1. **ufw 포트 확인**
        
        ```bash
        sudo ufw status numbered
        ```
        
        ```bash
             To                         Action      From
             --                         ------      ----
        [ 1] 22                         ALLOW IN    Anywhere
        [ 2] 80                         ALLOW IN    Anywhere
        [ 3] 22 (v6)                    ALLOW IN    Anywhere (v6)
        [ 4] 80 (v6)                    ALLOW IN    Anywhere (v6)
        ```
        
    2. **ufw 포트 추가**
        
        ```bash
        sudo ufw allow [포트번호]
        ```
        
    3. **ufw 포트 삭제**
        
        ```bash
        sudo ufw delete [포트의 목록번호]
        ```
        
    4. **ufw 상태 확인**
        
        ```bash
        sudo ufw status
        
        Status : [active/inactive 중 표시됨]
        ```
        
    5. **ufw 켜기, 재부팅** - 포트 삭제 등 수정 시 enable 재부팅해야 적용됨
        
        ```bash
        sudo ufw enable
        ```
        
    6. **ufw 끄기**
        
        ```bash
        sudo ufw disable
        ```
        
- docker 설치
    
    [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    
    1. **충돌 날 수 있는 패키지 삭제**
        
        > for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
        > 
    2. **apt 로 도커 볼륨 생성** - sudo 나 echo 를 기준으로 한줄씩 명령어 실행
        
        ```bash
        # Add Docker's official GPG key:
        sudo apt-get update
        sudo apt-get install ca-certificates curl
        sudo install -m 0755 -d /etc/apt/keyrings
        sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
        sudo chmod a+r /etc/apt/keyrings/docker.asc
        
        # Add the repository to Apt sources:
        echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
          $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
          sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        sudo apt-get update
        ```
        
    3. **docker 엔진 최신버전 설치**
        
        ```bash
        sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
        ```
        
    4. **docker 엔진 정상 설치 확인**
        
        ```bash
        sudo docker run hello-world
        ```
        
        - hello-world 가 pull 받아져서 정상 실행된다고 뜨면 성공
- ufw-docker 설치 (초기화 후에 다시 설치 안했음)
    
    리눅스 환경에서 Docker는 iptables 정책을 조작하여 네트워크 격리를 제공한다.
    
    ufw에서 설정한 iptables와 별개로 동작해서, ufw 방화벽으로 포트를 막아둬도 Docker로 바로 연결되는 문제가 있다. 따라서 ufw를 통해서만 포트에 접속할 수 있도록 추가로 설정해야 한다.
    
    ```bash
    sudo wget -O /usr/local/bin/ufw-docker \
      https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
    sudo chmod +x /usr/local/bin/ufw-docker
    sudo ufw-docker install
    sudo systemctl restart ufw
    sudo systemctl restart docker
    ```
    
    UFW 설정을 수정하여 Docker 컨테이너로 향하는 트래픽을 허용해야 한다.
    
    ### 1. UFW 규칙 수정
    
    Docker 컨테이너의 네트워크 범위에 대한 트래픽을 허용하도록 UFW 규칙을 추가해야 한다.
    
    ```bash
    sudo ufw route allow in on eth0 out on docker0
    sudo ufw route allow in on eth0 out on br-b9254d2a1561
    ```
    
    > 이 명령어는 eth0 인터페이스에서 docker0 및 br-b53da5c41923 인터페이스로 향하는 트래픽을 허용한다.
    > 
    
    ### 2. UFW 재시작
    
    변경 사항 적용을 위해 재시작
    
    ```bash
    sudo ufw reload
    ```
    
    ### 3. UFW 상태 확인
    
    변경 사항 적용 여부 확인
    
    ```bash
    sudo ufw status
    ```
    
    ### 4. 터미널에서 서버 접속 테스트
    
    ```bash
    curl http://서버_IP:8080
    curl http://서버_IP:80
    ```
    
- Mysql 이미지 설치 및 설정
    
    docker-compose.yml 파일에 image로 지정
    
    - **초기 데이터 설정**
        
        ### 1. 로컬에 있는 파일 클라우드 서버에 올리기
        
        .pem키가 있는 위치에서 명령어 실행해야 함
        
        ```bash
        scp -i I11A609T.pem -r 복사할파일경로/파일명 ubuntu@i11a609.p.ssafy.io:/복사한파일을 저장할 경로/
        
        scp -i I11A609T.pem -r DATA/stop_times.csv ubuntu@i11a609.p.ssafy.io:/home/ubuntu/
        ```
        
        - 디렉터리 접근 권한이 없어서 실행이 안된다면, /home/ubuntu/ 같은 기본 디렉터리에 복사 후, `sudo mv /home/ubuntu/stop_times.csv /var/lib/mysql-files/` 와 같이 파일 이동
        
        ### 2. 덤프 파일을 Docker컨테이너로 복사하기
        
        ```bash
        # dump 파일을 hostOS 서버에 생성한 상태로 가정함
        
        # hostOS의 파일을 Docker 컨테이너 내부로 복사
        docker cp /복사할sql파일의 경로(hostOS)/sql파일명.sql 도커컨테이너이름:/저장할 경로/sql파일명.sql
        
        sudo docker cp /var/lib/mysql-files/stop_times.csv ecb7df8cbe0e:/var/lib/mysql-files/
        
        # Docker 컨테이너 접속
        docker exec -it 컨테이너이름 bash
        
        # mysql 서버 접속
        mysql -u 사용자명(root) -p [your_database]
        
        # 복사한 파일 실행해서 적용
        source /sql파일명.sql;
        
        # 빠져나가기
        exit
        ```
        
        **>>dump data set에서 boolean 값을 입력할 때 형식**
        
        - `_binary '\0'`: 바이너리 형식으로 해석된 NULL 문자 (0x00).
        - `_binary '1'`: 바이너리 형식으로 해석된 ASCII 제어 문자 1 (0x01), 보통 true 또는 1을 의미.
        
        !! `_binary ‘1’` 이 터미널 sql에서 인식이 안돼서 test용 계정만 따로 true 처리 해줌
        
        ```sql
        UPDATE `user`
        SET `verified` = b'1'
        WHERE `email` = 'ssafy@ssafy.com';
        ```
        
    
- nginx 설치 및 config
    
    기존에 native나 docker로 설치했던 nginx 말고, front 프로젝트 최상위에 ngingx.conf를 작성해서 root 경로를 프론트의 index.html로 한다.
    
    ### 현재 nginx.conf 내용
    
    ```bash
    server {
    		listen 80;
    		listen [::]:80;
    		server_name imnotdurnk.duckdns.org;
    		
    		# HTTP에서 HTTPS로 리디렉션
    		location / {
    				return 301 https://$host$request_uri;
    		}
    }
    
    server {
        listen 443 ssl;
        listen [::]:443 ssl;
        server_name  imnotdurnk.duckdns.org;
        
    	    root   /usr/share/nginx/html;
            index  index.html index.htm;
            
            # SSL 설정
    		ssl_certificate /etc/letsencrypt/live/imnotdurnk.duckdns.org/fullchain.pem;
    		ssl_certificate_key /etc/letsencrypt/live/imnotdurnk.duckdns.org/privkey.pem;
    		ssl_protocols TLSv1.2 TLSv1.3;
    		ssl_prefer_server_ciphers on;
    
        location / {
            # SPA 새로고침 처리
            try_files $uri $uri/ /index.html =404;
        }
    
        location /api/ {
            proxy_pass http://imnotdurnk-backend:8080/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
    
            # CORS 설정
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Origin, Authorization, Accept, Content-Type, X-Requested-With';
            
            # wss(web-socket) 설정
            proxy_http_version 1.1;
    		    proxy_set_header Upgrade $http_upgrade;
    		    proxy_set_header Connection "upgrade";
    
            # OPTIONS 메소드에 대한 프리플라이트 요청 처리
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                add_header 'Access-Control-Allow-Headers' 'Origin, Authorization, Accept, Content-Type, X-Requested-With';
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
            }
        }
    
        # Swagger UI를 /api/swagger-ui 경로로 리디렉션
        location /api/swagger-ui/ {
            proxy_pass http://imnotdurnk-backend:8080/swagger-ui/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    
        # Swagger api docs를 /v3/api-docs 경로로 리디렉션
        location /v3/api-docs {
            proxy_pass http://imnotdurnk-backend:8080/v3/api-docs;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    
    #    error_page   500 502 503 504  /50x.html;
    #    location = /50x.html {
    #        root   /usr/share/nginx/html;
    #    }
    }
    
    server {
    		listen 80;
    		listen [::]:80;
    		server_name i11a609.p.ssafy.io;
    		
    		# HTTP에서 HTTPS로 리디렉션
    		location / {
    				return 301 https://$host$request_uri;
    		}
    }
    
    server {
        listen 443 ssl;
        listen [::]:443 ssl;
        server_name  i11a609.p.ssafy.io;
        
    		root   /usr/share/nginx/html;
            index  index.html index.htm;
            
            # SSL 설정
    		ssl_certificate /etc/letsencrypt/live/i11a609.p.ssafy.io/fullchain.pem;
    		ssl_certificate_key /etc/letsencrypt/live/i11a609.p.ssafy.io/privkey.pem;
    		ssl_protocols TLSv1.2 TLSv1.3;
    		ssl_prefer_server_ciphers on;
    
        location / {
            # SPA 새로고침 처리
            try_files $uri $uri/ /index.html =404;
        }
    
        location /api/ {
            proxy_pass http://imnotdurnk-backend:8080/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
    
            # CORS 설정
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Origin, Authorization, Accept, Content-Type, X-Requested-With';
            
            # wss(web-socket) 설정
            proxy_http_version 1.1;
    		    proxy_set_header Upgrade $http_upgrade;
    		    proxy_set_header Connection "upgrade";
    
            # OPTIONS 메소드에 대한 프리플라이트 요청 처리
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                add_header 'Access-Control-Allow-Headers' 'Origin, Authorization, Accept, Content-Type, X-Requested-With';
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
            }
        }
    
        # Swagger UI를 /api/swagger-ui 경로로 리디렉션
        location /api/swagger-ui/ {
            proxy_pass http://imnotdurnk-backend:8080/swagger-ui/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    
            # Swagger api docs를 /v3/api-docs 경로로 리디렉션
        location /v3/api-docs {
            proxy_pass http://imnotdurnk-backend:8080/v3/api-docs;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    
    #    error_page   500 502 503 504  /50x.html;
    #    location = /50x.html {
    #        root   /usr/share/nginx/html;
    #    }
    }
    
    ```
    
- Dockerfile → backend, frontend-web
    
    ## /imnotdurnk_backend/Dockerfile
    
    ```docker
    FROM gradle:8.7.0-jdk21-alpine AS build
    
    WORKDIR /app
    
    COPY build.gradle settings.gradle ./
    
    RUN gradle dependencies --no-daemon
    
    COPY . /app
    
    RUN gradle clean build --no-daemon -x test
    
    FROM openjdk:21
    
    WORKDIR /app
    
    ARG JAR_FILE=/app/build/libs/*.jar
    
    COPY --from=build ${JAR_FILE} /app/imnotdurnk-backend.jar
    
    ENTRYPOINT ["java"]
    CMD ["-jar", "imnotdurnk-backend.jar"]
    ```
    
    ## /imnotdurnk_frontend_web/Dockerfile
    
    ```docker
    FROM node:20-alpine AS build
    
    # 작업 디렉토리 설정. 컨테이너 내 앱의 기본 경로
    WORKDIR /app
    
    # 라이브러리 설치에 필요한 파일만 복사
    COPY package.json .
    COPY package-lock.json .
    
    # 라이브러리 설치
    RUN npm ci
    
    # 소스코드 복사
    COPY . /app
    
    # 소스 코드 빌드
    RUN npm run build
    
    # 프로덕션 스테이지
    FROM nginx:1.21.4-alpine
    
    # nginx 실행 전 default.conf 파일 수정
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # 빌드 이미지에서 생성된 dist 폴더를 nginx 이미지로 복사
    COPY --from=build /app/dist /usr/share/nginx/html
    
    EXPOSE 80
    CMD [ "nginx", "-g", "daemon off;" ]
    ```
    
- Docker compose.yml
    
    ```yaml
    services:
      springboot:
        image: imnotdurnk-backend
        container_name: imnotdurnk-backend
        environment:
          - MYSQL_URL=jdbc:mysql://mysql:3306/imnotdurnk_db #내부포트 사용
          - MYSQL_USERNAME=ssafy
          - MYSQL_PASSWORD=ssafy
          - REDIS_HOST=redis
          - REDIS_PORT=6379
          # AWS 관련 환경 변수 추가
          - AWS_ACCESS_KEY_ID=REMOVED
          - AWS_SECRET_ACCESS_KEY=REMOVED
          - AWS_REGION=ap-northeast-2
          - AWS_S3_BUCKET=imnotdurnk
          # JWT 관련 환경 변수 추가
          - JWT_ACCESS_TOKEN_EXPIRY=30000000
          - JWT_REFRESH_TOKEN_EXPIRY=432000000
          - JWT_ACCESS_TOKEN_SECRET=REMOVED
          - JWT_REFRESH_TOKEN_SECRET=REMOVED
          # mail 관련 환경 변수 추가
          - MAIL_USERNAME=imnotdurnk.ssafy@gmail.com
          - MAIL_PASSWORD=prmodhkhbhfqtjhn
          - MAIL_HOST=smtp.gmail.com
          - MAIL_PORT=587
          # 음성파일분석 관련
          - ETRI_ACCESS_KEY=REMOVED
          # DDL 타입
          - DDL_AUTO=validate
          # 로그 레벨
          - LOG_LEVEL_ROOT=info
          - LOG_LEVEL_AUTH=info
          - LOG_LEVEL_CALENDAR=info
          - LOG_LEVEL_MAP=info
          - LOG_LEVEL_GAMELOG=debug
          - LOG_LEVEL_USER=info
          - LOG_LEVEL_UTIL=info
          # 오디새이 관련 변수
          - ODSAY_API_KEY=REMOVED
        ports:
          - "8080:8080"
        volumes:
          # wav 임시파일 마운트
          - /home/ubuntu/spring/tmp/wav:/app/tmp/wav
        depends_on:
          - mysql
          - redis
        restart: unless-stopped
    
      react:
        user: root
        image: imnotdurnk-frontend
        container_name: imnotdurnk-frontend
        ports:
          - "80:80"
          - "443:443"
        depends_on:
          - mysql
          - redis
          - springboot
        volumes:
          - type: bind
            source: /etc/letsencrypt
            target: /etc/letsencrypt
        restart: on-failure
    
      mysql:
        image: mysql
        container_name: mysql
        environment:
          MYSQL_ROOT_PASSWORD: ssafy
          MYSQL_DATABASE: imnotdurnk_db
          MYSQL_USER: ssafy
          MYSQL_PASSWORD: ssafy
        ports:
          - "3306:3306"
        volumes:
          - mysql_data:/var/lib/mysql
        restart: always
    
      redis:
        image: redis
        container_name: redis
        ports:
          - "6379:6379"
        volumes:
          - redis_data:/var/lib/redis
    
    volumes:
      mysql_data:
      redis_data:Jenkins
    ```
    
- 설정과정
    
    front-end의 컨테이너 쪽에서 nginx를 같이 올린다.
    
    ### 1. 도커 이미지 pull (안해도됨)
    
    ```bash
    sudo docker pull jenkins/jenkins:lts
    ```
    
    ### 2. jenkins 컨테이너 → HostOS의 9090포트에서 컨테이너 내부 8080포트로 연결 및 볼륨 마운트
    
    ```bash
    sudo docker run --name jenkins -p 9090:8080 -p 50000:50000 -d -v /var/run/docker.sock:/var/run/docker.sock -v jenkins_home:/var/jenkins_home -u root jenkins/jenkins:lts
    
    # 컨테이너 이름을 "jenkins"로 설정
    # HostOS의 9090포트를 컨테이너의 8080포트에 바인딩(매핑)
    # HostOS의 50000포트를 컨테이너의 50000포트에 바인딩 (jenkins 에이전트와 통신에 사용)
    # -d : 백그라운드(데몬) 실행
    # -v /var/run/docker.sock:/var/run/docker.sock : jenkins 내부의 docker socket 파일을 외부(HostOS의 docker) socket 파일로 마운트
    # -v jenkins_home:/var/jenkins_home : jenkins 컨테이너 내부의 "jenkins_home" 디렉토리를 HostOS의 "/var/jenkins_home" 디렉토리로 마운트
    # -u root : jenkins 컨테이너 내부에서 root 사용자를 jenkins로 실행 (시스템 권한이 jenkins)
    ```
    
    ### 3. jenkins 컨테이너 안에 docker 설치
    
    ```bash
    # 1. jenkins 컨테이너로 접속
    sudo docker exec -it jenkins /bin/bash
    
    # 2. docker 설치
    curl https://get.docker.com/ > dockerinstall && chmod 777 dockerinstall && ./dockerinstall
    # "https://get.docker.com/" 에서 docker를 설치하는 스크립트 다운로드 후 "dockerinstall" 이라는 파일에 저장
    # "dockerinstall" 파일에 777 권한(모든 사용자(user, group, others)에게 읽기, 쓰기, 실행 권한) 부여한 뒤, dockerinstall 파일 실행
    
    # 참고 : 이 시점에서 "ls" 명령어를 실행하면 "dockerinstall" 파일이 생성된 것을 확인 할 수 있음.
    # 참고 : "cat dockerinstall" 명령어로 스크립트 파일을 볼 수 있음.
    # 참고 : "docker version" 명령어로 설치된 도커의 버전을 확인할 수 있음.
    
    # 3. docker-compose 설치
    apt update
    apt install docker-compose
    
    # 4. 컨테이너 쉘에서 나오기
    exit
    ```
    
    ### 4. HostOS의 `/var/run/docker.sock` 파일에 권한 부여
    
    ```bash
    # 현재 터미널 경로가 HostOS인지 확인
    pwd
    # 실행 결과 : /home/ubuntu
    
    # /var/run/docker.sock 파일에 user, group 사용자에게 읽기, 쓰기 권한 부여
    sudo chmod 666 /var/run/docker.sock
    ```
    

### jenkins 접속 및 배포 관련

- 인스턴스 서버 접속해서 `sudo docker logs jenkins` 명령어로 초기 비밀번호 확인 가능

<aside>
💡 **젠킨스 로그인 계정
ssafy / ssafy**

</aside>

- 자동배포를 위해 권한 부여 해둔 것 : GitLab, SSH
    - **GitLab credentials, webhook**: 깃랩 레포에 푸시가 감지되면 젠킨스 내부 서버(?)에서 클론을 받아서 빌드한 다음 이미지로 만들어서 우리의 인스턴스 서버에 전달해줄거기 때문에 GitLab 접근 권한이 필요.(yukyj0418@naver.com 이걸로 연결해둠).
    - **SSH** : docker-compose 파일은 gitlab에 올리지 않고, 인스턴스 서버에 직접 작성해서 보관중이기 때문에 자동 배포를 위해 인스턴스 서버 접근 권한이 필요.
        
        → jenkins 컨테이너 내부에서 ssh key-gen 을 통해 비밀키/공개키 생성후, 공개키를 HostOS /.ssh/authorized-key 파일에 추가해주었음
        
        <aside>
        💡 주의할 점
        HostOS /.ssh/authorized-key 파일에 접근할 때 기존 내용이 삭제되면 안됨!
        그러면 인스턴스 서버에 다시 접속할 수 없어유,,
        
        </aside>
        
        https://choco-one.tistory.com/6
        
- CI/CD 파이프라인
    
    ```jsx
    pipeline {
        agent any
        
        tools {
            nodejs 'nodejs'
        }
        
        environment {
            //DOCKERHUB_ID = credentials('ssafytkddbs1644')
            IMNOTDURNK_FRONTEND_IMAGE = 'imnotdurnk-frontend'
            IMNOTDURNK_BACKEND_IMAGE = 'imnotdurnk-backend'
        }
        
        stages {
            stage ('GitLab Repository Checkout') {
                steps {
                    git branch: 'develop',
                        credentialsId: 'yukyj0418',
                        url: 'https://lab.ssafy.com/s11-webmobile2-sub2/S11P12A609.git'
                }
            }
    
            stage('Backend Build') {
                steps {
                    script {
                        echo '********** Backend Build Start **********'
                        
                        dir('imnotdurnk_backend') {
                            
                            try {
                                sh 'docker build -t $IMNOTDURNK_BACKEND_IMAGE .'
                            } catch (e) {
                                slackSend (channel: '#jenkins-build', color: '#FF0000', message: "SPRINGBOOT BUILD FAIL: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                            }
                            
                        }
                        
                        echo '********** Backend Build End **********'
                    }
                }
            }
            
            stage('Frontend Build') {
                steps {
                    script {
                        echo '********** Frontend Build Start **********'
                        
                        dir('imnotdurnk_frontend_web') {
                            
                            try {
                                sh 'docker build -t $IMNOTDURNK_FRONTEND_IMAGE .'
                            } catch (e) {
                                slackSend (channel: '#jenkins-build', color: '#FF0000', message: "REACT BUILD FAIL: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                            }
                            
                        }
                        
                        echo '********** Frontend Build End **********'
                    }
                }
            }
            
            stage('Docker Compose Up') {
                steps {
                    script {
                        echo '********** Docker Compose Start **********'
                        
                        try {
                            sh 'ssh ubuntu@i11a609.p.ssafy.io "cd /home/ubuntu && docker compose up -d"'
                            slackSend (channel: '#jenkins-build', color: '#00FF00', message: "DEPLOY SUCCESSFUL: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                        } catch (e) {
                            slackSend (channel: '#jenkins-build', color: '#FF0000', message: "DOCKER COMPOSE FAIL: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                        }
                        
                        echo '********** Docker Compose End **********'
                    }
                }
            }
            
            stage('Delete unnecessary Docker images') {
                steps {
                    script {
                        echo '********** Delete unnecessary Docker images Start **********'
                        
                        sh 'docker image prune -a -f'
                        
                        echo '********** Delete unnecessary Docker images End **********'
                    }
                }
            }
        }
    }
    ```
    
- http/https 설정하기
    
    certbot 설치 후 인증서 발급 명령어
    
    ```bash
    sudo certbot certonly --standalone -d i11a609.p.ssafy.io
    sudo certbot certonly --standalone -d imnotdurnk.duckdns.org
    ```
    
    - ssl 인증서 자동갱신 설정
        
        Front 컨테이너가 80번 포트를 사용중인데, 인증서를 갱신할 때 80번 포트를 사용하기 때문에 갱신 명령어 실행 전에 도커를 잠시 중단해야 한다.
        
        이러한 내용을 포함하여 갱신 스크립트를 작성한다.
        
        **갱신 스크립트 - /usr/local/bin/renew_certificates.sh**
        
        ```bash
        #!/bin/bash
        
        # 컨테이너 이름 (또는 ID)
        CONTAINER_NAME="react"
        
        # Docker 컨테이너 중지
        echo "Stopping Docker container $CONTAINER_NAME..."
        sudo docker compose stop $CONTAINER_NAME
        
        # i11a609.p.ssafy.io 도메인 인증서 갱신
        echo "Renewing certificate for i11a609.p.ssafy.io..."
        sudo certbot certonly --standalone -d i11a609.p.ssafy.io --quiet || {
            echo "Certbot renewal failed for i11a609.p.ssafy.io!" >&2
            exit 1
        }
        
        # imnotdurnk.duckdns.org 도메인 인증서 갱신
        echo "Renewing certificate for imnotdurnk.duckdns.org..."
        sudo certbot certonly --standalone -d imnotdurnk.duckdns.org --quiet || {
            echo "Certbot renewal failed for imnotdurnk.duckdns.org!" >&2
            exit 1
        }
        
        # Docker 컨테이너 다시 시작
        echo "Starting Docker container $CONTAINER_NAME..."
        sudo docker compose up -d $CONTAINER_NAME
        
        echo "Certificate renewal and Docker container restart completed."
        
        ```
        

## 5) DB 접속 정보 등 프로젝트(ERD)에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록

- MySQL 접속 계정
    - 사용자: ssafy
    - 비밀번호: ssafy

# 2. 프로젝트에서 사용하는 외부 서비스 정보를 정리한 문서

: 소셜 인증, 포톤 클라우드, 코드 컴파일 등에 사용된 ‘외부 서비스’ 가입 및 활용에 필요한 정보

# 3. DB 덤프 파일 최신본

[backup240816.sql](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/backup240816.sql)

# 4. 시연 시나리오

- 홈 페이지 (로그인 전/후)

![Screenshot_20240817_094114.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094114.jpg)

![Screenshot_20240817_095522.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095522.jpg)

- 회원가입
    - 이름, 이메일, 전화번호, 비밀번호 필수 입력
    - 회원가입 약관 동의 필수
    - 기존 회원에 존재하는 이메일 중복사용 불가(이메일 인증 요청 시 중복 검사 실행)

![Screenshot_20240817_094131.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094131.jpg)

![Screenshot_20240817_094247.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094247.jpg)

- 이메일 인증
    - 입력한 이메일 주소로 인증번호 전송(랜덤 숫자 4자리)
    
    ![Screenshot 2024-08-16 at 11.21.42 AM.png](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_2024-08-16_at_11.21.42_AM.png)
    

![Screenshot_20240817_094319.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094319.jpg)

![Screenshot_20240817_094329.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094329.jpg)

![Screenshot_20240817_094359.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094359.jpg)

- 비밀번호 찾기 및 로그인
    - 비밀번호 찾기 → 이메일로 임시 비밀번호 전송(알파벳+숫자 랜덤 문자열, 길이 8)
    - 로그인 후 마이페이지 → 상세정보 수정에서 비밀번호 수정 가능
    
    ![image.png](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/image.png)
    

![Screenshot_20240817_094406.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094406.jpg)

![Screenshot_20240817_094556.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094556.jpg)

![Screenshot_20240817_094541.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094541.jpg)

![Screenshot_20240817_094647.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094647.jpg)

![Screenshot_20240817_094544.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094544.jpg)

![Screenshot_20240817_094655.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094655.jpg)

- 추가 정보 등록
    - 최초 로그인 시 집주소, 비상연락망, 주량 등 추가 정보 입력
    - 건너뛰기 가능, 추후 추가 입력 가능

![Screenshot_20240817_094745.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094745.jpg)

![Screenshot_20240817_094810.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094810.jpg)

![Screenshot_20240817_094816.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_094816.jpg)

- 게임 목록 / 4가지 만취 측정 미니 게임 / 게임 결과 (발음/밸런스/타이핑/기억력)

![Screenshot_20240817_095424.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095424.jpg)

![Screenshot_20240817_095743.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095743.jpg)

![Screenshot_20240817_095428.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095428.jpg)

![Screenshot_20240817_095839.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095839.jpg)

![Screenshot_20240817_095602.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095602.jpg)

![Screenshot_20240817_095605.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095605.jpg)

- 게임 기록 저장 분기
    - 일정이 있다면 → 존재 하는 일정에 게임 기록 저장 가능 → 일정 상세에서 바로 확인 가능
    - 일정이 없다면 → 일정 생성 후, 게임 기록 자동 저장됨 → 일정 상세에서 바로 확인 가능

![Screenshot_20240817_095626.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095626.jpg)

![Screenshot_20240817_095618.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095618.jpg)

![Screenshot_20240817_095643.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095643.jpg)

![Screenshot_20240817_095758.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095758.jpg)

![Screenshot_20240817_095610.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095610.jpg)

![Screenshot_20240817_095630.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095630.jpg)

![Screenshot_20240817_095703.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095703.jpg)

![Screenshot_20240817_095802.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095802.jpg)

![Screenshot_20240817_095615.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095615.jpg)

![Screenshot_20240817_095634.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095634.jpg)

![Screenshot_20240817_095709.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095709.jpg)

![Screenshot_20240817_095814.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095814.jpg)

- 캘린더 (month/year) 및 오늘의 일정 리스트
    - 피드백(취한정도)에 따라 지난 일정 색상 4가지로 구분되어 확인 가능

![Screenshot_20240817_100256.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100256.jpg)

![Screenshot_20240817_100317.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100317.jpg)

![Screenshot_20240817_095922.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_095922.jpg)

- 캘린더 - 일정 등록 / 수정
    - 과거 일정 - 스케쥴, 피드백(음주 기록 / 게임 기록) 등록 가능
    - 미래 일정 - 스케쥴만 등록 가능

![Screenshot_20240817_100016.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100016.jpg)

![Screenshot_20240817_100034.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100034.jpg)

![Screenshot_20240817_100106.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100106.jpg)

![Screenshot_20240817_100058.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100058.jpg)

![Screenshot_20240817_100330.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100330.jpg)

![Screenshot_20240817_100155.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100155.jpg)

![Screenshot_20240817_100335.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100335.jpg)

![Screenshot_20240817_100529.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100529.jpg)

- 경로 탐색 (구글 맵 + 카카오 모빌리티 API + ODsay API)
    - 출발지 기본값: 현재 위치 자동 입력, 직접 설정 가능
    - 목적지 주소 검색 시 자동완성 기능
    - 최적 경로 탐색
    - 경로 렌더링 및 현재 위치 확인 (백그라운드 앱 실행으로 실시간 GPS 위치 추적 가능)
    - 목적지 근처 100m이내에서 위치 확인시, 해당하는 음주 일정이 있는 경우 귀가 시간 자동 등록

![Screenshot_20240817_100939.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100939.jpg)

![Screenshot_20240817_101039.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_101039.jpg)

![Screenshot_20240817_100945.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100945.jpg)

![Screenshot_20240817_100910.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100910.jpg)

![Screenshot_20240817_100635.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100635.jpg)

![Screenshot_20240817_100923.jpg](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A2%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF%20a7bb50ead2de4d36b773437db35e8261/Screenshot_20240817_100923.jpg)
