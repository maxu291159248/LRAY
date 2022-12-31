const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

firstForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault()); 
App = {
    web3Provider: null,
    myAccount: '0x0',
    account: 0x325a0Df6416e9fdFfc0d709C5e42d25D87cD0e71n,
    init: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            window.web3 = new Web3(web3.currentProvider);
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
        }
        App.initContract();
    },

    initContract: function () {
        $.getJSON('User.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            window.user = TruffleContract(data);
            // Set the provider for our contract
            window.user.setProvider(web3.currentProvider);
            // Init app
            // ......
        });
    },
    /////////////////////////////////////////////////////////////////////



    registe: async function () {
        web3.eth.getAccounts(function (error, accounts) { //本质还是web3调用
            if (error) {
                console.log(error);
            }
            var account = web3.eth.accounts[0];
            // 获取数据
            var userAddress = account;
            console.log(userAddress);
            var username = $("#username1").val();
            var password = $("#password1").val();
            console.log(username);
            console.log(password);
            //var index = userAddress.length;
            // 上传到 Ethereum
            App.StudentRegisterInfo(userAddress, username, password);

        });
    },
    StudentRegisterInfo: function (userAddress, username, password) {
        user.deployed().then(function (instance) {
            userInstance = instance;
            userInstance.createUser(userAddress, username, password, {
                from: web3.eth.accounts[0]
            }).then(function (result) {
                alert("注册成功,等待写入区块!");
                window.location.reload();
            }).catch(function (err) {
                alert("注册失败: " + err);
                window.location.reload();
            });
        });
    },
    login: async function () {
        web3.eth.getAccounts(function (error, accounts) { //本质还是web3调用
            if (error) {
                console.log(error);
            }
            var account = web3.eth.accounts[0];
            // 获取数据
            var userAddress = account;
            console.log(userAddress);
            var username = $("#username2").val();
            var password = $("#password2").val();
            console.log(username);
            console.log(password);
            //var index = userAddress.length;
            // 上传到 Ethereum
            App.StudentLoginInfo(userAddress, username, password);

        });
    },
    StudentLoginInfo: function (userAddress, username, password) {
        user.deployed().then(function (instance) {
            userInstance = instance;
               // userInstance.isExitAddress.call(userAddress).then(function (exit) {
                  //  if (exit) {
                        userInstance.findUser.call(userAddress).then(function (studentStruct) {
                            console.log(studentStruct)
                            //用户名 Object.values(studentStruct)[1] == username;
                            //用户密码  Object.values(studentStruct)[2] == password;
                        if (Object.values(studentStruct)[1] == username && Object.values(studentStruct)[2] == password && userAddress == App.account) {
                            alert("登录成功");
                            window.location.href = "/manager.html";
                            }else if (Object.values(studentStruct)[1] == username && Object.values(studentStruct)[2] == password && userAddress != App.account) {
                            window.location.href = "/student.html";
                            }
                        }).catch(function (err) {
                            alert("登录失败: " + err);
                             window.location.reload();
                       
                  //  }
                //})
                        }).catch(function (err) {
                    alert("登录失败: " + err);
                    window.location.reload();
                });  
        });
    }
}

$(function () {
    App.init();
   // $("#publishBook-menu").addClass("menu-item-active");


});