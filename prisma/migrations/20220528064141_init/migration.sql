-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "pName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayActivities" (
    "id" SERIAL NOT NULL,
    "itineraryId" INTEGER NOT NULL,
    "Day01" TEXT,
    "Day02" TEXT,
    "Day03" TEXT,
    "Day04" TEXT,
    "Day05" TEXT,
    "Day06" TEXT,
    "Day07" TEXT,
    "Day08" TEXT,
    "Day09" TEXT,
    "Day10" TEXT,
    "Day11" TEXT,
    "Day12" TEXT,
    "Day13" TEXT,
    "Day14" TEXT,
    "Day15" TEXT,
    "Day16" TEXT,
    "Day17" TEXT,
    "Day18" TEXT,
    "Day19" TEXT,
    "Day20" TEXT,

    CONSTRAINT "DayActivities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayActivities" ADD CONSTRAINT "DayActivities_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
