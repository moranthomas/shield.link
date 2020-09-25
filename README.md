# shieldlink

Marketplace available on [shieldlink.io](https://shieldlink.io)

To run locally,

```
git clone https://github.com/AymericBethencourt/shieldlink.git

cd shieldlink

yarn install

cd src/api

**Rename .env.example as .env and fill RECAPTCHA_SECRET_KEY with your recaptcha secret key and MONGO_URL with your MongoDB SRV connection string**

cd ../frontend

**Rename .env.example as .env and fill REACT_APP_RECAPTCHA_SITE_KEY with your recaptcha key**

cd ../..

yarn run start
```
