import mysql from 'serverless-mysql';

export const conn = mysql({
    config: {
        host: viaduct.proxy.rlwy.net,
        user: root,
        password: a44256fD5gcd3gFdG65bcD14dEGfBDBD,
        port: 20048,
        database: railway,
    },
});