/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    info_account: async function (req, res) {
        try {
            const userid = req.params.id;
            console.log("userid", userid);

            const user = await Account.find({ where: { accountid: userid } });
            const member = await Accountbyemail.find({
                where: { emailAccountid: userid },
            });
            const profile = await User.findOne({ id: userid });

            let accounts = null;
            
            if(member.length > 0) {
                for(let member1 of member) {
                    accounts = await Account.find({ where: { id: member1.useremailAccountid} }).populate('accountid');
                }
            }


            console.log("ghfchvgh", user);
            console.log("ghfchvgh account333", accounts);
            
            console.log("ghfchvg h profile ", profile);
            return res.view("dashboard", {
                accountid: user,
                all: userid,
                profile: profile,
                member: accounts,
            });
        } catch (err) {
            // .then((data)=>{
            //     console.log('jgvhgvh',data);
            //     res.view('dashboard', {  accountid: data })
            // })
            // .then( data => {
            //     console.log('jgvhgvh',data);
            //     res.view('dashboard', {  accountid: data })
            //     // await User.find({})
            //     //     .then(result => {

            //     //         console.log("data", data)

            //     //         res.render('dashboard', {  accountid: data, result: result })

            //     //     })
            //         // .catch(err => {
            //         //     console.log(err);
            //         // })
            // })
            console.log(err);
        }
    },


    info_account_member: async function (req, res) {
        try {
            const userid = req.params.id;
            console.log("userid", userid);

            const member = await Accountbyemail.find({
                where: { emailAccountid: userid },
            });

            let accounts = null;
            
            if(member.length > 0) {
                for(let member1 of member) {
                    accounts = await Account.find({ where: { id: member1.useremailAccountid} }).populate('accountid');
                }
            }
            
            return res.view("viewMemberAccount", {
                all: userid,
                member: accounts,
            });
        } catch (err) {
            // .then((data)=>{
            //     console.log('jgvhgvh',data);
            //     res.view('dashboard', {  accountid: data })
            // })
            // .then( data => {
            //     console.log('jgvhgvh',data);
            //     res.view('dashboard', {  accountid: data })
            //     // await User.find({})
            //     //     .then(result => {

            //     //         console.log("data", data)

            //     //         res.render('dashboard', {  accountid: data, result: result })

            //     //     })
            //         // .catch(err => {
            //         //     console.log(err);
            //         // })
            // })
            console.log(err);
        }
    },
    addUserEmailPage: async (req, res) => {
        const id = req.params.id;

        const data = req.user.userid;
        console.log("data user id", data);
        return res.view("addUserByEmail", { all: id, allnew: data });

        // await Account.find({ where: {accountid: id} }).exec(function(err, result){
        //     console.log('add account page opend',result);
        //     if(err){
        //         return err
        //     }
        //     return res.view('addUserAccount', {articles: result})
        // })
    },

    //Add user to account by Email

    addUserEmail: async (req, res) => {
        console.log("for add user by email");
        const email = req.body.email;
        const id = req.params.id;
        console.log("user id", id);
        console.log("for add user by email into account id", id);

        const user = await User.find({
            email: email,
        });
        console.log("user data", user);
        const usernew = user[0].id;
        console.log("user id for acc", usernew);
        await Account.addToCollection(id, "emailAccountid", usernew).then(
            (result) => {
                console.log("added data", result);
                console.log("add user", req.user.userid);
                const id = req.user.userid;
                // return res.view('dashboard', {all: id})
                return res.redirect(`/dashboarduser/${id}`);
            }
        );
    },
};
