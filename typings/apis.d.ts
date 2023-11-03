/* eslint-disable */

export type Urls = {
  post:
    | "api/phone/code"
    | "api/phone/login"
    | "api/phone/bind"
    | "api/fake-sms"
    | "api/phone/verify"
    | "api/phone/changeCode"
    | "api/phone/change"
    | "oauth/token"
    | "oauth/token"
    | "oauth/token"
    | "oauth/token"
    | "oauth/token"
    | "api/weixin/check"
    | "api/weixin/callback"
    | "api/phone/pwdCode"
    | "api/account/change-pwd"
    | "oauth/token"
    | `api/musicals/${string}/lryic-sync`
    | `api/musicals/${string}/music-sync`
    | "api/music-sync"
    | "api/musicals"
    | "api/musicals/check-name"
    | "api/schools"
    | "api/imports/school"
    | "api/classgrade"
    | "api/imports/classroom"
    | "api/classgrade-join"
    | "api/school_admin"
    | "api/exports/school-admins"
    | "api/imports/school_admin"
    | "api/students"
    | "api/imports/student"
    | "api/teachers"
    | "api/exports/teachers"
    | "api/imports/teacher"
    | "api/assistants"
    | "api/exports/assistants"
    | "api/imports/assistant"
    | "api/imports/school"
    | "api/imports/classroom"
    | "api/imports/school_admin"
    | "api/imports/teacher"
    | "api/imports/student"
    | "api/exports/schools"
    | "api/exports/classrooms"
    | "api/exports/school-admins"
    | "api/exports/teachers"
    | "api/exports/students"
    | "api/capacity"
    | "api/knowledges"
    | "api/knowledges"
    | "api/textbooks"
    | `api/exports/textbooks/${string}/job`
    | `api/edu/textbook/${string}/state`
    | "api/textbook-directory"
    | "api/textbook-directory/132/133"
    | "api/textbook-courses"
    | "api/textbook-course/check"
    | "api/guests"
    | "api/roles"
    | "api/permissions"
    | "api/textbook-repo"
    | "api/publisher"
    | "api/publisher-account"
    | "api/v2/storage"
    | "api/file-storage"
    | "api/questions"
    | "api/edu/classroom-devices"
    | "api/phone/changeCode"
    | "api/edu/teacher/changePhone"
    | "api/phone/pwdCode"
    | "api/edu/teacher/changePwd"
    | "api/edu/classroom-logs"
    | `api/exports/classroom-logs/${string}`
    | "api/edu/question-answer"
    | "api/teacher-textbook/import"
    | "api/edu/teacher/complete"
    | "api/estimate/template"
    | "api/estimate/config"
    | "api/estimate/apply"
    | "api/phone/code"
    | "api/phone/login"
    | "api/phone/bind"
    | "api/fake-sms"
    | "api/weixin/callback"
    | "api/weixin/check"
    | "oauth/token"
    | "oauth/token"
    | "oauth/token"
    | "oauth/token"
    | "oauth/token"
    | "api/phone/change"
    | "api/phone/changeCode"
    | "api/account/change-pwd"
    | "api/phone/pwdCode"
    | "oauth/token";
  get:
    | "api/weixin/qrcode"
    | "api/weixin/bind-qrcode"
    | "api/weixin/config"
    | `api/user/${string}`
    | `api/user/${string}/permissions`
    | `api/musicals/${string}`
    | "api/musicals"
    | `api/musicals/${string}`
    | "api/schools"
    | `api/schools/${string}`
    | "api/classgrade"
    | `api/classgrade/${string}`
    | "api/classgrade-number"
    | "api/school_admin"
    | `api/school_admin/${string}`
    | "api/students"
    | `api/students/${string}`
    | "api/exports/students"
    | "api/teachers"
    | `api/teachers/${string}`
    | "api/assistants"
    | "api/imports/tpl-down/school"
    | "api/imports/tpl-down/classroom"
    | "api/imports/tpl-down/school_admin"
    | "api/imports/tpl-down/teacher"
    | "api/imports/tpl-down/student"
    | `api/imports/symbol/${string}`
    | `api/async-jobs/${string}`
    | `api/async-jobs/${string}/down`
    | "api/async-jobs"
    | "api/teacher/import/record"
    | "api/capacity"
    | "api/knowledges"
    | "api/textbooks"
    | `api/textbooks/${string}`
    | `api/exports/textbooks/${string}`
    | `api/textbook-directory/${string}`
    | "api/textbook-courses"
    | `api/textbook-courses/${string}`
    | "api/guests"
    | "api/guests/204"
    | "api/roles"
    | "api/roles/50"
    | "api/permissions"
    | "api/permissions/1"
    | "api/publisher"
    | "api/publisher-account"
    | "storage/public:MjAyMy8wMy8yOC9CRmJSWVFsdm15RlpvQ0FQNGdobDNJUndBcGpnTzhnY0FsRjJCT29McG5FTEk0V0JmUkNVT2hDak9pdVFSbTY5LnBuZw=="
    | "api/file-storage"
    | `api/file-storage/${string}`
    | "api/questions"
    | `api/questions/${string}`
    | "api/question-answer"
    | `api/question-answer/${string}/state`
    | "api/edu/classroom-devices"
    | "api/edu/classroom-logs"
    | "api/edu/questions"
    | "api/edu/questions-number"
    | "api/edu/musicals"
    | `api/edu/question-answer/${string}/state`
    | "api/teacher-textbook/record"
    | "api/weixin/bind-qrcode"
    | `api/edu/students/${string}`
    | "api/edu/teacher/classrooms"
    | "api/edu/file-storage"
    | "api/statistic-members"
    | "api/statistic-schools"
    | "api/statistic-questions"
    | "api/statistic-courses"
    | "api/estimate/template"
    | `api/estimate/template/${string}`
    | `api/estimate/config/${string}`
    | `api/estimate/apply/${string}`
    | "api/estimate/job"
    | "api/weixin/bind-qrcode"
    | "api/weixin/config"
    | "api/weixin/qrcode"
    | `api/user/${string}`
    | `api/user/${string}/permissions`
    | "api/subjects"
    | "api/region/0"
    | "api/version"
    | "api/config"
    | "/"
    | "api/statistics";
  patch:
    | "api/account/update-profile"
    | "api/account/update-pwd"
    | "api/account/resetPwd"
    | `api/account/resetState/${string}`
    | `api/musicals/${string}/state`
    | `api/schools/${string}`
    | `api/classgrade/${string}`
    | `api/school_admin/${string}`
    | `api/students/${string}`
    | `api/student/${string}/state`
    | `api/teachers/${string}`
    | `api/profile/${string}`
    | "api/capacity/37"
    | "api/knowledges/4"
    | "api/guests/12931"
    | `api/questions/${string}/state`
    | "api/account/update-pwd"
    | "api/account/update-profile"
    | "api/account/resetPwd"
    | `api/account/resetState/${string}`;
  put:
    | "api/musicals/3"
    | "api/classgrade-connect"
    | "api/assistants/2684"
    | "api/textbooks/10"
    | "api/textbooks-state/21"
    | "api/textbook-directory/44"
    | `api/textbook-courses/${string}`
    | "api/roles/27"
    | "api/permissions/40"
    | "api/publisher/1"
    | "http://10.88.18.164:30000/storage/public:MjAyMy8wNC8yNC9UUmpvSk1ka0J0MXpxV25ya2FFR2dNQUJPU2ZLM0tLY3RNbnJ4WTJrUDJ0ZlpVTE5KckRyNmdDV21kc2NFRzJZLnBuZw=="
    | `api/file-storage/${string}`
    | `api/questions/${string}`
    | `api/edu/classroom-devices/${string}`
    | `api/estimate/template/${string}`;
  delete:
    | `api/musicals/${string}`
    | "api/musicals"
    | `api/schools/${string}`
    | "api/schools"
    | `api/classgrade/${string}`
    | "api/classgrade"
    | `api/school_admin/${string}`
    | "api/school_admin"
    | `api/students/${string}`
    | "api/students"
    | `api/teachers/${string}`
    | "api/teachers"
    | "api/assistants/2684"
    | `api/capacity/${string}`
    | "api/knowledges/15"
    | `api/textbooks/${string}`
    | "api/textbooks"
    | "api/textbook-directory/45"
    | `api/textbook-courses/${string}`
    | "api/textbook-courses"
    | "api/guests/211"
    | "api/guests"
    | "api/roles/5"
    | "api/roles"
    | "api/permissions/5"
    | "api/textbook-repo"
    | `api/publisher/${string}`
    | `api/publisher/${string}`
    | `api/file-storage/${string}`
    | "api/file-storage"
    | "api/questions/15"
    | "api/questions"
    | `api/question-scope/${string}`
    | `api/edu/classroom-devices/${string}`
    | `api/estimate/template/${string}`
    | `api/estimate/config/${string}`
    | `api/estimate/apply/${string}`;
  all:
    | Urls["post"]
    | Urls["get"]
    | Urls["patch"]
    | Urls["put"]
    | Urls["delete"];
};

export type RefSchema = {
  "textbook-dir": {
    id: number;
    pid: number;
    user_id: number;
    level: never;
    textbook_id: number;
    order_num: number;
    direct_name: string;
    created_at: string;
    updated_at: string;
    course: Array<{
      id: number;
      textbook_directory_id: number;
      user_id: number;
      course_name: string;
      cover_path: string;
      course_path: string;
      created_at: string;
      updated_at: string;
    }>;
    isCache?: boolean;
  };

  "ali-cloud-file": {
    /**
     * @description 资源绝对路径
     */
    url: string;
    vendor: string;
    mime: string;
    size: number;
    /**
     * @description 资源相对路径
     */
    node: string;
    dimension?: {
      width: number;
      height: number;
    };
  };

  "question-answer-single-slelect": {
    /**
     * @description 学生id
     */
    student_id: number;
    /**
     * @description 问题id
     */
    question_id: number;
    /**
     * @description 答案
     */
    answer: string;
  };

  "textbook-dir-tree": {
    id: number;
    pid: number;
    user_id: number;
    level: number;
    textbook_id: number;
    order_num: number;
    direct_name: string;
    created_at: string;
    updated_at: string;
    children: Array<RefSchema["textbook-dir-tree"]>;
    isOpen?: boolean;
  };

  textbook: {
    info: {
      id: number;
      publisher_id: number;
      subject_id: number;
      text_name: string;
      text_classgrade: number;
      text_volume: number;
      text_number: number;
      cover_path: {
        url: string;
        vendor: string;
        mime: string;
        size: number;
        node: string;
        dimension: {
          width: number;
          height: number;
        };
      };
      book_path: {
        url: string;
        vendor: string;
        mime: string;
        size: number;
        node: string;
        dimension: {
          width: number;
          height: number;
        };
      };
      is_down: number;
      created_at: string;
      updated_at: string;
      deleted_at: never;
      subject: {
        id: number;
        name: string;
      };
      directory: Array<{
        id?: number;
        pid?: number;
        user_id?: number;
        level?: number;
        textbook_id?: number;
        order_num?: number;
        direct_name?: string;
        created_at?: string;
        updated_at?: string;
        isOpen?: boolean;
        children?: Array<{}>;
      }>;
      dict_level: number;
      publisher: {
        id: number;
        name: string;
        created_at: never;
        updated_at: string;
      };
      isCache: boolean;
      isTextBookInfo: boolean;
    };
    others: {
      next: never;
      prev: {
        id: number;
        text_name: string;
      };
    };
  };
};

type ApiDetails = {
  post: {
    /**
     * 获取验证码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66850113
     */
    "api/phone/code": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 手机号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66850113
         */
        phone?: string;
      };

      response: {};
    };

    /**
     * 手机号登录
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66957560
     */
    "api/phone/login": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 手机号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66957560
         */
        phone?: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66957560
         */
        code?: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66957560
         */
        token_type: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66957560
         */
        expires_in: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66957560
         */
        access_token: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66957560
         */
        refresh_token: string;
      };
    };

    /**
     * 首次绑定手机号
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66903441
     */
    "api/phone/bind": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 手机号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66903441
         */
        phone?: string;
        /**
         * @description 验证码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66903441
         */
        code?: string;
      };

      response: {};
    };

    /**
     * 保存虚拟手机号
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96972719
     */
    "api/fake-sms": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96972719
         */
        phones: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96972719
         */
        code: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96972719
         */
        fake: string;
      };

      response: {};
    };

    /**
     * 验证验证码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-121061016
     */
    "api/phone/verify": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 123123
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-121061016
         */
        code?: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-121061016
         */
        phone: string;
      };

      response: {};
    };

    /**
     * 用新手机发验证码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117360586
     */
    "api/phone/changeCode": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 需要改绑的新手机号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117360586
         */
        phone: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117360586
         */
        success: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117360586
         */
        code: string;
      };
    };

    /**
     * 改绑手机
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117357788
     */
    "api/phone/change": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 验证码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117357788
         */
        code?: string;
        /**
         * @description 密码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117357788
         */
        phone?: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117357788
         */
        success: boolean;
      };
    };

    /**
     * 账号登录-管理员
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
     */
    "oauth/token": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 默认值
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        grant_type: string;
        /**
         * @description 默认值
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        client_id: string;
        /**
         * @description 默认值
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        client_secret: string;
        /**
         * @description 默认值
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        scope: string;
        /**
         * @description 用户名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        username: string;
        /**
         * @description 密码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        password: string;
        /**
         * @description hash密码识别标志。0否2是
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        version: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        token_type: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        expires_in: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        access_token: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67088747
         */
        refresh_token: string;
      };
    };

    /**
     * 查询登录结果
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83478290
     */
    "api/weixin/check": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 获取二维码同时返回的token
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83478290
         */
        token?: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83478290
         */
        success: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83478290
         */
        data: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83478290
           */
          token_type: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83478290
           */
          expires_in: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83478290
           */
          access_token: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83478290
           */
          refresh_token: string;
        };
      };
    };

    /**
     * 发送登录请求
     * @status deprecated
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66831222
     */
    "api/weixin/callback": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 从微信接口获得的code
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66831222
         */
        code: string;
      };

      response: {};
    };

    /**
     * 发送改绑验证码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120064789
     */
    "api/phone/pwdCode": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 需要改绑的新手机号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120064789
         */
        phone: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120064789
         */
        success: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120064789
         */
        code: string;
      };
    };

    /**
     * 手机号改密码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120062931
     */
    "api/account/change-pwd": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 验证码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120062931
         */
        code?: string;
        /**
         * @description 密码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120062931
         */
        pass1?: string;
        /**
         * @description 确认密码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120062931
         */
        pass2?: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120062931
         */
        success: boolean;
      };
    };

    /**
     * 跟唱同步
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116504530
     */
    [x: `api/musicals/${string}/lryic-sync`]: {
      contentType: "application/x-www-form-urlencoded";
      params: never;

      data: {
        /**
         * @description json字符串
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116504530
         */
        sync_json: string;
      };

      response: {};
    };

    /**
     * 【新】谱音同步
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116543730
     */
    [x: `api/musicals/${string}/music-sync`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116543730
         */
        "01GW48AHK8Z93K0283FE12QCC7": never;
      };

      response: {};
    };

    /**
     * 【旧】谱音同步
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-70123242
     */
    "api/music-sync": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-70123242
         */
        "01GW48AHK8Z93K0283FE12QCC7": never;
      };

      response: {};
    };

    /**
     * 创建
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
     */
    "api/musicals": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 谱例名。如：大鱼小鱼
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
         */
        name: string;
        /**
         * @description 曲谱的基本信息。查看用
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
         */
        base_info: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          title: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          subTitle: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          composer: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          lyricist: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          keySign: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          speed: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          timeSign: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          isChangeTimeSign: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          isChangeKeySign: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          isUpbeat: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          musicType: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          isHasLyric: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          initOpts: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            keySign: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            isWeak: boolean;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            weakBarTop: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            weakBarBot: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            rows: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            rowBars: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            speedType: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            speedText: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            speedNote: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            speedNum: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            beatType: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            beatNote1: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            beatNote2: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            musicType: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
           */
          lyricStyle: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            color: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            fontWeight: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            fontStyle: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            fontSize: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
             */
            fontFamily: string;
          };
        };
        /**
         * @description 公开。1是0否
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
         */
        is_public: number;
        /**
         * @description 曲谱类型。简谱、高音谱、中音谱、
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
         */
        music_type: string;
        /**
         * @description abc记谱法内容。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65200922
         */
        abc_json_val: string;
      };

      response: {};
    };

    /**
     * 重复谱名查询
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71068303
     */
    "api/musicals/check-name": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71068303
         */
        keyword: string;
      };

      response: {};
    };

    /**
     * 创建
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030802
     */
    "api/schools": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030802
         */
        name: string;
        /**
         * @description 省市县代码。请求省市县接口获得。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030802
         */
        region_code: number;
        /**
         * @description 是否小学。1是0否。可多选
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030802
         */
        primary_school: boolean;
        /**
         * @description 是否中学。1是0否。可多选
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030802
         */
        middle_school: boolean;
        /**
         * @description 是否高中。1是0否。可多选
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030802
         */
        high_school: boolean;
        /**
         * @description 层级
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030802
         */
        admin_level: number;
        /**
         * @description 学校类型。0未知1村2镇
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030802
         */
        school_type: number;
        /**
         * @description 展示方式。1分数2等级
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030802
         */
        show_type: number;
      };

      response: {};
    };

    /**
     * 导入学校
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65506093
     */
    "api/imports/school": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65506093
         */
        file?: never;
      };

      response: {};
    };

    /**
     * 添加
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65085435
     */
    "api/classgrade": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65085435
         */
        school_id: number;
        /**
         * @description 入学年份
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65085435
         */
        enroll_year?: number | null;
        /**
         * @description 入学年级
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65085435
         */
        enroll_grade?: number | null;
        /**
         * @description 当前年级。根据学校学段自动生成对应年级。小1-6，中7-9，
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65085435
         */
        current_grade: number;
        /**
         * @description 班级序号。数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65085435
         */
        seq: Array<number>;
        /**
         * @description 任课教师id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65085435
         */
        teacher_ids: Array<string>;
      };

      response: {};
    };

    /**
     * 导入班级
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65696643
     */
    "api/imports/classroom": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65696643
         */
        file?: never;
      };

      response: {};
    };

    /**
     * 教师加入班级
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-97450923
     */
    "api/classgrade-join": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 识别码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-97450923
         */
        code: string;
        /**
         * @description 学科id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-97450923
         */
        subject_ids: Array<number>;
      };

      response: {};
    };

    /**
     * 创建
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146129
     */
    "api/school_admin": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146129
         */
        school_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146129
         */
        account: {
          /**
           * @description 真实姓名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146129
           */
          realname: string;
          /**
           * @description 登录名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146129
           */
          login_name?: string;
          /**
           * @description 手机号
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146129
           */
          mobile?: string;
          /**
           * @description 密码
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146129
           */
          pass1?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146129
           */
          pass2?: string;
        };
      };

      response: {};
    };

    /**
     * 导出校管 Copy
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-98875438
     */
    "api/exports/school-admins": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 导入校管
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80992769
     */
    "api/imports/school_admin": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 文件
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80992769
         */
        file?: never;
      };

      response: {};
    };

    /**
     * 创建
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65099826
     */
    "api/students": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65099826
         */
        school_id: number;
        /**
         * @description 班级内序号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65099826
         */
        number_in_class: number;
        /**
         * @description 班级id。列表班级的id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65099826
         */
        class_grade_id: number;
        /**
         * @description 账号数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65099826
         */
        account: {
          /**
           * @description 学籍号
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65099826
           */
          serial: string;
          /**
           * @description 真实姓名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65099826
           */
          realname: string;
        };
      };

      response: {};
    };

    /**
     * 导入学生
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65396263
     */
    "api/imports/student": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65396263
         */
        file: never;
      };

      response: {};
    };

    /**
     * 创建
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65138849
     */
    "api/teachers": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65138849
         */
        school_id: number;
        /**
         * @description 学科id。数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65138849
         */
        subject_id: Array<number>;
        /**
         * @description 账号信息
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65138849
         */
        account: {
          /**
           * @description 真实姓名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65138849
           */
          realname: string;
          /**
           * @description 手机。可选参数
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65138849
           */
          mobile?: string;
        };
      };

      response: {};
    };

    /**
     * 导出教师
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-98875430
     */
    "api/exports/teachers": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 导入教师
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80608223
     */
    "api/imports/teacher": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80608223
         */
        file?: never;
      };

      response: {};
    };

    /**
     * 添加
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117055280
     */
    "api/assistants": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 辖区
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117055280
         */
        region_code: number;
        /**
         * @description 层级
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117055280
         */
        admin_level: number;
        /**
         * @description 姓名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117055280
         */
        realname: string;
        /**
         * @description 手机
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117055280
         */
        mobile: string;
      };

      response: {};
    };

    /**
     * 导出
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117114257
     */
    "api/exports/assistants": {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117114257
         */
        "ids[]": Array<never>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117114257
         */
        has_password: string;
      };

      data: never;

      response: {};
    };

    /**
     * 导入
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117199975
     */
    "api/imports/assistant": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 文件
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117199975
         */
        file?: never;
      };

      response: {};
    };

    /**
     * 导出学校
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67476253
     */
    "api/exports/schools": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 使用主键id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67476253
         */
        "ids[]": Array<never>;
      };

      response: {};
    };

    /**
     * 导出班级
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028910
     */
    "api/exports/classrooms": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 使用主键id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028910
         */
        "ids[]": Array<never>;
      };

      response: {};
    };

    /**
     * 导出学生
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80587787
     */
    "api/exports/students": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 使用uid
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80587787
         */
        "ids[]": Array<never>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80587787
         */
        has_password: number;
      };

      response: {};
    };

    /**
     * 创建
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76545118
     */
    "api/capacity": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 知识点
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76545118
         */
        knowledge_name: string;
      };

      response: {};
    };

    /**
     * 创建分类
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-103747995
     */
    "api/knowledges": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 父级id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-103747995
         */
        pid: number;
        /**
         * @description 知识点
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-103747995
         */
        knowledge_name: string;
      };

      response: {};
    };

    /**
     * 创建教材
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
     */
    "api/textbooks": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学科id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
         */
        subject_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
         */
        text_name: string;
        /**
         * @description 适用年级。一年级到高三：1-12
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
         */
        text_classgrade: number;
        /**
         * @description 上下册。1上2下3全
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
         */
        text_volume: number;
        /**
         * @description 目录层级限制。1,2,3,4层表示只导入该层级数据。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
         */
        dict_level: number;
        /**
         * @description 封面路径
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
         */
        cover_path: string;
        /**
         * @description pdf。电子教材路径
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
         */
        book_path: string;
        /**
         * @description 自动导入目录
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
         */
        directory: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
           */
          title: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
           */
          children: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
             */
            title: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
             */
            children: Array<{
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
               */
              title: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
               */
              children: Array<{
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
                 */
                title: string;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
                 */
                children: never;
              }>;
            }>;
          }>;
        }>;
        /**
         * @description 出版社id。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232449
         */
        publisher_id: number;
      };

      response: {};
    };

    /**
     * 教材导出状态查看
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-106954831
     */
    [x: `api/exports/textbooks/${string}/job`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 教师查看导入教材是否公开
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-115653789
     */
    [x: `api/edu/textbook/${string}/state`]: {
      contentType: "multipart/form-data";
      params: never;

      data: never;

      response: {
        /**
         * @description 公开。1是0否
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-115653789
         */
        is_public: number;
      };
    };

    /**
     * 添加
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267321
     */
    "api/textbook-directory": {
      contentType: "application/json";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267321
         */
        pid?: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267321
         */
        textbook_id?: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267321
         */
        order_num?: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267321
         */
        direct_name?: string;
      };

      data: {
        /**
         * @description 父级id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267321
         */
        pid: number;
        /**
         * @description 教材id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267321
         */
        textbook_id: number;
        /**
         * @description 排序
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267321
         */
        order_num: number;
        /**
         * @description 目录名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267321
         */
        direct_name: string;
      };

      response: {};
    };

    /**
     * 调整顺序
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81203901
     */
    "api/textbook-directory/132/133": {
      contentType: "multipart/form-data";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 添加
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
     */
    "api/textbook-courses": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 教材id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        textbook_directory_id: number;
        /**
         * @description 课件名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        course_name: string;
        /**
         * @description 封面地址。请先请求文件上传接口
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        cover_path: string;
        /**
         * @description 课件内容地址。请先请求文件上传接口
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        course_path: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        textbook_directory_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        course_name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        course_path: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          url: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          vendor: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          mime: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          size: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          node: string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        cover_path: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          url: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          vendor: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          mime: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          size: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          dimension: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
             */
            width: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
             */
            height: number;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
           */
          node: string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        class_id: Array<number>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        user_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        updated_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        created_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65293333
         */
        id: number;
      };
    };

    /**
     * 课件重名检测
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108518462
     */
    "api/textbook-course/check": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 标题
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108518462
         */
        keyword: string;
        /**
         * @description ppt课件的id。编辑课件时需要传入以排除当前课件。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108518462
         */
        course_id: number;
        /**
         * @description 课件的目录id.
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108518462
         */
        did?: number;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108518462
         */
        success: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108518462
         */
        msg: string;
      };
    };

    /**
     * 添加账号
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77512621
     */
    "api/guests": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 名称
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77512621
         */
        realname: string;
        /**
         * @description 角色id数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77512621
         */
        "roles[]"?: Array<never>;
        /**
         * @description 登录账号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77512621
         */
        login_name: string;
      };

      response: {};
    };

    /**
     * 新建
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65779183
     */
    "api/roles": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 权限id数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65779183
         */
        permissions: Array<string>;
        /**
         * @description 角色名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65779183
         */
        display_name: string;
      };

      response: {};
    };

    /**
     * 添加
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65762978
     */
    "api/permissions": {
      contentType: "application/json";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 提交资源记录
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105397708
     */
    "api/textbook-repo": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 数据模型。曲谱1, 习题2
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105397708
         */
        model_type_id: number;
        /**
         * @description 曲谱id或习题id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105397708
         */
        model_id: number;
        /**
         * @description 课件id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105397708
         */
        course_id: number;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105397708
         */
        success: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105397708
         */
        type: string;
      };
    };

    /**
     * 创建
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75753617
     */
    "api/publisher": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 出版社
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75753617
         */
        name: string;
        /**
         * @description 学段。0无1小2初3高4全
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75753617
         */
        school_stage: number;
      };

      response: {};
    };

    /**
     * 创建
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108991545
     */
    "api/publisher-account": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 用户id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108991545
         */
        uid?: number;
        /**
         * @description 出版社id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108991545
         */
        publisher_id: number;
      };

      response: {};
    };

    /**
     * 获取上传临时连接
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
     */
    "api/v2/storage": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 文件名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        filename: string;
        /**
         * @description 文件MD5
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        hash: string;
        /**
         * @description mime头
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        mime_type: string;
        /**
         * @description 大小kb
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        size: number;
        /**
         * @description 固定值。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        storage: {
          /**
           * @description public
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          channel: string;
        };
      };

      response: {
        /**
         * @description 上传文件的临时链接
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        uri: string;
        /**
         * @description 提交方法
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        method: string;
        /**
         * @description 请求头部要携带的参数
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        headers: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          Authorization: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          "x-plus-storage-hash": string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          "x-plus-storage-size": number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          "x-plus-storage-mime-type": string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        node: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
         */
        post_policy: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          uri: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          method: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          headers: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            Accept: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            "x-plus-storage-hash": string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            "x-plus-storage-size": number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            "x-plus-storage-mime-type": string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          form: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            key: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            policy: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            accessid: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            success_action_status: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            callback: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            signature: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
             */
            file: never;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003388
           */
          expire: number;
        };
      };
    };

    /**
     * 保存
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110617631
     */
    "api/file-storage": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 文件类型。1图2音3视
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110617631
         */
        file_type: number;
        /**
         * @description 学科
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110617631
         */
        subject_id: number;
        /**
         * @description 出版社
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110617631
         */
        publisher_id: number;
        /**
         * @description 目录
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110617631
         */
        dict_id: number;
        /**
         * @description 资源路径node
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110617631
         */
        path: string;
        /**
         * @description 文件名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110617631
         */
        origin_filename: string;
        /**
         * @description 公开。1是0否。默认0
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110617631
         */
        is_public: number;
        /**
         * @description asda
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110617631
         */
        "dict_ids[]": Array<never>;
      };

      response: {};
    };

    /**
     * 添加习题
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
     */
    "api/questions": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 固定填raw
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        format: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        type: number;
        /**
         * @description 题目描述
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        body: string;
        /**
         * @description 选项。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        branches: Array<string>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        score: number;
        /**
         * @description 题目解析
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        explain: string;
        /**
         * @description 知识点id数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        knowledge_point: Array<number>;
        /**
         * @description 能力点id数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        competence: Array<number>;
        /**
         * @description 谱id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        musical_id: string;
        /**
         * @description 音准偏移
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        musical_offset: string;
        /**
         * @description 难度。容易、中等、困难
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        difficulty: string;
        /**
         * @description 出版社id。先查接口
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        publisher_id: string;
        /**
         * @description 适用年级。1-12
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        apply_grade: string;
        /**
         * @description 上下册。1上2下3全
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        apply_volume: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        answer: string;
        /**
         * @description 附件数组。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        media: Array<string>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        subject_id: number;
        /**
         * @description 公开1是0否
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        is_public: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        scope: Array<{
          /**
           * @description 学段
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
           */
          school_stage: number;
          /**
           * @description 出版社
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
           */
          publisher_id: number;
          /**
           * @description 年级
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
           */
          apply_grade: number;
          /**
           * @description 上下册
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
           */
          apply_volume: number;
          /**
           * @description 目录
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
           */
          dict_id: number;
        }>;
        /**
         * @description 习题额外字段。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76846246
         */
        extras: {};
      };

      response: {};
    };

    /**
     * 添加设备
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111570843
     */
    "api/edu/classroom-devices": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 设备号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111570843
         */
        device_sn: string;
        /**
         * @description 设备序号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111570843
         */
        number_in_class: number;
      };

      response: {};
    };

    /**
     * 改绑新手机
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80642646
     */
    "api/edu/teacher/changePhone": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 新手机号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80642646
         */
        phone?: string;
        /**
         * @description 验证码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80642646
         */
        code?: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80642646
         */
        success: boolean;
      };
    };

    /**
     * 修改密码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81324844
     */
    "api/edu/teacher/changePwd": {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 验证码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81324844
         */
        code?: string;
        /**
         * @description 密码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81324844
         */
        pass1?: string;
        /**
         * @description 确认密码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81324844
         */
        pass2?: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81324844
         */
        success: boolean;
      };
    };

    /**
     * 创建记录
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110890587
     */
    "api/edu/classroom-logs": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 班级id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110890587
         */
        class_id: number;
        /**
         * @description 用户类型。1教师2学生
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110890587
         */
        user_type: number;
        /**
         * @description 操作类型
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110890587
         */
        action_type: number;
        /**
         * @description 非必填。个人点名、演唱时传学生id。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110890587
         */
        student_id?: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110890587
         */
        msg: string;
      };

      response: {};
    };

    /**
     * 日志导出
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111032987
     */
    [x: `api/exports/classroom-logs/${string}`]: {
      contentType: "multipart/form-data";
      params: never;

      data: {
        /**
         * @description 学生id。不传或0，表示全部。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111032987
         */
        user_id?: number;
        /**
         * @description 周。1本周，2上周
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111032987
         */
        week?: number;
        /**
         * @description 月。1本月，2上月
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111032987
         */
        month?: number;
        /**
         * @description 时间段。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111032987
         */
        "time_range[]"?: Array<never>;
      };

      response: {};
    };

    /**
     * 【授课端】学生答题记录提交
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111003336
     */
    "api/edu/question-answer": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学生id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111003336
         */
        student_id: number;
        /**
         * @description 问题id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111003336
         */
        question_id: number;
        /**
         * @description 答案。单选字符串填数组下标01234、多选数组、填空字符串、
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111003336
         */
        answer: string;
        /**
         * @description 不同的题型提交不同的数据。连线题提交图片
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111003336
         */
        extra?: string | integer | boolean | array | object | number | null;
      };

      response: {};
    };

    /**
     * 导入课件记录
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78148531
     */
    "api/teacher-textbook/import": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 教材id数组。后端自动判断是否已导入。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78148531
         */
        textbook_ids: Array<string>;
      };

      response: {};
    };

    /**
     * 教师完善信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
     */
    "api/edu/teacher/complete": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        school_id: number;
        /**
         * @description 学科id数组。请查学科接口
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        subject_ids: Array<number>;
        /**
         * @description 年级数组。1-12。可查系统常量。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        grade_ids: Array<number>;
        /**
         * @description 账号名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        name: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        login_name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        type: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        mobile: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        wechat_id: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        openid: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        unionid: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        serial: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        realname: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        nickname: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        avatar: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        state: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80396839
         */
        created_at: string;
      };
    };

    /**
     * 添加
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
     */
    "api/estimate/template": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 标题
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
         */
        title: string;
        /**
         * @description 状态。0123
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
         */
        state: number;
        /**
         * @description 适用年级
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
         */
        apply_grade: number;
        /**
         * @description 适用范围
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
         */
        admin_level: number;
        /**
         * @description 应用系统
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
         */
        application?: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
           */
          edu: string;
        };
        /**
         * @description 奖项配置。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
         */
        rewards?: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
           */
          A: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
           */
          B: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
           */
          C: string;
        };
        /**
         * @description 分数映射。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
         */
        rank_rule?: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120095576
           */
          edu: string;
        };
      };

      response: {};
    };

    /**
     * 添加
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120112994
     */
    "api/estimate/config": {
      contentType: "application/json";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 添加
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120171980
     */
    "api/estimate/apply": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 评价表id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120171980
         */
        estimate_id: number;
        /**
         * @description 学校id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120171980
         */
        school_id: number;
        /**
         * @description 生效日期。2023
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120171980
         */
        effect_date: number;
        /**
         * @description 生效学年。1上2下
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120171980
         */
        effect_stage: number;
      };

      response: {};
    };
  };

  get: {
    /**
     * 登录二维码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83476497
     */
    "api/weixin/qrcode": {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83476497
         */
        success: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83476497
         */
        url: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-83476497
         */
        token: string;
      };
    };

    /**
     * 绑定二维码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81323996
     */
    "api/weixin/bind-qrcode": {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81323996
         */
        success: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81323996
         */
        url: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-81323996
         */
        token: string;
      };
    };

    /**
     * 微信登录配置
     * @status deprecated
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66803719
     */
    "api/weixin/config": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 账号信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
     */
    [x: `api/user/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @description 用户id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        id: number;
        /**
         * @description 登录账号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        login_name: string;
        /**
         * @description 用户类型
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        type: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        mobile: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        wechat_id: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        openid: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        unionid: never;
        /**
         * @description 学籍号，教师注册号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        serial: never;
        /**
         * @description 真实姓名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        realname: string;
        /**
         * @description 昵称
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        nickname: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        avatar: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          url: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          vendor: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          mime: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          size: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          dimension: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            width: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            height: number;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          node: string;
        };
        /**
         * @description 状态。0正常。1禁用
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        state: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        created_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        classgrades_count: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        students_count: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        teachers: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          id?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          uid?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          school_id?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          subject_id?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          is_supervisor?: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          created_at?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          updated_at?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          class_grades?: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            school_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            origin_grade: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            enroll_year: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            enroll_grade: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            seq: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            alias: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            head_teacher_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            class_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            grade_number: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            region_code: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            school_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            grade_level: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            school: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              region_code: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              school_code: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              bureau_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              admin_level: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              primary_school: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              middle_school: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              high_school: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              is_primary_school: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              is_middle_school: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              is_high_school: string;
            };
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          school?: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            region_code: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            school_code: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            bureau_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            admin_level: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            primary_school: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            middle_school: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            high_school: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            is_primary_school: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            is_middle_school: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            is_high_school: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            district_division: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              code: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              parent_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              level: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              short_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              l1_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              l1_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              l2_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              l2_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              l3_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
               */
              l3_id: number;
            };
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          subjects?: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            id?: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            name?: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            laravel_through_key?: number;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
           */
          teaching_grades?: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            teacher_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            class_grade: Array<number>;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            created_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
             */
            updated_at: string;
          };
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64455675
         */
        sex: number;
      };
    };

    /**
     * 当前用户权限
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
     */
    [x: `api/user/${string}/permissions`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @description 用户id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        id: number;
        /**
         * @description 登录账号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        login_name: string;
        /**
         * @description 用户类型
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        type: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        sex: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        mobile: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        wechat_id: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        openid: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        unionid: never;
        /**
         * @description 学籍号，教师注册号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        serial: never;
        /**
         * @description 真实姓名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        realname: string;
        /**
         * @description 昵称
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        nickname: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        avatar: never;
        /**
         * @description 状态。0正常。1禁用
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        state: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        created_at: string;
        /**
         * @description 角色组。可以是多个角色
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
         */
        roles: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
           */
          id?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
           */
          name?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
           */
          display_name?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
           */
          guard_name?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
           */
          created_at?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
           */
          updated_at?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
           */
          pivot?: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
             */
            model_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
             */
            role_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-104304922
             */
            model_type: string;
          };
        }>;
      };
    };

    /**
     * 读取曲谱信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
     */
    [x: `api/musicals/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        user_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        base_info: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          title: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          subTitle: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          composer: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          lyricist: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          keySign: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          speed: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          timeSign: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          isChangeTimeSign: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          isChangeKeySign: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          isUpbeat: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          musicType: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          isHasLyric: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          initOpts: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            title: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            subTitle: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            compose: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            lyricist: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            keySign: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            isWeak: boolean;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            weakBarTop: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            weakBarBot: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            rows: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            rowBars: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            speedType: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            speedText: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            speedNote: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            speedNum: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            beatType: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            beatNote1: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            beatNote2: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            musicType: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          lyricStyle: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            color: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            fontWeight: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            fontStyle: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            fontSize: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            fontFamily: string;
          };
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        music_type: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        abc_json_val: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          url: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          vendor: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          mime: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          size: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          node: string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        sync_json_val: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        is_score_sync: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        is_sing_sync: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        created_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        updated_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
         */
        music: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          id: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          user_id: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          music_id: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          audio_type: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          new_timeline: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          file_path: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            url: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            vendor: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            mime: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            size: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
             */
            node: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          is_public: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76552998
           */
          updated_at: string;
        }>;
      };
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
     */
    "api/musicals": {
      contentType: "none";
      params: {
        /**
         * @description 搜索字段
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
         */
        fu_name?: string;
        /**
         * @description 曲谱类型。支持多选用逗号分隔。曲谱类型请查系统常量
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
         */
        music_type?: string;
        /**
         * @description 1私有，0平台。不传默认1
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
         */
        is_private?: string;
        /**
         * @description 谱音同步，1是
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
         */
        fb_is_score_sync: number;
      };

      data: never;

      response: {
        /**
         * @description 数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          id: number;
          /**
           * @description 来源用户
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          user_id: number;
          /**
           * @description 曲谱名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          name: string;
          /**
           * @description 曲谱基础信息
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          base_info: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            base_info: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            vocal_type: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            music_type: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            abc_json_val: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            aaa?: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            error_code?: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            error_msg?: string;
          };
          /**
           * @description 声部类型
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          vocal_type?: string | null;
          /**
           * @description 曲谱类型
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          music_type: string;
          /**
           * @description abc格式
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          abc_json_val: string;
          /**
           * @description 谱音同步
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          sync_json_val: never;
          /**
           * @description 音频文件
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          music_attach_id: never;
          /**
           * @description 同步文件
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          sync_attach_id: never;
          /**
           * @description 跟唱文件
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          sing_attach_id: never;
          /**
           * @description 是否谱音同步。1是0否
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          is_score_sync: number;
          /**
           * @description 是否跟唱同步。1是0否
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          is_sing_sync: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          music: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          is_public: number;
        }>;
        /**
         * @description 链接信息
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          next: never;
        };
        /**
         * @description 分页信息
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          per_page: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-64787089
           */
          total: number;
        };
      };
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
     */
    "api/schools": {
      contentType: "none";
      params: {
        /**
         * @description 分页数量
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
         */
        page_size?: string;
        /**
         * @description 分页
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
         */
        page?: string;
        /**
         * @description 搜索
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
         */
        fu_name?: string;
        /**
         * @description 省市县接口的code。440100
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
         */
        region_code: string;
        /**
         * @description 学校类型。0123
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
         */
        fb_school_type: string;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          id?: number;
          /**
           * @description 学校名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          name?: string;
          /**
           * @description 省市县代码
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          region_code?: string;
          /**
           * @description 学校唯一id
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          school_code?: string;
          /**
           * @description 区代理
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          bureau_id?: number;
          /**
           * @description 管理层级
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          admin_level?: number;
          /**
           * @description 是否小学
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          primary_school?: number;
          /**
           * @description 是否中学
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          middle_school?: number;
          /**
           * @description 是否高中
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          high_school?: number;
          /**
           * @description 学生总数
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          students_count?: number;
          /**
           * @description 教师总数
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          teachers_count?: number;
          /**
           * @description 校管总数
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          school_admins_count?: number;
          /**
           * @description 班级总数
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          class_grades_count?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          is_primary_school?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          is_middle_school?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          is_high_school?: string;
          /**
           * @description 省市县地区
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          district_division?: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            code: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            short_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            parent_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            list_order: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            level: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            l1_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            l1_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            l2_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            l2_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            l3_name: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            l3_id: never;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          bureau?: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            admin_scope: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            created_at: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            updated_at: never;
          };
          /**
           * @description 学科
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          subjects?: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            slug: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            question_type: Array<{
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
               */
              type: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
               */
              question_type: Array<number>;
            }>;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            competences: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            knowledge_points: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            teaching_materials: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            logo: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            icon: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            laravel_through_key: number;
          }>;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          next: never;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          per_page: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030341
           */
          total: number;
        };
      };
    };

    /**
     * 信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65030716
     */
    [x: `api/schools/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65070260
     */
    "api/classgrade": {
      contentType: "none";
      params: {
        /**
         * @description 学校名称模糊查询
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65070260
         */
        school_name?: string;
        /**
         * @description 省市县代码。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65070260
         */
        region_code?: string;
        /**
         * @description 年级。一年级-高三：1-12
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65070260
         */
        grade?: number;
        /**
         * @description 班级序号。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65070260
         */
        fb_seq?: number;
        /**
         * @description 学校id精准查询
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65070260
         */
        fb_school_id?: number;
        /**
         * @description 教师账号有效。1表示查询学校下所有的班级。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65070260
         */
        with_all: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65070260
         */
        subject_id: string;
      };

      data: never;

      response: {};
    };

    /**
     * 信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65071129
     */
    [x: `api/classgrade/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 班级数量和序号
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108592608
     */
    "api/classgrade-number": {
      contentType: "none";
      params: {
        /**
         * @description 年级。1-12
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108592608
         */
        grade: number;
        /**
         * @description 保留字段。为空。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108592608
         */
        school_id?: number;
      };

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146127
     */
    "api/school_admin": {
      contentType: "none";
      params: {
        /**
         * @description 省市县代码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146127
         */
        region_code?: string;
        /**
         * @description 学校名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146127
         */
        school_name?: string;
        /**
         * @description 姓名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146127
         */
        name?: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146127
         */
        mobile?: string;
      };

      data: never;

      response: {};
    };

    /**
     * 信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146128
     */
    [x: `api/school_admin/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
     */
    "api/students": {
      contentType: "none";
      params: {
        /**
         * @description 学生名。模糊搜索
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
         */
        name?: string;
        /**
         * @description 学校名。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
         */
        school_name?: string;
        /**
         * @description 年级。一年级到高三：1-12
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
         */
        grade?: number;
        /**
         * @description 班级。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
         */
        seq?: number;
        /**
         * @description 学生班内序号。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
         */
        number_in_class?: string;
        /**
         * @description 学校省市县代码。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
         */
        region_code?: string;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          uid: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          school_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          class_grade_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          number_in_class: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          classgrade: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            school_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            origin_grade: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            enroll_year: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            enroll_grade: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            seq: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            alias: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            head_teacher_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            class_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            grade_number: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            region_code: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            school_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            grade_level: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            school: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              region_code: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              school_code: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              bureau_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              admin_level: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              primary_school: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              middle_school: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              high_school: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              is_primary_school: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              is_middle_school: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              is_high_school: string;
            };
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          account: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            login_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            type: number;
            /**
             * @description 0：未知，1：男，2：女
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            sex: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            mobile: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            wechat_id: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            openid: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            unionid: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            serial: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            realname: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            nickname: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            avatar?: object | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            state: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            created_at: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          school: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            region_code: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            school_code: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            bureau_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            admin_level: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            primary_school: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            middle_school: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            high_school: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            is_primary_school: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            is_middle_school: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            is_high_school: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            district_division: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              code: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              parent_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              level: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              short_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              l1_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              l1_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              l2_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              l2_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              l3_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
               */
              l3_id: number;
            };
          };
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          next: string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          per_page: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096031
           */
          total: number;
        };
      };
    };

    /**
     * 信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65096861
     */
    [x: `api/students/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 导出学生
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-98875325
     */
    "api/exports/students": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65125691
     */
    "api/teachers": {
      contentType: "none";
      params: {
        /**
         * @description 学校省市县代码。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65125691
         */
        region_code?: string;
        /**
         * @description 学校名。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65125691
         */
        school_name?: string;
        /**
         * @description 教师名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65125691
         */
        name?: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65125691
         */
        mobile?: string;
        /**
         * @description 教师担任的学科id。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65125691
         */
        subject_id?: number;
        /**
         * @description 学校id。关联班级教师读取
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65125691
         */
        fb_school_id?: string;
      };

      data: never;

      response: {};
    };

    /**
     * 信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65136961
     */
    [x: `api/teachers/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117057547
     */
    "api/assistants": {
      contentType: "none";
      params: {
        /**
         * @description 辖区号码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117057547
         */
        fb_region_code: string;
      };

      data: never;

      response: {};
    };

    /**
     * 学校
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-69175110
     */
    "api/imports/tpl-down/school": {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-69175110
         */
        time: string;
      };

      data: never;

      response: {};
    };

    /**
     * 班级
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-69009565
     */
    "api/imports/tpl-down/classroom": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 校管
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-82423825
     */
    "api/imports/tpl-down/school_admin": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 教师
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-82423822
     */
    "api/imports/tpl-down/teacher": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 学生
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68668890
     */
    "api/imports/tpl-down/student": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 发送导入指令
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-82123946
     */
    [x: `api/imports/symbol/${string}`]: {
      contentType: "multipart/form-data";
      params: {
        /**
         * @description 覆盖导入。true是,false否。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-82123946
         */
        is_overwrite: string;
      };

      data: never;

      response: {};
    };

    /**
     * 导入任务状态和结果
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65578433
     */
    [x: `api/async-jobs/${string}`]: {
      contentType: "none";
      params: {
        /**
         * @description 当前页
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65578433
         */
        page?: string;
      };

      data: never;

      response: {};
    };

    /**
     * 下载校验文件
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-85323415
     */
    [x: `api/async-jobs/${string}/down`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 异步任务查看
     * @status deprecated
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65412693
     */
    "api/async-jobs": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 权益列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76597631
     */
    "api/teacher/import/record": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76545117
     */
    "api/capacity": {
      contentType: "none";
      params: {
        /**
         * @description 模糊搜索字段
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76545117
         */
        fu_name?: string;
      };

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65157629
     */
    "api/knowledges": {
      contentType: "none";
      params: {
        /**
         * @description 模糊搜索
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65157629
         */
        fu_name?: string;
      };

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
     */
    "api/textbooks": {
      contentType: "none";
      params: {
        /**
         * @description 学科id。音乐或美术
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
         */
        fb_subject_id?: number;
        /**
         * @description 模糊搜索教材名称
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
         */
        fu_text_name?: string;
        /**
         * @description 出版社id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
         */
        fb_publisher_id?: number;
        /**
         * @description 学段
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
         */
        school_stage?: number;
        /**
         * @description 页数
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
         */
        page: number;
        /**
         * @description 条数
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
         */
        page_size: number;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          publisher_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          subject_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          text_name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          text_classgrade: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          text_volume: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          text_number: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          cover_path: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            url: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            vendor: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            mime: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            size: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            dimension: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
               */
              width: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
               */
              height: number;
            };
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            node: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          book_path: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            url: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            vendor: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            mime: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            size: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            node: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          is_down: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          deleted_at: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          dict_level: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          text_number_all: number;
          /**
           * @description 含私有资源。1是0否
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          has_private: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          directory: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            pid: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            user_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            level: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            textbook_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            order_num: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            direct_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            created_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            updated_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            children: Array<string>;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          subject: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            name: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          publisher: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            pinyin_prefix: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            created_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            updated_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            deleted_at: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            school_stage: number;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          tid?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          isCache?: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          isLoading?: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          isLocal?: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          uuid?: string;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          next: string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          per_page: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65232257
           */
          total: number;
        };
      };
    };

    /**
     * 展示
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
     */
    [x: `api/textbooks/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
         */
        info: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          publisher_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          subject_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          text_name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          text_classgrade: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          text_volume: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          text_number: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          cover_path: RefSchema["ali-cloud-file"];
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          book_path: RefSchema["ali-cloud-file"];
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          is_down: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          deleted_at: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          subject: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
             */
            name: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          directory: Array<RefSchema["textbook-dir-tree"]>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          publisher: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
             */
            created_at: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
             */
            updated_at: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          isCache?: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          isTextBookInfo?: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          dict_level: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          uuid?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          is_public?: boolean;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
         */
        others: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          next: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
           */
          prev: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65265139
             */
            text_name: string;
          };
        };
      };
    };

    /**
     * 导出教材发送信号
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77877719
     */
    [x: `api/exports/textbooks/${string}`]: {
      contentType: "none";
      params: {
        /**
         * @description 是否导出私有曲谱、习题
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77877719
         */
        is_show: string;
      };

      data: never;

      response: {};
    };

    /**
     * 目录信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
     */
    [x: `api/textbook-directory/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        id: number;
        /**
         * @description 上级id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        pid: number;
        /**
         * @description 用户id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        user_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        level: never;
        /**
         * @description 教材id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        textbook_id: number;
        /**
         * @description 排序
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        order_num: number;
        /**
         * @description 目录名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        direct_name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        created_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        updated_at: string;
        /**
         * @description 课件内容
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        course: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
           */
          id: number;
          /**
           * @description 目录id
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
           */
          textbook_directory_id: number;
          /**
           * @description 用户id
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
           */
          user_id: number;
          /**
           * @description 课件名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
           */
          course_name: string;
          /**
           * @description 封面路径
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
           */
          cover_path: RefSchema["ali-cloud-file"];
          /**
           * @description 课件内容路径
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
           */
          course_path: RefSchema["ali-cloud-file"];
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
           */
          isCache?: boolean;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65271415
         */
        isCache?: boolean;
      };
    };

    /**
     * 课件列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
     */
    "api/textbook-courses": {
      contentType: "none";
      params: {
        /**
         * @description 课件目录id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
         */
        did: number;
        /**
         * @description 班级id，为空则返回全部
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
         */
        class_id?: number;
        /**
         * @description 当前页
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
         */
        page?: number;
        /**
         * @description 条数
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
         */
        page_size?: number;
        /**
         * @description 是否管理员课件。1是0否
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
         */
        is_admin?: number;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          uuid: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          textbook_directory_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          user_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          class_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          class_ids: Array<number>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          course_name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          cover_path: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            url: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            vendor: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            mime: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            size: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            dimension: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              width: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              height: number;
            };
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            node: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          course_path: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            url: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            vendor: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            mime: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            size: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            node: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          is_admin: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          directory: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            pid: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            user_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            level: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            textbook_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            order_num: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            direct_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            created_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            updated_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            textbook: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              publisher_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              subject_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              text_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              text_classgrade: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              text_volume: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              text_number: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              cover_path: {
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                url: string;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                vendor: string;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                mime: string;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                size: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                dimension: {
                  /**
                   * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                   */
                  width: number;
                  /**
                   * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                   */
                  height: number;
                };
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                node: string;
              };
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              book_path: {
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                url: string;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                vendor: string;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                mime: string;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                size: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                node: string;
              };
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              is_down: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              created_at: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              updated_at: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              deleted_at: never;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              dict_level: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              dict: Array<{
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                id: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                pid: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                user_id: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                level: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                textbook_id: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                order_num: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                direct_name: string;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                created_at: string;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                updated_at: string;
              }>;
            };
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          account: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            is_admin: boolean;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            can_del: boolean;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            realname: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            login_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            avatar: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              url: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              vendor: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              mime: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              size: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              dimension: {
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                width: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
                 */
                height: number;
              };
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
               */
              node: string;
            };
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          classgrade: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          can_del: boolean;
          /**
           * @description 前端自用
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          isCache?: boolean;
          /**
           * @description 前端自用
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          isLocal?: boolean;
          /**
           * @description 前端自用
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          isLoading?: boolean;
          /**
           * @description 前端自用
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          tid?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          textbook_id: number;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          next: never;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          per_page: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74709096
           */
          total: number;
        };
      };
    };

    /**
     * 展示
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
     */
    [x: `api/textbook-courses/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        uuid: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        textbook_directory_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        user_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        class_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        class_ids: Array<number>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        course_name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        cover_path: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          url: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          vendor: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          mime: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          size: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          dimension: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            width: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            height: number;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          node: string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        course_path: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          url: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          vendor: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          mime: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          size: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          node: string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        created_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        updated_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        is_admin: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        directory: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          pid: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          user_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          level: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          textbook_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          order_num: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          direct_name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          textbook: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            publisher_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            subject_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            text_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            text_classgrade: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            text_volume: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            text_number: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            cover_path: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              url: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              vendor: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              mime: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              size: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              dimension: {
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
                 */
                width: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
                 */
                height: number;
              };
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              node: string;
            };
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            book_path: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              url: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              vendor: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              mime: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              size: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              node: string;
            };
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            is_down: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            created_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            updated_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            deleted_at: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            dict_level: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            dict: Array<{
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              pid: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              user_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              level: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              textbook_id: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              order_num: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              direct_name: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              created_at: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              updated_at: string;
            }>;
          };
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        account: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          is_admin: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          can_del: boolean;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          realname: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          login_name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
           */
          avatar: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            url: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            vendor: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            mime: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            size: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            dimension: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              width: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
               */
              height: number;
            };
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
             */
            node: string;
          };
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321601
         */
        can_del: boolean;
      };
    };

    /**
     * 账号列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77509095
     */
    "api/guests": {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77509095
         */
        realname?: string;
      };

      data: never;

      response: {};
    };

    /**
     * 账号详情
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77558700
     */
    "api/guests/204": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65778875
     */
    "api/roles": {
      contentType: "none";
      params: {
        /**
         * @description 角色名称
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65778875
         */
        display_name?: string;
      };

      data: never;

      response: {};
    };

    /**
     * 展示
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65795041
     */
    "api/roles/50": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65755898
     */
    "api/permissions": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 展示
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65771087
     */
    "api/permissions/1": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
     */
    "api/publisher": {
      contentType: "none";
      params: {
        /**
         * @description 学段。1小2初3高。可以为空查全部
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
         */
        school_stage?: number;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          pinyin_prefix?: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          deleted_at?: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          school_stage: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          is_primary: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          is_middle: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          is_high: number;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          next: never;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          per_page: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75732897
           */
          total: number;
        };
      };
    };

    /**
     * 列表
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108991532
     */
    "api/publisher-account": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 读取文件
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71298073
     */
    "storage/public:MjAyMy8wMy8yOC9CRmJSWVFsdm15RlpvQ0FQNGdobDNJUndBcGpnTzhnY0FsRjJCT29McG5FTEk0V0JmUkNVT2hDak9pdVFSbTY5LnBuZw==": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
     */
    "api/file-storage": {
      contentType: "none";
      params: {
        /**
         * @description 文件类型。1图2音3视
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
         */
        fb_file_type: number;
        /**
         * @description 文件名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
         */
        fu_origin_filename?: string;
        /**
         * @description 学科
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
         */
        fb_subject_id?: number;
        /**
         * @description 出版社
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
         */
        fb_publisher_id?: number;
        /**
         * @description 年级
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
         */
        fb_apply_grade?: number;
        /**
         * @description 上下册
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
         */
        fb_apply_volume: number;
        /**
         * @description 教材
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
         */
        fb_textbook_id?: number;
        /**
         * @description 目录
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
         */
        fb_dict_id?: number;
        /**
         * @description 私有。1是0否
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-78371250
         */
        is_private?: number;
      };

      data: never;

      response: {};
    };

    /**
     * 详情
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110832106
     */
    [x: `api/file-storage/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 习题列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
     */
    "api/questions": {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        with_data?: string;
        /**
         * @description 学科id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        fb_subject_id?: string;
        /**
         * @description 知识点数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        knowledge_point?: Array<never>;
        /**
         * @description 能力点数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        competence?: Array<never>;
        /**
         * @description 题型。1单选2多选3填空11连线
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        fb_type?: number;
        /**
         * @description 标题
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        fu_body?: string;
        /**
         * @description 难度。容易、中等、困难
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        fu_difficulty?: string;
        /**
         * @description 1私有，0平台。不传默认0
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        is_private?: string;
        /**
         * @description 上下册。1上2下3全
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        apply_volume?: number;
        /**
         * @description 年级1-12
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        apply_grade?: number;
        /**
         * @description 出版社id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        publisher_id?: number;
        /**
         * @description 教材id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        textbook_id?: number;
        /**
         * @description 目录id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        dict_id?: number;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          apply_grade: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          apply_volume: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          publisher_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          subject_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          question_set_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          knowledge_point: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          competence: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          difficulty: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          teaching_material: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          type: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          parent_question_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          body: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          branches:
            | Array<string>
            | {
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
                 */
                left: Array<string>;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
                 */
                right: Array<string>;
              };

          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          extras: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          answer: number | Array<number> | Array<string> | Array<Array<number>>;

          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          media: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          score: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          duration_limit: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          explain: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          further_explain: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          publisher: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
             */
            created_at: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
             */
            updated_at: never;
          };
          /**
           * @description 视唱题的谱例ID
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          musical_id?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          is_public: boolean;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          next: string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          per_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76841932
           */
          total: number;
        };
      };
    };

    /**
     * 习题信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
     */
    [x: `api/questions/${string}`]: {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        fb_subject_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        is_private: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        fb_type: number;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        id: number;
        /**
         * @description 适用年级。1-12一年级到高三
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        apply_grade: number;
        /**
         * @description 上下册。1上2下
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        apply_volume: number;
        /**
         * @description 能力点
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        capacity_id: number;
        /**
         * @description 知识点
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        knowledge_id: number;
        /**
         * @description 出版社id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        publisher_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        question_set_id: number;
        /**
         * @description 知识点
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        knowledge_point: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        competence: never;
        /**
         * @description 难度。容易、中等、困难
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        difficulty: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        teaching_material: never;
        /**
         * @description 题型。1单选2多选3填空11连线
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        type: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        parent_question_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        body: string;
        /**
         * @description 选项数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        branches: Array<string>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        extras: never;
        /**
         * @description 答案数组。下标
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        answer: Array<number>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        media: never;
        /**
         * @description 分数。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        score: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        duration_limit: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        explain: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        further_explain: never;
        /**
         * @description 出版社
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
         */
        publisher: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
           */
          id: number;
          /**
           * @description 名称
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
           */
          name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
           */
          created_at: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76844652
           */
          updated_at: string;
        };
      };
    };

    /**
     * 习题答题记录列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111363049
     */
    "api/question-answer": {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111363049
         */
        question_id: string;
      };

      data: never;

      response: {};
    };

    /**
     * 【后台】题目统计详情
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111024638
     */
    [x: `api/question-answer/${string}/state`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111024638
         */
        count: number;
        /**
         * @description 正确率。所有题目都有
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111024638
         */
        correct: number;
        /**
         * @description 演唱题分数
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111024638
         */
        score: number;
        /**
         * @description 选项。1A2B3C
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111024638
         */
        options: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111024638
           */
          answer: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111024638
           */
          count: number;
        }>;
      };
    };

    /**
     * 教具列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
     */
    "api/edu/classroom-devices": {
      contentType: "none";
      params: {
        /**
         * @description ip
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
         */
        fb_device_ip: string;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          device_number: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          device_sn: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          number_in_class: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          updated_at: string;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          next: never;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          per_page: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111596589
           */
          total: number;
        };
      };
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110886759
     */
    "api/edu/classroom-logs": {
      contentType: "none";
      params: {
        /**
         * @description 班级id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110886759
         */
        class_id: number;
        /**
         * @description 查学生id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110886759
         */
        user_id: string;
        /**
         * @description 自定义时间范围
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110886759
         */
        "time_range[]": Array<never>;
        /**
         * @description 1本周2上周。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110886759
         */
        week: string;
        /**
         * @description 1本月2上月。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110886759
         */
        month: string;
      };

      data: never;

      response: {};
    };

    /**
     * ppt习题列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
     */
    "api/edu/questions": {
      contentType: "none";
      params: {
        /**
         * @description 目录id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        dict_id?: number;
        /**
         * @description 题目类型。请查看【系统常量说明】
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        fb_type?: number;
        /**
         * @description 正则搜索。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        fe_body: string;
        /**
         * @description 谱音同步。1是0否
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        fb_is_score_sync?: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        is_private?: string;
        /**
         * @description 页数
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        page: number;
        /**
         * @description 条数
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        page_size: number;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          apply_grade: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          apply_volume: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          publisher_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          subject_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          question_set_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          knowledge_point: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          competence: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          difficulty: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          teaching_material: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          type: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          parent_question_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          body: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          branches:
            | Array<string>
            | {
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
                 */
                left: Array<string>;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
                 */
                right: Array<string>;
              };

          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          extras: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          answer: number | Array<number> | Array<string> | Array<Array<number>>;

          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          media: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          score: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          duration_limit: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          explain: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          further_explain: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          publisher: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
             */
            created_at: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
             */
            updated_at: never;
          };
          /**
           * @description 视唱题的谱例ID
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          musical_id?: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          is_public: boolean;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          next: string;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          per_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109410133
           */
          total: number;
        };
      };
    };

    /**
     * 练习题数量
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80920921
     */
    "api/edu/questions-number": {
      contentType: "none";
      params: {
        /**
         * @description 目录id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80920921
         */
        dict_id?: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80920921
         */
        fu_body: string;
      };

      data: never;

      response: Array<{
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80920921
         */
        type: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80920921
         */
        number: number;
      }>;
    };

    /**
     * ppt曲谱列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
     */
    "api/edu/musicals": {
      contentType: "none";
      params: {
        /**
         * @description 搜索字段
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
         */
        fu_name?: string;
        /**
         * @description 曲谱类型。支持多选用逗号分隔。1,2,3,4，曲谱类型请查系统常量
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
         */
        music_type?: string;
        /**
         * @description 1私有，0平台。不传默认1
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
         */
        is_private?: string;
        /**
         * @description 谱音同步。1是
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
         */
        fb_is_score_sync?: number;
        /**
         * @description 跟唱同步使用；音轨类型。1-9
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
         */
        audio_type?: number;
      };

      data: never;

      response: {
        /**
         * @description 数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          id: number;
          /**
           * @description 来源用户
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          user_id: number;
          /**
           * @description 曲谱名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          name: string;
          /**
           * @description 曲谱基础信息
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          base_info: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            base_info: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            vocal_type: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            music_type: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            abc_json_val: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            aaa?: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            error_code?: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            error_msg?: string;
          };
          /**
           * @description 声部类型
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          vocal_type?: string | null;
          /**
           * @description 曲谱类型
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          music_type: string;
          /**
           * @description abc格式
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          abc_json_val: string;
          /**
           * @description 谱音同步
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          sync_json_val: never;
          /**
           * @description 音频文件
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          music_attach_id: never;
          /**
           * @description 同步文件
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          sync_attach_id: never;
          /**
           * @description 跟唱文件
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          sing_attach_id: never;
          /**
           * @description 是否谱音同步。1是0否
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          is_score_sync: number;
          /**
           * @description 是否跟唱同步。1是0否
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          is_sing_sync: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          music: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          is_public: number;
        }>;
        /**
         * @description 链接信息
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          next: never;
        };
        /**
         * @description 分页信息
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          per_page: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-114181058
           */
          total: number;
        };
      };
    };

    /**
     * 【授课端】班级统计数据
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-113964382
     */
    [x: `api/edu/question-answer/${string}/state`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @description 答题总数
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-113964382
         */
        count: number;
        /**
         * @description 正确率
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-113964382
         */
        correct: number;
      };
    };

    /**
     * 教师教材列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-95027487
     */
    "api/teacher-textbook/record": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 班级学生列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
     */
    [x: `api/edu/students/${string}`]: {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
         */
        id?: number;
      };

      data: never;

      response: Array<{
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
         */
        uid: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
         */
        school_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
         */
        class_grade_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
         */
        number_in_class: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
         */
        created_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
         */
        updated_at: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
         */
        account: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          login_name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          type: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          sex: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          mobile: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          wechat_id: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          openid: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          unionid: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          serial: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          realname: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          nickname: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          avatar: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          state: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-96797814
           */
          created_at: string;
        };
      }>;
    };

    /**
     * 教师查询任教学科班级
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
     */
    "api/edu/teacher/classrooms": {
      contentType: "none";
      params: {
        /**
         * @description 学科id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        subject_id: number;
      };

      data: never;

      response: Array<{
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        school_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        origin_grade: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        enroll_year: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        enroll_grade: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        seq: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        alias: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        head_teacher_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        class_grade_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        teacher_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        subject_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        class_name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        grade_number: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        region_code: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        school_name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        grade_level: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
         */
        school: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          region_code: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          school_code: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          bureau_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          admin_level: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          primary_school: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          middle_school: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          high_school: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          is_primary_school: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          is_middle_school: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108423554
           */
          is_high_school: string;
        };
      }>;
    };

    /**
     * 授课端素材资源库
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
     */
    "api/edu/file-storage": {
      contentType: "none";
      params: {
        /**
         * @description 1图2音3视频
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
         */
        fb_file_type: number;
        /**
         * @description 出版社id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
         */
        fb_publisher_id: number;
        /**
         * @description 教材id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
         */
        fb_textbook_id: number;
        /**
         * @description 目录id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
         */
        fb_dict_id: number;
        /**
         * @description 搜索名称
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
         */
        fu_origin_filename?: string;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          id: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          hash: string;
          /**
           * @description 文件名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          origin_filename: string;
          /**
           * @description 路径
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          path: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            url: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            vendor: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            mime: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            size: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            dimension: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              width: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              height: number;
            };
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            node: string;
          };
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          mime: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          size: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          channel: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          is_upload: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          user_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          subject_id: number;
          /**
           * @description 学科
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          publisher_id: number;
          /**
           * @description 出版社
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          apply_grade: number;
          /**
           * @description 年级
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          apply_volume: number;
          /**
           * @description 上下册
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          textbook_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          dict_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          dict_ids: Array<number>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          file_type: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          is_public: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          is_admin: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          created_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          updated_at: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          school_id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          textbook: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            publisher_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            subject_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            text_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            text_classgrade: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            text_volume: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            text_number: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            cover_path: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              url: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              vendor: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              mime: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              size: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              dimension: {
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
                 */
                width: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
                 */
                height: number;
              };
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              node: string;
            };
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            book_path: {
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              url: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              vendor: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              mime: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              size: number;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              node: string;
              /**
               * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
               */
              dimension: {
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
                 */
                width: number;
                /**
                 * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
                 */
                height: number;
              };
            };
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            is_down: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            created_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            updated_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            deleted_at: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            dict_level: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            user_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            text_number_all: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            has_private: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            is_public: never;
          };
          /**
           * @description 教材
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          directory: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            pid: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            user_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            level: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            textbook_id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            order_num: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            direct_name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            created_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            updated_at: string;
          };
          /**
           * @description 目录
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          publisher: {
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            id: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            name: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            pinyin_prefix: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            created_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            updated_at: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            deleted_at: never;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            is_primary: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            is_middle: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            is_high: number;
          };
        }>;
        /**
         * @description 出版社
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          next: never;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          from: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          per_page: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          to: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118405694
           */
          total: number;
        };
      };
    };

    /**
     * 学生
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-112881010
     */
    "api/statistic-members": {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-112881010
         */
        student_region: string;
      };

      data: never;

      response: {};
    };

    /**
     * 学校
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-112881042
     */
    "api/statistic-schools": {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-112881042
         */
        school_region: string;
      };

      data: never;

      response: {};
    };

    /**
     * 习题
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-112881040
     */
    "api/statistic-questions": {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-112881040
         */
        question_type: number;
      };

      data: never;

      response: {};
    };

    /**
     * 课件
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-112881166
     */
    "api/statistic-courses": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 列表
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120092990
     */
    "api/estimate/template": {
      contentType: "none";
      params: {
        /**
         * @description 模糊搜索
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120092990
         */
        fu_title: string;
        /**
         * @description 状态
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120092990
         */
        fb_state: number;
      };

      data: never;

      response: {};
    };

    /**
     * 详情
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120238451
     */
    [x: `api/estimate/template/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 查询配置（层级）
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120200345
     */
    [x: `api/estimate/config/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 查询对象
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120247870
     */
    [x: `api/estimate/apply/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 未命名接口
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120287161
     */
    "api/estimate/job": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * ※学科查询
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
     */
    "api/subjects": {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        current_page: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        data: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          id: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          slug: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          question_type: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
             */
            type: number;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
             */
            question_type: Array<number>;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          competences: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          knowledge_points: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          teaching_materials: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          logo: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          icon: string;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        first_page_url: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        from: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        last_page: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        last_page_url: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        links: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          url?: string | null;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          label: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
           */
          active: boolean;
        }>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        next_page_url: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        path: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        per_page: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        prev_page_url: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        to: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76008856
         */
        total: number;
      };
    };

    /**
     * ※省市县
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
     */
    "api/region/0": {
      contentType: "none";
      params: never;

      data: never;

      response: Array<{
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        code: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        parent_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        level: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        short_name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        l1_name: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        l1_id: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        l2_name: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        l2_id: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        l3_name: never;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65198123
         */
        l3_id: never;
      }>;
    };

    /**
     * 版本
     * @status pending
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65326406
     */
    "api/version": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 配置信息
     * @status pending
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66473212
     */
    "api/config": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 通告
     * @status pending
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
     */
    "/": {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
         */
        data: Array<string>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
         */
        links: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          first: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          last: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          prev: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          next: never;
        };
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
         */
        meta: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          current_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          from: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          last_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          links: Array<{
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
             */
            url?: string | null;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
             */
            label: string;
            /**
             * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
             */
            active: boolean;
          }>;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          path: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          per_page: number;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          to: never;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68028907
           */
          total: number;
        };
      };
    };

    /**
     * 数据统计
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-86325383
     */
    "api/statistics": {
      contentType: "none";
      params: {
        /**
         * @description 学校地区代码。不传默认查询省级单位。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-86325383
         */
        school_region?: string;
        /**
         * @description 学生地区代码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-86325383
         */
        student_region?: string;
        /**
         * @description 题型年级。1-12
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-86325383
         */
        question_type?: string;
      };

      data: never;

      response: {};
    };
  };

  patch: {
    /**
     * 更新个人信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116618431
     */
    "api/account/update-profile": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 昵称。空不修改
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116618431
         */
        nickname: string;
        /**
         * @description 姓名。空不修改
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116618431
         */
        realname: string;
        /**
         * @description 性别。空不修改
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116618431
         */
        sex: number;
        /**
         * @description 头像
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116618431
         */
        avatar: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116618431
         */
        success: boolean;
      };
    };

    /**
     * 密码修改密码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116617547
     */
    "api/account/update-pwd": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 旧密
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116617547
         */
        pass_old: string;
        /**
         * @description 新密
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116617547
         */
        pass1: string;
        /**
         * @description 重复一下
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-116617547
         */
        pass2: string;
      };

      response: {};
    };

    /**
     * 批量重置密码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76182256
     */
    "api/account/resetPwd": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 用户id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76182256
         */
        ids: Array<number>;
      };

      response: {};
    };

    /**
     * 修改用户状态
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76368545
     */
    [x: `api/account/resetState/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 更新曲谱状态
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120605044
     */
    [x: `api/musicals/${string}/state`]: {
      contentType: "application/json";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120605044
         */
        is_public: number;
      };

      data: {
        /**
         * @description 0私1公
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120605044
         */
        is_public: number;
      };

      response: {};
    };

    /**
     * 修改
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65064492
     */
    [x: `api/schools/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65064492
         */
        name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65064492
         */
        region_code: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65064492
         */
        primary_school: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65064492
         */
        middle_school: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65064492
         */
        high_school: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65064492
         */
        admin_level: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65064492
         */
        school_type: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65064492
         */
        show_type: number;
      };

      response: {};
    };

    /**
     * 修改
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65090281
     */
    [x: `api/classgrade/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65090281
         */
        school_id: number;
        /**
         * @description 当前年级
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65090281
         */
        enroll_grade: number;
        /**
         * @description 序号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65090281
         */
        seq_num: number;
      };

      response: {};
    };

    /**
     * 更新
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76394232
     */
    [x: `api/school_admin/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76394232
         */
        school_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76394232
         */
        account: {
          /**
           * @description 真实姓名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76394232
           */
          realname: string;
          /**
           * @description 登录名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76394232
           */
          login_name?: string;
          /**
           * @description 手机号
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76394232
           */
          mobile?: string;
          /**
           * @description 密码
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76394232
           */
          pass1?: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76394232
           */
          pass2?: string;
        };
      };

      response: {};
    };

    /**
     * 更新
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
     */
    [x: `api/students/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学校id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
         */
        school_id: number;
        /**
         * @description 班内序号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
         */
        number_in_class: number;
        /**
         * @description 班级id。班级接口的id。不是班级序号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
         */
        class_grade_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
         */
        account: {
          /**
           * @description 可选。登录名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
           */
          login_name: string;
          /**
           * @description 可选。真实姓名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
           */
          realname: string;
          /**
           * @description 可选。手机
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
           */
          mobile: string;
          /**
           * @description 可选。学籍号
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
           */
          serial: string;
          /**
           * @description 可选。密码
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
           */
          pass1: string;
          /**
           * @description 可选。确认密码
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65143481
           */
          pass2: string;
        };
      };

      response: {};
    };

    /**
     * 学生状态修改
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-118822304
     */
    [x: `api/student/${string}/state`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 更新
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65142759
     */
    [x: `api/teachers/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65142759
         */
        school_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65142759
         */
        subject_id?: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65142759
         */
        account?: {
          /**
           * @description 真实姓名
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65142759
           */
          realname?: string;
          /**
           * @description 登录账号
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65142759
           */
          login_name?: string;
          /**
           * @description 手机
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65142759
           */
          mobile?: string;
          /**
           * @description 密码
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65142759
           */
          pass1?: string;
          /**
           * @description 确认密码
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65142759
           */
          pass2?: string;
        };
      };

      response: {};
    };

    /**
     * 更新个人信息
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80616119
     */
    [x: `api/profile/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 姓名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80616119
         */
        realname: string;
      };

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-80616119
         */
        success: boolean;
      };
    };

    /**
     * 修改
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76545119
     */
    "api/capacity/37": {
      contentType: "application/json";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 修改
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65165612
     */
    "api/knowledges/4": {
      contentType: "none";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65165612
         */
        pid?: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65165612
         */
        knowledge_name: string;
      };

      data: never;

      response: {};
    };

    /**
     * 修改账号
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77556969
     */
    "api/guests/12931": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 账号名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77556969
         */
        realname: string;
        /**
         * @description 密码
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77556969
         */
        password: string;
        /**
         * @description 角色
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77556969
         */
        roles: Array<string>;
        /**
         * @description 账号名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77556969
         */
        login_name: string;
      };

      response: {};
    };

    /**
     * 更新习题状态
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120614296
     */
    [x: `api/questions/${string}/state`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 0私1公
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120614296
         */
        is_public: number;
      };

      response: {};
    };
  };

  put: {
    /**
     * 更新
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
     */
    "api/musicals/3": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 谱例名。如：大鱼小鱼
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
         */
        name: string;
        /**
         * @description 曲谱的基本信息。查看用
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
         */
        base_info: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
           */
          name: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
           */
          base_info: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
           */
          vocal_type: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
           */
          music_type: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
           */
          abc_json_val: string;
        };
        /**
         * @description 公开。1是0否
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
         */
        is_public: number;
        /**
         * @description 曲谱类型。简谱、高音谱、中音谱、
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
         */
        music_type: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
         */
        music_attach_id: string;
        /**
         * @description abc记谱法内容。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
         */
        abc_json_val: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
         */
        sync_json_val: Array<{
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
           */
          attach_id: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
           */
          audio_type: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-68802126
           */
          new_timeline: string;
        }>;
      };

      response: {};
    };

    /**
     * 批量关联班级教师
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75791571
     */
    "api/classgrade-connect": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 教师id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75791571
         */
        teacher_ids: Array<string>;
        /**
         * @description 班级id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75791571
         */
        class_ids: Array<string>;
      };

      response: {};
    };

    /**
     * 更新
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117091627
     */
    "api/assistants/2684": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117091627
         */
        region_code: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117091627
         */
        realname: string;
      };

      response: {};
    };

    /**
     * 修改教材
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65309247
     */
    "api/textbooks/10": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 学科id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65309247
         */
        subject_id: string;
        /**
         * @description 适用年级
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65309247
         */
        text_classgrade: string;
        /**
         * @description 上下册
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65309247
         */
        text_volume: string;
        /**
         * @description 状态。1上架。0下架
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65309247
         */
        is_down: boolean;
        /**
         * @description 封面路径
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65309247
         */
        cover_path: string;
        /**
         * @description 电子书路径
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65309247
         */
        book_path: string;
        /**
         * @description 出版社id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65309247
         */
        publisher_id: string;
      };

      response: {};
    };

    /**
     * 下架教材
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76623751
     */
    "api/textbooks-state/21": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 修改
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65268736
     */
    "api/textbook-directory/44": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 上级id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65268736
         */
        pid: number;
        /**
         * @description 教材id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65268736
         */
        textbook_id: number;
        /**
         * @description 排序
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65268736
         */
        order_num: string;
        /**
         * @description 目录名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65268736
         */
        direct_name: string;
      };

      response: {};
    };

    /**
     * 修改
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65318531
     */
    [x: `api/textbook-courses/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65318531
         */
        textbook_directory_id: number;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65318531
         */
        course_name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65318531
         */
        cover_path: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65318531
         */
        course_path: string;
      };

      response: {};
    };

    /**
     * 修改
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65785040
     */
    "api/roles/27": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65785040
         */
        name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65785040
         */
        permissions: Array<number>;
      };

      response: {};
    };

    /**
     * 修改
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65774469
     */
    "api/permissions/40": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 唯一识别名称
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65774469
         */
        name: string;
        /**
         * @description 中文说明
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65774469
         */
        display_name: string;
        /**
         * @description api
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65774469
         */
        guard_name?: string | null;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65774469
         */
        pid?: number | null;
      };

      response: {};
    };

    /**
     * 更新
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108991546
     */
    "api/publisher/1": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 出版社名称
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108991546
         */
        name: string;
        /**
         * @description 学段。0无1小2初3高4全4
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-108991546
         */
        school_stage: number;
      };

      response: {};
    };

    /**
     * 临时上传文件接口
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003899
     */
    "http://10.88.18.164:30000/storage/public:MjAyMy8wNC8yNC9UUmpvSk1ka0J0MXpxV25ya2FFR2dNQUJPU2ZLM0tLY3RNbnJ4WTJrUDJ0ZlpVTE5KckRyNmdDV21kc2NFRzJZLnBuZw==": {
      contentType: "application/octet-stream";
      params: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003899
         */
        expires: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-71003899
         */
        signature: string;
      };

      data: never;

      response: {};
    };

    /**
     * 编辑
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110643236
     */
    [x: `api/file-storage/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 文件类型。1图2音3
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110643236
         */
        file_type: number;
        /**
         * @description 学科
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110643236
         */
        subject_id: number;
        /**
         * @description 出版社
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110643236
         */
        publisher_id: number;
        /**
         * @description 目录
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110643236
         */
        dict_id: number;
        /**
         * @description 文件名
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110643236
         */
        origin_filename: string;
        /**
         * @description 路径node
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110643236
         */
        path: string;
        /**
         * @description 公开。0否1是。不传默认0
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110643236
         */
        is_public: number;
      };

      response: {};
    };

    /**
     * 修改习题
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
     */
    [x: `api/questions/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 固定填raw
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        format: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        type: number;
        /**
         * @description 题目描述
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        body: string;
        /**
         * @description 选项。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        branches: Array<string>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        score: number;
        /**
         * @description 题目解析
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        explain: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        knowledge_point: Array<number>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        competence: Array<number>;
        /**
         * @description 难度
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        difficulty: string;
        /**
         * @description 出版社
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        publisher_id: string;
        /**
         * @description 适用年级。1-12
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        apply_grade: string;
        /**
         * @description 上下册。1上2下
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        apply_volume: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        answer: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        media: Array<string>;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        subject_id: number;
        /**
         * @description 公开1是0否
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        is_public: number;
        /**
         * @description 应用范围
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        scope: Array<{
          /**
           * @description 学段
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
           */
          school_stage: number;
          /**
           * @description 出版社id
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
           */
          publisher_id: number;
          /**
           * @description 适用年级
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
           */
          apply_grade: number;
          /**
           * @description 上下册。1上2下3全
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
           */
          apply_volume: number;
          /**
           * @description 目录id
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
           */
          dict_id: number;
          /**
           * @description 目录父子id
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
           */
          dict_ids: Array<number>;
        }>;
        /**
         * @description 额外字段。保存不同习题的数据
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76907916
         */
        extras: {};
      };

      response: {};
    };

    /**
     * 更新设备
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111578096
     */
    [x: `api/edu/classroom-devices/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 设备号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111578096
         */
        device_sn?: string;
        /**
         * @description 设备序号
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111578096
         */
        number_in_class: number;
      };

      response: {};
    };

    /**
     * 修改
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
     */
    [x: `api/estimate/template/${string}`]: {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 标题
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
         */
        title: string;
        /**
         * @description 状态。0123
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
         */
        state: number;
        /**
         * @description 适用年级
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
         */
        apply_grade: number;
        /**
         * @description 适用范围
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
         */
        admin_level: number;
        /**
         * @description 应用系统
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
         */
        application?: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
           */
          edu: string;
        };
        /**
         * @description 奖项配置。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
         */
        rewards?: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
           */
          A: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
           */
          B: string;
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
           */
          C: string;
        };
        /**
         * @description 分数映射。
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
         */
        rank_rule?: {
          /**
           * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120186493
           */
          edu: string;
        };
      };

      response: {};
    };
  };

  delete: {
    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65207024
     */
    [x: `api/musicals/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67039181
     */
    "api/musicals": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 需要删除的id数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-67039181
         */
        ids: Array<number>;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65063250
     */
    [x: `api/schools/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66593121
     */
    "api/schools": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 批量删除
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-66593121
         */
        ids: Array<number>;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65092492
     */
    [x: `api/classgrade/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74157138
     */
    "api/classgrade": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 批量删除
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74157138
         */
        ids: Array<number>;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65146131
     */
    [x: `api/school_admin/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74157743
     */
    "api/school_admin": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74157743
         */
        ids: string;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65111776
     */
    [x: `api/students/${string}`]: {
      contentType: "application/json";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74157139
     */
    "api/students": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 批量删除
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74157139
         */
        ids: Array<string>;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65144603
     */
    [x: `api/teachers/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74157742
     */
    "api/teachers": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-74157742
         */
        ids: Array<string>;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-117113885
     */
    "api/assistants/2684": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 删除
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76545120
     */
    [x: `api/capacity/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 删除
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65162977
     */
    "api/knowledges/15": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65267288
     */
    [x: `api/textbooks/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76635107
     */
    "api/textbooks": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 要删除的数组id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76635107
         */
        ids: Array<number>;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65269838
     */
    "api/textbook-directory/45": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 同步删除课件。true是，false否
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65269838
         */
        with_child: boolean;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65321203
     */
    [x: `api/textbook-courses/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-88515055
     */
    "api/textbook-courses": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-88515055
         */
        ids: string;
      };

      response: {};
    };

    /**
     * 删除账号
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77605198
     */
    "api/guests/211": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77812837
     */
    "api/guests": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 数组id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77812837
         */
        ids: Array<number>;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65795675
     */
    "api/roles/5": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77806544
     */
    "api/roles": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 数组id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77806544
         */
        ids: Array<number>;
      };

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65778029
     */
    "api/permissions/5": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65778029
         */
        name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65778029
         */
        display_name: string;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-65778029
         */
        guard_name?: string | null;
      };

      response: {};
    };

    /**
     * 提交资源删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105416303
     */
    "api/textbook-repo": {
      contentType: "multipart/form-data";
      params: {
        /**
         * @description 数据模型。曲谱1, 习题2
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105416303
         */
        model_type_id: number;
        /**
         * @description 曲谱id、习题id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105416303
         */
        model_id: number;
        /**
         * @description 课件id
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105416303
         */
        course_id: number;
      };

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105416303
         */
        success: boolean;
        /**
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-105416303
         */
        type: string;
      };
    };

    /**
     * 删除
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-75768594
     */
    [x: `api/publisher/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110620129
     */
    [x: `api/file-storage/${string}`]: {
      contentType: "multipart/form-data";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 批量删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-110631326
     */
    "api/file-storage": {
      contentType: "application/json";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 删除
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76911097
     */
    "api/questions/15": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description 出版社名称
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-76911097
         */
        name: string;
      };

      response: {};
    };

    /**
     * 批量删除
     * @status released
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77965623
     */
    "api/questions": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @description id数组
         * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-77965623
         */
        ids: Array<string>;
      };

      response: {};
    };

    /**
     * 删除题库范围
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-109394421
     */
    [x: `api/question-scope/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 删除设备
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-111584806
     */
    [x: `api/edu/classroom-devices/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 删除
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120185659
     */
    [x: `api/estimate/template/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 删除配置
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120223541
     */
    [x: `api/estimate/config/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };

    /**
     * 删除对象
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-581d08a5-5c61-4d96-87bf-660ed79e53be/api-120246717
     */
    [x: `api/estimate/apply/${string}`]: {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };
  };
};
