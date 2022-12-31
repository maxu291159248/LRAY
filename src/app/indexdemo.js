App = {
    web3Provider: null,
    contracts: {},
    init: function () {
        return App.initWeb3();
    },

    initWeb3: function () {
        // TODO: refactor conditional
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            App.web3Provider = web3.currentProvider;
            ethereum.enable();
            web3 = new Web3(web3.currentProvider);
        } else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            ethereum.enable();
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },




    initContract: function () {
        $.getJSON("User.json", function (election) {
            // 初始化合约
            window.user = TruffleContract(data);
            // Set the provider for our contract
            window.user.setProvider(web3.currentProvider);

        });
    },

    /**
       * 注册账户,在以太坊生成address，用户名会写在合约中
       */
    registe: async function () {
        // 获取数据
        var userAddress = web3.eth.accounts[0];
        var username = $("#username").val();
        var password = $("#password").val();
        var index = userAddress.length();
        // 上传到 Ethereum
        App.StudentRegisterInfo(userAddress, username, password,index);
    },

    StudentRegisterInfo: function (userAddress, username, password, index) {
        user.deployed().then(function (userInstance) {
            userInstance.RegisterInfo(userAddress, username, password, index, {
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







    // 监听合约事件
    listenForEvents: function () {
        App.contracts.Election.deployed().then(function (instance) {


            instance.ProductCreated({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function (error, event) {
                console.log("event triggered", event)
                // Reload when a new vote is recorded
                //  App.render();
            });



        });
    },
    /**
     * 管理or游客登录
     */
    managerlogin: function () {
        web3.eth.getCoinbase(function (err, account) {
            var acc = web3.eth.accounts[0]
            if (err === null) {
                //App.account = account;
                if (acc == App.account) {
                    console.log("------------" + acc + "-----------")
                    console.log(App.account)
                    //console.log(App.account)

                    alert("欢迎管理员登录");
                    window.location.href = "/manager.html";
                } else {
                    alert("无权限,请选择学生登录");
                    console.log("------------" + acc + "-----------")
                }
            }
        });


    },
    
 
}





