
cd frontend
npm install
cd ../api
rm .env
cp .env.example .env
npm install
npx prisma generate
cd ..
docker rm webDesignTutsDb
docker rm webDesignTutsApi
docker rm webDesignTutsFrontend
docker-compose up -d
cd api
rm -rf ./prisma/migrations
npx prisma migrate dev 
cd ..
docker ps -a




