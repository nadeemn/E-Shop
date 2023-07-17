from flaskEshop import db, ma, app, bcrypt


#Model For Users
class User(db.Model):
    __tablename__ = 'Users'

    _id = db.Column(db.VARCHAR(120), primary_key=True)
    _first_name = db.Column(db.String(20))
    _last_name = db.Column(db.String(20))
    _email = db.Column(db.String(30), unique=True)
    _password = db.Column(db.VARCHAR(200))
    _address = db.Column(db.String(50))
    _city = db.Column(db.String(20))
    _postal_code = db.Column(db.String(20))
    _state = db.Column(db.String(20))
    _country = db.Column(db.String(20))

    def __init__(self, _id, _first_name, _last_name, _email, _password, _address, _city, _postal_code, _state, _country):
        self._id = _id
        self._first_name = _first_name
        self._last_name = _last_name
        self._email = _email
        self._password = bcrypt.generate_password_hash(_password).decode('utf-8')
        self._address = _address
        self._city = _city
        self._postal_code = _postal_code
        self._state = _state
        self._country = _country

    def __rept__(self):
        return  f'<User {self._id}>'

    def verify_password(self, password):
        return bcrypt.check_password_hash(self._password, password)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


#Model for Sellers
class Seller(db.Model):
    __tablename__ = "Seller"

    _id = db.Column(db.VARCHAR(120), primary_key=True)
    _name = db.Column(db.String(255))
    _email = db.Column(db.String(30), unique=True)
    _password = db.Column(db.VARCHAR(200))

    def __init__(self, id, name, mail, password):
        self._id = id
        self._name = name
        self._email = mail
        self._password = bcrypt.generate_password_hash(password).decode('utf-8')

    def __rept__(self):
        return  f'<Seller {self._id}>'
    
    def verify_password(self, password):
        return bcrypt.check_password_hash(self._password, password)
    
class SellerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Seller


#Model for Products
class Product(db.Model):
    __tablename__ = 'Products'

    _id = db.Column(db.VARCHAR(120), primary_key=True)
    _name = db.Column(db.String(255))
    _product_image = db.Column(db.VARCHAR(1000000))
    _category = db.Column(db.String(255))
    _sub_category = db.Column(db.String(255))
    _product_gender = db.Column(db.String(20))
    _product_brand = db.Column(db.String(20))
    _description = db.Column(db.String(1000))
    _price = db.Column(db.Float)
    _stock = db.Column(db.Integer)
    _seller_id = db.Column(db.VARCHAR(120),db.ForeignKey('Seller._id'))
    _discount = db.Column(db.Boolean, default=False)
    _sponsored = db.Column(db.Boolean, default=False)

    def __init__(self, id, name, image, category, sub_category, price, stock, seller_id, discount, gender, brand, sponsored):
        self._id = id
        self._name = name
        self._product_image = image
        self._category = category
        self._sub_category = sub_category
        self._price = price
        self._stock = stock
        self._seller_id = seller_id
        self._discount = discount
        self._product_gender = gender
        self._product_brand = brand
        self._sponsored = sponsored

    def __rept__(self):
        return  f'<Product {self._id}>'
    

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product


#Model for product discounts
class Discount(db.Model):
    __tablename__ = "Discount"

    _discount_id = db.Column(db.VARCHAR(120), primary_key=True)
    _product_id = db.Column(db.VARCHAR(120), db.ForeignKey('Products._id'))
    _discount_rate = db.Column(db.Integer)
    _expiry_date = db.Column(db.Date)
    _discount_image = db.Column(db.VARCHAR(1000000))

    def __init__(self, id, pid, rate, date, image):
        self._discount_id = id
        self._product_id = pid
        self._discount_rate = rate
        self._expiry_date = date
        self._discount_image = image

    def __rept__(self):
        return  f'<Discount {self._id}>'


class DiscountSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Discount

#model for product ratings
class Ratings(db.Model):
    __tablename__ = "ratings"
    _user_id = db.Column(db.VARCHAR(120), db.ForeignKey('Users._id'), primary_key = True)
    _product_id = db.Column(db.VARCHAR(120), db.ForeignKey('Products._id'), primary_key=True)
    _rating = db.Column(db.Float)

    def __init__(self, user, product, rating):
        self._user_id = user
        self._product_id = product
        self._rating = rating

class RatingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Ratings


#Model for orders
class Order(db.Model):
    __tablename__ = 'Orders'
    _id = db.Column(db.VARCHAR(120), primary_key=True)
    _user_id = db.Column(db.VARCHAR(120), db.ForeignKey('Users._id'))
    _total_price = db.Column(db.Float)
    _order_status = db.Column(db.Boolean, default=False)
    
    def __init__(self, id, user, total, order_status):
        self._id = id
        self._user_id = user
        self._total_price = total
        self._order_status = order_status

    def __repr__(self):
        return f'<Order {self._id}>'
    

class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order

#model for product item of an order
class OrderItems(db.Model):
    __tablename__ = "OrderItems"
    _order_id = db.Column(db.VARCHAR(120), db.ForeignKey('Orders._id'), primary_key=True)
    _product_id = db.Column(db.VARCHAR(120), db.ForeignKey('Products._id'), primary_key=True)
    _quantity = db.Column(db.Integer)

    def __init__(self, order, product, quantity):
        self._order_id = order
        self._product_id = product
        self._quantity = quantity
    
    def __repr__(self):
        return f'<OrderItems {self._order_id}>'

class OrderItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = OrderItems

#model for chat
class Chat(db.Model):
    __tablename__ = "Chat"
    _id = db.Column(db.VARCHAR(120), primary_key=True)
    _sender_id = db.Column(db.VARCHAR(120))
    _receiver_id = db.Column(db.VARCHAR(120))
    _message_body = db.Column(db.VARCHAR(1000))
    _time_stamp = db.Column(db.DateTime)

    def __init__(self, id, sender, receiver, message, time):
        self._id = id
        self._sender_id = sender
        self._receiver_id = receiver
        self._message_body = message
        self._time_stamp = time

    def __repr__(self):
        return f'<ChatMessages {self._id}>'
    
class ChatSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Chat


with app.app_context():
    db.create_all()
