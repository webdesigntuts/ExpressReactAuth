cd frontend
npm install
cd ../api
npm install
npx prisma generate
npx prisma migrate dev --name init
cd ..
docker ps -aq | xargs docker stop | xargs docker rm
docker-compose up -d

