const {loadProducts,saveProducts}=require("../data/mdModule")
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		let products = loadProducts();
		return res.render("products",{
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let products = loadProducts();
		let product = products.find(product =>product.id === +req.params.id)
		return res.render("detail", {
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		
		return res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		//return res.send(req.file)
		const {name, price, discount, description, category,image} = req.body;
		let products = loadProducts();
		const newProduct = {
			id : products[products.length - 1].id + 1,
			name : name.trim(),
			price : +price,
			description : description.trim(),
			discount : +discount,
			category,
			image: req.file.filename
		}

		productsModify = [...products, newProduct];

		saveProducts(productsModify);
		return res.redirect("/products")

	},
	

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let productToEdit = loadProducts().find(product => product.id === +req.params.id);
		return res.render("product-edit-form", {
			productToEdit
		})

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const {name, price, discount, description, category} = req.body;
		let productsModify = loadProducts().map(product => {
			if(product.id === +req.params.id){
				return{
					id : product.id,
					name : name.trim(),
					price : +price,
					description : description.trim(),
					discount : +discount,
					category,
					image:product.image

				}
			}
			return product
		});

		saveProducts(productsModify);
		return res.redirect("/products/detail/" + req.params.id)
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let productsModify = loadProducts().filter(product => product.id  !== +req.params.id);
		saveProducts(productsModify);
		return res.redirect("/products")
	}
};

module.exports = controller;