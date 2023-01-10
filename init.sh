cd frontend
npm install
cd ../api
rm .env
cp .env.example .env
npm install
npx prisma generate
cd ..
docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker-compose up -d
cd api
rm -rf ./prisma/migrations
npx prisma migrate dev 




