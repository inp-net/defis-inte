import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { fakerFR as faker } from '@faker-js/faker';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    faker.seed(20);

    console.log("⏳ Cleaning old data...");
    // Clear dependent tables first to avoid breaking foreign key constraints
    await prisma.proof.deleteMany({});
    await prisma.challenge.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.groupClub.deleteMany({});
    await prisma.groupInte.deleteMany({});
    await prisma.location.deleteMany({});

    console.log("🏢 Seeding basic components (Locations & Groups)...");
    
    // 1. Static Location Setup
    const defaultLocation = await prisma.location.create({
        data: { name: "ENSEEIHT" }
    });

    // 2. Mock Club Data (No API required)
    const mockClubs = [
        { groupId: "bde", name: "BDE ENSEEIHT", pictureURL: "https://picsum.photos/200" },
        { groupId: "as", name: "Association Sportive", pictureURL: "https://picsum.photos/200" },
        { groupId: "foi", name: "Foy'S", pictureURL: "https://picsum.photos/200" },
        { groupId: "net7", name: "Net7", pictureURL: "https://picsum.photos/200" },
        { groupId: "tvn7", name: "TVN7", pictureURL: "https://picsum.photos/200" }
    ];

    const clubsassos = await Promise.all(
        mockClubs.map(club => prisma.groupClub.create({ data: club }))
    );

    // 3. Mock Integration Groups Data
    const mockIntes = [
        { groupId: "inte-clan-1", name: "Les Castors Givrés", points: 120 },
        { groupId: "inte-clan-2", name: "Les Marmottes Enragées", points: 90 },
        { groupId: "inte-clan-3", name: "Les Loutres de l'Espace", points: 150 }
    ];

    const groupeInte = await Promise.all(
        mockIntes.map(inte => prisma.groupInte.create({ data: inte }))
    );

    console.log("👥 Seeding Mock Users...");
    const nbUsers = 15;
    const users = await Promise.all(
        Array.from({ length: nbUsers }, () => {
            const assignedInte = faker.helpers.arrayElement(groupeInte);
            const userClubs = faker.helpers.arrayElements(clubsassos, { min: 1, max: 2 });
            const boardClubs = userClubs.filter(() => Math.random() < 0.2); // 20% chance to be in the bureau

            return prisma.user.create({
                data: {
                    name: faker.person.fullName(),
                    is1A: faker.datatype.boolean(0.6),
                    points: faker.number.int({ min: 0, max: 100 }),
                    isAdmin: faker.datatype.boolean(0.1),
                    groupInteId: assignedInte.groupId,
                    group: {
                        connect: userClubs.map(c => ({ groupId: c.groupId }))
                    },
                    groupBoard: {
                        connect: boardClubs.map(c => ({ groupId: c.groupId }))
                    }
                }
            });
        })
    );

    console.log("🎯 Seeding Mock Challenges...");
    const nbChallenges = 8;
    const typeRenduOpts = ["PHOTO", "VIDEO", "TEXT"] as const; 

    const challenges = await Promise.all(
        Array.from({ length: nbChallenges }, () => {
            const attachedClub = faker.helpers.arrayElement(clubsassos);
            const creator = faker.helpers.arrayElement(users);
            const acceptor = faker.helpers.arrayElement(users);
            const successfulInteGroups = faker.helpers.arrayElements(groupeInte, { min: 0, max: 2 });

            return prisma.challenge.create({
                data: {
                    name: `Défi ${faker.word.verb()} ${faker.word.noun()}`,
                    description: faker.lorem.sentence(),
                    type: faker.helpers.arrayElement(typeRenduOpts),
                    nbPoints: faker.helpers.arrayElement([10, 20, 50, 80, 100]),
                    defiAccepte: faker.datatype.boolean(0.8),
                    groupId: attachedClub.groupId,
                    userId: creator.id,
                    userAcceptId: acceptor.id,
                    locationName: defaultLocation.name,
                    groupInteSucceed: {
                        connect: successfulInteGroups.map(g => ({ groupId: g.groupId }))
                    }
                }
            });
        })
    );

    console.log("📸 Seeding Mock Proofs...");
    const nbProofs = 12;
    const statusOpts = ["PENDING", "VALID", "DENIED"] as const;

    await Promise.all(
        Array.from({ length: nbProofs }, () => {
            const submitter = faker.helpers.arrayElement(users);
            const targetChallenge = faker.helpers.arrayElement(challenges);
            const validator = faker.helpers.arrayElement(users);
            const selectedType = faker.helpers.arrayElement(typeRenduOpts);

            return prisma.proof.create({
                data: {
                    content: faker.lorem.sentence(),
                    type: selectedType,
                    date: faker.date.recent(),
                    status: faker.helpers.arrayElement(statusOpts),
                    media: selectedType !== "text" ? "https://picsum.photos/400/300" : null,
                    text: selectedType === "text" ? faker.lorem.paragraph() : null,
                    userId: submitter.id,
                    challengeId: targetChallenge.challengeId,
                    validatorId: validator.id
                }
            });
        })
    );

    console.log("✨ Seed completely loaded localized data successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
