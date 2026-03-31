db = db.getSiblingDB("budget_buddy");

db.createCollection("users");
db.createCollection("incomes");
db.createCollection("expenses");

db.users.createIndex({ email: 1 }, { unique: true });
db.incomes.createIndex({ userId: 1, date: -1 });
db.expenses.createIndex({ userId: 1, date: -1 });

db.users.insertOne({
  _id: ObjectId("000000000000000000000001"),
  email: "dev@budgetbuddy.local",
  name: "Dev User",
  createdAt: new Date(),
  updatedAt: new Date(),
});
