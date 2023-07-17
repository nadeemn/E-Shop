from flaskEshop import app, db, bcrypt
from flask import jsonify, request, make_response
from flaskEshop.models import UserSchema, User, ProductSchema, Product, OrderSchema, Order, Discount, DiscountSchema, Seller, SellerSchema, OrderItems, OrderItemSchema, Ratings, RatingSchema, Chat, ChatSchema
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime, date
from sqlalchemy import distinct, asc, desc, or_, and_
import uuid
import json

def get_discount_product(product):
  
    if product._discount:
        discount_item = Discount.query.filter(Discount._product_id == product._id , Discount._expiry_date >= date.today()).first()
        if discount_item:
            discount_schema = DiscountSchema().dump(discount_item)
            return discount_schema
        else:
            return None
    else:
        return None
                
@app.route('/api/get', methods=['GET'])
def get_hello():
    hello = 'Welcome to Prodigy E-shop'
    return jsonify(hello) 

@app.route('/api/addUser', methods=['POST'])
def add_User():
    user_data = request.get_json()
    user_data['_id'] = str(uuid.uuid4())

    user = User.query.filter_by(_email= user_data['_email']).first()
    if not user:
        user_object = User(**user_data)
        db.session.add(user_object)
        db.session.commit()
    
    schema = UserSchema()

    return schema.jsonify(user_object)


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    password = data['password']
    user = User.query.filter_by(_email=data['email']).first()
    
    if not user:
        return jsonify({"msg":'User not found'}), 401

    elif user and user.verify_password(password):
        access_token = create_access_token(identity=data['email'])
        return jsonify(access_token = access_token, message = 'Logged in successfully!'), 200

    else:
       return jsonify({"msg": "Invalid Username/password"}), 401

@app.route('/api/addSeller', methods=['POST'])
def add_Seller():
    seller_data = request.get_json()
    seller_data['_id'] = str(uuid.uuid4())

    seller = Seller.query.filter_by(_email= seller_data['_seller_email']).first()
    if not seller:
        seller_object=Seller(seller_data['_id'], seller_data['_seller_name'],
                              seller_data['_seller_email'], seller_data['_seller_password'])
        db.session.add(seller_object)
        db.session.commit()
    
        return jsonify({"msg": "Registration Successfull"}), 200
    else:
        return jsonify({"msg": "Email already exists "}), 400

@app.route('/api/seller-login', methods=['POST'])
def handle_seller_login():
    seller_data = request.get_json()
    password = seller_data.get('password')
    seller = Seller.query.filter_by(_email = seller_data['email']).first()
    
    if not seller:
        return jsonify({"msg": "Email not found"}), 401
    
    elif seller and seller.verify_password(password):
        access_token = create_access_token(identity=seller_data['email'])
        return jsonify(access_token = access_token), 200
    
    else:
        return jsonify({"msg": "Invalid Username/password"}), 401


@app.route('/api/getSeller')
@jwt_required()
def get_seller():
    email = get_jwt_identity()
    seller = Seller.query.filter_by(_email=email).first()

    if seller:
        return jsonify({"name":seller._name, "email": seller._email}), 200
    else:
        return jsonify({"msg":"you are unauthorized"}), 401


@app.route("/api/getUser")
@jwt_required()
def get_user():
    email = get_jwt_identity()
    user = User.query.filter(User._email == email).first()
    if user:
        return UserSchema().jsonify(user), 200
    else:
        return jsonify({"msg":"you are unauthorized"}), 401
    

# Routes for Product
@app.route('/api/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    product_schema = ProductSchema(many=True)
    return jsonify(product_schema.dump(products))


@app.route("/api/getClothPrducts")
def get_clothproduct():
    product_list = Product.query.filter_by(_category="Clothing").all()
    final_product_list = []
    for product in product_list:
        product_schema = ProductSchema().dump(product)
        discount_item = get_discount_product(product)
        if discount_item:
            product_with_discount = {**product_schema, **discount_item}
        else:
            product_with_discount = {**product_schema}
        final_product_list.append(product_with_discount)
    return jsonify(final_product_list)

@app.route("/api/getElectronicPrducts")
def get_electronicproduct():
    product_list = Product.query.filter_by(_category="Electronics").all()
    final_product_list = []
    for product in product_list:
        product_schema = ProductSchema().dump(product)
        discount_item = get_discount_product(product)
        if discount_item:
            product_with_discount = {**product_schema, **discount_item}
        else:
            product_with_discount = {**product_schema}
        final_product_list.append(product_with_discount)
    return jsonify(final_product_list)

@app.route("/api/getAccessoryPrducts")
def get_accessoryproduct():
    product_list = Product.query.filter_by(_category="Accessories").all()
    final_product_list = []
    for product in product_list:
        product_schema = ProductSchema().dump(product)
        discount_item = get_discount_product(product)
        if discount_item:
            product_with_discount = {**product_schema, **discount_item}
        else:
            product_with_discount = {**product_schema}
        final_product_list.append(product_with_discount)
    return jsonify(final_product_list)

@app.route("/api/getBagPrducts")
def get_bagproducts():
    product_list = Product.query.filter_by(_category="Bags and Shoes").all()
    final_product_list = []
    for product in product_list:
        product_schema = ProductSchema().dump(product)
        discount_item = get_discount_product(product)
        if discount_item:
            product_with_discount = {**product_schema, **discount_item}
        else:
            product_with_discount = {**product_schema}
        final_product_list.append(product_with_discount)
    return jsonify(final_product_list)

@app.route("/api/getEssentialPrducts")
def get_essentialproducts():
    product_list = Product.query.filter_by(_category="Daily Essential").all()
    final_product_list = []
    for product in product_list:
        product_schema = ProductSchema().dump(product)
        discount_item = get_discount_product(product)
        if discount_item:
            product_with_discount = {**product_schema, **discount_item}
        else:
            product_with_discount = {**product_schema}
        final_product_list.append(product_with_discount)
    return jsonify(final_product_list)  

@app.route("/api/getSingleProduct", methods= ["GET"])
def get():
    id = request.args.get("id")
    product = Product.query.filter(Product._id == id).first()
    if product:
        data = ProductSchema().dump(product)
        return jsonify(data), 200

@app.route('/api/Product', methods=['GET'])
def get_product_by_id():
    avg_rating = 0
    id = request.args.get('id')
    product = Product.query.filter_by(_id = id).first()
    if product is None:
        return jsonify(f'No product found for id: {id}'), 404
    
    product_schema = ProductSchema()
    product_data = product_schema.dump(product)
    
    if product._discount:
        discount_product = Discount.query.filter(Discount._product_id == product._id, Discount._expiry_date >= date.today()).first()
        if discount_product:
            offer_schema = DiscountSchema().dump(discount_product)
            product_data.update(**offer_schema)
            
    product_ratings = Ratings.query.filter(Ratings._product_id == product._id).all()
    if product_ratings:
        for rating in product_ratings:
            avg_rating+=rating._rating
        avg_rating=avg_rating/len(product_ratings)
    
    product_data.update({'rating':avg_rating})
    
    return jsonify([product_data])

@app.route("/api/getProduct", methods=["GET"])
@jwt_required()
def get_product_by_id_loggedin():
    avg_rating = 0
    id = request.args.get("id")
    product = Product.query.filter_by(_id = id).first()

    if product is None:
        return jsonify(f'No product found for id: {id}'), 404
    
    product_schema = ProductSchema()
    product_data = product_schema.dump(product)
    
    product_ratings = Ratings.query.filter(Ratings._product_id == product._id).all()
    if product_ratings:
        for rating in product_ratings:
            avg_rating+=rating._rating
        avg_rating=avg_rating/len(product_ratings)
    if product._discount:
        discount_product = Discount.query.filter(Discount._product_id == product._id, Discount._expiry_date >= date.today()).first()
        if discount_product:
            offer_schema = DiscountSchema().dump(discount_product)
            product_data.update(**offer_schema)
           
    product_data.update({'rating':avg_rating})
 
    email = get_jwt_identity()
    user = User.query.filter(User._email == email).first()
    if user:
        order_lists = Order.query.filter(Order._user_id == user._id, Order._order_status == 1).all()
        if order_lists:
            for order in order_lists:
                orderitem = OrderItems.query.filter(OrderItems._order_id == order._id, OrderItems._product_id == product._id).first()
                if orderitem:
                    seller = Seller.query.filter(Seller._id == product._seller_id).first()
                    product_data.update({'seller_name': seller._name})
                    product_data.update({'seller_email': seller._email})
                    product_data.update({'item_purchased':True})
                    return jsonify([product_data]), 200
        product_data.update({'item_purchased':False})
        return jsonify([product_data])

@app.route('/api/addProduct', methods=['POST'])
@jwt_required()
def add_product():
    request_data = request.json.get('product_data')
    image_data = request.json.get('product_image')

    product_data = json.loads(request_data)

    email = get_jwt_identity()
    seller = Seller.query.filter_by(_email=email).first()

    product_name = product_data.get('product_name')
    product_category = product_data.get('product_category')
    product_price = product_data.get('product_price')
    product_stock = product_data.get('product_stock')
    product_subcategory = product_data.get('product_subcategory')
    product_category_gender = product_data.get('product_category_gender')
    product_category_brand = product_data.get('product_category_brand')
    product_discount_option = product_data.get('product_discount_option')
    product_sponsored = product_data.get("product_sponsor")
    product_id = str(uuid.uuid4())

    new_product_instance = Product(product_id, product_name,image_data, product_category,
                                    product_subcategory, product_price, product_stock, 
                                    seller._id, product_discount_option, product_category_gender,
                                    product_category_brand, product_sponsored )
    
    if product_discount_option:
        discount_id = str(uuid.uuid4())
        product_discount_rate = product_data.get('product_discount_rate')
        product_discount_expiry = product_data.get('product_discount_expiry')
        discount_image = request.json.get('product_discount_image')
        datetime_obj = datetime.fromisoformat(product_discount_expiry[:-1])

        discounted_product_instance = Discount(discount_id,product_id, product_discount_rate, datetime_obj, discount_image)
    
    db.session.add(new_product_instance)
    db.session.commit()
    if product_discount_option:
        db.session.add(discounted_product_instance)
        db.session.commit()

    return jsonify({"msg":"Product has been added!"})

@app.route("/api/editProduct", methods= ['POST'])
@jwt_required()
def edit_product():
    request_data = request.json.get('product_data')
    image_data = request.json.get('product_image')

    product_data = json.loads(request_data)
    discount = product_data.get('product_discount_option')
    product_discount_expiry = product_data.get('product_discount_expiry')
    product_id =  product_data.get("product_id")
    datetime_obj = datetime.fromisoformat(product_discount_expiry[:-1])
    product_discount_rate = product_data.get('product_discount_rate')

    product_item = Product.query.filter(Product._id == product_id).first()
    if product_item:
        if product_data.get("product_price"):
            product_item._price = product_data.get("product_price")
        if product_data.get("product_stock"):
            product_item._stock = product_data.get("product_stock")
        if image_data:
            product_item._product_image = image_data
        if discount == True:
            product_item._discount = discount
            discount_image = request.json.get('product_discount_image')
            discount_items = Discount.query.filter(Discount._product_id == product_id, Discount._expiry_date >= date.today()).first()
            if discount_items:
                discount_items._discount_rate = product_discount_rate
                discount_items._expiry_date = datetime_obj
                discount_items._discount_image = discount_image
                db.session.commit()
            else:
                discount_id = str(uuid.uuid4())
                discounted_product_instance = Discount(discount_id, product_id, product_discount_rate, datetime_obj, discount_image)
                db.session.add(discounted_product_instance)
                db.session.commit()
        db.session.commit()

    return jsonify({"msg": "Product edited successfully"}) , 200

@app.route("/api/searchProducts", methods = ['POST'])
def search_product():
    query = request.json.get("searchTerm")
    search_result = []
    products = Product.query.all()
    print(query)
    if products:
        for product in products:
            if query.lower() in product._name.lower():
                product_entity = ProductSchema().dump(product)
                discount_item = get_discount_product(product)
                if discount_item:
                    product_with_discount = {**product_entity, **discount_item}
                else:
                    product_with_discount = {**product_entity}
                search_result.append(product_with_discount)

    return jsonify(search_result), 200

@app.route('/api/getSellerProduct')
@jwt_required()
def get_product():
    email = get_jwt_identity()
    seller = Seller.query.filter_by(_email=email).first()
    product_list = Product.query.filter_by(_seller_id=seller._id)
    schema = ProductSchema(many=True)
    return schema.jsonify(product_list)

@app.route('/api/getExpiredDiscounts')
@jwt_required()
def get_expiredDiscounts():
    email = get_jwt_identity()
    seller = Seller.query.filter_by(_email=email).first()
    current_date = date.today()
    product_list = Product.query.filter_by(_seller_id=seller._id).all()
    expired_products = []

    for product in product_list:
        if product._discount:
            discount_product = Discount.query.filter_by(_product_id=product._id).all()
            if discount_product:
                for discount in discount_product:
                    if discount._expiry_date < current_date:
                        expired_product = DiscountSchema().dump(discount)
                        product_schema = ProductSchema().dump(product)
                        product_with_discount_details = {**product_schema, **expired_product}
                        expired_products.append(product_with_discount_details)
    
    return jsonify(expired_products), 200


@app.route('/api/getDiscounts')
@jwt_required()
def get_discounts():
    email = get_jwt_identity()
    seller = Seller.query.filter_by(_email=email).first()

    product_list = Product.query.filter_by(_seller_id=seller._id).all()
    my_offers = []

    for product in product_list:
        if product._discount:
            discount_product = Discount.query.filter_by(_product_id=product._id).all()
            if discount_product:
                for discount in discount_product:
                    if discount._expiry_date >= date.today():                            
                        offer_schema = DiscountSchema().dump(discount)
                        product_schema = ProductSchema().dump(product)
                        product_with_discount_details = {**product_schema, **offer_schema}
                        my_offers.append(product_with_discount_details)
    return jsonify(my_offers), 200


# Routes for Order
@app.route('/api/orders', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    order_schema = OrderSchema(many=True)
    return jsonify(order_schema.dump(orders))


@app.route('/api/order/<id>', methods=['GET'])
def get_order_by_id(id):
    order = Order.query.get(id)
    if order is None:
        return jsonify(f'No order found for id: {id}'), 404
    order_schema = OrderSchema()
    return jsonify(order_schema.dump(order))


@app.route('/api/AddToCart', methods=['POST'])
@jwt_required()
def add_order():
    data = request.get_json()
    quantity = data['quantity']

    email = get_jwt_identity()
    user = User.query.filter_by(_email=email).first()
    if not user:
        return jsonify({"msg": "Invalid Email address"}), 401
    
    product_id = data['id']
    product = Product.query.filter_by(_id=product_id).first()
   
    if product._stock < quantity:
        return jsonify({"msg": "Sorry, we dont have sufficient stock as per the request!"}), 400
    
    order_list = Order.query.filter(Order._user_id == user._id, Order._order_status != 1).first()
    if not order_list:
        order_id = str(uuid.uuid4())
        order_object = Order(order_id, user._id, 0, False)
        db.session.add(order_object)
        db.session.commit()
        order_item = OrderItems(order_id, product._id, quantity)
        db.session.add(order_item)
        db.session.commit()
    
    else:
        
        unplaced_order_id = order_list._id
        orderItem = OrderItems.query.filter(OrderItems._order_id == unplaced_order_id,
                                                     OrderItems._product_id == product._id).first()
        if not orderItem:
            order_item = OrderItems(unplaced_order_id, product._id, quantity)
            db.session.add(order_item)
            db.session.commit()
        else:
            existing_quantity = orderItem._quantity
            orderItem._quantity = quantity
            db.session.commit()

    return jsonify({"msg": "Your order has been added successfully!"})

@app.route('/api/getActiveOrder')
@jwt_required()
def get_order():
    email = get_jwt_identity()
    user = User.query.filter_by(_email=email).first()
    user_order_list = []

    if user:
        order_no = Order.query.filter(Order._user_id == user._id, Order._order_status != 1).first()
        order_data = OrderSchema().dump(order_no)

        if order_no:
            order_items = OrderItems.query.filter_by(_order_id=order_no._id).all()
            for order_item in order_items:
                product_id = order_item._product_id
                product= Product.query.filter_by(_id = product_id).first()

                product_data = ProductSchema().dump(product)
                order_item_data = OrderItemSchema().dump(order_item)
                order_item_with_product_details = {**product_data, **order_item_data}

                if product._discount:
                    discount_product = Discount.query.filter(Discount._product_id == product._id,
                                                            Discount._expiry_date >= date.today()).first()
                    if discount_product:
                        offer_schema = DiscountSchema().dump(discount_product)
                        order_item_with_product_details.update(**offer_schema)

                user_order_list.append(order_item_with_product_details)
        else:
            return jsonify({"msg": "No items in the Cart"}), 200
    
    return jsonify(order_list = user_order_list, order_data = order_data), 200

@app.route('/api/getFilteredClothes', methods = ['POST'])
def get_filtered_clothes():
    data = request.get_json()
    checkbox_set = data.get('cloth_checkbox_options')
    product_list = Product.query.filter_by(_category="Clothing").all()
    filtered_items = []

    for product in product_list:
        product_data = ProductSchema().dump(product)

        if len(checkbox_set['key1']) > 0 and len(checkbox_set['key2']) > 0:
            if (product_data['_sub_category'] in checkbox_set['key2']) and (product_data['_product_gender'] in checkbox_set['key1']):
                filtered_items.append(product_data)
        else:
            if (product_data['_sub_category'] in checkbox_set['key2']) or (product_data['_product_gender'] in checkbox_set['key1']):
                filtered_items.append(product_data)

    return jsonify(filtered_items), 200

@app.route("/api/getFilteredElectronics", methods= ["POST"])
def get_filtered_electronics():
    data = request.get_json()
    checkbox_set = data.get('electronic_checkbox_options')
    product_list = Product.query.filter_by(_category="Electronics").all()
    filtered_items = []

    for product in product_list:
        product_data = ProductSchema().dump(product)

        if len(checkbox_set['key1']) > 0 and len(checkbox_set['key2']) > 0:
            if (product_data['_sub_category'] in checkbox_set['key1']) and (product_data['_product_brand'] in checkbox_set['key2']):
                filtered_items.append(product_data)
        else:
            if (product_data['_sub_category'] in checkbox_set['key1']) or (product_data['_product_brand'] in checkbox_set['key2']):
                filtered_items.append(product_data)

    return jsonify(filtered_items), 200

@app.route("/api/getFilteredAccessories", methods = ['POST'])
def get_filtered_accessory():
    data = request.get_json()
    checkbox_set = data.get('accessory_checkbox_options')
    product_list = Product.query.filter_by(_category="Accessories").all()
    filtered_items = []

    for product in product_list:
        product_data = ProductSchema().dump(product)

        if len(checkbox_set['key1']) > 0 and len(checkbox_set['key2']) > 0:
            if (product_data['_sub_category'] in checkbox_set['key2']) and (product_data['_product_gender'] in checkbox_set['key1']):
                filtered_items.append(product_data)
        else:
            if (product_data['_sub_category'] in checkbox_set['key2']) or (product_data['_product_gender'] in checkbox_set['key1']):
                filtered_items.append(product_data)

    return jsonify(filtered_items), 200

@app.route("/api/getFilteredBags", methods=["POST"])
def get_filtered_bags():
    data = request.get_json()
    checkbox_set = data.get('bag_checkbox_options')
    product_list = Product.query.filter_by(_category="Bags and Shoes").all()
    filtered_items = []

    for product in product_list:
        product_data = ProductSchema().dump(product)

        if len(checkbox_set['key1']) > 0 and len(checkbox_set['key2']) > 0:
            if (product_data['_sub_category'] in checkbox_set['key2']) and (product_data['_product_gender'] in checkbox_set['key1']):
                filtered_items.append(product_data)
        else:
            if (product_data['_sub_category'] in checkbox_set['key2']) or (product_data['_product_gender'] in checkbox_set['key1']):
                filtered_items.append(product_data)

    return jsonify(filtered_items), 200

@app.route("/api/getFilteredEssentials", methods=["POST"])
def get_filtered_essentials():
    data = request.get_json()
    checkbox_set = data.get('essential_checkbox_options')
    product_list = Product.query.filter_by(_category="Daily Essential").all()
    filtered_items = []

    for product in product_list:
        product_data = ProductSchema().dump(product)

        if len(checkbox_set['key1']) > 0:
            if (product_data['_sub_category'] in checkbox_set['key1']):
                filtered_items.append(product_data)

    return jsonify(filtered_items), 200
   
@app.route("/api/removeOrder", methods=['POST'])
@jwt_required()
def remove_item():
    data = request.get_json()
    product_id = data['productId']
    order_id = data['orderId']
    order_item = OrderItems.query.filter(OrderItems._order_id == order_id, OrderItems._product_id == product_id).first()
    if order_item:
        db.session.delete(order_item)
        db.session.commit()
        return jsonify({"msg": "Item has been removed from the cart"}), 200

@app.route("/api/placeOrder", methods = ['POST'])
@jwt_required()
def place_order():
    data = request.get_json()
    email = get_jwt_identity()
    user = User.query.filter_by(_email=email).first()

    order_id = data['orderId']
    total_amount = data['total_price']

    order = Order.query.filter(Order._id == order_id, user._id == Order._user_id).first()
    if order:
        order_items = OrderItems.query.filter(OrderItems._order_id == order._id).all()
        if order_items:
            for order_item in order_items:
                quantity = order_item._quantity
                product = Product.query.filter(Product._id == order_item._product_id).first()
                product._stock = product._stock - quantity
                if product._stock < 0:
                    return jsonify({"msg": "We dont have enough stock for " + {product._name} + "Your order were not placed"}), 204
                db.session.commit()
        order._total_price = total_amount
        order._order_status = 1
        db.session.commit()
        return jsonify({"msg": "Order has been placed successfully"}), 200
    
@app.route("/api/addRating", methods = ["POST"])
@jwt_required()
def rate_product():
    email = get_jwt_identity()
    user = User.query.filter(User._email == email).first()
    if user:
        product_id = request.args.get("id")
        rating = request.args.get("rating")
       
        israting = Ratings.query.filter(Ratings._user_id == user._id, Ratings._product_id == product_id).first()
        if israting:
            israting._rating = rating
            db.session.commit()
            return jsonify({"msg": "product rate updated"}), 200
        else:
            rating_instance = Ratings(user._id, product_id, rating)
            db.session.add(rating_instance)
            db.session.commit()
            return jsonify({"msg": "product rated"}), 200
        
@app.route("/api/retrieveChat", methods=["GET"])
@jwt_required()
def chat_retrieve():
    email = get_jwt_identity()
    seller_id = Seller.query.filter(Seller._email == email).first()
    all_contacts = Chat.query.with_entities(distinct(Chat._sender_id)).filter(Chat._receiver_id == seller_id._id).all()
    sender_list = []
   
    for sender in all_contacts:
        user = User.query.filter(User._id == sender[0]).first()
        senders = {"name": user._first_name + " " + user._last_name, "id": sender[0]}
        sender_list.append(senders)
    return jsonify(sender_list) , 200

@app.route("/api/retrieveUserChat", methods=["GET"])
@jwt_required()
def user_chat_retrieval():
    email = get_jwt_identity()
    user = User.query.filter(User._email == email).first()
    all_contacts = Chat.query.with_entities(distinct(Chat._sender_id)).filter(Chat._receiver_id == user._id).all()
    sender_list = []
   
    for sender in all_contacts:
        seller = Seller.query.filter(Seller._id == sender[0]).first()
        senders = {"name": seller._name, "id": sender[0]}
        sender_list.append(senders)
    return jsonify(sender_list) , 200

@app.route("/api/retrieveChatMessage", methods=["POST"])
@jwt_required()
def retrieve_text():
    email = get_jwt_identity()
    seller = Seller.query.filter(Seller._email == email).first()
    data = request.get_json()

    sender_id = data['sender']
    seller_id = seller._id

    chats = Chat.query.filter(or_(and_(Chat._receiver_id == seller_id, Chat._sender_id == sender_id),
                                 and_(Chat._receiver_id == sender_id, Chat._sender_id == seller_id)
                            )).order_by(asc(Chat._time_stamp)).all()
    
    chat_schema = ChatSchema(many=True)
    text_chat = chat_schema.dump(chats)
    return jsonify(text_chat), 200

@app.route("/api/retrieveUserChatMessage", methods=['POST'])
@jwt_required()
def retrieve_userText():
    email = get_jwt_identity()
    user = User.query.filter(User._email == email).first()
    data = request.get_json()

    sender_id = data['sender']
    user_id = user._id

    chats = Chat.query.filter(or_(and_(Chat._receiver_id == user_id, Chat._sender_id == sender_id),
                                 and_(Chat._receiver_id == sender_id, Chat._sender_id == user_id)
                            )).order_by(asc(Chat._time_stamp)).all()
    
    chat_schema = ChatSchema(many=True)
    text_chat = chat_schema.dump(chats)
    return jsonify(text_chat), 200

@app.route("/api/sendMessage", methods=['POST'])
@jwt_required()
def send_message():
    email = get_jwt_identity()
    productId = request.args.get("id")
    message = request.get_json()
    msg = message["message"]
    user_id = User.query.filter(User._email == email).first()
    product_id  = Product.query.filter(Product._id == productId).first()
    
    current_time = datetime.now()

    if product_id:
        seller = product_id._seller_id
        if seller:
            message_id = str(uuid.uuid4())
            new_message = Chat(message_id, user_id._id, seller, msg, current_time)
            db.session.add(new_message)
            db.session.commit()

            return jsonify({"msg": "You have send the message"}), 200
        
@app.route("/api/sellerReply", methods=['POST'])
@jwt_required()
def send_seller_reply():
    email = get_jwt_identity()
    seller = Seller.query.filter(Seller._email == email).first()
    if seller:
        data = request.get_json()
        reply = data['reply']
        recepient = data["recepient"]
        current_time = datetime.now()
        message_id = str(uuid.uuid4())
        new_message = Chat(message_id, seller._id, recepient, reply, current_time)
        db.session.add(new_message)
        db.session.commit()

        return jsonify({"msg": "You have send the message"}), 200
    
@app.route("/api/userReply", methods=['POST'])
@jwt_required()
def send_user_reply():
    email = get_jwt_identity()
    user = User.query.filter(User._email == email).first()
    if user:
        data = request.get_json()
        reply = data['reply']
        recepient = data["recepient"]
        current_time = datetime.now()
        message_id = str(uuid.uuid4())
        new_message = Chat(message_id, user._id, recepient, reply, current_time)
        db.session.add(new_message)
        db.session.commit()

        return jsonify({"msg": "You have send the message"}), 200