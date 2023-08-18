import axios from 'axios';
import { createHmac } from 'crypto';

const makeSignature = (time: string, method: string, service: string) => {
  const space = ' ';
  const newLine = '\n';
  const url = `/sms/v2/services/${process.env.NAVER_SERVICE_ID}/${service}`;
  const timestamp = time;
  const accessKey = process.env.NAVER_ACCESS_KEY;
  const secretKey = process.env.NAVER_SECRET_KEY;

  let hmac = createHmac('sha256', secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  let hash = hmac.digest('base64');
  return hash;
};

export const sendMsg = async (
  msg: string,
  to: string[],
  file?: string,
  subject?: string,
) => {
  let time = Date.now().toString();
  let fileId = null;
  if (file && file !== '') {
    const request = (await axios({
      method: 'POST',
      json: true,
      url:
        process.env.NAVER_SMS_URL +
        `/services/${process.env.NAVER_SERVICE_ID}/files`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': time,
        'x-ncp-iam-access-key': process.env.NAVER_ACCESS_KEY,
        'x-ncp-apigw-signature-v2': makeSignature(time, 'POST', 'files'),
      },
      data: {
        fileName: `${time}.jpg`,
        fileBody: file.substring(file.indexOf(',') + 1),
      },
    } as any).catch((err) => {
      console.log(err);
    })) as any;
    fileId = request.data.fileId;
  }
  time = Date.now().toString();
  await axios({
    method: 'POST',
    json: true,
    url:
      process.env.NAVER_SMS_URL +
      `/services/${process.env.NAVER_SERVICE_ID}/messages`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-apigw-timestamp': time,
      'x-ncp-iam-access-key': process.env.NAVER_ACCESS_KEY,
      'x-ncp-apigw-signature-v2': makeSignature(time, 'POST', 'messages'),
    },
    data: {
      type: fileId ? 'MMS' : 'LMS',
      countryCode: '82',
      from: process.env.NAVER_MYNUM,
      subject,
      content: msg,
      messages: to.map((phone) => ({ to: phone })),
      files: fileId ? [{ fileId }] : [],
    },
  } as any).catch((err) => {
    console.error(err.response.data);
    throw err;
  });
};
