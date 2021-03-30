
const db = require('_helpers/db');
const Product = db.Product;

module.exports = {
    getAll,
    getById,
    create,
};

async function getAll() {
    return await Product.find();
}

async function getById(id) {
    return await Product.findById(id);
}


// async function create(userParam) {
//     // validate
//     if (await User.findOne({ username: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     const user = new User(userParam);

//     // hash password
//     if (userParam.password) {
//         user.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // save user
//     await user.save();
// }



async function create(productParam) {
    const product = new Product({
        name: productParam.name,
        desc: productParam.desc,
        stock: productParam.stock,
        price: productParam.price
    })

    await product.save()
};