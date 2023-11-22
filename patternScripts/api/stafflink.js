// Descomentar para rodar api localmente
// const stafflinkURL_employee = "http://localhost:4040/employees/";
// export const stafflinkURL_employeePhoto =
//   "http://localhost:4040/employees/photo/";

// const baseUrl = 'https://employees-api-oite.onrender.com'

const baseUrl = 'http://localhost:4040'

// Employees
const stafflinkURL_employee = `${baseUrl}/employees/`
export const stafflinkURL_employeePhoto = `${baseUrl}/employees/photo/`

// Registers (interprise)
const stafflinkURL_registers = `${baseUrl}/registers`

// Attendance
const stafflinkURL_attendance = `${baseUrl}/attendance`

export async function getEmployee(userId, queryData = null) {
  if (!queryData) {
    const url = stafflinkURL_employee + userId;
    const result = await fetch(url).then((data) => data.json());

    return result[0];
  }

  const url =
    stafflinkURL_employee +
    `?email=${queryData.email}&password=${queryData.password}`;
  const result = await fetch(url).then((data) => data.json());

  return result[0];
}

export async function saveEmployee(employeeObject) {
  if(employeeObject instanceof FormData) {
    await fetch(stafflinkURL_employee, {
      method: "POST",
      body: employeeObject,
    });
  } else {
    fetch(stafflinkURL_employee, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeObject),
    })
  }
}

export async function getEmployees() {
  const results = await fetch(stafflinkURL_employee);
  const employees = await results.json();

  return employees;
}

export async function updateEmployee(id, data) {
  await fetch(stafflinkURL_employee + id, {
    method: "PUT",
    body: data,
  });
}

export async function deleteEmployee(id) {
  await fetch(stafflinkURL_employee + id, {
    method: "DELETE",
  });
}

// REGISTERS

export async function signUpInterprise(interpriseData) {
    await fetch(stafflinkURL_registers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(interpriseData)
    })
}

// ATTENDANCE

export async function deleteAttendance(employeeId) {
  await fetch(`${stafflinkURL_attendance}/${employeeId}` , {
    method: "DELETE",
  })
}