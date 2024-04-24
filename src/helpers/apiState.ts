const apiState = {
  FAIL: {
    statusCode: 500,
    message: '系統錯誤，請稍後再試'
  },
  USER_NOT_EXIST: {
    statusCode: 400,
    message: '使用者不存在'
  },
  DATA_NOT_EXIST: {
    statusCode: 400,
    message: '資料不存在'
  },
  DATA_MISSING: {
    statusCode: 400,
    message: '資料欄位未填寫正確'
  },
  PAGE_NOT_EXIST: {
    statusCode: 404,
    message: '頁面不存在'
  }
};

export default apiState;
