cd frontend
npm install
cd ../api
rm .env
cp .env.example .env
npm install
npx prisma generate
cd ..
docker ps -aq | xargs docker stop | xargs docker rm
docker-compose up -d
cd api
rm -rf ./prisma/migrations
npx prisma migrate dev 




