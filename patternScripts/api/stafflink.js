export async function findUser(userId) {
    const result = await fetch(`https://employees-api-oite.onrender.com/employees/${userId}`).then(data => data.json())
    return result[0]
}