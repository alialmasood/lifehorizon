export const AREEBA_CONFIG = {
  MERCHANT_ID: 'IQ3093980103',
  API_KEY: 'TESTKEYIQ3093980103',
  BASE_URL: 'https://gateway.areebapayment.com/api/v3',
  AUTH: {
    USERNAME: 'Ali.112233445566',
    PASSWORD: 'Zxxznmmn@123'
  },
  CURRENCY: 'IQD' // تم تغييرها من USD إلى IQD لتطابق المشروع القديم
};

export const generateTransactionId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `TXN${timestamp}_${random}`;
};

export const getBase64Auth = () => {
  const credentials = `${AREEBA_CONFIG.AUTH.USERNAME}:${AREEBA_CONFIG.AUTH.PASSWORD}`;
  return Buffer.from(credentials).toString('base64');
};
