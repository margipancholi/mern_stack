import React, { useState } from "react";
import ConformationModal from "./conformationModal";
import NavigationWrapper from "./NavigationWrapper";

export const EmployeeCreate = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dateOfJoining, setdateOfJoining] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [designation, setdesignation] = useState("Developer");
  const [employeeType, setemployeeType] = useState("Full Time");
  const [currentStatus, setcurrentStatus] = useState("");
  const [department, setdepartment] = useState("");
  const [open, setOpen] = useState(false);

  const addNewUser = () => {
    const requestBody = {
      query: `
          mutation {
            createEmployee(employeeInput: {
              firstName:"${firstName}",
              lastName:"${lastName}",
              dateOfBirth:"${dateOfBirth}",
              dateOfJoining:"${dateOfJoining}",
              designation:"${designation}",
              department:"${department}",
              employeeType:"${employeeType}",
              currentStatus:"${currentStatus}"
            }) {
              firstName
              lastName
              dateOfBirth
              dateOfJoining
              designation
              department
              employeeType
              currentStatus 
            }
          }
        `,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        if (res.status === 200) {
          setOpen(true);
        }

        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <NavigationWrapper>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Add Employee
          </h1>
        </div>
      </header>
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <form
          action="#"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            addNewUser();
          }}
        >
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <div>

                <p className="mt-1 text-sm text-gray-500">
                  Add Employee Details
                </p>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    onChange={(e) => {
                      setfirstName(e.target.value);
                    }}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    onChange={(e) => {
                      setlastName(e.target.value);
                    }}
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Of Birth
                  </label>
                  <input
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                    }}
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Of Joining
                  </label>
                  <input
                    onChange={(e) => {
                      setdateOfJoining(e.target.value);
                    }}
                    type="date"
                    name="joiningDate"
                    id="joiningDate"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <select
                    onChange={(e) => {
                      setdesignation(e.target.value);
                    }}
                    id="designation"
                    name="designation"
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>CEO</option>
                    <option>CTO</option>
                    <option>Manager</option>
                    <option>Developer</option>
                    <option>IT</option>
                  </select>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <input
                    onChange={(e) => {
                      setdepartment(e.target.value);
                    }}
                    type="text"
                    name="department"
                    id="department"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    EmployeeType
                  </label>
                  <select
                    onChange={(e) => {
                      setemployeeType(e.target.value);
                    }}
                    id="designation"
                    name="designation"
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Full Time</option>
                    <option>Part-Time</option>
                    <option>Intern</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="currentStatus"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Status
                  </label>
                  <input
                    onChange={(e) => {
                      setcurrentStatus(e.target.value);
                    }}
                    type="text"
                    name="currentStatus"
                    id="currentStatus"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
          <ConformationModal open={open} setOpen={setOpen} />
        </form>
      </div>
    </NavigationWrapper>
  );
};
