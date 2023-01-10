
cd frontend
npm install
cd ../api
rm .env
cp .env.example .env
npm install
npx prisma generate
cd ..
docker-compose down
docker container kill $(docker container ls -q)
docker-compose down --rmi all -v --remove-orphans
docker-compose up -d
cd api
rm -rf ./prisma/migrations
npx prisma migrate dev 




