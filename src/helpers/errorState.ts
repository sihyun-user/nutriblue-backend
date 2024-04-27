const errorState = {
  FAIL: {
    statusCode: 500,
    message: '系統錯誤，請稍後再試'
  },
  USER_NOT_EXIST: {
    statusCode: 400,
    message: '使用者不存在'
  },
  USER_EAMIL_NOT_EXIST: {
    statusCode: 400,
    message: 'Email不存在'
  },
  USER_EMAIL_EXIST: {
    statusCode: 400,
    message: 'Email已被使用'
  },
  USER_PASSWORD_ERROR: {
    statusCode: 400,
    message: '密碼錯誤'
  },
  DATA_NOT_EXIST: {
    statusCode: 400,
    message: '資料不存在'
  },
  DATA_MISSING: {
    statusCode: 400,
    message: '資料欄位未填寫正確'
  },
  AUTH_NOT_EXIST: {
    statusCode: 403,
    message: '未提供授權憑證，請先登入'
  },
  AUTH_NOT_VALID: {
    statusCode: 403,
    message: '授權憑證無效或已過期，請重新登入'
  },
  AUTH_NOT_MATCH: {
    statusCode: 403,
    message: '無權限執行此操作'
  },
  PAGE_NOT_EXIST: {
    statusCode: 404,
    message: '頁面不存在'
  },
  SYNTAX_ERROR: {
    statusCode: 400,
    message: 'SyntaxError，請求語法錯誤或非JSON格式'
  },
  CAST_ERROR: {
    statusCode: 400,
    message: 'CastError，資料格式錯誤'
  }
};

export default errorState;
