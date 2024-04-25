import mongoose from 'mongoose';

const connect = async () => {
  try {
    const { MONGODB_URI, MONGODB_PASSWORD, MONGODB_LOCAL, NODE_ENV } = process.env;

    const conn =
      NODE_ENV === 'production'
        ? MONGODB_URI?.replace('<password>', MONGODB_PASSWORD || '')
        : MONGODB_LOCAL;

    if (!conn) {
      throw new Error('MongoDB URI is required!');
    }

    await mongoose.connect(conn);
    console.log('資料庫連線成功');
  } catch (error) {
    console.error('資料庫連線失敗: ', error);
  }
};

export default connect;
