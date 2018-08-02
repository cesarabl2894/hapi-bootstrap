//====================
// Dependencies
//====================
//None

//====================
// Methods
//====================
function getUsers(){
    return fw.promise(async (resolve,reject) => {
        const SQL = 
        `SELECT Users.username, email, ut.usertypeid, ut.description   FROM Users 
        INNER JOIN UserTypes ut  on Users.usertypeid = ut.usertypeid;`;
        resolve(await fw.db.execute('local',SQL));
    });
}

function getUser(id){
    return fw.promise(async (resolve,reject) => 
    {
        const SQL = 
        `SELECT Users.*, Department.Name as 'Department', Roles.Role FROM Users
        INNER JOIN Roles ON Users.RoleId = Roles.ID
        INNER JOIN Department ON Users.DepartmentId = Department.ID
        WHERE Users.ID = ?`;
        resolve(await fw.db.execute('local',SQL,[id]));
    });
}

function getUserbyEmail(email){
    return fw.promise(async (resolve,reject) => {
        const SQL = 
        `SELECT * FROM Users
        WHERE email LIKE ?`;
        resolve(await fw.db.execute('local',SQL,[`%${email}%`]));
    });    
}

function addUser(data){
    return fw.promise(async (resolve,reject) => {
        const SQL = 
        `INSERT INTO users(username, email,password,Salt,usertypeid)
        VALUES (?,?,?,?,?);`;
        resolve(await fw.db.execute('local',SQL,
        [
            data.username,
            data.email, 
            data.password, 
            data.Salt,
            data.usertypeid
        ]));
    });    
}

function updateUser(data)
{
    return fw.promise(async (resolve,reject) => 
    {
        const SQL = 
        `UPDATE Users
        SET Salary = ?,
        StartingDate = ?,
        Email = ?,
        DepartmentId = ?,
        RoleId = ?
        WHERE ID = ?`;
        resolve(await fw.db.execute('local',SQL,
        [
            data.Salary, 
            data.StartingDate, 
            data.Email, 
            data.DepartmentId, 
            data.RoleId, 
            data.ID
        ]));
    });    
}

function deleteUser(email){
    return fw.promise(async (resolve,reject) => 
    {
        const SQL = 
        `DELETE FROM users
        WHERE email = ?`;
        resolve(await fw.db.execute('local',SQL,[email]));
    });
}
function updatePassword(data){
    return fw.promise(async (resolve,reject) => {
        const SQL = `UPDATE medilocation.Users SET Salt = ?, password = ?  WHERE email = ?`;
        resolve(await fw.db.execute('local',SQL,[data.Salt, data.password,data.email]))
    })
}

module.exports = 
{
    getUserbyEmail,
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    updatePassword
}