// SPDX-License-Identifier: SimPL-2.0
pragma solidity >=0.4.22;
pragma experimental ABIEncoderV2;

contract User{
    //所有地址集合
    address[] public userAddresses;
    //所有用户名集合
    string[] private usernames;

     //定义用户数据结构    
    struct Student{
        address userAddress;//msg.sender
        string username;//学生姓名
        string password;//密码
        uint index;
    }

    //定义用户列表数据结构
    struct UserListStruct {
        address userAddress;
        uint index;
    }
    struct OptStudent{
        //已经注册的学生
        uint[] registeStudents;

    }

    Student[] students;
    mapping(address => OptStudent) StudentsPool;

    mapping(address => Student) private studentStruct;
    //用户名映射地址
    mapping(string => UserListStruct) private userListStruct;




    function createUser(address userAddress, string memory username, string memory password) public returns (uint) {

        userAddresses.push(userAddress); //地址集合push新地址
        studentStruct[userAddress] = Student(userAddress, username, password, userAddresses.length - 1);

        usernames.push(username); //用户名集合push新用户
        userListStruct[username] = UserListStruct(userAddress, usernames.length - 1); //用户所对应的地址集合

        return userAddresses.length - 1;
    }

  
    //获取用户个人信息
    function findUser(address userAddress) public view returns (address , string memory, string memory,  uint ) {
        return (
            studentStruct[userAddress].userAddress,
            studentStruct[userAddress].username,
            studentStruct[userAddress].password,
            studentStruct[userAddress].index
            ); 
    }
    //注册用户
    function RegisterInfo( address useraddress,string memory username, string memory password) public {
		useraddress = msg.sender;
        uint id = students.length;
		Student memory student = Student(msg.sender, username, password,  userAddresses.length - 1);
        students.push(student);
        StudentsPool[msg.sender].registeStudents.push(id);
		emit registeStudentSuccess(id, student.userAddress, student.username, student.password);
}
    //注册成功
	event registeStudentSuccess(uint id, address useraddress, string userame, string password);

    //获取注册用户
    function getRegisteStudents() public view returns(uint[] memory){
        return StudentsPool[msg.sender].registeStudents;
    }



}