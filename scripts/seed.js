const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

// Define the urlFriendly function
const urlFriendly = (str) => {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/&/g, "and") // Replace '&' with 'and'
    .replace(/[\s\W-]+/g, ""); // Remove spaces, non-word characters, and dashes
};

async function main() {
  try {
    // Delete all existing categories
    await database.category.deleteMany({});

    // Define the categories
    const categories = [
      "Computer Science",
      "Music",
      "Literature",
      "Mathematics",
      "Art & Design",
      "Business & Finance",
      "History",
      "Engineering",
      "Language Learning",
    ];

    // Insert the new set of categories with URL-friendly labels
    await database.category.createMany({
      data: categories.map((name) => ({
        name,
        label: urlFriendly(name), // Generate URL-friendly label
      })),
      skipDuplicates: true,
    });

    console.log("Categories have been reset and seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
