const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
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
        { name: "Environmental Science" },
        { name: "Political Science" },
        { name: "Psychology" },
        { name: "Economics" },
        { name: "Health & Fitness" },
        { name: "Culinary Arts" },
        { name: "Performing Arts" },
        { name: "Astronomy" },
        { name: "Sociology" },
        { name: "Anthropology" },
        { name: "Education" },
        { name: "Law" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
