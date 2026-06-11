import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { fakerFR as faker } from '@faker-js/faker';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// Helper function to generate random content array based on type
function generateContentArray(type: "PHOTO" | "VIDEO" | "TEXT", minItems: number = 1, maxItems: number = 5): string[] {
    const itemCount = faker.number.int({ min: minItems, max: maxItems });
    const contents: string[] = [];
    
    for (let i = 0; i < itemCount; i++) {
        switch (type) {
            case "TEXT":
                contents.push(faker.lorem.paragraph());
                break;
            case "VIDEO":
                // Mix of YouTube and local video URLs
                const videoUrls = [
                    "https://vjs.zencdn.net/v/oceans.mp4",
                    "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
                    "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4",
                    "https://media.w3.org/2010/05/bunny/movie.mp4"
                ];
                contents.push(faker.helpers.arrayElement(videoUrls));
                break;
            case "PHOTO":
                // Generate different image sizes and types
                const imageId = faker.number.int({ min: 1, max: 1000 });
                const imageDimensions = [
                    "400/300", "800/600", "1024/768", "1920/1080", "800/800"
                ];
                const dimension = faker.helpers.arrayElement(imageDimensions);
                contents.push(`https://picsum.photos/id/${imageId}/${dimension}`);
                break;
        }
    }
    
    return contents;
}

async function main() {
    faker.seed(10);

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
    const nbChallenges = 350;
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

    console.log("📸 Seeding Mock Proofs with multiple content items...");
    const nbProofs = 12;
    const statusOpts = ["PENDING", "VALID", "DENIED"] as const;

    await Promise.all(
        Array.from({ length: nbProofs }, () => {
            const submitter = faker.helpers.arrayElement(users);
            const targetChallenge = faker.helpers.arrayElement(challenges);
            const validator = faker.helpers.arrayElement(users);
            const selectedType = targetChallenge.type; // Use challenge's expected type
            
            // Generate multiple content items based on type
            let contentArray: string[];
            
            switch (selectedType) {
                case "TEXT":
                    // For TEXT proofs: 1-3 paragraphs
                    contentArray = generateContentArray("TEXT", 1, 3);
                    break;
                case "VIDEO":
                    // For VIDEO proofs: 1-2 video URLs
                    contentArray = generateContentArray("VIDEO", 1, 2);
                    break;
                case "PHOTO":
                    // For PHOTO proofs: 1-5 images
                    contentArray = generateContentArray("PHOTO", 1, 5);
                    break;
                default:
                    contentArray = generateContentArray("PHOTO", 1, 3);
            }
            
            // Add some edge cases
            const isSpecialCase = faker.datatype.boolean(0.2); // 20% chance for special cases
            
            if (isSpecialCase) {
                const specialCases = [
                    { type: "PHOTO", min: 6, max: 10, desc: "gallery upload (6-10 photos)" },
                    { type: "VIDEO", min: 3, max: 5, desc: "multiple videos (3-5)" },
                    { type: "TEXT", min: 4, max: 8, desc: "long form text (4-8 paragraphs)" }
                ];
                
                const special = faker.helpers.arrayElement(specialCases);
                if (special.type === selectedType) {
                    contentArray = generateContentArray(selectedType, special.min, special.max);
                    console.log(`   ✨ Created special case: ${special.desc}`);
                }
            }

            return prisma.proof.create({
                data: {
                    content: contentArray, // Now storing an array
                    type: selectedType,
                    date: faker.date.recent(),
                    status: faker.helpers.arrayElement(statusOpts),
                    userId: submitter.id,
                    challengeId: targetChallenge.challengeId,
                    validatorId: validator.id,
                    isOkTVn7: faker.datatype.boolean(),
                }
            });
        })
    );

    // Additional proofs with mixed content types (if your schema supports media arrays)
    console.log("🎨 Seeding mixed-media proofs...");
    const mixedMediaProofs = [
        {
            description: "Challenge with multiple photos from different angles",
            type: "PHOTO" as const,
            items: 4,
            content: [
                "https://picsum.photos/id/101/800/600", // Landscape
                "https://picsum.photos/id/102/600/800", // Portrait
                "https://picsum.photos/id/103/800/800", // Square
                "https://picsum.photos/id/104/1024/768"  // Wide
            ]
        },
        {
            description: "Proof with mixed video and photo evidence",
            type: "VIDEO" as const,
            items: 2,
            content: [
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "https://storage.example.com/proofs/evidence.mp4"
            ]
        }
    ];

    for (const mixedProof of mixedMediaProofs) {
        const submitter = faker.helpers.arrayElement(users);
        const targetChallenge = challenges.find(c => c.type === mixedProof.type) || faker.helpers.arrayElement(challenges);
        const validator = faker.helpers.arrayElement(users);
        
        await prisma.proof.create({
            data: {
                content: mixedProof.content,
                type: mixedProof.type,
                date: faker.date.recent(),
                status: "PENDING",
                userId: submitter.id,
                challengeId: targetChallenge.challengeId,
                validatorId: validator.id,
                isOkTVn7: faker.datatype.boolean(),
            }
        });
    }

    // Display summary statistics
    console.log("\n📊 Seed Summary:");
    console.log(`   - ${users.length} users created`);
    console.log(`   - ${challenges.length} challenges created`);
    console.log(`   - ${nbProofs + mixedMediaProofs.length} proofs created`);
    
    const allProofs = await prisma.proof.findMany();
    const textProofs = allProofs.filter(p => p.type === "TEXT");
    const photoProofs = allProofs.filter(p => p.type === "PHOTO");
    const videoProofs = allProofs.filter(p => p.type === "VIDEO");
    
    console.log(`   - TEXT proofs: ${textProofs.length} (avg items: ${(textProofs.reduce((acc, p) => acc + p.content.length, 0) / textProofs.length || 0).toFixed(1)})`);
    console.log(`   - PHOTO proofs: ${photoProofs.length} (avg items: ${(photoProofs.reduce((acc, p) => acc + p.content.length, 0) / photoProofs.length || 0).toFixed(1)})`);
    console.log(`   - VIDEO proofs: ${videoProofs.length} (avg items: ${(videoProofs.reduce((acc, p) => acc + p.content.length, 0) / videoProofs.length || 0).toFixed(1)})`);
    
    console.log("\n✨ Seed completely loaded localized data successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
