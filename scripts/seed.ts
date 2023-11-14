const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    // Delete all existing categories
    await database.category.deleteMany({});

    // Insert the new set of categories
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Literature" },
        { name: "Mathematics" },
        { name: "Physics" },
        { name: "Art & Design" },
        { name: "Business & Finance" },
        { name: "History" },
        { name: "Philosophy" },
        { name: "Biology" },
        { name: "Engineering" },
        { name: "Language Learning" },
      ],
      skipDuplicates: true, // This ensures that duplicate records are skipped
    });

    console.log("Categories have been reset and seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
