import { Schema, model, connect } from "mongoose";

export interface IEmployee {
  firstName: string;
  surName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
}

const schema = new Schema<IEmployee>({
  firstName: { type: String, required: true },
  surName: { type: String, required: true },
  email: { type: String, lowercase: true },
  dateOfBirth: { type: String },
  gender: { type: String, required: true },
});

export const EmployeeModel = model<IEmployee>("Employee", schema);

run().catch((err) => console.log(err));

async function run(): Promise<void> {
  await connect("mongodb://localhost:27017/employee");
}
