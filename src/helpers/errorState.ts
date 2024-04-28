const errorState = {
  USER_NOT_LOGIN: {
    statusCode: 403,
    message: '使用者尚未登入'
  },
  USER_NOT_MATCH: {
    statusCode: 403,
    message: '無權限執行此操作'
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
  ROUTE_NOT_FOUND: {
    statusCode: 404,
    message: '找不到此路由'
  },
  SYNTAX_ERROR: {
    statusCode: 400,
    message: 'SyntaxError，請求語法錯誤或非JSON格式'
  },
  CAST_ERROR: {
    statusCode: 400,
    message: 'CastError，資料格式錯誤'
  },
  ID_NOT_VALID: {
    statusCode: 400,
    message: '無效的ID'
  },
  FAIL: {
    statusCode: 500,
    message: '系統錯誤，請稍後再試'
  }
};

export default errorState;
