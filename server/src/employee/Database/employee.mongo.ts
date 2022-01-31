import { Schema, model, connect } from "mongoose";

const schema = new Schema({ employeeData: Object });

export const Employee = model("Employee", schema);

run().catch((err) => console.log(err));

async function run(): Promise<void> {
  await connect("mongodb://localhost:27017/employee");
}
