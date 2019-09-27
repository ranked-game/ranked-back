import sesTransport from 'nodemailer-ses-transport';

export const mailTransportConfig = sesTransport({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-1',
});
